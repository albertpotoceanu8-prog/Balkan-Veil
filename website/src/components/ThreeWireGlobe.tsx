import { useEffect, useRef } from "react";

type ThreeWireGlobeProps = {
  className?: string;
};

/** Push a polyline (array of [x,y,z]) into a flat segment-pair array. */
function pushPolyline(target: number[], points: number[][], closed: boolean) {
  for (let i = 0; i < points.length - 1; i += 1) {
    target.push(...points[i], ...points[i + 1]);
  }
  if (closed && points.length > 1) {
    target.push(...points[points.length - 1], ...points[0]);
  }
}

/** A latitude ring at a given latitude (radians). */
function parallel(latRad: number, segments: number): number[][] {
  const radius = Math.cos(latRad);
  const y = Math.sin(latRad);
  const points: number[][] = [];
  for (let i = 0; i < segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    points.push([radius * Math.cos(t), y, radius * Math.sin(t)]);
  }
  return points;
}

/** A meridian (longitude line) from pole to pole (radians). */
function meridian(lonRad: number, segments: number): number[][] {
  const points: number[][] = [];
  for (let i = 0; i <= segments; i += 1) {
    const phi = -Math.PI / 2 + (i / segments) * Math.PI;
    const cp = Math.cos(phi);
    points.push([cp * Math.cos(lonRad), Math.sin(phi), cp * Math.sin(lonRad)]);
  }
  return points;
}

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
      import("three/src/core/BufferGeometry.js"),
      import("three/src/core/BufferAttribute.js"),
      import("three/src/materials/LineBasicMaterial.js"),
      import("three/src/objects/LineSegments.js"),
      import("three/src/constants.js"),
    ]).then(([
      { Scene },
      { PerspectiveCamera },
      { Group },
      { WebGLRenderer },
      { BufferGeometry },
      { Float32BufferAttribute },
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
      const orbitGroup = new Group();
      let frameId = 0;
      let reducedMotion = motionQuery.matches;
      let renderer: InstanceType<typeof WebGLRenderer>;

      try {
        renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return;
      }

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.setAttribute("role", "presentation");
      renderer.domElement.tabIndex = -1;

      camera.position.set(0, 0, 3.05);
      group.rotation.set(-0.22, 0.35, -0.05);
      scene.add(group);

      // ── Wire globe: parallels + meridians ────────────────────────────────
      const gridVerts: number[] = [];
      for (let lat = -60; lat <= 60; lat += 20) {
        pushPolyline(gridVerts, parallel((lat * Math.PI) / 180, 72), true);
      }
      for (let lon = 0; lon < 180; lon += 30) {
        pushPolyline(gridVerts, meridian((lon * Math.PI) / 180, 48), false);
      }
      const gridGeometry = new BufferGeometry();
      gridGeometry.setAttribute("position", new Float32BufferAttribute(gridVerts, 3));

      const wireMaterial = new LineBasicMaterial({ color: 0xd8c28f, transparent: true, opacity: 0.32, depthWrite: false });
      const glowMaterial = new LineBasicMaterial({ color: 0xb98a32, transparent: true, opacity: 0.14, blending: AdditiveBlending, depthWrite: false });

      const wire = new LineSegments(gridGeometry, wireMaterial);
      const glow = new LineSegments(gridGeometry, glowMaterial);
      glow.scale.setScalar(1.02);
      group.add(glow, wire);

      // ── Tilted orbit ring (signal sweep) ─────────────────────────────────
      const orbitVerts: number[] = [];
      pushPolyline(orbitVerts, parallel(0, 96).map(([x, y, z]) => [x * 1.28, y, z * 1.28]), true);
      const orbitGeometry = new BufferGeometry();
      orbitGeometry.setAttribute("position", new Float32BufferAttribute(orbitVerts, 3));
      const orbitMaterial = new LineBasicMaterial({ color: 0xe4c67d, transparent: true, opacity: 0.5, depthWrite: false });
      const orbit = new LineSegments(orbitGeometry, orbitMaterial);
      orbitGroup.rotation.set(1.12, 0, 0.35);
      orbitGroup.add(orbit);
      group.add(orbitGroup);

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
        group.rotation.y += 0.0016;
        orbitGroup.rotation.z += 0.01;
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
        gridGeometry.dispose();
        orbitGeometry.dispose();
        wireMaterial.dispose();
        glowMaterial.dispose();
        orbitMaterial.dispose();
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
