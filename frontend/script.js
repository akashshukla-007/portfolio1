// API Configuration - Replace with your deployed backend URL
const API_URL = 'https://your-backend-url.onrender.com'; // Change this to your backend URL

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3
});

gsap.from('.hero-image', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.5
});

// About Section Animation
gsap.from('.about-text p', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2
});

gsap.from('.stat-item', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2
});

// Education Timeline Animation
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%'
    },
    opacity: 0,
    x: (index) => index % 2 === 0 ? -50 : 50,
    duration: 0.8,
    stagger: 0.3
});

// Skills Grid Animation
gsap.from('.skill-item', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%'
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.1
});

// Projects Cards Animation
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2
});

// Contact Section Animation
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%'
    },
    opacity: 0,
    x: -50,
    duration: 0.8
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%'
    },
    opacity: 0,
    x: 50,
    duration: 0.8
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
            }, 5000);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = 'Failed to send message. Please try again later.';
        formMessage.className = 'form-message error';

        // Hide error message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }, 5000);
    }
});

// Active navigation link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
