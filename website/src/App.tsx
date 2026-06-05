import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CinematicIntro } from "@/components/CinematicIntro";
import { CommandMenu } from "@/components/CommandMenu";
import { Footer } from "@/components/Footer";
import { MobileMenu } from "@/components/MobileMenu";
import { Navbar } from "@/components/Navbar";
import { Seo } from "@/components/Seo";
import { siteContent, type Language } from "@/data/siteContent";
import { buildPublicPath, parsePublicRoute, type PublicRoute } from "@/lib/routing";
import type { PageKey } from "@/types/navigation";

const HomePage = React.lazy(() => import("@/pages/HomePage").then((module) => ({ default: module.HomePage })));
const StudioPage = React.lazy(() => import("@/pages/StudioPage").then((module) => ({ default: module.StudioPage })));
const ServicesPage = React.lazy(() => import("@/pages/ServicesPage").then((module) => ({ default: module.ServicesPage })));
const WorkPage = React.lazy(() => import("@/pages/WorkPage").then((module) => ({ default: module.WorkPage })));
const BuildPage = React.lazy(() => import("@/pages/BuildPage").then((module) => ({ default: module.BuildPage })));
const ProtocolPage = React.lazy(() => import("@/pages/ProtocolPage").then((module) => ({ default: module.ProtocolPage })));
const AccessPage = React.lazy(() => import("@/pages/AccessPage").then((module) => ({ default: module.AccessPage })));
const AdminApp = React.lazy(() => import("@/admin/AdminApp").then((module) => ({ default: module.AdminApp })));

export default function App() {
  const appMode = import.meta.env.VITE_APP_MODE ?? "full";
  const isAdminRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  if (appMode === "admin") {
    return (
      <React.Suspense
        fallback={
          <main className="grid min-h-screen place-items-center bg-[#050505] text-[#D4AF37]">
            <p className="font-mono text-xs uppercase tracking-[0.28em]">Loading VEIL OS</p>
          </main>
        }
      >
        <AdminApp />
      </React.Suspense>
    );
  }

  if (appMode !== "site" && isAdminRoute) {
    return (
      <React.Suspense
        fallback={
          <main className="grid min-h-screen place-items-center bg-[#050505] text-[#D4AF37]">
            <p className="font-mono text-xs uppercase tracking-[0.28em]">Loading VEIL OS</p>
          </main>
        }
      >
        <AdminApp />
      </React.Suspense>
    );
  }

  return <PublicSite />;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, language]);

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
    <main className="min-h-screen overflow-hidden bg-[#050505] text-stone-100">
      <Seo language={language} page={page} content={content} canonicalPath={route.canonicalPath} isNotFound={route.isNotFound} />
      <AnimatePresence>{introVisible && <CinematicIntro compact={isMobile} tagline={content.footer.tagline} />}</AnimatePresence>

      <div className="pointer-events-none fixed inset-0 opacity-25 md:opacity-30">
        {!isMobile && (
          <motion.div
            animate={decorativeCinematic ? { x: [0, 30, -20, 0], y: [0, -20, 20, 0] } : undefined}
            transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:88px_88px] md:bg-[size:64px_64px]" />
        {decorativeCinematic && <div className="absolute inset-0 hidden md:block" style={{ background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(251,191,36,0.16), transparent 28%)` }} />}
      </div>

      <Navbar
        page={page}
        navItems={content.navItems}
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
        {mobileOpen && <MobileMenu page={page} navItems={content.navItems} labels={content.mobileMenu} language={language} onLanguageChange={changeLanguage} goToPage={goToPage} openCommandMenu={() => setCommandOpen(true)} />}
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
            {page === "services" && <ServicesPage content={content.servicesPage} />}
            {page === "work" && <WorkPage content={content.work} goToPage={goToPage} />}
            {page === "build" && <BuildPage content={content.build} />}
            {page === "protocol" && <ProtocolPage content={content.protocol} />}
            {page === "access" && <AccessPage content={content.access} terminal={content.terminal} cinematic={activeCinematic} compactMotion={isMobile} />}
          </motion.div>
        </AnimatePresence>
      </React.Suspense>

      <Footer navItems={content.navItems} labels={content.footer} activeCinematic={activeCinematic} goToPage={goToPage} />
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
      <p className="text-sm uppercase tracking-[0.38em] text-amber-300">{copy.eyebrow}</p>
      <h1 className="mt-6 font-serif text-5xl leading-tight text-stone-100 md:text-8xl">{copy.title}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-400 md:text-2xl md:leading-10">{copy.text}</p>
      <button onClick={goHome} className="mt-10 rounded-full bg-amber-300 px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-amber-200">
        {copy.action}
      </button>
    </section>
  );
}
