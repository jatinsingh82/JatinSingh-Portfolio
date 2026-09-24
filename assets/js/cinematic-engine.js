/**
 * Jatin Singh — Cinematic Background Engine
 * Handles full-screen background media, mouse parallax, scroll transitions,
 * video observers, and transparent-to-frosted navbar transitions.
 */

class CinematicBackgroundEngine {
  constructor() {
    this.config = window.CINEMATIC_CONFIG || {};
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Mouse state for parallax
    this.mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    // Parallax media elements
    this.mediaElements = [];
    this.videoElements = [];

    // Header element
    this.header = document.querySelector('.site-header');

    this.init();
  }

  init() {
    this.mountBackgrounds();
    this.setupNavbarTransition();

    if (!this.isReducedMotion && !this.isTouch && this.config.parallaxEnabled) {
      this.setupMouseParallax();
    }

    this.setupScrollParallax();
    this.setupVideoObserver();
  }

  // Mount or verify background containers for each section
  mountBackgrounds() {
    const sections = this.config.sections || {};

    Object.keys(sections).forEach((sectionId) => {
      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl) return;

      const data = sections[sectionId];
      let bgContainer = sectionEl.querySelector('.cinematic-bg-container');

      if (!bgContainer) {
        bgContainer = document.createElement('div');
        bgContainer.className = 'cinematic-bg-container';
        bgContainer.setAttribute('aria-hidden', 'true');

        let mediaEl;
        if (data.type === 'video') {
          mediaEl = document.createElement('video');
          mediaEl.className = 'cinematic-media cinematic-video';
          mediaEl.src = data.src;
          mediaEl.poster = data.poster || '';
          mediaEl.autoplay = true;
          mediaEl.loop = true;
          mediaEl.muted = true;
          mediaEl.playsInline = true;
          mediaEl.setAttribute('muted', '');
          mediaEl.setAttribute('playsinline', '');
          this.videoElements.push(mediaEl);
        } else {
          mediaEl = document.createElement('img');
          mediaEl.className = 'cinematic-media cinematic-img';
          mediaEl.src = data.src;
          mediaEl.alt = data.alt || '';
          mediaEl.loading = sectionId === 'hero' ? 'eager' : 'lazy';
          mediaEl.setAttribute('referrerpolicy', 'no-referrer');
        }

        const overlay = document.createElement('div');
        overlay.className = 'cinematic-overlay';
        if (data.overlayGradient) {
          overlay.style.background = data.overlayGradient;
        }

        bgContainer.appendChild(mediaEl);
        bgContainer.appendChild(overlay);

        // Prepend inside section so it rests behind content
        sectionEl.insertBefore(bgContainer, sectionEl.firstChild);
        this.mediaElements.push({ element: mediaEl, section: sectionEl });
      } else {
        const existingMedia = bgContainer.querySelector('.cinematic-media');
        if (existingMedia) {
          this.mediaElements.push({ element: existingMedia, section: sectionEl });
        }
      }
    });
  }

  // Mouse Parallax with smooth lerp
  setupMouseParallax() {
    window.addEventListener('mousemove', (e) => {
      // Normalized coordinates (-0.5 to 0.5)
      this.mouse.targetX = (e.clientX / window.innerWidth) - 0.5;
      this.mouse.targetY = (e.clientY / window.innerHeight) - 0.5;
    }, { passive: true });

    const strength = this.config.parallaxStrength || 16;

    const renderParallax = () => {
      if (this.isReducedMotion) return;

      // Smooth easing
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      const moveX = -this.mouse.x * strength;
      const moveY = -this.mouse.y * strength;

      this.mediaElements.forEach(({ element, section }) => {
        const rect = section.getBoundingClientRect();
        // Only apply if section is visible in viewport
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.06)`;
        }
      });

      requestAnimationFrame(renderParallax);
    };

    requestAnimationFrame(renderParallax);
  }

  // Subtle scroll depth parallax
  setupScrollParallax() {
    if (this.isReducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const factor = this.config.scrollParallaxFactor || 0.1;

          this.mediaElements.forEach(({ element, section }) => {
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
              const offset = (window.innerHeight - rect.top) * factor;
              // Add vertical scroll parallax
              element.dataset.scrollOffset = offset;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Transparent-to-frosted Navbar Transition
  setupNavbarTransition() {
    if (!this.header) return;

    const updateHeader = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
        this.header.classList.add('scrolled');
        this.header.classList.remove('transparent-header');
      } else {
        this.header.classList.remove('scrolled');
        this.header.classList.add('transparent-header');
      }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // IntersectionObserver for video play/pause
  setupVideoObserver() {
    if (this.videoElements.length === 0 || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.15 });

    this.videoElements.forEach((video) => observer.observe(video));
  }
}

// Instantiate once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.cinematicEngine = new CinematicBackgroundEngine();
});
