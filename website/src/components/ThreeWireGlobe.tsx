import { useEffect, useRef } from "react";

type ThreeWireGlobeProps = {
  className?: string;
};

export function ThreeWireGlobe({ className = "" }: ThreeWireGlobeProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let teardown: (() => void) | undefined;

    void Promise.all([
      import("three/src/scenes/Scene.js"),
      import("three/src/cameras/PerspectiveCamera.js"),
      import("three/src/objects/Group.js"),
      import("three/src/renderers/WebGLRenderer.js"),
      import("three/src/geometries/SphereGeometry.js"),
      import("three/src/geometries/WireframeGeometry.js"),
      import("three/src/materials/LineBasicMaterial.js"),
      import("three/src/objects/LineSegments.js"),
      import("three/src/constants.js"),
    ]).then(([
      { Scene },
      { PerspectiveCamera },
      { Group },
      { WebGLRenderer },
      { SphereGeometry },
      { WireframeGeometry },
      { LineBasicMaterial },
      { LineSegments },
      { AdditiveBlending },
    ]) => {
      const host = hostRef.current;
      if (disposed || !host || typeof window === "undefined") return;

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const scene = new Scene();
      const camera = new PerspectiveCamera(38, 1, 0.1, 100);
      const group = new Group();
      let frameId = 0;
      let reducedMotion = motionQuery.matches;
      let renderer: InstanceType<typeof WebGLRenderer>;

      try {
        renderer = new WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.setAttribute("role", "presentation");
      renderer.domElement.tabIndex = -1;

      camera.position.set(0, 0, 3.25);
      group.rotation.set(-0.18, 0.28, -0.08);
      scene.add(group);

      const sphereGeometry = new SphereGeometry(1, 32, 18);
      const wireGeometry = new WireframeGeometry(sphereGeometry);
      const wireMaterial = new LineBasicMaterial({
        color: 0xd8c28f,
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
      });
      const glowMaterial = new LineBasicMaterial({
        color: 0xb98a32,
        transparent: true,
        opacity: 0.12,
        blending: AdditiveBlending,
        depthWrite: false,
      });

      const wire = new LineSegments(wireGeometry, wireMaterial);
      const glow = new LineSegments(wireGeometry, glowMaterial);
      glow.scale.setScalar(1.018);
      group.add(glow, wire);

      host.appendChild(renderer.domElement);

      const render = () => renderer.render(scene, camera);

      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (width <= 0 || height <= 0) return;

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
      };

      const animate = () => {
        if (reducedMotion) return;

        group.rotation.y += 0.002;
        render();
        frameId = window.requestAnimationFrame(animate);
      };

      const syncMotionPreference = () => {
        reducedMotion = motionQuery.matches;
        window.cancelAnimationFrame(frameId);
        frameId = 0;

        if (reducedMotion) {
          render();
          return;
        }

        frameId = window.requestAnimationFrame(animate);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();
      syncMotionPreference();
      motionQuery.addEventListener("change", syncMotionPreference);

      teardown = () => {
        motionQuery.removeEventListener("change", syncMotionPreference);
        resizeObserver.disconnect();
        window.cancelAnimationFrame(frameId);
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
        sphereGeometry.dispose();
        wireGeometry.dispose();
        wireMaterial.dispose();
        glowMaterial.dispose();
        renderer.dispose();
      };
    }).catch(() => undefined);

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return <div ref={hostRef} data-three-wire-globe aria-hidden="true" className={className} />;
}
