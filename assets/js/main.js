/* ===== ENHANCED PORTFOLIO JAVASCRIPT ===== */

/* ----- CUSTOM CURSOR EFFECT ----- */
document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Track cursor position
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth follow effect for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .icon, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.background = 'var(--accent-color)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = 'var(--first-color)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
});

/* ----- PAGE LOADER ----- */
window.addEventListener('load', function() {
    // Create loader element
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.prepend(loader);
    
    // Hide loader after page loads
    setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});

/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
  var menuBtn = document.getElementById("myNavMenu");

  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " active";
    document.body.style.overflow = "hidden";
  } else {
    menuBtn.className = "nav-menu";
    document.body.style.overflow = "";
  }
  
  // Add overlay when menu is active
  if(document.querySelector('.menu-overlay')) {
    document.querySelector('.menu-overlay').remove();
  } else {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.addEventListener('click', () => {
      myMenuFunction();
    });
    document.body.appendChild(overlay);
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() {headerShadow()};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
  }
}

/* ----- ENHANCED DARK MODE TOGGLE ----- */
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  
  if (!themeToggle || !themeToggleIcon) return;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply saved theme
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleIcon.classList.replace('uil-moon', 'uil-sun');
  }
  
  // Toggle theme
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate icon change
    themeToggleIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      if (newTheme === 'dark') {
        themeToggleIcon.classList.replace('uil-moon', 'uil-sun');
      } else {
        themeToggleIcon.classList.replace('uil-sun', 'uil-moon');
      }
      themeToggleIcon.style.transform = 'rotate(0deg)';
    }, 200);
  });
});

/* ----- CLOSE MOBILE MENU WHEN LINK IS CLICKED ----- */
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menuBtn = document.getElementById("myNavMenu");
      if (menuBtn && menuBtn.classList.contains('active')) {
        myMenuFunction();
      }
    });
  });
  
  // Adjust menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.body.style.overflow = "";
      if (document.querySelector('.menu-overlay')) {
        document.querySelector('.menu-overlay').remove();
      }
      const menuBtn = document.getElementById("myNavMenu");
      if (menuBtn) menuBtn.className = "nav-menu";
    }
  });
});

/* ----- ENHANCED PARALLAX EFFECT ----- */
document.addEventListener('DOMContentLoaded', function() {
  const avatar = document.querySelector('.featured-image .image');
  const featuredBox = document.querySelector('.featured-box');
  
  if (avatar && window.innerWidth > 768) {
    let ticking = false;
    
    document.addEventListener('mousemove', function(e) {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
          
          const rotateY = mouseX * 15;
          const rotateX = -mouseY * 15;
          const translateX = mouseX * 20;
          const translateY = mouseY * 20;
          
          avatar.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          
          ticking = false;
        });
        ticking = true;
      }
    });
    
    document.addEventListener('mouseleave', function() {
      avatar.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      avatar.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
      setTimeout(() => {
        avatar.style.transition = '';
      }, 800);
    });
  }
  
  // Parallax scroll effect for sections
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }
  });
});

/* ----- SECTION VISIBILITY ANIMATION ----- */
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

/* ----- ENHANCED TYPING EFFECT ----- */
document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.querySelector(".typedText");
    
    if (typedTextElement && typeof Typed !== 'undefined') {
        var typingEffect = new Typed(".typedText", {
            strings: [
                "Software Engineering Student", 
                "Full Stack Developer", 
                "Mobile Developer", 
                "Web Developer"
                
            ],
            loop: true,
            typeSpeed: 80, 
            backSpeed: 60,
            backDelay: 2000,
            startDelay: 500,
            smartBackspace: true,
            shuffle: false,
            fadeOut: false,
            cursorChar: '|'
        });
    }
});

/* ----- SCROLL REVEAL ANIMATION ----- */
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1200,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });

    // Home Section
    sr.reveal('.featured-text-card', { delay: 100, origin: 'left' });
    sr.reveal('.featured-name', { delay: 200, origin: 'left' });
    sr.reveal('.featured-text-info', { delay: 300, origin: 'left' });
    sr.reveal('.featured-text-btn', { delay: 400, origin: 'left' });
    sr.reveal('.social_icons', { delay: 500, origin: 'left' });
    sr.reveal('.featured-image', { delay: 300, origin: 'right' });

    // Project Boxes
    sr.reveal('.project-box', { 
        interval: 150,
        distance: '80px',
        scale: 0.9
    });

    // Section Headers
    sr.reveal('.top-header', { 
        distance: '40px',
        origin: 'top'
    });

    // About & Contact
    sr.reveal('.about-info', { delay: 100, origin: 'left' });
    sr.reveal('.contact-info', { delay: 100, origin: 'left' });
    sr.reveal('.skills-box', { 
        interval: 100,
        distance: '60px',
        scale: 0.95
    });
    
    // Timeline items
    sr.reveal('.timeline-item:nth-child(odd)', { 
        delay: 100, 
        origin: 'left',
        distance: '100px'
    });
    sr.reveal('.timeline-item:nth-child(even)', { 
        delay: 100, 
        origin: 'right',
        distance: '100px'
    });
}



