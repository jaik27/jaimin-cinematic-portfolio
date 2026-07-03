'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

type ParticleConfig = {
  count?: number;
  className?: string;
};

function makeGlowTexture() {
  const size = 96;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,199,138,0.85)');
  gradient.addColorStop(0.55, 'rgba(255,127,42,0.18)');
  gradient.addColorStop(1, 'rgba(255,127,42,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CinematicLayer({ count = 130, className = '' }: ParticleConfig) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.z = 8.5;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    const warm = new THREE.Color('#ff8a36');
    const white = new THREE.Color('#fff1df');
    const blue = new THREE.Color('#80aaff');

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 13;
      positions[i3 + 1] = (Math.random() - 0.5) * 7.2;
      positions[i3 + 2] = -Math.random() * 8;
      seeds[i] = Math.random() * Math.PI * 2;

      const mix = Math.random();
      const color = mix > 0.8 ? blue.clone().lerp(white, 0.35) : warm.clone().lerp(white, Math.random() * 0.55);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const texture = makeGlowTexture();
    const material = new THREE.PointsMaterial({
      size: reduceMotion ? 0.065 : 0.105,
      sizeAttenuation: true,
      map: texture ?? undefined,
      transparent: true,
      opacity: 0.74,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    let raf = 0;
    const base = positions.slice(0);

    const onResize = () => {
      if (!host) return;
      camera.aspect = host.clientWidth / Math.max(host.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const animate = () => {
      frame += 0.006;
      const pos = geometry.attributes.position.array as Float32Array;

      if (!reduceMotion) {
        for (let i = 0; i < count; i += 1) {
          const i3 = i * 3;
          const s = seeds[i];
          pos[i3] = base[i3] + Math.sin(frame * 0.72 + s) * 0.08;
          pos[i3 + 1] = base[i3 + 1] + Math.sin(frame * 1.12 + s) * 0.12;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      camera.position.x += (mouse.current.x * 0.34 - camera.position.x) * 0.035;
      camera.position.y += (-mouse.current.y * 0.22 - camera.position.y) * 0.035;
      points.rotation.y = Math.sin(frame * 0.22) * 0.08;
      points.rotation.x = Math.sin(frame * 0.18) * 0.035;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', onResize);
    host.addEventListener('pointermove', onPointerMove);
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      host.removeEventListener('pointermove', onPointerMove);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      texture?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [count]);

  return <div ref={hostRef} className={`${styles.layer} ${className}`} />;
}
