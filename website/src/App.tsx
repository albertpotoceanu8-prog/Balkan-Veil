import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CinematicIntro } from "@/components/CinematicIntro";
import { CommandMenu } from "@/components/CommandMenu";
import { Footer } from "@/components/Footer";
import { MobileMenu } from "@/components/MobileMenu";
import { Navbar } from "@/components/Navbar";
import { Seo } from "@/components/Seo";
import { siteContent, type Language } from "@/data/siteContent";
import { getAppMode } from "@/lib/appMode";
import { buildPublicPath, parsePublicRoute, type PublicRoute } from "@/lib/routing";
import type { PageKey } from "@/types/navigation";

const HomePage = React.lazy(() => import("@/pages/HomePage").then((module) => ({ default: module.HomePage })));
const StudioPage = React.lazy(() => import("@/pages/StudioPage").then((module) => ({ default: module.StudioPage })));
const ServicesPage = React.lazy(() => import("@/pages/ServicesPage").then((module) => ({ default: module.ServicesPage })));
const PricingPage = React.lazy(() => import("@/pages/PricingPage").then((module) => ({ default: module.PricingPage })));
const WorkPage = React.lazy(() => import("@/pages/WorkPage").then((module) => ({ default: module.WorkPage })));
const BuildPage = React.lazy(() => import("@/pages/BuildPage").then((module) => ({ default: module.BuildPage })));
const ProtocolPage = React.lazy(() => import("@/pages/ProtocolPage").then((module) => ({ default: module.ProtocolPage })));
const AccessPage = React.lazy(() => import("@/pages/AccessPage").then((module) => ({ default: module.AccessPage })));
const AdminApp = React.lazy(() => import("@/admin/AdminApp").then((module) => ({ default: module.AdminApp })));

export default function App() {
  // VITE_APP_MODE controls deploy separation: public site, admin-only CMS, or local full mode.
  const appMode = getAppMode();
  const isAdminRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  if (appMode === "admin") {
    return <AdminMode />;
  }

  if (appMode === "full" && isAdminRoute) {
    return <AdminMode />;
  }

  // site mode never renders AdminApp; /admin falls through to the public 404/noindex route.
  return <PublicSite />;
}

function AdminMode() {
  const [ready, setReady] = React.useState(() => typeof window === "undefined" || window.location.pathname.startsWith("/admin"));

  React.useEffect(() => {
    if (ready) return;
    window.history.replaceState({}, "", "/admin");
    setReady(true);
  }, [ready]);

  if (!ready) return <AdminLoading />;

  return (
    <React.Suspense fallback={<AdminLoading />}>
      <AdminApp />
    </React.Suspense>
  );
}

function AdminLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#020100] text-[#D4AF37]">
      <p className="font-mono text-xs uppercase tracking-[0.28em]">Loading VEIL OS</p>
    </main>
  );
}