/* ----- CHANGE ACTIVE LINK ON SCROLL ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    
    try {
      const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
      if (navLink) {
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
          navLink.classList.add('active-link');
        } else {
          navLink.classList.remove('active-link');
        }
      }
    } catch (error) {
      // Silently handle errors
    }
  });
}

window.addEventListener('scroll', scrollActive);

/* ----- ENHANCED PORTFOLIO IMAGE SLIDER ----- */
function initializePortfolioSliders() {
  document.querySelectorAll('.project-box').forEach((projectBox) => {
    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let slideInterval;
    
    const images = projectBox.querySelectorAll('.project-image, .project-imageMobile');
    const prevBtn = projectBox.querySelector('.prev-btn');
    const nextBtn = projectBox.querySelector('.next-btn');
    
    if (!images.length || !prevBtn || !nextBtn) return;
    
    // Show specific image
    function showImage(index, direction = 'next') {
      const currentImg = projectBox.querySelector('.project-image.active, .project-imageMobile.active');
      const nextImg = images[index];
      
      if (currentImg !== nextImg) {
        currentImg.style.animation = direction === 'next' ? 
          'slideOutLeft 0.4s ease-out' : 'slideOutRight 0.4s ease-out';
        
        setTimeout(() => {
          currentImg.classList.remove('active');
          nextImg.classList.add('active');
          nextImg.style.animation = direction === 'next' ? 
            'slideInRight 0.4s ease-out' : 'slideInLeft 0.4s ease-out';
        }, 200);
      }
    }

    // Navigation buttons
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex, 'next');
      resetAutoSlide();
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImage(currentImageIndex, 'prev');
      resetAutoSlide();
    });

    // Touch swipe support
    projectBox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    projectBox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex, 'next');
        resetAutoSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex, 'prev');
        resetAutoSlide();
      }
    }

    // Auto-slide functionality
    function startAutoSlide() {
      slideInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex, 'next');
      }, 4000);
    }
    
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }
    
    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Pause on hover/touch
    projectBox.addEventListener('mouseenter', stopAutoSlide);
    projectBox.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    showImage(0);
    startAutoSlide();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (projectBox.matches(':hover')) {
        if (e.key === 'ArrowRight') {
          nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
          prevBtn.click();
        }
      }
    });
  });
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', initializePortfolioSliders);

/* ----- READ MORE FUNCTIONALITY FOR PROJECT DESCRIPTIONS ----- */
document.addEventListener('DOMContentLoaded', function() {
  const descriptions = document.querySelectorAll('.project-description');
  
  descriptions.forEach(description => {
    const clone = description.cloneNode(true);
    clone.style.cssText = 'max-height: none; visibility: hidden; position: absolute; display: block; -webkit-line-clamp: unset;';
    document.body.appendChild(clone);
    
    const scrollHeight = clone.scrollHeight;
    const lineHeight = parseInt(window.getComputedStyle(description).lineHeight) || 20;
    const threeLineHeight = lineHeight * 3;
    
    document.body.removeChild(clone);
    
    if (scrollHeight > threeLineHeight) {
      description.classList.add('collapsed');
      
      const readMoreBtn = document.createElement('span');
      readMoreBtn.className = 'read-more-btn';
      readMoreBtn.innerHTML = 'Lire plus <i class="uil uil-angle-down"></i>';
      description.after(readMoreBtn);
      
      readMoreBtn.addEventListener('click', function() {
        if (description.classList.contains('collapsed')) {
          description.classList.remove('collapsed');
          readMoreBtn.classList.add('expanded');
          readMoreBtn.innerHTML = 'Lire moins <i class="uil uil-angle-up"></i>';
        } else {
          description.classList.add('collapsed');
          readMoreBtn.classList.remove('expanded');
          readMoreBtn.innerHTML = 'Lire plus <i class="uil uil-angle-down"></i>';
        }
      });
    }
  });
});

/* ----- SMOOTH SCROLL FOR NAVIGATION LINKS ----- */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

/* ----- FORM VALIDATION & ENHANCEMENT ----- */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            });
        });
    }
});

/* ----- ADD CSS ANIMATIONS FOR SLIDER ----- */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

/* ----- PERFORMANCE OPTIMIZATION ----- */
// Debounce function for scroll/resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(function() {
    scrollActive();
}, 10));

