// script.js

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('py-6');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('py-6');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.style.opacity = '1';
        mobileMenu.style.height = '100vh';
      }, 10);
    } else {
      mobileMenu.style.opacity = '0';
      mobileMenu.style.height = '0';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 500);
    }
  });

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.style.opacity = '0';
      mobileMenu.style.height = '0';
      setTimeout(() => mobileMenu.classList.add('hidden'), 500);
    });
  });

  // --- Intersection Observer for Animations (fade-in-up, scale-in, etc) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up, .fade-in-left, .scale-in').forEach(el => {
    observer.observe(el);
  });

  // --- Scroll-linked Animations (Parallax & Transitions) ---
  const conceptSection = document.getElementById('concept-section');
  const blueprintImg = document.getElementById('chassis-blueprint');
  const renderImg = document.getElementById('base-car-render');

  const technologySection = document.getElementById('technology-section');
  const techImg = document.getElementById('tech-chassis-img');

  const safetySection = document.getElementById('safety-section');
  const safetyBaseCar = document.getElementById('safety-base-car');
  const safetyFoldableCar = document.getElementById('safety-foldable-car');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Concept Section: Fade from blueprint to render
    if (conceptSection) {
      const rect = conceptSection.getBoundingClientRect();
      const progress = 1 - (rect.bottom / (rect.height + windowHeight));
      
      if (progress > 0 && progress < 1) {
        // Map progress 0.2->0.5 to opacity 1->0 for blueprint
        let bpOpacity = 1 - ((progress - 0.2) / 0.3);
        if (bpOpacity > 1) bpOpacity = 1;
        if (bpOpacity < 0) bpOpacity = 0;
        blueprintImg.style.opacity = bpOpacity;

        // Map progress 0.3->0.6 to opacity 0->1 for render
        let rdOpacity = (progress - 0.3) / 0.3;
        if (rdOpacity > 1) rdOpacity = 1;
        if (rdOpacity < 0) rdOpacity = 0;
        renderImg.style.opacity = rdOpacity;
      }
    }

    // Technology Section: Simple parallax zoom
    if (technologySection) {
      const rect = technologySection.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = 1 - (rect.bottom / (rect.height + windowHeight));
        const scale = 0.9 + (progress * 0.2); // 0.9 to 1.1
        techImg.style.transform = `scale(${scale})`;
      }
    }

    // Safety (Adaptability) Section: Base car -> Foldable car
    if (safetySection) {
      const rect = safetySection.getBoundingClientRect();
      const progress = 1 - (rect.bottom / (rect.height + windowHeight));
      
      if (progress > 0 && progress < 1) {
        // Base car fade out (0 -> 0.5)
        let baseOpacity = 1 - (progress / 0.5);
        if (baseOpacity > 1) baseOpacity = 1;
        if (baseOpacity < 0) baseOpacity = 0;
        safetyBaseCar.style.opacity = baseOpacity;

        // Foldable car fade in (0.4 -> 0.6)
        let foldOpacity = (progress - 0.4) / 0.2;
        if (foldOpacity > 1) foldOpacity = 1;
        if (foldOpacity < 0) foldOpacity = 0;
        safetyFoldableCar.style.opacity = foldOpacity;

        // Foldable car scale (0.4 -> 0.8) -> 0.8 to 1.0
        let foldScale = 0.8 + ((progress - 0.4) / 0.4) * 0.2;
        if (foldScale > 1) foldScale = 1;
        if (foldScale < 0.8) foldScale = 0.8;
        safetyFoldableCar.style.transform = `scale(${foldScale})`;
      }
    }
  });

  // --- Fashion Interactive Skins ---
  const skinButtons = document.querySelectorAll('.skin-btn');
  const skinImages = document.querySelectorAll('.skin-img');
  const skinNameDisplay = document.getElementById('active-skin-name');

  skinButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-skin');
      const targetName = btn.getAttribute('data-name');
      
      // Update buttons
      skinButtons.forEach(b => {
        b.classList.remove('border-black', 'scale-110');
        b.classList.add('border-transparent');
      });
      btn.classList.remove('border-transparent');
      btn.classList.add('border-black', 'scale-110');

      // Update images
      skinImages.forEach(img => {
        if (img.id === `img-${targetId}`) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      // Update name
      skinNameDisplay.textContent = targetName;
      
      // Simple re-trigger animation for name
      skinNameDisplay.style.opacity = '0';
      skinNameDisplay.style.transform = 'translateY(10px)';
      setTimeout(() => {
        skinNameDisplay.style.opacity = '1';
        skinNameDisplay.style.transform = 'translateY(0)';
      }, 50);
    });
  });

});
