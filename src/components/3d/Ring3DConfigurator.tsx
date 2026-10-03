'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Compass
} from 'lucide-react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Product } from '@/types';

// Fixed Permanent 18K Western Warm Gold (Visually matched to DIVA logo)
const MOLTEN_GOLD_COLOR = '#D4A257';

export default function Ring3DConfigurator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useShop();

  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  // Fixed Pricing
  const ringPrice = 999;
  const originalPrice = 1499;

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const envMapRef = useRef<THREE.Texture | null>(null);
  const ringGroupRef = useRef<THREE.Group | null>(null);

  // Pointer tracking for smooth 360 drag
  const pointerDownRef = useRef(false);
  const prevPointerXRef = useRef(0);
  const prevPointerYRef = useRef(0);
  const velocityXRef = useRef(0.0055);
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0.35);

  // Materials
  const metalMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const diamondMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  // Apply materials to meshes
  const applyRingMaterials = useCallback((obj: THREE.Object3D) => {
    if (!metalMaterialRef.current || !diamondMaterialRef.current) return;

    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = (mesh.name || '').toLowerCase();
        const matName = (mesh.material && 'name' in mesh.material ? (mesh.material as any).name : '').toLowerCase();

        if (
          name.includes('diamond') ||
          name.includes('gem') ||
          name.includes('stone') ||
          matName.includes('material_6tn9acx33') ||
          matName.includes('diamond')
        ) {
          mesh.material = diamondMaterialRef.current!;
          mesh.castShadow = true;
        } else {
          mesh.material = metalMaterialRef.current!;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      }
    });
  }, []);

  // 1. MAIN THREE.JS INITIALIZATION (Permanent 18K Molten Yellow Gold + Oval Diamond + Side Stones)
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 700;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.1);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // HDR ENVIRONMENT MAP
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader().load(
      '/models/3d-ring/metal_01.hdr',
      (hdrTexture) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
        scene.environment = envMap;
        envMapRef.current = envMap;
        hdrTexture.dispose();
        pmremGenerator.dispose();
      },
      undefined,
      (err) => console.warn('HDR notice:', err)
    );

    // MATERIALS
    // Refined 18K Western Liquid Gold Shader (matches logo gold tone & specular luster)
    const metalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(MOLTEN_GOLD_COLOR),
      metalness: 0.94,
      roughness: 0.15,
      clearcoat: 0.75,
      clearcoatRoughness: 0.10,
      reflectivity: 0.98,
      envMapIntensity: 1.85
    });
    metalMaterialRef.current = metalMat;

    // Photorealistic Diamond Refraction Shader
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.995,
      thickness: 1.8,
      ior: 2.42,
      dispersion: 0.065,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      envMapIntensity: 2.8,
      attenuationDistance: 0.9,
      attenuationColor: new THREE.Color(0xfffefb)
    });
    diamondMaterialRef.current = diamondMat;

    // REFINED STUDIO LIGHTING (warm key, soft fill, cool diamond rim)
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff3e2, 3.4);
    mainLight.position.set(3.5, 6, 4.5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xede0ce, 1.8);
    fillLight.position.set(-3.5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf0f6ff, 2.4);
    rimLight.position.set(-2.5, -2, -3.5);
    scene.add(rimLight);

    const sparkleLight = new THREE.PointLight(0xffe8c2, 3.6, 12);
    sparkleLight.position.set(2, 3, 3);
    scene.add(sparkleLight);

    // RING ROOT GROUP
    const ringGroup = new THREE.Group();
    ringGroup.scale.set(0.098, 0.098, 0.098);
    ringGroup.position.set(0, -0.15, 0);
    ringGroupRef.current = ringGroup;
    scene.add(ringGroup);

    // LOAD PERMANENT OVAL DIAMOND HEAD & SIDE STONE SHANK
    const loader = new GLTFLoader();
    setIsLoading(true);

    loader.load(
      '/models/3d-ring/head_oval_4prong.glb',
      (headGltf) => {
        const head = headGltf.scene;
        applyRingMaterials(head);
        ringGroup.add(head);

        loader.load(
          '/models/3d-ring/band_sidestone.glb',
          (bandGltf) => {
            const band = bandGltf.scene;
            applyRingMaterials(band);
            ringGroup.add(band);
            setIsLoading(false);
          },
          undefined,
          () => setIsLoading(false)
        );
      },
      undefined,
      () => setIsLoading(false)
    );

    // Golden Floating Sparkle Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD4A257,
      size: 0.028,
      transparent: true,
      opacity: 0.40,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // RENDER LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      sparkleLight.position.x = Math.sin(elapsed * 1.8) * 3.5;
      sparkleLight.position.y = 2.5 + Math.cos(elapsed * 1.4) * 1.5;
      sparkleLight.position.z = 2.5 + Math.sin(elapsed * 1.2) * 1.2;

      particles.rotation.y = elapsed * 0.025;

      if (!pointerDownRef.current) {
        targetRotationYRef.current += velocityXRef.current;
        velocityXRef.current = THREE.MathUtils.lerp(velocityXRef.current, 0.0055, 0.05);
      }

      if (ringGroupRef.current) {
        ringGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          ringGroupRef.current.rotation.y,
          targetRotationYRef.current,
          0.1
        );
        ringGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          ringGroupRef.current.rotation.x,
          targetRotationXRef.current,
          0.1
        );

        ringGroupRef.current.position.y = -0.15 + Math.sin(elapsed * 1.8) * 0.06;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    const onResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      metalMat.dispose();
      diamondMat.dispose();
      particleMat.dispose();
      particleGeo.dispose();
      if (envMapRef.current) envMapRef.current.dispose();
    };
  }, [applyRingMaterials]);

  // Pointer Handlers
  const onPointerDown = (e: React.PointerEvent) => {
    pointerDownRef.current = true;
    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;
    const deltaX = e.clientX - prevPointerXRef.current;
    const deltaY = e.clientY - prevPointerYRef.current;
    prevPointerXRef.current = e.clientX;
    prevPointerYRef.current = e.clientY;

    const factor = 0.0085;
    targetRotationYRef.current += deltaX * factor;
    targetRotationXRef.current += deltaY * factor;
    targetRotationXRef.current = Math.max(-0.2, Math.min(1.4, targetRotationXRef.current));
    velocityXRef.current = deltaX * factor;
  };

  const onPointerUp = () => {
    pointerDownRef.current = false;
  };

  const handleShopNow = () => {
    const customProduct: Product = {
      id: 'diva-oval-molten-gold-ring',
      name: 'The Molten Oval Solitaire Ring (18K Yellow Gold)',
      slug: 'the-oval-solitaire-ring',
      tagline: '18K Molten Yellow Gold • Oval Cut with Side Accent Diamonds',
      price: ringPrice,
      originalPrice: originalPrice,
      category: 'rings',
      style: 'statement',
      moods: ['everyday', 'date-night', 'festive'],
      collection: '3D Studio Bespoke',
      description: 'Signature oval-cut solitaire ring with side accent diamonds cast in radiant 18K molten yellow gold.',
      craftDetails: [
        'Oval cut brilliant diamond setting with 4 micro-prongs',
        'Side accent stones along the band for maximum light refraction',
        '18K heavy molten micron vacuum gold plating',
        'Includes signature luxury DIVA gift box'
      ],
      materials: {
        finish: '18K Molten Yellow Gold',
        base: '316L Surgical Titanium & Jewelers Brass',
        stones: '5A Flawless Diamond Cut (1.8ct Eq)',
        features: ['100% Anti-Tarnish', 'Hypoallergenic', 'Water-Safe']
      },
      dimensions: 'Band Width: 2.8mm | Stone: 1.8ct Eq | Weight: 4.6g',
      careInstructions: ['Wipe clean with a microfiber jewelry cloth.'],
      images: [
        '/images/products/ring-1.jpg',
        '/images/products/ring-1-detail.jpg',
        '/images/products/ring-1-macro.jpg'
      ],
      availability: 'in-stock',
      rating: 5.0,
      reviewCount: 42,
      featured: true,
      newArrival: true,
      trending: true,
      bestSeller: true,
      editorialQuote: 'The quintessential oval solitaire. Flawless fire and timeless elegance.',
      relatedSlugs: ['chunky-hammered-dome-bangle-stack', 'sculptural-gold-vortex-spirals', 'entwined-open-heart-snake-chain'],
      completeTheLook: ['chunky-hammered-dome-bangle-stack', 'sculptural-gold-vortex-spirals']
    };

    addToCart(customProduct, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0A0908] text-[#FAF7F2] overflow-hidden flex items-center border-b border-[#221F1C]">
      {/* Cinematic Ambient Radial Backdrop Behind 3D Ring */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[750px] h-[750px] bg-radial from-[#D4A257]/18 via-[#CFA052]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* FULL SCREEN LANDSCAPE SPLIT */}
      <div className="w-full h-full flex flex-col-reverse lg:flex-row items-center justify-between z-10">
        
        {/* ======================================================== */}
        {/* LEFT SIDE: DESIGNER LUXURY HEADLINE & 2 PREMIUM CTAS     */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[44%] xl:w-[40%] px-6 sm:px-12 lg:pl-16 xl:pl-20 py-12 lg:py-20 flex flex-col justify-center space-y-7">
          
          {/* Minimal Designer Label */}
          <div className="inline-flex items-center space-x-2">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4A257] bg-[#D4A257]/10 px-3.5 py-1 rounded-full border border-[#D4A257]/20">
              SIGNATURE ATELIER DROP
            </span>
            <span className="text-[10px] text-[#A8A199] tracking-[0.2em] uppercase font-medium">
              18K WESTERN GOLD
            </span>
          </div>

          {/* Designer Heading & Subheading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#FAF7F2] tracking-tight leading-[1.08]">
              The Molten Oval <br />
              <span className="italic font-light text-[#D4A257]">Solitaire.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A8A199] font-light leading-relaxed max-w-md">
              Fluid 18K yellow gold contours meeting a brilliant-cut oval stone with side diamond accents. Handcrafted for modern western elegance.
            </p>
          </div>

          {/* TWO PREMIUM LUXURY BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-3 max-w-md">
            {/* 1. SHOP NOW BUTTON */}
            <button
              type="button"
              onClick={handleShopNow}
              disabled={isAdded}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4A257] text-[#0A0908] text-xs font-semibold tracking-editorial uppercase rounded-full hover:bg-[#FAF7F2] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#D4A257]/20 cursor-pointer flex-1"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAdded ? 'ADDED TO BAG ✓' : 'SHOP NOW'}</span>
            </button>

            {/* 2. EXPLORE ATELIER BUTTON */}
            <Link
              href="/collections/pendants"
              className="w-full sm:w-auto px-8 py-4 border border-[#332E29] text-[#FAF7F2] text-xs font-semibold tracking-editorial uppercase rounded-full hover:border-[#D4A257] hover:text-[#D4A257] transition-colors flex items-center justify-center space-x-2 flex-1 text-center"
            >
              <span>EXPLORE ATELIER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT SIDE: PURE UNOBSTRUCTED 3D 360° RING CANVAS        */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[56%] xl:w-[60%] h-[480px] sm:h-[600px] lg:h-[90vh] relative flex items-center justify-center">
          
          {/* Three.js Canvas Element */}
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          />

          {/* Loading Indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0A0908]/40 backdrop-blur-xs flex items-center justify-center pointer-events-none z-30"
              >
                <div className="flex items-center space-x-2 text-[10px] font-semibold tracking-wider uppercase text-[#C5A880] bg-[#141210] px-4 py-2 rounded-full border border-[#2E2823] shadow-md">
                  <RefreshCw className="w-3 h-3 text-[#C5A880] animate-spin" />
                  <span>LOADING 3D RING...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle Bottom Drag Hint */}
          <div className="absolute bottom-6 right-8 z-20 pointer-events-none hidden sm:flex items-center space-x-1.5 text-[10px] text-[#807972] tracking-widest uppercase">
            <span>DRAG TO ROTATE 360°</span>
          </div>
        </div>

      </div>
    </section>
  );
}
