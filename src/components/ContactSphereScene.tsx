import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ContactSphereSceneProps {
  className?: string;
}

export const ContactSphereScene: React.FC<ContactSphereSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(1.25, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x110800,
      emissive: 0xff6b2c,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.8,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(innerSphere);

    // 2. Wireframe glowing cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff8c42,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 2), wireMat);
    group.add(wireSphere);

    // 3. Rotating energy orbital rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff6b2c,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.02, 16, 80), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.015, 16, 80), ringMat);
    ring1.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    group.add(ring1);
    group.add(ring2);

    // 4. Dynamic halo particles
    const particleCount = isSoftwareGl ? 30 : 90;
    const particlesGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0xffaa66,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    group.add(particles);

    // Lights
    const light = new THREE.PointLight(0xff6b2c, 3, 10);
    light.position.set(2, 2, 3);
    scene.add(light);
    const amb = new THREE.AmbientLight(0x221100, 1.5);
    scene.add(amb);

    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.35;
      group.rotation.x = Math.sin(elapsed * 0.25) * 0.2;
      wireSphere.rotation.y = -elapsed * 0.4;
      ring1.rotation.z = elapsed * 0.5;
      ring2.rotation.x = elapsed * 0.45;
      particles.rotation.y = elapsed * 0.15;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW && newH) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      wireMat.dispose();
      ringMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[280px] sm:h-[340px] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-label="3D Glowing Orange Energy Sphere"
    />
  );
};
