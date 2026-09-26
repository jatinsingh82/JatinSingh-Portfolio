/**
 * Jatin Singh — Premium Interactive 3D Background Engine
 * Sophisticated 3D Particle/Network Sphere & Multi-Layer Digital Topology
 * Built with Three.js (Hardware-accelerated WebGL)
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

    // State & Configuration
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth <= 768;
    this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Particle count budgets based on device tier
    this.config = {
      sphereRadius: this.isMobile ? 120 : 155,
      sphereNodesCount: this.isMobile ? 190 : (this.isTablet ? 320 : 480),
      maxConnections: this.isMobile ? 90 : (this.isTablet ? 180 : 340),
      connectionDistance: this.isMobile ? 38 : 46,
      dustParticlesCount: this.isMobile ? 80 : 220,
      orbitNodesCount: this.isMobile ? 20 : 50,
      dampingFactor: 0.042,
      baseSpeed: 0.0016
    };

    // Mouse & Pointer Tracking
    this.mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      hasMoved: false
    };

    // Scroll Tracking
    this.scroll = {
      currentY: 0,
      targetY: 0,
      progress: 0
    };

    // Theme Palettes
    this.themes = {
      dark: {
        bg: 0x080a0f,
        nodePrimary: 0x6366f1,    // Refined indigo
        nodeSecondary: 0x06b6d4,  // Cyan highlight
        nodeAccent: 0x10b981,     // Emerald
        nodeWhite: 0xf8fafc,      // Crisp node
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
        dustOpacity: 0.25,
        fogColor: 0xf8fafc
      }
    };

    this.currentThemeName = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    this.palette = this.themes[this.currentThemeName];

    // Bindings
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.animate = this.animate.bind(this);

    // Initialize System
    this.init();
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

    // Start Rendering Loop
    this.clock = new THREE.Clock();
    this.rafId = requestAnimationFrame(this.animate);
  }

  initScene() {
    this.scene = new THREE.Scene();
    // Scene fog creates subtle depth-of-field dissipation
    this.scene.fog = new THREE.Fog(this.palette.fogColor, 180, 750);
  }

  initCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
    this.camera.position.z = 380;
    this.cameraBaseY = 0;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
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
      // Wide volumetric distribution
      const r = 320 + Math.random() * 450;
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

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.dustMaterial = new THREE.PointsMaterial({
      size: 3.5,
      map: this.particleTexture,
      transparent: true,
      opacity: this.palette.dustOpacity,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.dustPoints = new THREE.Points(geo, this.dustMaterial);
    this.scene.add(this.dustPoints);
  }

  // LAYER 2: Core 3D Spherical Network
  buildSphereNetworkLayer() {
    this.sphereGroup = new THREE.Group();
    this.scene.add(this.sphereGroup);

    const count = this.config.sphereNodesCount;
    const radius = this.config.sphereRadius;

    this.spherePositions = new Float32Array(count * 3);
    this.sphereOriginalPositions = new Float32Array(count * 3);
    this.spherePhases = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const primaryCol = new THREE.Color(this.palette.nodePrimary);
    const secondaryCol = new THREE.Color(this.palette.nodeSecondary);
    const whiteCol = new THREE.Color(this.palette.nodeWhite);
    const accentCol = new THREE.Color(this.palette.nodeAccent);

    // Fibonacci sphere distribution for uniform digital sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);

      // Slight radial variation for organic cybersecurity topography
      const r = radius + (Math.sin(i * 1.8) * 6);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      this.spherePositions[i * 3] = x;
      this.spherePositions[i * 3 + 1] = y;
      this.spherePositions[i * 3 + 2] = z;

      this.sphereOriginalPositions[i * 3] = x;
      this.sphereOriginalPositions[i * 3 + 1] = y;
      this.sphereOriginalPositions[i * 3 + 2] = z;

      this.spherePhases[i] = Math.random() * Math.PI * 2;

      // Color variation for cybersecurity digital architecture
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
      size: this.isMobile ? 5.0 : 6.2,
      map: this.particleTexture,
      transparent: true,
      opacity: 0.88,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.spherePoints = new THREE.Points(this.sphereGeometry, this.sphereMaterial);
    this.sphereGroup.add(this.spherePoints);

    // Precalculate Network Connections (Lines) between proximate nodes
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
          this.connections.push({ a: i, b: j, distSq });
          if (this.connections.length >= this.config.maxConnections) break;
        }
      }
      if (this.connections.length >= this.config.maxConnections) break;
    }

    // Build Line Geometry
    const linePositions = new Float32Array(this.connections.length * 6);
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

  // LAYER 3: Satellite Orbit / Digital Perimeter Endpoints
  buildSatelliteOrbitLayer() {
    const count = this.config.orbitNodesCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color(this.palette.nodeSecondary);
    const accent = new THREE.Color(this.palette.nodePrimary);

    this.orbitData = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = this.config.sphereRadius * (1.18 + Math.random() * 0.28);
      const speed = (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1);
      const tilt = (Math.random() - 0.5) * 0.7;

      this.orbitData.push({ angle, radius, speed, tilt });

      const mixed = cyan.clone().lerp(accent, Math.random() * 0.5);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.orbitMaterial = new THREE.PointsMaterial({
      size: 4.8,
      map: this.particleTexture,
      transparent: true,
      opacity: 0.75,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.orbitPoints = new THREE.Points(geo, this.orbitMaterial);
    this.sphereGroup.add(this.orbitPoints);
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onWindowResize, { passive: true });
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('scroll', this.onWindowScroll, { passive: true });

    // Ensure immediate correct scroll calculation
    this.onWindowScroll();
  }

  onPointerMove(e) {
    // Normalized device coordinates (-1 to +1)
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;

    this.mouse.targetX = normX;
    this.mouse.targetY = normY;
    this.mouse.hasMoved = true;
  }

  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    
    this.scroll.targetY = scrollY;
    this.scroll.progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.isMobile = width <= 768;
    this.isTablet = width > 768 && width <= 1024;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  setupThemeObserver() {
    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const newTheme = isLight ? 'light' : 'dark';
      
      if (newTheme !== this.currentThemeName) {
        this.currentThemeName = newTheme;
        this.palette = this.themes[newTheme];
        this.updateThemeColors();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  updateThemeColors() {
    // Smoothly adapt Three.js materials to new active theme
    if (this.scene.fog) {
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

  // Animation Loop with Damped Inertia & Smooth Parallax
  animate() {
    this.rafId = requestAnimationFrame(this.animate);

    // Skip heavy calculations if tab is inactive
    if (document.hidden) return;

    this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Interpolation for Mouse Movement (Inertia & Damping)
    if (!this.isReducedMotion && this.mouse.hasMoved) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * this.config.dampingFactor;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * this.config.dampingFactor;
    } else {
      // Gentle idle harmonic sway if no mouse movement or reduced motion
      const sway = Math.sin(elapsedTime * 0.6) * 0.15;
      this.mouse.x += (sway - this.mouse.x) * 0.02;
      this.mouse.y += (-sway * 0.5 - this.mouse.y) * 0.02;
    }

    // 2. Smooth Interpolation for Scroll
    this.scroll.currentY += (this.scroll.targetY - this.scroll.currentY) * 0.05;

    // 3. Update Sphere Rotation & Position Across Entire Website Scroll
    if (this.sphereGroup) {
      const motionMultiplier = this.isReducedMotion ? 0.25 : 1.0;

      // Base autonomous rotation + subtle mouse influence
      this.sphereGroup.rotation.y += this.config.baseSpeed * motionMultiplier;
      this.sphereGroup.rotation.x = (this.mouse.y * 0.35 * motionMultiplier) + (Math.sin(elapsedTime * 0.3) * 0.06);
      this.sphereGroup.rotation.y += this.mouse.x * 0.008 * motionMultiplier;
      
      // Dynamic vertical & lateral journey as user scrolls through sections
      const scrollRatio = this.scroll.progress;
      this.sphereGroup.position.y = -scrollRatio * 60 + (Math.sin(elapsedTime * 0.8) * 4);
      this.sphereGroup.position.x = Math.sin(scrollRatio * Math.PI) * 26 + (this.mouse.x * 14 * motionMultiplier);
      this.sphereGroup.rotation.z = scrollRatio * 0.45;
    }

    // 4. Subtle Vertex Pulse & Proximity Wave on Sphere Nodes
    if (this.sphereGeometry && !this.isReducedMotion) {
      const posAttr = this.sphereGeometry.attributes.position;
      const count = this.config.sphereNodesCount;

      for (let i = 0; i < count; i++) {
        const ox = this.sphereOriginalPositions[i * 3];
        const oy = this.sphereOriginalPositions[i * 3 + 1];
        const oz = this.sphereOriginalPositions[i * 3 + 2];
        const phase = this.spherePhases[i];

        // Organic micro-fluctuation along radius
        const wave = Math.sin(elapsedTime * 1.5 + phase) * 2.2;
        const normFactor = 1 + (wave / this.config.sphereRadius);

        posAttr.array[i * 3] = ox * normFactor;
        posAttr.array[i * 3 + 1] = oy * normFactor;
        posAttr.array[i * 3 + 2] = oz * normFactor;
      }
      posAttr.needsUpdate = true;

      // Update Lines connecting the dynamic vertices
      if (this.lineGeometry && this.connections.length > 0) {
        const linePosAttr = this.lineGeometry.attributes.position;
        let lineIdx = 0;

        for (let i = 0; i < this.connections.length; i++) {
          const { a, b } = this.connections[i];

          linePosAttr.array[lineIdx++] = posAttr.array[a * 3];
          linePosAttr.array[lineIdx++] = posAttr.array[a * 3 + 1];
          linePosAttr.array[lineIdx++] = posAttr.array[a * 3 + 2];

          linePosAttr.array[lineIdx++] = posAttr.array[b * 3];
          linePosAttr.array[lineIdx++] = posAttr.array[b * 3 + 1];
          linePosAttr.array[lineIdx++] = posAttr.array[b * 3 + 2];
        }
        linePosAttr.needsUpdate = true;
      }
    }

    // 5. Update Orbit Nodes (Satellites)
    if (this.orbitPoints && this.orbitData) {
      const posAttr = this.orbitPoints.geometry.attributes.position;
      const motionMultiplier = this.isReducedMotion ? 0.3 : 1.0;

      for (let i = 0; i < this.orbitData.length; i++) {
        const item = this.orbitData[i];
        item.angle += item.speed * motionMultiplier;

        const x = Math.cos(item.angle) * item.radius;
        const z = Math.sin(item.angle) * item.radius;
        const y = Math.sin(item.angle + item.tilt) * (item.radius * 0.32);

        posAttr.array[i * 3] = x;
        posAttr.array[i * 3 + 1] = y;
        posAttr.array[i * 3 + 2] = z;
      }
      posAttr.needsUpdate = true;
    }

    // 6. Slowly Rotate Ambient Dust Field (Different Parallax Plane)
    if (this.dustPoints) {
      this.dustPoints.rotation.y = elapsedTime * 0.015;
      this.dustPoints.rotation.x = -this.mouse.y * 0.08;
      this.dustPoints.position.y = -this.scroll.progress * 40;
    }

    // 7. Render Scene
    this.renderer.render(this.scene, this.camera);
  }

  // Teardown & Clean Up Resources
  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('scroll', this.onWindowScroll);

    if (this.renderer) {
      this.renderer.dispose();
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
