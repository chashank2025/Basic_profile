


// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar active link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');

  // Toggle mobile menu
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Smooth scroll handled by CSS scroll-behavior

  // Highlight active nav link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 70;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Animate skill progress bars on scroll
  const skillCircles = document.querySelectorAll('.skill-circle');

  function animateSkills() {
    skillCircles.forEach(circle => {
      const rect = circle.getBoundingClientRect();
      if (rect.top < window.innerHeight && !circle.classList.contains('animated')) {
        const percentage = circle.getAttribute('data-percentage');
        const progressCircle = circle.querySelector('.skill-progress');
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        progressCircle.style.strokeDashoffset = offset;
        circle.classList.add('animated');
      }
    });
  }

  window.addEventListener('scroll', animateSkills);
  animateSkills();

  // Scroll reveal effect
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Contact form validation and submission
  const form = document.getElementById('contact-form');
  const nameInput = form.name;
  const emailInput = form.email;
  const messageInput = form.message;
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const successNotification = document.getElementById('success-notification');
  const closeNotificationBtn = document.getElementById('close-notification');

  function validateEmail(email) {
    // Simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;

    // Name validation
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    // Email validation
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Message validation
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Please enter your message.';
      valid = false;
    } else {
      messageError.textContent = '';
    }

    if (valid) {
      // Simulate form submission success
      form.reset();
      successNotification.classList.remove('hidden');
      // Scroll to notification
      successNotification.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Close success notification
  closeNotificationBtn.addEventListener('click', () => {
    successNotification.classList.add('hidden');
  });

  // Theme switcher
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.toggle('dark', savedTheme === 'dark');
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Landing section animated background - particles
  const canvas = document.getElementById('landing-canvas');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const maxParticles = 80;

  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    particlesArray = [];
    for (let i = 0; i < maxParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    initCanvas();
    createParticles();
  });

  // Initialize canvas and particles
  initCanvas();
  createParticles();
  animateParticles();

  // Scroll down arrow click scrolls to About section
  const scrollDownArrow = document.querySelector('.scroll-down');
  scrollDownArrow.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
});
