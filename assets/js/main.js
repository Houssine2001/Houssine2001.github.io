/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
  var menuBtn = document.getElementById("myNavMenu");

  if(menuBtn.className === "nav-menu"){
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() {headerShadow()};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
    navHeader.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navHeader.style.backdropFilter = "blur(10px)";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
    navHeader.style.backgroundColor = "var(--body-color)";
    navHeader.style.backdropFilter = "none";
  }
}

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

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50,
          sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}

window.addEventListener('scroll', scrollActive)

/* ----- PORTFOLIO IMAGE SLIDER ----- */
document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des sliders d'images pour chaque projet
  document.querySelectorAll('.project-box').forEach((projectBox) => {
    let currentImageIndex = 0;
    const images = projectBox.querySelectorAll('.project-image, .project-imageMobile');
    const prevBtn = projectBox.querySelector('.prev-btn');
    const nextBtn = projectBox.querySelector('.next-btn');
    
    // Fonction pour afficher une image spécifique
    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    // Gestion du bouton suivant
    nextBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    });

    // Gestion du bouton précédent
    prevBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImage(currentImageIndex);
    });

    // Auto-rotation des images toutes les 5 secondes
    let slideInterval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    }, 5000);

    // Arrêter la rotation automatique au survol
    projectBox.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    // Reprendre la rotation automatique quand la souris quitte
    projectBox.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
      }, 5000);
    });

    // Initialisation: afficher la première image
    showImage(currentImageIndex);
  });

  // Animation des compétences au survol
  const skillSpans = document.querySelectorAll('.skills-list span');
  skillSpans.forEach(span => {
    span.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    span.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  // Effet parallaxe subtil pour l'image de profil
  const featuredImage = document.querySelector('.featured-image .image');
  if (featuredImage) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      featuredImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }
});