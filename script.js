// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // Mobile navigation
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
  
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
  
          // Close mobile menu
          menu?.classList.remove('open');
          toggle?.classList.remove('active');
          toggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate counters for metrics
          if (entry.target.classList.contains('metrics')) {
            animateCounters(entry.target);
          }
        }
      });
    }, observerOptions);
  
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
  
    // Counter animation function
    function animateCounters(container) {
      const counters = container.querySelectorAll('.metric-number[data-target]');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
  
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.min(Math.floor(current), target);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
  
        updateCounter();
      });
    }
  
    // Header background on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.background = 'rgba(15, 20, 25, 0.95)';
      } else {
        header.style.background = 'rgba(15, 20, 25, 0.8)';
      }
      
      lastScrollY = currentScrollY;
    });
  
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero-bg');
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    });
  
    // Add loading animation
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });
  
    // Typing animation for hero text (optional enhancement)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typing animation after a short delay
      setTimeout(typeWriter, 500);
    }
  });
  
  // Performance optimization
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
// Add this to your existing script.js after the DOMContentLoaded event listener

// Enhanced mobile navigation with better animations
if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', String(isOpen));
      
      // Animate menu items
      if (isOpen) {
        const menuItems = menu.querySelectorAll('.nav-item');
        menuItems.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            item.style.transition = 'all 0.2s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 50);
        });
      }
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Enhanced header scroll effects
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.style.background = 'rgba(15, 20, 25, 0.95)';
      header.style.borderBottom = '1px solid rgba(74, 144, 226, 0.2)';
    } else {
      header.style.background = 'rgba(15, 20, 25, 0.8)';
      header.style.borderBottom = '1px solid var(--border)';
    }
  });
  