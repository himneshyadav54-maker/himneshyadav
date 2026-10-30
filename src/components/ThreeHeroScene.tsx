import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, RotateCw, Sparkles, Layers } from 'lucide-react';

interface ThreeHeroSceneProps {
  className?: string;
}

type SculptureMode = 'core' | 'torus' | 'geometric';

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<SculptureMode>('core');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [interactiveNotice, setInteractiveNotice] = useState<string>('Drag or move mouse to interact');

  // Keep state refs for animation loop
  const modeRef = useRef<SculptureMode>('core');
  modeRef.current = activeMode;
  const autoRotateRef = useRef<boolean>(true);
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL from GPU renderer string
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.08);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map via PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting: Key, Fill, Rim
    const keyLight = new THREE.DirectionalLight(0xff8c42, 3.5);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xffffff, 0x111111, 1.2);
    scene.add(fillLight);

    const orangeRimLight = new THREE.PointLight(0xff6b2c, 4.0, 15);
    orangeRimLight.position.set(-4, -2, -3);
    scene.add(orangeRimLight);

    const cyanRimLight = new THREE.PointLight(0xffaa66, 2.5, 12);
    cyanRimLight.position.set(2, -3, 3);
    scene.add(cyanRimLight);

    // Master sculpture group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Ground contact shadow disc
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,0.7)');
      grad.addColorStop(0.4, 'rgba(255,107,44,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.6;
    scene.add(shadowMesh);

    // Shared high-polish metallic chrome material
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x161618,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });

    // Glowing Orange Accent Material
    const orangeGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b2c,
      emissive: 0xff6b2c,
      emissiveIntensity: 2.8,
      roughness: 0.2,
      metalness: 0.8,
    });

    // Dark brushed titanium
    const titaniumMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222225,
      metalness: 0.9,
      roughness: 0.28,
      clearcoat: 0.5,
    });

    // 1. Core Mode Group (Sculpted Metallic Core + Concentric Orbital Rings)
    const coreGroup = new THREE.Group();
    // Inner faceted jewel orb
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, chromeMaterial);
    coreGroup.add(innerCoreMesh);

    // Orange glowing energetic nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xff8c42,
      wireframe: true,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // Concentric Gyroscope Rings
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.05, 24, 100);
    const ring1 = new THREE.Mesh(ring1Geo, orangeGlowMaterial);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.35, 0.04, 24, 100);
    const ring2 = new THREE.Mesh(ring2Geo, titaniumMaterial);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.7, 0.03, 24, 100);
    const ring3 = new THREE.Mesh(ring3Geo, orangeGlowMaterial);
    ring3.rotation.y = Math.PI / 4;
    coreGroup.add(ring3);

    masterGroup.add(coreGroup);

    // 2. Torus Knot Mode Group
    const torusGroup = new THREE.Group();
    const torusGeo = new THREE.TorusKnotGeometry(1.3, 0.4, 128, 32, 2, 3);
    const torusMesh = new THREE.Mesh(torusGeo, chromeMaterial);
    torusGroup.add(torusMesh);

    // Accent wireframe halo
    const torusWireMat = new THREE.MeshBasicMaterial({
      color: 0xff8c42,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torusWireMesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.34, 0.38, 64, 16, 2, 3),
      torusWireMat
    );
    torusGroup.add(torusWireMesh);
    torusGroup.visible = false;
    masterGroup.add(torusGroup);

    // 3. Geometric Polyhedron Mode Group
    const geoGroup = new THREE.Group();
    const polyGeo = new THREE.OctahedronGeometry(1.6, 0);
    const polyMesh = new THREE.Mesh(polyGeo, chromeMaterial);
    geoGroup.add(polyMesh);

    const polyOuter = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.1, 0),
      new THREE.MeshStandardMaterial({
        color: 0xff6b2c,
        wireframe: true,
        emissive: 0xff6b2c,
        emissiveIntensity: 1.5,
      })
    );
    geoGroup.add(polyOuter);
    geoGroup.visible = false;
    masterGroup.add(geoGroup);

    // Ambient floating particles
    const particleCount = isSoftwareGl ? 35 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleSpeeds[i] = 0.5 + Math.random() * 1.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xff8c42,
      size: isSoftwareGl ? 0.06 : 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // Mouse coordinates tracking & smooth damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const rect = container.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      if (isDragging) {
        const deltaX = clientX - previousPointerPosition.x;
        const deltaY = clientY - previousPointerPosition.y;
        masterGroup.rotation.y += deltaX * 0.008;
        masterGroup.rotation.x += deltaY * 0.008;
        previousPointerPosition = { x: clientX, y: clientY };
      } else {
        mouse.targetX = (relX / rect.width - 0.5) * 1.2;
        mouse.targetY = -(relY / rect.height - 0.5) * 1.2;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      previousPointerPosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize handling
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

    // Animation Loop with Software WebGL pacing
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
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Switch visible mode
      const currentMode = modeRef.current;
      coreGroup.visible = currentMode === 'core';
      torusGroup.visible = currentMode === 'torus';
      geoGroup.visible = currentMode === 'geometric';

      // Smooth mouse follow damping
      mouse.x = THREE.MathUtils.damp(mouse.x, mouse.targetX, 4, 0.016);
      mouse.y = THREE.MathUtils.damp(mouse.y, mouse.targetY, 4, 0.016);

      if (!isDragging) {
        masterGroup.rotation.y = THREE.MathUtils.damp(
          masterGroup.rotation.y,
          autoRotateRef.current ? masterGroup.rotation.y + 0.008 : mouse.x * 0.8,
          3,
          0.016
        );
        masterGroup.rotation.x = THREE.MathUtils.damp(
          masterGroup.rotation.x,
          mouse.y * 0.5,
          3,
          0.016
        );
      }

      // Smooth floating vertical motion
      masterGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.15;

      // Rotate sub-components in core
      if (coreGroup.visible) {
        innerCoreMesh.rotation.y += 0.006;
        innerCoreMesh.rotation.x += 0.004;
        nucleusMesh.rotation.y -= 0.01;
        ring1.rotation.z += 0.012;
        ring1.rotation.x += 0.005;
        ring2.rotation.y += 0.01;
        ring3.rotation.z -= 0.008;
      }

      // Rotate torus
      if (torusGroup.visible) {
        torusMesh.rotation.y += 0.008;
        torusMesh.rotation.x += 0.005;
        torusWireMesh.rotation.y -= 0.005;
      }

      // Rotate geometric
      if (geoGroup.visible) {
        polyMesh.rotation.y += 0.01;
        polyMesh.rotation.z += 0.008;
        polyOuter.rotation.x -= 0.008;
        polyOuter.rotation.y -= 0.006;
      }

      // Rotate particles
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      renderer.dispose();
      chromeMaterial.dispose();
      orangeGlowMaterial.dispose();
      titaniumMaterial.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      innerCoreGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      torusGeo.dispose();
      polyGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-[500px] lg:h-[580px] flex items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
        aria-label="Interactive 3D Kinetic Sculpture of Himnesh Yadav's Portfolio"
        role="region"
      />

      {/* Floating Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none radial-mask bg-gradient-to-tr from-[#FF6B2C]/10 via-transparent to-transparent -z-10" />

      {/* Interactive Drag / Move Badge (Top) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs text-zinc-400 backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-[#FF8C42]" />
        <span>Interactive 3D • Drag to rotate</span>
      </div>

      {/* Collapsible Unified Bottom Control Dock (Directive 5 Compliant) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={() => setIsDockCollapsed((prev) => !prev)}
          className="mb-1 text-[11px] uppercase tracking-wider text-zinc-400 hover:text-white px-3 py-0.5 rounded-t-md bg-[#111111]/80 border-t border-x border-white/10 backdrop-blur-md flex items-center gap-1 transition-colors"
          aria-label={isDockCollapsed ? 'Show 3D Controls' : 'Hide 3D Controls'}
        >
          {isDockCollapsed ? '▴ 3D Controls' : '▾ Hide Controls'}
        </button>

        {!isDockCollapsed && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111111]/90 border border-white/10 backdrop-blur-lg shadow-xl">
            {/* Model Presets */}
            <div className="flex items-center bg-black/50 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setActiveMode('core')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  activeMode === 'core'
                    ? 'bg-[#FF6B2C] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Kinetic Core
              </button>
              <button
                onClick={() => setActiveMode('torus')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  activeMode === 'torus'
                    ? 'bg-[#FF6B2C] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Chrome Torus
              </button>
              <button
                onClick={() => setActiveMode('geometric')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  activeMode === 'geometric'
                    ? 'bg-[#FF6B2C] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Neural Poly
              </button>
            </div>

            <div className="h-4 w-px bg-white/10" />

            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate((prev) => !prev)}
              className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                autoRotate
                  ? 'border-[#FF6B2C]/50 text-[#FF8C42] bg-[#FF6B2C]/10'
                  : 'border-white/10 text-zinc-400 hover:text-white bg-black/40'
              }`}
              title={autoRotate ? 'Pause Rotation' : 'Resume Auto Rotation'}
              aria-label="Toggle 3D auto rotation"
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline">{autoRotate ? 'Spinning' : 'Static'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
