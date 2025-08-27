// ===== MOBILE NAVIGATION TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger icon
  hamburger.classList.toggle('toggle');
  
  // Toggle aria-expanded for accessibility
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('toggle');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Calculate scroll position accounting for fixed header
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without page jump
      history.pushState(null, null, targetId);
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksArray.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== ANIMATE SKILL BARS ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.parentElement.getAttribute('data-percent') || bar.style.width;
    bar.style.width = width;
  });
}

// Intersection Observer for skill bars animation
const skillsSection = document.querySelector('.skills');
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

if (skillsSection) {
  observer.observe(skillsSection);
}

// ===== FORM VALIDATION =====
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const subject = this.querySelector('#subject').value.trim();
    const message = this.querySelector('#message').value.trim();
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just log it and show a success message
    console.log('Form submitted:', { name, email, subject, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
}

// ===== PROJECT FILTERING (OPTIONAL) =====
// This would require adding category data attributes to project cards
const filterButtons = document.querySelectorAll('.project-filter');

if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      const projects = document.querySelectorAll('.project-card');
      
      projects.forEach(project => {
        if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

// ===== CURRENT YEAR IN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== SCROLL REVEAL ANIMATIONS =====
// This would require adding the ScrollReveal library or implementing custom animations
// Example using ScrollReveal (uncomment if you include the library):
/*
ScrollReveal().reveal('.section-title, .about-content, .project-card', {
  delay: 200,
  distance: '20px',
  origin: 'bottom',
  interval: 100,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
});
*/

// ===== THEME TOGGLE (OPTIONAL) =====
const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
    
    // Update toggle icon
    themeToggle.innerHTML = isDark 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  });
  
  // Check for saved theme preference
  if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// ===== LAZY LOADING IMAGES =====
// This would require adding 'loading="lazy"' to img tags or using a library
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});