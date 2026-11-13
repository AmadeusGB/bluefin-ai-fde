'use client';
import { useEffect, useRef } from 'react';
export function PortalScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false,
      cleanup = () => {};
    void import('three')
      .then((T) => {
        if (disposed || !host.current) return;
        const el = host.current;
        let renderer: InstanceType<typeof T.WebGLRenderer>;
        try {
          renderer = new T.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'low-power',
          });
        } catch {
          return;
        }
        const scene = new T.Scene(),
          camera = new T.PerspectiveCamera(36, 1, 0.1, 60);
        camera.position.set(0, 0, 11);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setClearColor(0x040810, 0);
        el.appendChild(renderer.domElement);
        scene.add(new T.AmbientLight(0x6d94bf, 2));
        const key = new T.PointLight(0x3cb8ff, 65);
        key.position.set(3, 3, 5);
        scene.add(key);
        const rim = new T.PointLight(0x3366ff, 45);
        rim.position.set(-4, -2, 2);
        scene.add(rim);
        const group = new T.Group();
        scene.add(group);
        group.rotation.set(0.35, -0.3, 0.2);
        const metal = new T.MeshStandardMaterial({
          color: 0x5f91b8,
          metalness: 0.87,
          roughness: 0.28,
        });
        const glow = new T.MeshBasicMaterial({
          color: 0x59cfff,
          transparent: true,
          opacity: 0.75,
        });
        for (let i = 0; i < 3; i++) {
          const ring = new T.Mesh(
            new T.TorusGeometry(
              2.1 + i * 0.21,
              i === 0 ? 0.075 : 0.026,
              12,
              160,
            ),
            i === 1 ? glow : metal,
          );
          ring.rotation.x = i === 0 ? 0.55 : i === 1 ? -0.65 : 1.08;
          ring.rotation.y = i * 0.5;
          group.add(ring);
        }
        const arc = new T.Mesh(
          new T.TorusGeometry(2.95, 0.008, 5, 180, Math.PI * 1.45),
          glow,
        );
        arc.rotation.set(0.5, 0.2, -0.4);
        group.add(arc);
        const positions = new Float32Array(270);
        for (let i = 0; i < positions.length; i += 3) {
          const n = i / 3;
          positions[i] = Math.sin(n * 12.9898) * 8;
          positions[i + 1] = Math.cos(n * 7.233) * 5;
          positions[i + 2] = -2 - Math.abs(Math.sin(n)) * 5;
        }
        const geometry = new T.BufferGeometry();
        geometry.setAttribute('position', new T.BufferAttribute(positions, 3));
        const stars = new T.Points(
          geometry,
          new T.PointsMaterial({
            color: 0x6fb6e6,
            size: 0.025,
            transparent: true,
            opacity: 0.6,
          }),
        );
        scene.add(stars);
        const motion = matchMedia('(prefers-reduced-motion: reduce)'),
          fine = matchMedia('(hover: hover) and (pointer: fine)');
        let x = 0,
          y = 0,
          frame = 0,
          time = 0;
        const resize = () => {
          const w = el.clientWidth,
            h = el.clientHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const move = (e: PointerEvent) => {
          if (fine.matches && !motion.matches) {
            x = (e.clientX / window.innerWidth - 0.5) * 0.35;
            y = (e.clientY / window.innerHeight - 0.5) * 0.2;
          }
        };
        const tick = () => {
          if (disposed) return;
          if (!document.hidden) {
            time += 0.003;
            group.rotation.y = -0.3 + Math.sin(time) * 0.16 + x;
            group.rotation.x = 0.35 + y;
            arc.rotation.z = time * 0.25;
            renderer.render(scene, camera);
          }
          if (!motion.matches) frame = requestAnimationFrame(tick);
        };
        const change = () => {
          cancelAnimationFrame(frame);
          tick();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(el);
        window.addEventListener('pointermove', move);
        motion.addEventListener('change', change);
        resize();
        tick();
        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          window.removeEventListener('pointermove', move);
          motion.removeEventListener('change', change);
          scene.traverse((o) => {
            if (o instanceof T.Mesh || o instanceof T.Points) {
              o.geometry.dispose();
              const mats = Array.isArray(o.material)
                ? o.material
                : [o.material];
              mats.forEach((m) => m.dispose());
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return (
    <div ref={host} className="portal-scene" aria-hidden="true">
      <div className="scene-fallback" />
    </div>
  );
}
