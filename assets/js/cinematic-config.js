/**
 * Jatin Singh — Cinematic Background Media Configuration
 * Easily configure or replace section backgrounds (images or videos) here.
 */

window.CINEMATIC_CONFIG = {
  // Global settings
  parallaxEnabled: true,
  parallaxStrength: 18, // Pixels of mouse parallax travel
  scrollParallaxFactor: 0.12,

  // Section-by-section background media configuration
  sections: {
    hero: {
      type: "image", // "image" | "video"
      src: "src/assets/images/hero_cinematic_cyber_1790183652456.jpg",
      poster: "src/assets/images/hero_cinematic_cyber_1790183652456.jpg",
      alt: "Cinematic cybersecurity operations and enterprise digital infrastructure",
      overlayGradient: "linear-gradient(180deg, rgba(6,8,14,0.65) 0%, rgba(6,8,14,0.35) 45%, rgba(6,8,14,0.88) 85%, #080a0f 100%)",
      alignment: "lower-left"
    },
    about: {
      type: "image",
      src: "src/assets/images/datacenter_infra_1790183667384.jpg",
      poster: "src/assets/images/datacenter_infra_1790183667384.jpg",
      alt: "Sovereign enterprise data center and optical digital infrastructure",
      overlayGradient: "linear-gradient(180deg, #080a0f 0%, rgba(8,10,15,0.78) 25%, rgba(8,10,15,0.85) 75%, #080a0f 100%)",
      alignment: "split"
    },
    experience: {
      type: "image",
      src: "src/assets/images/security_strategy_1790183683183.jpg",
      poster: "src/assets/images/security_strategy_1790183683183.jpg",
      alt: "Global cyber strategy topology and threat transformation architecture",
      overlayGradient: "linear-gradient(180deg, #080a0f 0%, rgba(8,10,15,0.82) 30%, rgba(8,10,15,0.88) 70%, #080a0f 100%)",
      alignment: "timeline"
    },
    projects: {
      type: "image",
      src: "src/assets/images/cloud_architecture_1790183695850.jpg",
      poster: "src/assets/images/cloud_architecture_1790183695850.jpg",
      alt: "Enterprise cloud systems and distributed architecture conduits",
      overlayGradient: "linear-gradient(180deg, #080a0f 0%, rgba(8,10,15,0.84) 30%, rgba(8,10,15,0.88) 80%, #080a0f 100%)",
      alignment: "featured-panels"
    },
    contact: {
      type: "image",
      src: "src/assets/images/contact_horizon_1790183707011.jpg",
      poster: "src/assets/images/contact_horizon_1790183707011.jpg",
      alt: "Cinematic minimalist technology horizon and cyber sanctuary",
      overlayGradient: "linear-gradient(180deg, #080a0f 0%, rgba(6,8,14,0.78) 35%, rgba(6,8,14,0.92) 100%)",
      alignment: "split-contact"
    }
  }
};
