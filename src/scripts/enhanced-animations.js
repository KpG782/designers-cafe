// Enhanced GSAP animations with diverse effects for each section
function initEnhancedAnimations() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not available, skipping enhanced animations');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  console.log('🎬 Initializing enhanced animations...');
  // 🎬 HERO SECTION - Dramatic entrance with sequence
  const heroTl = gsap.timeline();
  heroTl
    .from("#tagline", { 
      opacity: 0, 
      y: -30, 
      duration: 0.8, 
      ease: "bounce.out" 
    })
    .from("#hero-text-1", { 
      opacity: 0, 
      x: -100, 
      rotation: -5, 
      duration: 1.2, 
      ease: "back.out(1.7)" 
    }, "-=0.4")
    .from("#hero-text-2", { 
      opacity: 0, 
      scale: 0.5, 
      rotation: 10, 
      duration: 1, 
      ease: "elastic.out(1, 0.8)" 
    }, "-=0.6")
    .from("#hero-text-3", { 
      opacity: 0, 
      y: 50, 
      duration: 0.8, 
      ease: "power3.out" 
    }, "-=0.4")
    .from("#hero-description", { 
      opacity: 0, 
      y: 30, 
      duration: 0.8, 
      ease: "power2.out" 
    }, "-=0.4")
    .from("#hero-buttons", { 
      opacity: 0, 
      y: 40, 
      scale: 0.8, 
      duration: 0.8, 
      ease: "back.out(1.4)" 
    }, "-=0.4")
    .from("#hours-indicator", { 
      opacity: 0, 
      rotation: 360, 
      scale: 0, 
      duration: 0.8, 
      ease: "back.out(2)" 
    }, "-=0.2")
    .from("#scroll-indicator", { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: "power2.out" 
    }, "-=0.2");

  // 📖 ABOUT SECTION - Split reveal with counter animation
  gsap.fromTo(".about-content", 
    { 
      opacity: 0, 
      x: -80, 
      rotationY: -45 
    },
    {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        end: "center center",
        scrub: false
      }
    }
  );

  gsap.fromTo(".about-image", 
    { 
      opacity: 0, 
      x: 80, 
      scale: 0.8,
      rotation: 5
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.8)",
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        end: "center center",
        scrub: false
      }
    }
  );

  // Stats counter with bounce effect
  document.querySelectorAll(".stat-item").forEach((item, i) => {
    const counter = item.querySelector("[data-count]");
    if (counter) {
      const target = parseInt(counter.getAttribute("data-count"));
      
      gsap.fromTo(item,
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.5 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
            onEnter: () => {
              gsap.to(counter, {
                innerText: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: function () {
                  counter.innerText = Math.ceil(counter.innerText);
                }
              });
            }
          }
        }
      );
    }
  });

  // 🍽️ MENU SECTION - Category tabs with elastic bounce
  gsap.fromTo("#menu h2",
    { 
      opacity: 0, 
      y: -40, 
      scale: 0.8 
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.7)",
      scrollTrigger: {
        trigger: "#menu",
        start: "top 80%"
      }
    }
  );

  gsap.fromTo(".category-btn",
    { 
      opacity: 0, 
      y: -30, 
      scale: 0.7, 
      rotation: -10 
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#menu-categories",
        start: "top 85%"
      }
    }
  );

  // Menu items with wave effect
  gsap.fromTo(".menu-item",
    { 
      opacity: 0, 
      y: 60, 
      scale: 0.6, 
      rotationX: -30 
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: {
        amount: 1.2,
        grid: "auto",
        from: "center"
      },
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: "#menu-items",
        start: "top 80%"
      }
    }
  );

  // 🖼️ GALLERY SECTION - Masonry pop-up effect
  gsap.fromTo("#gallery h2",
    { 
      opacity: 0, 
      scale: 0.5, 
      rotation: -180 
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: "#gallery",
        start: "top 80%"
      }
    }
  );

  gsap.fromTo(".gallery-item",
    { 
      opacity: 0, 
      scale: 0, 
      rotation: 45,
      transformOrigin: "center"
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      stagger: {
        amount: 1.5,
        from: "random"
      },
      ease: "elastic.out(1.2, 0.8)",
      scrollTrigger: {
        trigger: "#gallery-grid",
        start: "top 75%"
      }
    }
  );

  // 👨‍🍳 BARISTA SECTION - Card flip and stagger
  gsap.fromTo("#baristas h2",
    { 
      opacity: 0, 
      y: -50, 
      skewX: -15 
    },
    {
      opacity: 1,
      y: 0,
      skewX: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#baristas",
        start: "top 80%"
      }
    }
  );

  gsap.fromTo(".barista-card",
    { 
      opacity: 0, 
      rotationY: -90, 
      scale: 0.7,
      z: -200
    },
    {
      opacity: 1,
      rotationY: 0,
      scale: 1,
      z: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#baristas",
        start: "top 70%"
      }
    }
  );

  // Barista quote with typewriter effect
  const quoteText = document.querySelector("#baristas blockquote");
  if (quoteText) {
    const text = quoteText.textContent;
    quoteText.textContent = "";
    
    ScrollTrigger.create({
      trigger: "#baristas",
      start: "center 60%",
      onEnter: () => {
        gsap.to(quoteText, {
          duration: 2,
          text: text,
          ease: "none"
        });
      }
    });
  }

  // 📍 LOCATION SECTION - Slide and reveal
  gsap.fromTo("#location h2",
    { 
      opacity: 0, 
      x: -100, 
      skewY: 5 
    },
    {
      opacity: 1,
      x: 0,
      skewY: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#location",
        start: "top 80%"
      }
    }
  );

  gsap.fromTo(".location-content",
    { 
      opacity: 0, 
      x: -120, 
      rotationZ: -5 
    },
    {
      opacity: 1,
      x: 0,
      rotationZ: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#location",
        start: "top 75%"
      }
    }
  );

  gsap.fromTo(".hours-content",
    { 
      opacity: 0, 
      x: 120, 
      rotationZ: 5 
    },
    {
      opacity: 1,
      x: 0,
      rotationZ: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#location",
        start: "top 75%"
      }
    }
  );

  // 📞 CONTACT SECTION - Form fields cascade
  gsap.fromTo("#contact h2",
    { 
      opacity: 0, 
      scale: 0.8, 
      y: -30 
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%"
      }
    }
  );

  gsap.fromTo(".contact-form",
    { 
      opacity: 0, 
      x: -80, 
      rotationX: -15 
    },
    {
      opacity: 1,
      x: 0,
      rotationX: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%"
      }
    }
  );

  gsap.fromTo(".contact-info",
    { 
      opacity: 0, 
      x: 80, 
      rotationX: 15 
    },
    {
      opacity: 1,
      x: 0,
      rotationX: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%"
      }
    }
  );

  // Form inputs with stagger
  gsap.fromTo("#contact input, #contact select, #contact textarea, #contact button",
    { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%"
      }
    }
  );

  // Buy Me Coffee section with special attention
  gsap.fromTo(".bounce-container",
    { 
      opacity: 0, 
      scale: 0.3, 
      rotation: 180,
      filter: "blur(10px)"
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "elastic.out(1.2, 0.7)",
      scrollTrigger: {
        trigger: ".bounce-container",
        start: "top 85%"
      }
    }
  );

  // 🦶 FOOTER SECTION - Wave cascade effect
  gsap.fromTo("footer h4, footer .text-lg",
    { 
      opacity: 0, 
      y: 30, 
      scale: 0.9 
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "footer",
        start: "top 85%"
      }
    }
  );

  gsap.fromTo(".footer-animate",
    { 
      opacity: 0, 
      y: 40, 
      rotationX: -20 
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: "footer",
        start: "top 80%"
      }
    }
  );

  // ✨ SPECIAL EFFECTS

  // Parallax background elements
  gsap.to(".animate-float", {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.5
  });

  // Scroll-triggered reveal animations
  gsap.utils.toArray("section").forEach((section, i) => {
    gsap.fromTo(section, {
      clipPath: "inset(100% 0 0 0)"
    }, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "top 20%",
        scrub: false
      }
    });
  });

  // Dynamic scroll progress indicator
  gsap.to("#scroll-progress", {
    scaleX: 1,
    transformOrigin: "left",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  // Add micro-interactions for buttons and cards
  gsap.utils.toArray("button, .menu-item, .gallery-item, .barista-card").forEach(element => {
    element.addEventListener("mouseenter", () => {
      gsap.to(element, { 
        scale: 1.05, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
    
    element.addEventListener("mouseleave", () => {
      gsap.to(element, { 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    });
  });

  console.log("🎬 Enhanced animations loaded successfully!");
}

// Initialize enhanced animations after GSAP is loaded
function waitForGSAP() {
  if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    initEnhancedAnimations();
  } else {
    setTimeout(waitForGSAP, 100);
  }
}

// Start checking for GSAP after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(waitForGSAP, 500);
  });
} else {
  setTimeout(waitForGSAP, 500);
}