/**
 * Jatin Singh — Premium Interactive 3D Background Engine
 * Sophisticated 3D Particle/Network Sphere & Multi-Layer Digital Topology
 * Built with Three.js (Hardware-accelerated WebGL)
 *
 * Performance-Engineered:
 * - Device Capability & Low-Power Tier Detection
 * - Zero-Per-Frame WebGL Buffer SubData Thrashing (Group Transform & Scale Breathing)
 * - Dynamic DPR Capping (Desktop: 1.6, Tablet: 1.25, Mobile: 1.15, Low-Power: 1.0)
 * - Page Visibility Lifecycle (Pause rAF on background tabs)
 * - Throttled Pointer & Resize Observers via requestAnimationFrame
 * - Complete prefers-reduced-motion Support (Static topology rendering, 0 continuous loop)
 * - Comprehensive Resource Disposal & Memory Leak Prevention
 */

import * as THREE from './vendor/three.module.js';

class Interactive3DBackground {
  constructor(options = {}) {
    this.containerId = options.containerId || 'cyber-3d-canvas';
    this.canvas = document.getElementById(this.containerId);
    
    if (!this.canvas) {
      console.warn(`[Interactive3DBackground] Canvas #${this.containerId} not found.`);
      return;
    }

    // 1. Accessibility: prefers-reduced-motion media query
    this.reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = this.reducedMotionMediaQuery.matches;

    // 2. Hardware & Device Capability Profiling
    this.profile = this.detectDeviceProfile();

    // 3. Adaptive Configuration Budgets based on Device Tier
    this.config = this.getTierConfig(this.profile);

    // 4. Mouse & Pointer Tracking with Micro-Inertia
    this.mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      hasMoved: false
    };

    // 5. Scroll State Tracking
    this.scroll = {
      currentY: 0,
      targetY: 0,
      progress: 0
    };

    // 6. Animation Lifecycle Flags
    this.isPaused = false;
    this.isDisposed = false;
    this.pointerTicking = false;
    this.pendingPointerEvent = null;
    this.resizePending = false;
    this.lastFrameTime = 0;

    // 7. Theme Palettes (Coordinated with CSS variables)
    this.themes = {
      dark: {
        bg: 0x080a0f,
        nodePrimary: 0x6366f1,    // Refined cyber indigo
        nodeSecondary: 0x06b6d4,  // Cyan highlight
        nodeAccent: 0x10b981,     // Emerald enclave
        nodeWhite: 0xf8fafc,      // Crisp white beacon
        lineColor: 0x6366f1,      // Line interconnect
        lineOpacity: 0.28,
        dustColor: 0x4f46e5,
        dustOpacity: 0.35,
        fogColor: 0x080a0f
      },
      light: {
        bg: 0xf8fafc,
        nodePrimary: 0x4f46e5,
        nodeSecondary: 0x0284c7,
        nodeAccent: 0x059669,
        nodeWhite: 0x334155,
        lineColor: 0x4f46e5,
        lineOpacity: 0.16,
        dustColor: 0x94a3b8,
        dustOpacity: 0.22,
        fogColor: 0xf8fafc
      }
    };

    this.currentThemeName = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    this.palette = this.themes[this.currentThemeName];

    // Method Bindings
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.onReducedMotionChange = this.onReducedMotionChange.bind(this);
    this.animate = this.animate.bind(this);

