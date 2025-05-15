/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
  var menuBtn = document.getElementById("myNavMenu");

  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " active";
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  } else {
    menuBtn.className = "nav-menu";
    document.body.style.overflow = ""; // Re-enable scrolling when menu is closed
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
    navHeader.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
    navHeader.style.backgroundColor = "var(--card-bg-color)";
    navHeader.style.backdropFilter = "blur(10px)";
    navHeader.classList.add('scrolled');
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = window.innerWidth <= 768 ? "70px" : "90px";
    navHeader.style.lineHeight = window.innerWidth <= 768 ? "70px" : "90px";
    navHeader.style.backgroundColor = "var(--body-color)";
    navHeader.style.backdropFilter = "none";
    navHeader.classList.remove('scrolled');
  }
}

/* ----- DARK MODE TOGGLE ----- */
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Apply the saved theme on page load
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleIcon.classList.replace('uil-moon', 'uil-sun');
  }
  
  // Smooth transition for theme changes
  document.documentElement.style.setProperty('--transition-speed', '0.3s ease');
  
  // Add animation class to the theme toggle icon
  themeToggleIcon.classList.add('theme-icon-animated');
  
  // Toggle theme when the button is clicked
  themeToggle.addEventListener('click', function() {
    // Add click animation
    themeToggle.classList.add('theme-toggle-clicked');
    setTimeout(() => {
      themeToggle.classList.remove('theme-toggle-clicked');
    }, 500);
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update the theme attribute with animation
    document.documentElement.classList.add('theme-transition');
    document.documentElement.setAttribute('data-theme', newTheme);
    
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update the icon with animation
    themeToggleIcon.classList.add('rotate-icon');
    
    setTimeout(() => {
      if (newTheme === 'dark') {
        themeToggleIcon.classList.replace('uil-moon', 'uil-sun');
      } else {
        themeToggleIcon.classList.replace('uil-sun', 'uil-moon');
      }
      
      setTimeout(() => {
        themeToggleIcon.classList.remove('rotate-icon');
      }, 200);
    }, 150);
  });
  
  // Initialize portfolio image sliders
  initializePortfolioSliders();
});

/* ----- CLOSE MOBILE MENU WHEN LINK IS CLICKED ----- */
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menuBtn = document.getElementById("myNavMenu");
      if (menuBtn.classList.contains('active')) {
        myMenuFunction();
      }
    });
  });
  
  // Make sure the menu is properly sized on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.body.style.overflow = "";
      if (document.querySelector('.menu-overlay')) {
        document.querySelector('.menu-overlay').remove();
      }
    }
  });
});

/* ----- PARALLAX EFFECT FOR AVATAR ----- */
document.addEventListener('DOMContentLoaded', function() {
  const avatar = document.querySelector('.featured-image .image');
  
  if (avatar) {
    document.addEventListener('mousemove', function(e) {
      // Only apply effect on larger screens
      if (window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Calculate rotation and movement based on mouse position
        const rotateY = mouseX * 10; // Degrees of rotation
        const rotateX = -mouseY * 10; // Negative to make it look natural
        const translateX = mouseX * 15; // Pixels of movement
        const translateY = mouseY * 15;
        
        // Apply the transform with transition for smoother effect
        avatar.style.transition = 'transform 0.1s ease-out';
        avatar.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
    
    // Reset position when mouse leaves window
    document.addEventListener('mouseleave', function() {
      avatar.style.transition = 'transform 0.5s ease-out';
      avatar.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
    });
  }
});

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText",{
  strings : [
    "Software Engineering Student", 
    "Full Stack Developer", 
    "Mobile Developer", 
    "Web Developer"
  ],
  loop : true,
  typeSpeed : 100, 
  backSpeed : 80,
  backDelay : 2000
})

/* ----- SCROLL REVEAL ANIMATION ----- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true     
})

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})

/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})
srLeft.reveal('.timeline-item:nth-child(odd)',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})
srRight.reveal('.timeline-item:nth-child(even)',{delay: 100})

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50,
          sectionId = current.getAttribute('id')
    
    try {
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
      } else {
        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
      }
    } catch (error) {
      // Silently handle any errors if section links aren't found
    }
  })
}

window.addEventListener('scroll', scrollActive)

/* ----- PORTFOLIO IMAGE SLIDER ----- */
function initializePortfolioSliders() {
  // Initialize sliders for each project
  document.querySelectorAll('.project-box').forEach((projectBox) => {
    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    const images = projectBox.querySelectorAll('.project-image, .project-imageMobile');
    const prevBtn = projectBox.querySelector('.prev-btn');
    const nextBtn = projectBox.querySelector('.next-btn');
    
    if (!images.length || !prevBtn || !nextBtn) return;
    
    // Function to display a specific image
    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    // Next button handler
    nextBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    });

    // Previous button handler
    prevBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImage(currentImageIndex);
    });

    // Touch events for mobile swipe
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
        // Swipe left - next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous image
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
      }
    }

    // Auto-rotate images every 5 seconds
    let slideInterval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    }, 5000);

    // Pause auto-rotation on hover or touch
    const pauseSlideshow = () => {
      clearInterval(slideInterval);
    };
    
    const resumeSlideshow = () => {
      slideInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
      }, 5000);
    };

    projectBox.addEventListener('mouseenter', pauseSlideshow);
    projectBox.addEventListener('mouseleave', resumeSlideshow);
    projectBox.addEventListener('touchstart', pauseSlideshow, {passive: true});
    projectBox.addEventListener('touchend', resumeSlideshow, {passive: true});

    // Initialize: show first image
    showImage(currentImageIndex);
  });
}
