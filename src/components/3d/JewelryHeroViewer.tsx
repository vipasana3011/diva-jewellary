'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Sparkles, Compass, Eye, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { products } from '@/data/products';

export default function JewelryHeroViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useShop();

  const [activeModel, setActiveModel] = useState<'bangle' | 'bow' | 'ring'>('bangle');
  const [isDragging, setIsDragging] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  // References for Three.js animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);

  // Mouse interaction tracking
  const pointerDownRef = useRef(false);
  const prevPointerXRef = useRef(0);
  const prevPointerYRef = useRef(0);
  const velocityXRef = useRef(0.006); // Default auto-rotate speed
  const velocityYRef = useRef(0);
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0.2);

  // Model details for UI
  const modelInfo = {
    bangle: {
      title: 'Artisan Chunky Molten Bangle',
      tagline: 'Viral Pinterest Stacking Essential',
      price: 1399,
      originalPrice: 2199,
      slug: 'chunky-hammered-dome-bangle-stack'
    },
    bow: {
      title: 'Entwined Open Heart Pendant',
      tagline: '#1 Trending Aesthetic Charm',
      price: 749,
      originalPrice: 1199,
      slug: 'entwined-open-heart-snake-chain'
    },
    ring: {
      title: 'Molten Sculptural Fluid Ring',
      tagline: 'Chunky Minimalist Gold Statement',
      price: 899,
      originalPrice: 1399,
      slug: 'molten-gold-fluid-trio'
    }
  };

  const currentInfo = modelInfo[activeModel];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    cameraRef.current = camera;

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 4. LIGHTING SETUP
    const lightsGroup = new THREE.Group();
    lightsGroupRef.current = lightsGroup;
    scene.add(lightsGroup);

    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff6ec, 1.8);
    lightsGroup.add(ambientLight);

    // Main Studio Key Light (Champagne Gold)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(4, 5, 4);
    lightsGroup.add(keyLight);

    // Cool Rim Light for metallic specular separation
    const rimLight = new THREE.DirectionalLight(0xd9ecff, 2.5);
    rimLight.position.set(-4, -2, -3);
    lightsGroup.add(rimLight);

    // Specular Accent Point Light (orbits around for sparkle)
    const sparkleLight = new THREE.PointLight(0xffd599, 3.5, 8);
    sparkleLight.position.set(2, 2, 3);
    lightsGroup.add(sparkleLight);

    // 5. MESH GROUP (Contains the rotating jewelry)
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    // Luxury 18K Gold Material
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E6B97A'),
      emissive: new THREE.Color('#3A2A10'),
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 1.0,
      ior: 2.2
    });

    // Lustrous Pearl Material
    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FAF8F5'),
      roughness: 0.22,
      metalness: 0.05,
      transmission: 0.25,
      thickness: 0.8,
      ior: 1.55,
      clearcoat: 0.9
    });

    // Gemstone / Crystal Material
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFFFF'),
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.95,
      ior: 2.417, // Diamond IOR
      dispersion: 0.04,
      thickness: 1.2
    });

    // 6. BUILD GEOMETRIES BASED ON ACTIVE MODEL
    function buildJewelry(type: 'bangle' | 'bow' | 'ring') {
      // Clear existing children
      while (meshGroup.children.length > 0) {
        const obj = meshGroup.children[0];
        meshGroup.remove(obj);
      }

      if (type === 'bangle') {
        // Sculptural Molten Wave Bangle
        // Knot geometry with fluid organic curves
        const torusKnot = new THREE.TorusKnotGeometry(1.05, 0.22, 180, 32, 2, 3);
        const bangleMesh = new THREE.Mesh(torusKnot, goldMaterial);
        meshGroup.add(bangleMesh);

        // Accent Pearl Bead attached to curve
        const pearlGeo = new THREE.SphereGeometry(0.32, 32, 32);
        const pearlMesh = new THREE.Mesh(pearlGeo, pearlMaterial);
        pearlMesh.position.set(0, 1.2, 0.4);
        meshGroup.add(pearlMesh);
      } else if (type === 'bow') {
        // Coquette Ribbon Bow Pendant
        const bowGroup = new THREE.Group();

        // Central Gold Knot
        const centerKnot = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), goldMaterial);
        centerKnot.scale.set(1.2, 0.9, 0.9);
        bowGroup.add(centerKnot);

        // Left Loop
        const loopGeo = new THREE.TorusGeometry(0.55, 0.16, 24, 48, Math.PI * 1.5);
        const leftLoop = new THREE.Mesh(loopGeo, goldMaterial);
        leftLoop.position.set(-0.55, 0.2, 0);
        leftLoop.rotation.z = Math.PI * 0.25;
        leftLoop.rotation.y = 0.3;
        bowGroup.add(leftLoop);

        // Right Loop
        const rightLoop = new THREE.Mesh(loopGeo, goldMaterial);
        rightLoop.position.set(0.55, 0.2, 0);
        rightLoop.rotation.z = -Math.PI * 0.25;
        rightLoop.rotation.y = -0.3;
        bowGroup.add(rightLoop);

        // Ribbon Tails (Cylinder curves)
        const tailGeo = new THREE.CylinderGeometry(0.12, 0.06, 1.1, 24);
        const leftTail = new THREE.Mesh(tailGeo, goldMaterial);
        leftTail.position.set(-0.35, -0.65, 0.1);
        leftTail.rotation.z = -0.35;
        leftTail.rotation.x = 0.2;
        bowGroup.add(leftTail);

        const rightTail = new THREE.Mesh(tailGeo, goldMaterial);
        rightTail.position.set(0.35, -0.65, 0.1);
        rightTail.rotation.z = 0.35;
        rightTail.rotation.x = -0.2;
        bowGroup.add(rightTail);

        // Suspended Teardrop Pearl
        const dropPearlGeo = new THREE.SphereGeometry(0.38, 32, 32);
        dropPearlGeo.scale(1, 1.35, 1);
        const dropPearl = new THREE.Mesh(dropPearlGeo, pearlMaterial);
        dropPearl.position.set(0, -1.3, 0);
        bowGroup.add(dropPearl);

        meshGroup.add(bowGroup);
      } else if (type === 'ring') {
        // Chunky Molten Dome Solitaire Ring
        const ringGroup = new THREE.Group();

        // Thick curved band
        const bandGeo = new THREE.TorusGeometry(1.0, 0.3, 30, 60);
        const bandMesh = new THREE.Mesh(bandGeo, goldMaterial);
        bandMesh.rotation.x = Math.PI * 0.5;
        ringGroup.add(bandMesh);

        // Crown Setting
        const crownGeo = new THREE.CylinderGeometry(0.48, 0.32, 0.35, 8);
        const crownMesh = new THREE.Mesh(crownGeo, goldMaterial);
        crownMesh.position.set(0, 1.15, 0);
        ringGroup.add(crownMesh);

        // Faceted Solitaire Crystal
        const gemGeo = new THREE.OctahedronGeometry(0.42, 2);
        const gemMesh = new THREE.Mesh(gemGeo, gemMaterial);
        gemMesh.position.set(0, 1.35, 0);
        gemMesh.rotation.y = 0.4;
        ringGroup.add(gemMesh);

        meshGroup.add(ringGroup);
      }
    }

    buildJewelry(activeModel);

    // 7. GOLDEN DUST SPARKLE PARTICLES
    const particleCount = 65;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xE8C88A,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Orbit sparkling accent light for realistic shine
      sparkleLight.position.x = Math.sin(elapsedTime * 1.5) * 3;
      sparkleLight.position.y = Math.cos(elapsedTime * 1.2) * 2.5;
      sparkleLight.position.z = 2.5 + Math.sin(elapsedTime * 0.8) * 1.2;

      // Soft particle float
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

      // Apply physics / inertia rotation
      if (!pointerDownRef.current) {
        // Continuous auto-rotation when user is not dragging
        targetRotationYRef.current += velocityXRef.current;
        // Damp any leftover drag velocity back to default cruise speed
        velocityXRef.current = THREE.MathUtils.lerp(velocityXRef.current, 0.007, 0.04);
        velocityYRef.current = THREE.MathUtils.lerp(velocityYRef.current, 0, 0.05);
      }

      // Smooth interpolation to target rotation
      if (meshGroupRef.current) {
        meshGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          meshGroupRef.current.rotation.y,
          targetRotationYRef.current,
          0.1
        );
        meshGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          meshGroupRef.current.rotation.x,
          targetRotationXRef.current,
          0.1
        );

        // Soft floating bob motion
        meshGroupRef.current.position.y = Math.sin(elapsedTime * 1.8) * 0.08;

        // Update angle readout (0 - 360 deg)
        const deg = Math.round(((meshGroupRef.current.rotation.y * 180) / Math.PI) % 360);
        setRotationAngle(deg < 0 ? deg + 360 : deg);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. RESIZE HANDLER
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      goldMaterial.dispose();
      pearlMaterial.dispose();
      gemMaterial.dispose();
      particleMat.dispose();
      particleGeo.dispose();
    };
  }, [activeModel]);

  // Mouse & Touch Drag Handlers for 360 Rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownRef.current = true;
    setIsDragging(true);
    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;
    const deltaX = e.clientX - prevPointerXRef.current;
    const deltaY = e.clientY - prevPointerYRef.current;

    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;

    const dragFactor = 0.009;
    targetRotationYRef.current += deltaX * dragFactor;
    targetRotationXRef.current += deltaY * dragFactor;

    // Clamp X rotation so it doesn't flip upside down
    targetRotationXRef.current = Math.max(-0.6, Math.min(0.6, targetRotationXRef.current));

    velocityXRef.current = deltaX * dragFactor;
    velocityYRef.current = deltaY * dragFactor;
  };

  const handlePointerUp = () => {
    pointerDownRef.current = false;
    setIsDragging(false);
  };

  const handleQuickAdd = () => {
    const targetProd = products.find((p) => p.slug === currentInfo.slug) || products[0];
    addToCart(targetProd, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-[#F7F2E9]/60 via-[#F3EDE2]/40 to-[#EAE3D6]/70 border border-[#EAE3D6] shadow-xl">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-transform ${
          isDragging ? 'scale-[1.01]' : 'scale-100'
        }`}
      />

      {/* Top Left: 360° Tech Micro-Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C5A880]/30 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#1A1615]">
            360° INTERACTIVE 3D
          </span>
        </div>
        <div className="text-[10px] text-[#807972] tracking-wider pl-1 font-mono">
          YAW: {rotationAngle}° • SHADER: 18K GOLD
        </div>
      </div>

      {/* Top Right: Drag Hint */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1615]/80 backdrop-blur-md text-[#FAF7F2] text-[10px] font-medium tracking-wider uppercase">
        <RotateCcw className="w-3 h-3 text-[#C5A880] animate-spin" style={{ animationDuration: '8s' }} />
        <span>DRAG TO ROTATE 360°</span>
      </div>

      {/* Model Selector Tabs (Bangle / Bow / Ring) */}
      <div className="absolute top-16 sm:top-auto sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex p-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#EAE3D6] shadow-md">
        <button
          type="button"
          onClick={() => setActiveModel('bangle')}
          className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer ${
            activeModel === 'bangle'
              ? 'bg-[#1A1615] text-[#FAF7F2] shadow-xs'
              : 'text-[#6B6560] hover:text-[#1A1615]'
          }`}
        >
          Molten Bangle
        </button>
        <button
          type="button"
          onClick={() => setActiveModel('bow')}
          className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer ${
            activeModel === 'bow'
              ? 'bg-[#1A1615] text-[#FAF7F2] shadow-xs'
              : 'text-[#6B6560] hover:text-[#1A1615]'
          }`}
        >
          Bow Pendant
        </button>
        <button
          type="button"
          onClick={() => setActiveModel('ring')}
          className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase rounded-full transition-all cursor-pointer ${
            activeModel === 'ring'
              ? 'bg-[#1A1615] text-[#FAF7F2] shadow-xs'
              : 'text-[#6B6560] hover:text-[#1A1615]'
          }`}
        >
          Dome Ring
        </button>
      </div>

      {/* Floating Bottom Card: Realtime Piece Info & Quick Bag Add */}
      <motion.div
        key={activeModel}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs z-20 bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#C5A880]/30 shadow-xl hidden sm:block"
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-wider text-[#997448] font-bold">
            {currentInfo.tagline}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[#10B981] font-semibold">
            IN STOCK
          </span>
        </div>

        <h4 className="text-xs sm:text-sm font-serif font-medium text-[#1A1615] mt-0.5 line-clamp-1">
          {currentInfo.title}
        </h4>

        <div className="mt-1 flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm font-bold text-[#1A1615]">₹{currentInfo.price}</span>
            <span className="text-[11px] text-[#807972] line-through">₹{currentInfo.originalPrice}</span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={addedNotice}
            className="px-3 py-1 bg-[#1A1615] text-[#FAF7F2] text-[10px] font-semibold tracking-wider uppercase rounded-full hover:bg-[#C5A880] hover:text-[#1A1615] transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>{addedNotice ? 'ADDED ✓' : 'BAG'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