/* ===== LANGUAGE TRANSLATION SYSTEM ===== */
const translations = {
    en: {
        // Navigation
        navHome: "Home",
        navAbout: "About",
        navExperience: "Experience",
        navCertifications: "Certifications",
        navProjects: "Projects",
        navContact: "Contact",
        downloadCV: "Download CV",
        
        // Hero Section
        heroGreeting: "Hi, It's",
        heroRole: "I'm a",
        heroDescription: "A passionate Software Engineering Student specialized in Full Stack & Mobile Development. I create innovative web and mobile applications with modern technologies.",
        heroDownload: "Download CV",
        heroContact: "Contact Me",
        heroPassionate: "Passionate full stack developer with expertise in mobile and web technologies",
        
        // About Section
        aboutTitle: "About Me",
        aboutSubtitle: "My introduction",
        aboutIntro: "I'm a Software Engineering student at ESPRIT, passionate about creating innovative digital solutions. With expertise in Full Stack and Mobile Development, I transform ideas into powerful applications.",
        
        // Skills
        skillsTitle: "Skills & Technologies",
        webDev: "Web Development",
        mobileDev: "Mobile Development",
        devops: "DevOps",
        oop: "Object-Oriented Programming",
        
        // Experience
        expTitle: "Experience",
        expSubtitle: "My professional journey",
        webDevIntern: "Web Developer Intern",
        fullStackDev: "Full Stack Developer Freelance",
        finalYearIntern: "Final Year Project Intern",
        iotDevIntern: "IoT Developer Intern",
        frontEndIntern: "Front-End Developer Intern",
        
        // Certifications
        certTitle: "Certifications",
        certSubtitle: "Professional credentials and achievements",
        viewCredential: "View Credential",
        certificationId: "Certification ID",
        issuedBy: "Issued by",
        issued: "Issued",
        expires: "Expires",
        
        // Projects
        projectsTitle: "Projects",
        projectsSubtitle: "Some of my recent work",
        liveDemo: "Live Demo",
        github: "GitHub",
        seeMore: "See More",
        seeLess: "See Less",
        
        // Contact
        contactTitle: "Get in touch",
        contactSubtitle: "Do you have a project in your mind, contact me here",
        findMe: "Find Me",
        email: "Email",
        phone: "Tel",
        linkedin: "LinkedIn",
        facebook: "Facebook",
        instagram: "Instagram",
        
        // Footer
        footerAbout: "About",
        footerProjects: "Projects",
        footerAchievements: "Achievements",
        footerExperience: "Experience",
        footerContact: "Contact"
    },
    fr: {
        // Navigation
        navHome: "Accueil",
        navAbout: "propos",
        navExperience: "Expérience",
        navCertifications: "Certifications",
        navProjects: "Projets",
        navContact: "Contact",
        downloadCV: "Télécharger CV",
        
        // Hero Section
        heroGreeting: "Bonjour, c'est",
        heroRole: "Je suis",
        heroDescription: "Étudiant en Génie Logiciel passionné, spécialisé en Développement Full Stack & Mobile. Je crée des applications web et mobiles innovantes avec des technologies modernes.",
        heroDownload: "Télécharger CV",
        heroContact: "Me Contacter",
        heroPassionate: "Développeur full stack passionné avec une expertise en technologies mobile et web",
        
        // About Section
        aboutTitle: "À propos de moi",
        aboutSubtitle: "Mon introduction",
        aboutIntro: "Je suis étudiant en Génie Logiciel à l'ESPRIT, passionné par la création de solutions numériques innovantes. Avec une expertise en développement Full Stack et Mobile, je transforme les idées en applications puissantes.",
        
        // Skills
        skillsTitle: "Compétences & Technologies",
        webDev: "Développement Web",
        mobileDev: "Développement Mobile",
        devops: "DevOps",
        oop: "Programmation Orientée Objet",
        
        // Experience
        expTitle: "Expérience",
        expSubtitle: "Mon parcours professionnel",
        webDevIntern: "Stagiaire Développeur Web",
        fullStackDev: "Développeur Full Stack Freelance",
        finalYearIntern: "Stagiaire Projet de Fin d'Études",
        iotDevIntern: "Stagiaire Développeur IoT",
        frontEndIntern: "Stagiaire Développeur Front-End",
        
        // Certifications
        certTitle: "Certifications",
        certSubtitle: "Diplômes professionnels et réalisations",
        viewCredential: "Voir le diplôme",
        certificationId: "ID de certification",
        issuedBy: "Émis par",
        issued: "Émis le",
        expires: "Expire le",
        
        // Projects
        projectsTitle: "Projets",
        projectsSubtitle: "Quelques-uns de mes travaux récents",
        liveDemo: "Démo en direct",
        github: "GitHub",
        seeMore: "Voir plus",
        seeLess: "Voir moins",
        
        // Contact
        contactTitle: "Entrer en contact",
        contactSubtitle: "Vous avez un projet en tête, contactez-moi ici",
        findMe: "Me trouver",
        email: "Email",
        phone: "Tél",
        linkedin: "LinkedIn",
        facebook: "Facebook",
        instagram: "Instagram",
        
        // Footer
        footerAbout: "À propos",
        footerProjects: "Projets",
        footerAchievements: "Réalisations",
        footerExperience: "Expérience",
        footerContact: "Contact"
    }
};

// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Function to switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    switchLanguage(currentLanguage);
});

console.log('🚀 Portfolio Enhanced & Loaded Successfully!');