function PublicSite() {
  const [route, setRoute] = React.useState<PublicRoute>(() => parsePublicRoute(typeof window === "undefined" ? "/" : window.location.pathname));
  const [language, setLanguage] = React.useState<Language>(route.language);
  const [isMobile, setIsMobile] = React.useState(() => (typeof window === "undefined" ? false : window.matchMedia("(max-width: 767px)").matches));
  const [introVisible, setIntroVisible] = React.useState(true);
  const page = route.page;
  const [cinematic, setCinematic] = React.useState(true);
  const [mouse, setMouse] = React.useState({ x: 50, y: 20 });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();
  const activeCinematic = cinematic && !prefersReducedMotion;
  const decorativeCinematic = activeCinematic && !isMobile;
  const introDone = !introVisible;
  const baseContent = siteContent[language];
  const [content, setContent] = React.useState(baseContent);

  React.useEffect(() => {
    if (window.location.pathname === "/" || window.location.pathname !== route.canonicalPath && !route.isNotFound) {
      window.history.replaceState({}, "", route.canonicalPath);
    }
  }, [route]);

  React.useEffect(() => {
    const syncRoute = () => {
      const nextRoute = parsePublicRoute(window.location.pathname);
      setRoute(nextRoute);
      setLanguage(nextRoute.language);
    };

    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("balkan-veil-language", language);
    document.documentElement.lang = language;
    setContent(siteContent[language]);
  }, [language]);

  React.useEffect(() => {
    let cancelled = false;

    import("@/lib/cms/publicContent")
      .then(({ loadPublicCmsContent }) => loadPublicCmsContent(siteContent[language], language))
      .then((nextContent) => {
        if (!cancelled) setContent(nextContent);
      })
      .catch(() => {
        if (!cancelled) setContent(siteContent[language]);
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setIntroVisible(false);
      return;
    }

    const introDuration = isMobile ? 1650 : 4200;
    const timer = window.setTimeout(() => {
      setIntroVisible(false);
      window.setTimeout(() => window.dispatchEvent(new Event("balkan-decode")), 250);
    }, introDuration);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, isMobile]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [page, language, prefersReducedMotion]);

  React.useEffect(() => {
    if (!decorativeCinematic) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [decorativeCinematic]);

  const goToPage = (target: PageKey) => {
    const nextRoute = {
      language,
      page: target,
      canonicalPath: buildPublicPath(language, target),
      isNotFound: false,
    };

    window.history.pushState({}, "", nextRoute.canonicalPath);
    setRoute(nextRoute);
    setMobileOpen(false);
    setCommandOpen(false);
  };

  const changeLanguage = (nextLanguage: Language) => {
    const nextRoute = {
      language: nextLanguage,
      page,
      canonicalPath: buildPublicPath(nextLanguage, page),
      isNotFound: false,
    };

    window.history.pushState({}, "", nextRoute.canonicalPath);
    setLanguage(nextLanguage);
    setRoute(nextRoute);
    setMobileOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#020100] text-neutral-200">
      <Seo language={language} page={page} content={content} canonicalPath={route.canonicalPath} isNotFound={route.isNotFound} />
      <AnimatePresence>{introVisible && <CinematicIntro compact={isMobile} tagline={content.footer.tagline} />}</AnimatePresence>

      <div className="pointer-events-none fixed inset-0">
        {!isMobile && (
          <motion.div
            animate={decorativeCinematic ? { x: [0, 30, -20, 0], y: [0, -20, 20, 0] } : undefined}
            transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-neutral-500/10 opacity-30 blur-3xl"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:88px_88px] opacity-25 md:bg-[size:64px_64px] md:opacity-30" />
        {decorativeCinematic && <div className="absolute inset-0 hidden opacity-30 md:block" style={{ background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(155,155,148,0.16), transparent 28%)` }} />}
      </div>

      <Navbar
        page={page}
        navigationGroups={content.navigationGroups}
        labels={content.navigation}
        language={language}
        onLanguageChange={changeLanguage}
        activeCinematic={activeCinematic}
        prefersReducedMotion={Boolean(prefersReducedMotion)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setCinematic={setCinematic}
        setCommandOpen={setCommandOpen}
        goToPage={goToPage}
      />

      <AnimatePresence>
        {mobileOpen && <MobileMenu page={page} navigationGroups={content.navigationGroups} labels={content.mobileMenu} language={language} onLanguageChange={changeLanguage} goToPage={goToPage} openCommandMenu={() => setCommandOpen(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {commandOpen && <CommandMenu commandItems={content.commandItems} labels={content.commandMenu} goToPage={goToPage} close={() => setCommandOpen(false)} />}
      </AnimatePresence>

      <React.Suspense fallback={<div className="relative z-10 min-h-[60vh]" />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={decorativeCinematic ? { opacity: 0, y: 18 } : { opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={decorativeCinematic ? { opacity: 0, y: -18 } : { opacity: 0 }}
            transition={{ duration: decorativeCinematic ? 0.55 : 0.2 }}
          >
            {route.isNotFound && <NotFoundPage language={language} goHome={() => goToPage("home")} />}
            {!route.isNotFound && page === "home" && <HomePage content={content.home} goToPage={goToPage} cinematic={activeCinematic} introDone={introDone} />}
            {page === "studio" && <StudioPage content={content.studio} />}
            {page === "services" && <ServicesPage content={content.servicesPage} goToPage={goToPage} />}
            {page === "pricing" && <PricingPage content={content.pricing} goToPage={goToPage} />}
            {page === "work" && <WorkPage content={content.work} goToPage={goToPage} />}
            {page === "build" && <BuildPage content={content.build} goToPage={goToPage} />}
            {page === "protocol" && <ProtocolPage content={content.protocol} goToPage={goToPage} />}
            {page === "access" && <AccessPage content={content.access} terminal={content.terminal} cinematic={activeCinematic} compactMotion={isMobile} />}
          </motion.div>
        </AnimatePresence>
      </React.Suspense>

      <Footer navigationGroups={content.navigationGroups} labels={content.footer} activeCinematic={activeCinematic} goToPage={goToPage} />
    </main>
  );
}

function NotFoundPage({ language, goHome }: { language: Language; goHome: () => void }) {
  const copy =
    language === "ro"
      ? {
          eyebrow: "404",
          title: "Pagina nu exista.",
          text: "URL-ul nu corespunde unei pagini publice Balkan Veil.",
          action: "Inapoi la inceput",
        }
      : {
          eyebrow: "404",
          title: "Page not found.",
          text: "This URL does not match a public Balkan Veil page.",
          action: "Back to start",
        };

  return (
    <section className="relative z-10 mx-auto min-h-[calc(100vh-120px)] max-w-[1500px] px-5 py-24 md:px-8 md:py-32">
      <p className="text-sm uppercase tracking-[0.38em] text-neutral-300">{copy.eyebrow}</p>
      <h1 className="mt-6 font-serif text-5xl leading-tight text-neutral-200 md:text-8xl">{copy.title}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-400 md:text-2xl md:leading-10">{copy.text}</p>
      <button type="button" onClick={goHome} className="mt-10 rounded-full bg-neutral-300 px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-neutral-200">
        {copy.action}
      </button>
    </section>
  );
}
