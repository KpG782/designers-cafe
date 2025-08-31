// Register GSAP plugins
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
} else {
  console.warn('GSAP not loaded');
}

// Loading animation with fallback
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    if (typeof gsap !== 'undefined' && gsap.to) {
      gsap.to("#loader", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          loader.style.display = "none";
          initAnimations();
        },
      });
    } else {
      // Fallback if GSAP isn't loaded
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        initAnimations();
      }, 500);
    }
  } else {
    // If no loader, just init animations
    initAnimations();
  }
}

// Multiple triggers to ensure loading screen disappears
window.addEventListener("load", () => {
  setTimeout(hideLoader, 800); // Small delay for better UX
});

// Fallback in case window.load doesn't fire
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(hideLoader, 2000); // Longer fallback
});

function initAnimations() {
  // Scroll progress indicator
  gsap.to("#scroll-progress", {
    scaleX: 1,
    transformOrigin: "left",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // Navbar animation
  ScrollTrigger.create({
    trigger: "#hero",
    start: "bottom top",
    onToggle: (self) => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        if (self.isActive) {
          navbar.style.backgroundColor = "rgba(248, 244, 240, 0.95)";
          navbar.style.backdropFilter = "blur(20px)";
        } else {
          navbar.style.backgroundColor = "rgba(248, 244, 240, 0.25)";
          navbar.style.backdropFilter = "blur(10px)";
        }
      }
    },
  });

  // Hero section animations
  const heroTl = gsap.timeline();

  heroTl
    .from("#tagline", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" })
    .from(
      "#hero-text-1",
      { opacity: 0, y: 50, duration: 1, ease: "power3.out" },
      "-=0.4"
    )
    .from(
      "#hero-text-2",
      { opacity: 0, y: 50, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .from(
      "#hero-text-3",
      { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .to(
      "#hero-description",
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .to(
      "#hero-buttons",
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .to(
      "#hours-indicator",
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    )
    .to(
      "#scroll-indicator",
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

  // Infinite horizontal scroll for "Brewing"
  const brewing = document.getElementById("hero-text-1");
  if (brewing) {
    gsap.set(brewing, { x: 0 });
    gsap.to(brewing, {
      x: -100, // adjust this value based on your design/width
      duration: 3,
      repeat: -1,
      ease: "linear",
      modifiers: {
        x: gsap.utils.wrap([-100, 0]), // loops between -100 and 0
      },
    });
  }

  // About section animations
  gsap.fromTo(
    ".about-content",
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
      },
    }
  );

  gsap.fromTo(
    ".about-image",
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
      },
    }
  );

  // Animate stats counters
  document.querySelectorAll(".stat-item").forEach((item) => {
    const counter = item.querySelector("[data-count]");
    const target = parseInt(counter.getAttribute("data-count"));

    ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      onEnter: () => {
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            counter.innerText = Math.ceil(counter.innerText);
          },
        });
      },
    });
  });

  // Menu section animations
  gsap.fromTo(
    ".menu-item",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#menu-items",
        start: "top 80%",
      },
    }
  );

  // Gallery animations
  gsap.fromTo(
    ".gallery-item",
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#gallery-grid",
        start: "top 80%",
      },
    }
  );

  // Location section animations
  gsap.fromTo(
    ".location-content",
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#location",
        start: "top 80%",
      },
    }
  );

  gsap.fromTo(
    ".hours-content",
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#location",
        start: "top 80%",
      },
    }
  );

  // Contact section animations
  gsap.fromTo(
    "#contact h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
      },
    }
  );

  gsap.fromTo(
    "#contact p",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
      },
    }
  );

  // Contact form and info animations
  gsap.fromTo(
    ".contact-form",
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
      },
    }
  );

  gsap.fromTo(
    ".contact-info",
    { opacity: 0, x: 30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
      },
    }
  );
}

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
      }
    });
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 100 },
          ease: "power2.inOut",
        });
      }
    });
  });

  // Menu category filtering (basic implementation)
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-btn").forEach((b) => {
        b.classList.remove("active", "bg-pencil", "text-white");
        b.classList.add("glass-morphism", "text-coffee-700");
      });

      btn.classList.remove("glass-morphism", "text-coffee-700");
      btn.classList.add("active", "bg-pencil", "text-white");

      // Here you would implement the actual filtering logic
      console.log("Filter by:", btn.getAttribute("data-category"));
    });
  });

  // Add to cart functionality (placeholder)
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Add animation feedback
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });

      // Here you would implement actual cart functionality
      console.log("Added to cart");
    });
  });

  // CTA button animations
  document.querySelectorAll('[class*="cta-"]').forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Animated underline for navbar links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      gsap.to(this, {
        borderBottom: "3px solid var(--pencil, #D4943A)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
    link.addEventListener("mouseleave", function () {
      gsap.to(this, {
        borderBottom: "3px solid transparent",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Animate logo on page load
  const logoImg = document.querySelector("nav img");
  if (logoImg) {
    gsap.fromTo(
      logoImg,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );
  }

  // Animate menu category buttons on hover
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.08,
        boxShadow: "0 4px 24px 0 var(--coffee-200, #EFCCA5)",
        duration: 0.2,
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        boxShadow: "0 0px 0px 0 transparent",
        duration: 0.2,
      });
    });
  });

  // Animate gallery items on hover
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    img.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Footer animations
  gsap.fromTo(
    ".footer-animate",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "footer",
        start: "top 85%",
      },
    }
  );

  // Barista section animations
  gsap.fromTo(
    "#baristas h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#baristas",
        start: "top 80%",
      },
    }
  );

  gsap.fromTo(
    "#baristas p",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#baristas",
        start: "top 80%",
      },
    }
  );

  gsap.fromTo(
    ".barista-card",
    { opacity: 0, y: 50, scale: 0.8 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#baristas",
        start: "top 80%",
      },
    }
  );

  // Gallery grid animations
  gsap.fromTo(
    ".gallery-item",
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#gallery-grid",
        start: "top 80%",
      },
    }
  );

  // Menu items enhanced animations
  gsap.fromTo(
    ".menu-item",
    { opacity: 0, y: 30, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#menu-items",
        start: "top 80%",
      },
    }
  );
});