    // Initialize System
    this.init();
  }

  /**
   * Evaluates client hardware constraints: concurrency, memory, screen dimensions, data-saver
   */
  detectDeviceProfile() {
    const width = window.innerWidth;
    const isMobile = width <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const isTablet = !isMobile && width <= 1024;
    
    // Concurrency and memory heuristics
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const isDataSaver = navigator.connection?.saveData === true;
    
    // Identify low-power devices
    const isLowPower = isDataSaver || (isMobile && (cores <= 4 || memory <= 3));

    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      isLowPower,
      cores,
      memory
    };
  }

  /**
   * Generates tailored particle/object counts and rendering parameters
   */
  getTierConfig(profile) {
    if (profile.isLowPower) {
      return {
        tier: 'low-power',
        sphereRadius: 110,
        sphereNodesCount: 110,
        maxConnections: 45,
        connectionDistance: 36,
        dustParticlesCount: 35,
        orbitNodesCount: 10,
        maxDpr: 1.0,
        targetFps: 30,
        dampingFactor: 0.05,
        baseSpeed: 0.0008,
        sphereNodeSize: 4.6,
        dustSize: 2.8,
        orbitSize: 3.8
      };
    }

    if (profile.isMobile) {
      return {
        tier: 'mobile',
        sphereRadius: 120,
        sphereNodesCount: 160,
        maxConnections: 75,
        connectionDistance: 38,
        dustParticlesCount: 65,
        orbitNodesCount: 16,
        maxDpr: 1.15,
        targetFps: 60,
        dampingFactor: 0.045,
        baseSpeed: 0.0011,
        sphereNodeSize: 5.0,
        dustSize: 3.0,
        orbitSize: 4.2
      };
    }

    if (profile.isTablet) {
      return {
        tier: 'tablet',
        sphereRadius: 140,
        sphereNodesCount: 260,
        maxConnections: 150,
        connectionDistance: 42,
        dustParticlesCount: 120,
        orbitNodesCount: 26,
        maxDpr: 1.25,
        targetFps: 60,
        dampingFactor: 0.042,
        baseSpeed: 0.0013,
        sphereNodeSize: 5.6,
        dustSize: 3.2,
        orbitSize: 4.6
      };
    }

    // High Performance Desktop
    return {
      tier: 'desktop',
      sphereRadius: 155,
      sphereNodesCount: 400,
      maxConnections: 240,
      connectionDistance: 45,
      dustParticlesCount: 190,
      orbitNodesCount: 40,
      maxDpr: 1.6, // Capping at 1.6 saves ~36% pixel fragment processing over 2.0 with imperceptible visual difference
      targetFps: 60,
      dampingFactor: 0.042,
      baseSpeed: 0.0015,
      sphereNodeSize: 6.2,
      dustSize: 3.5,
      orbitSize: 4.8
    };
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.createTexture();
    this.buildDistantDustLayer();
    this.buildSphereNetworkLayer();
    this.buildSatelliteOrbitLayer();
    this.setupEventListeners();
    this.setupThemeObserver();

    // Start Clock
    this.clock = new THREE.Clock();

    // Reduced motion: Render once as a tranquil static 3D composition without continuous rAF loop
    if (this.isReducedMotion) {
      this.renderStaticFrame();
    } else {
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  initScene() {
    this.scene = new THREE.Scene();
    // Scene fog creates subtle cyber depth-of-field dissipation
    this.scene.fog = new THREE.Fog(this.palette.fogColor, 180, 750);
  }

  initCamera() {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
    this.camera.position.z = 380;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.profile.isLowPower,
      alpha: true,
      powerPreference: this.profile.isLowPower ? 'low-power' : 'high-performance'
    });

    const dpr = Math.min(window.devicePixelRatio || 1, this.config.maxDpr);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.setClearColor(0x000000, 0); // Transparent so CSS background gradients show
  }

  // Generates smooth anti-aliased glowing disc texture procedurally
  createTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    this.particleTexture = new THREE.CanvasTexture(canvas);
  }

  // LAYER 1: Distant Ambient Cyber Dust Field
  buildDistantDustLayer() {
    const count = this.config.dustParticlesCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color(this.palette.dustColor);
    const cyanColor = new THREE.Color(this.palette.nodeSecondary);

    for (let i = 0; i < count; i++) {
      const r = 300 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = baseColor.clone().lerp(cyanColor, Math.random() * 0.4);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    this.dustGeometry = new THREE.BufferGeometry();
    this.dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.dustGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.dustMaterial = new THREE.PointsMaterial({
      size: this.config.dustSize,
      map: this.particleTexture,
      transparent: true,
      opacity: this.palette.dustOpacity,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.dustPoints = new THREE.Points(this.dustGeometry, this.dustMaterial);
    this.scene.add(this.dustPoints);
  }

  // LAYER 2: Core 3D Spherical Network
  buildSphereNetworkLayer() {
    this.sphereGroup = new THREE.Group();
    this.scene.add(this.sphereGroup);

    const count = this.config.sphereNodesCount;
    const radius = this.config.sphereRadius;

    this.spherePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const primaryCol = new THREE.Color(this.palette.nodePrimary);
    const secondaryCol = new THREE.Color(this.palette.nodeSecondary);
    const whiteCol = new THREE.Color(this.palette.nodeWhite);
    const accentCol = new THREE.Color(this.palette.nodeAccent);

    // Uniform Fibonacci sphere distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);

      // Radial variation creates structural digital topology
      const r = radius + (Math.sin(i * 1.8) * 5.5);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      this.spherePositions[i * 3] = x;
      this.spherePositions[i * 3 + 1] = y;
      this.spherePositions[i * 3 + 2] = z;

      let c = primaryCol;
      const rand = Math.random();
      if (rand > 0.85) c = secondaryCol;
      else if (rand > 0.72) c = whiteCol;
      else if (rand > 0.62) c = accentCol;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Sphere Points Mesh
    this.sphereGeometry = new THREE.BufferGeometry();
    this.sphereGeometry.setAttribute('position', new THREE.BufferAttribute(this.spherePositions, 3));
    this.sphereGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.sphereMaterial = new THREE.PointsMaterial({
      size: this.config.sphereNodeSize,
      map: this.particleTexture,
      transparent: true,
      opacity: 0.88,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.spherePoints = new THREE.Points(this.sphereGeometry, this.sphereMaterial);
    this.sphereGroup.add(this.spherePoints);

    // Precalculate Stable Network Interconnects (Avoids CPU per-frame allocation)
    this.connections = [];
    const distSqThreshold = this.config.connectionDistance * this.config.connectionDistance;

    for (let i = 0; i < count; i++) {
      const x1 = this.spherePositions[i * 3];
      const y1 = this.spherePositions[i * 3 + 1];
      const z1 = this.spherePositions[i * 3 + 2];

      for (let j = i + 1; j < count; j++) {
        const x2 = this.spherePositions[j * 3];
        const y2 = this.spherePositions[j * 3 + 1];
        const z2 = this.spherePositions[j * 3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < distSqThreshold) {
          this.connections.push({ a: i, b: j });
          if (this.connections.length >= this.config.maxConnections) break;
        }
      }
      if (this.connections.length >= this.config.maxConnections) break;
    }

    // Build Static Connected Line Geometry (Rotates seamlessly with sphereGroup without per-frame vertex re-uploads)
    const linePositions = new Float32Array(this.connections.length * 6);
    let lineIdx = 0;
    for (let i = 0; i < this.connections.length; i++) {
      const { a, b } = this.connections[i];
      linePositions[lineIdx++] = this.spherePositions[a * 3];
      linePositions[lineIdx++] = this.spherePositions[a * 3 + 1];
      linePositions[lineIdx++] = this.spherePositions[a * 3 + 2];
      linePositions[lineIdx++] = this.spherePositions[b * 3];
      linePositions[lineIdx++] = this.spherePositions[b * 3 + 1];
      linePositions[lineIdx++] = this.spherePositions[b * 3 + 2];
    }

    this.lineGeometry = new THREE.BufferGeometry();
    this.lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    this.lineMaterial = new THREE.LineBasicMaterial({
      color: this.palette.lineColor,
      transparent: true,
      opacity: this.palette.lineOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.lines = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);
    this.sphereGroup.add(this.lines);
  }

  // LAYER 3: Satellite Orbit Perimeter Endpoints
  buildSatelliteOrbitLayer() {
    const count = this.config.orbitNodesCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color(this.palette.nodeSecondary);
    const accent = new THREE.Color(this.palette.nodePrimary);

    this.orbitData = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = this.config.sphereRadius * (1.18 + (i % 5) * 0.06);
      const speed = (0.0012 + (i % 3) * 0.0006) * (i % 2 === 0 ? 1 : -1);
      const tilt = ((i % 7) / 7 - 0.5) * 0.7;

      this.orbitData.push({ angle, radius, speed, tilt });

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle + tilt) * (radius * 0.32);
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const mixed = cyan.clone().lerp(accent, (i % 4) * 0.25);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    this.orbitGeometry = new THREE.BufferGeometry();
    this.orbitGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.orbitGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.orbitMaterial = new THREE.PointsMaterial({
      size: this.config.orbitSize,
      map: this.particleTexture,
      transparent: true,
      opacity: 0.75,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.orbitPoints = new THREE.Points(this.orbitGeometry, this.orbitMaterial);
    this.sphereGroup.add(this.orbitPoints);
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onWindowResize, { passive: true });
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange, { passive: true });

    // Listen for OS reduced motion toggle changes live
    if (this.reducedMotionMediaQuery.addEventListener) {
      this.reducedMotionMediaQuery.addEventListener('change', this.onReducedMotionChange);
    } else if (this.reducedMotionMediaQuery.addListener) {
      this.reducedMotionMediaQuery.addListener(this.onReducedMotionChange);
    }

    // Immediate initial scroll alignment
    this.onWindowScroll();
  }

  onReducedMotionChange(e) {
    this.isReducedMotion = e.matches;
    if (this.isReducedMotion) {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.renderStaticFrame();
    } else if (!this.isPaused && !this.rafId) {
      this.clock.start();
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  onVisibilityChange() {
    if (document.hidden) {
      this.isPaused = true;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    } else {
      this.isPaused = false;
      if (!this.isReducedMotion && !this.rafId) {
        this.clock.start();
        this.rafId = requestAnimationFrame(this.animate);
      }
    }
  }

  /**
   * Throttled pointer tracking using requestAnimationFrame to eliminate redundant layout work
   */
  onPointerMove(e) {
    if (this.isReducedMotion) return;

    this.pendingPointerEvent = e;
    if (!this.pointerTicking) {
      this.pointerTicking = true;
      requestAnimationFrame(() => {
        if (this.pendingPointerEvent) {
          const ev = this.pendingPointerEvent;
          this.mouse.targetX = (ev.clientX / window.innerWidth) * 2 - 1;
          this.mouse.targetY = -(ev.clientY / window.innerHeight) * 2 + 1;
          this.mouse.hasMoved = true;
          this.pendingPointerEvent = null;
        }
        this.pointerTicking = false;
      });
    }
  }

  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    
    this.scroll.targetY = scrollY;
    this.scroll.progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // If reduced motion is active, do a single throttled render pass so sphere stays aligned with section scroll
    if (this.isReducedMotion) {
      if (!this.scrollRenderPending) {
        this.scrollRenderPending = true;
        requestAnimationFrame(() => {
          this.renderStaticFrame();
          this.scrollRenderPending = false;
        });
      }
    }
  }

  /**
   * Efficiently handles window resize with debounced requestAnimationFrame
   */
  onWindowResize() {
    if (this.resizePending) return;

    this.resizePending = true;
    requestAnimationFrame(() => {
      if (this.isDisposed) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Re-evaluate profile upon major orientation or viewport shifts
      const newProfile = this.detectDeviceProfile();
      this.profile = newProfile;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      const dpr = Math.min(window.devicePixelRatio || 1, this.config.maxDpr);
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(width, height, false);

      if (this.isReducedMotion) {
        this.renderStaticFrame();
      }

      this.resizePending = false;
    });
  }

  setupThemeObserver() {
    this.themeObserver = new MutationObserver(() => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isLight ? 'light' : 'dark';
      
      if (newTheme !== this.currentThemeName) {
        this.currentThemeName = newTheme;
        this.palette = this.themes[newTheme];
        this.updateThemeColors();
        if (this.isReducedMotion) {
          this.renderStaticFrame();
        }
      }
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  updateThemeColors() {
    if (this.scene && this.scene.fog) {
      this.scene.fog.color.setHex(this.palette.fogColor);
    }
    if (this.lineMaterial) {
      this.lineMaterial.color.setHex(this.palette.lineColor);
      this.lineMaterial.opacity = this.palette.lineOpacity;
    }
    if (this.dustMaterial) {
      this.dustMaterial.opacity = this.palette.dustOpacity;
    }
  }

  /**
   * Renders a single calm, high-precision frame for reduced motion users without continuous CPU consumption
   */
  renderStaticFrame() {
    if (this.isDisposed || !this.renderer || !this.scene || !this.camera) return;

    const scrollRatio = this.scroll.progress;
    if (this.sphereGroup) {
      this.sphereGroup.rotation.y = scrollRatio * 0.8;
      this.sphereGroup.rotation.x = 0.12;
      this.sphereGroup.rotation.z = scrollRatio * 0.25;
      this.sphereGroup.position.y = -scrollRatio * 60;
      this.sphereGroup.position.x = Math.sin(scrollRatio * Math.PI) * 22;
      this.sphereGroup.scale.set(1.0, 1.0, 1.0);
    }

    if (this.dustPoints) {
      this.dustPoints.position.y = -scrollRatio * 40;
    }

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Main High-Performance Animation Loop
   * Uses group scaling and rotation instead of expensive per-frame CPU vertex buffer writes
   */
  animate(currentTime) {
    if (this.isDisposed || this.isReducedMotion || this.isPaused) {
      return;
    }

    this.rafId = requestAnimationFrame(this.animate);

    // Frame rate throttle for low-power devices (30fps target)
    if (this.config.targetFps < 60) {
      const interval = 1000 / this.config.targetFps;
      const delta = currentTime - this.lastFrameTime;
      if (delta < interval) {
        return;
      }
      this.lastFrameTime = currentTime - (delta % interval);
    }

    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Interpolation for Mouse Movement (Inertia & Damping)
    if (this.mouse.hasMoved) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * this.config.dampingFactor;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * this.config.dampingFactor;
    } else {
      // Gentle idle harmonic sway
      const sway = Math.sin(elapsedTime * 0.6) * 0.14;
      this.mouse.x += (sway - this.mouse.x) * 0.02;
      this.mouse.y += (-sway * 0.5 - this.mouse.y) * 0.02;
    }

    // 2. Smooth Interpolation for Scroll
    this.scroll.currentY += (this.scroll.targetY - this.scroll.currentY) * 0.06;

    // 3. Autonomous Sphere Rotation & Spatial Journey across Sections
    if (this.sphereGroup) {
      this.sphereGroup.rotation.y += this.config.baseSpeed;
      this.sphereGroup.rotation.x = (this.mouse.y * 0.32) + (Math.sin(elapsedTime * 0.35) * 0.05);
      this.sphereGroup.rotation.y += this.mouse.x * 0.007;

      const scrollRatio = this.scroll.progress;
      this.sphereGroup.position.y = -scrollRatio * 60 + (Math.sin(elapsedTime * 0.8) * 3.5);
      this.sphereGroup.position.x = Math.sin(scrollRatio * Math.PI) * 26 + (this.mouse.x * 12);
      this.sphereGroup.rotation.z = scrollRatio * 0.42;

      // Organic subtle breathing pulse executed at ZERO buffer upload cost via Group matrix
      const breathe = 1 + Math.sin(elapsedTime * 1.2) * 0.015;
      this.sphereGroup.scale.set(breathe, breathe, breathe);
    }

    // 4. Update Orbit Nodes efficiently
    if (this.orbitPoints && this.orbitData) {
      const posAttr = this.orbitPoints.geometry.attributes.position;
      const count = this.orbitData.length;

      for (let i = 0; i < count; i++) {
        const item = this.orbitData[i];
        item.angle += item.speed;

        posAttr.array[i * 3] = Math.cos(item.angle) * item.radius;
        posAttr.array[i * 3 + 1] = Math.sin(item.angle + item.tilt) * (item.radius * 0.32);
        posAttr.array[i * 3 + 2] = Math.sin(item.angle) * item.radius;
      }
      posAttr.needsUpdate = true;
    }

    // 5. Slowly Rotate Ambient Dust Field on Separate Parallax Plane
    if (this.dustPoints) {
      this.dustPoints.rotation.y = elapsedTime * 0.012;
      this.dustPoints.rotation.x = -this.mouse.y * 0.06;
      this.dustPoints.position.y = -this.scroll.progress * 40;
    }

    // 6. Hardware-Accelerated Render Call
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Complete Resource Disposal & Memory Leak Teardown
   */
  destroy() {
    this.isDisposed = true;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('scroll', this.onWindowScroll);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.reducedMotionMediaQuery) {
      if (this.reducedMotionMediaQuery.removeEventListener) {
        this.reducedMotionMediaQuery.removeEventListener('change', this.onReducedMotionChange);
      } else if (this.reducedMotionMediaQuery.removeListener) {
        this.reducedMotionMediaQuery.removeListener(this.onReducedMotionChange);
      }
    }

    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }

    // Dispose Geometries
    if (this.sphereGeometry) this.sphereGeometry.dispose();
    if (this.lineGeometry) this.lineGeometry.dispose();
    if (this.dustGeometry) this.dustGeometry.dispose();
    if (this.orbitGeometry) this.orbitGeometry.dispose();

    // Dispose Materials
    if (this.sphereMaterial) this.sphereMaterial.dispose();
    if (this.lineMaterial) this.lineMaterial.dispose();
    if (this.dustMaterial) this.dustMaterial.dispose();
    if (this.orbitMaterial) this.orbitMaterial.dispose();

    // Dispose Textures
    if (this.particleTexture) this.particleTexture.dispose();

    // Clear Scene
    if (this.scene) {
      this.scene.clear();
    }

    // Dispose Renderer & Release WebGL Context
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}

// Auto-instantiate when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.cyberBackground = new Interactive3DBackground({
    containerId: 'cyber-3d-canvas'
  });
});

export { Interactive3DBackground };
