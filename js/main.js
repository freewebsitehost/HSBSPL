// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.classList.toggle('dark-mode', savedTheme === 'dark');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Hero Section Slideshow
const heroSlides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

// Initialize slideshow
showSlide(0);
setInterval(nextSlide, 5000);

// Animate hero content on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroFeatures = document.querySelector('.hero-features');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 600);

    setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 900);

    setTimeout(() => {
        heroFeatures.style.opacity = '1';
        heroFeatures.style.transform = 'translateY(0)';
    }, 1200);

    setTimeout(() => {
        scrollIndicator.style.opacity = '1';
    }, 1500);
});

// Service Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show corresponding tab content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    });
});

// Animate stats counting
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const increment = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(increment);
            } else {
                stat.textContent = target;
            }
        };
        
        increment();
    });
}

// Initialize stats animation when section is in view
const aboutSection = document.querySelector('.about-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// Testimonials Slider
function initTestimonialsSlider() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // Duplicate testimonials for infinite loop
    testimonials.forEach(card => {
        const clone = card.cloneNode(true);
        testimonialsContainer.appendChild(clone);
    });
    
    let animation;
    let requestId;
    const containerWidth = testimonialsContainer.scrollWidth / 2;
    let currentPosition = 0;
    
    function animate() {
        currentPosition -= 0.5;
        if (currentPosition <= -containerWidth) {
            currentPosition = 0;
        }
        testimonialsContainer.style.transform = `translateX(${currentPosition}px)`;
        requestId = requestAnimationFrame(animate);
    }
    
    // Start animation when section is in view
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animation) {
                    animate();
                }
            } else {
                cancelAnimationFrame(requestId);
                animation = null;
            }
        });
    }, { threshold: 0.1 });
    
    testimonialObserver.observe(document.querySelector('.testimonials-section'));
    
    // Pause on hover
    testimonialsContainer.addEventListener('mouseenter', () => {
        cancelAnimationFrame(requestId);
        animation = null;
    });
    
    testimonialsContainer.addEventListener('mouseleave', () => {
        if (!animation) {
            animate();
        }
    });
}

// Initialize the testimonials slider
document.addEventListener('DOMContentLoaded', initTestimonialsSlider);

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(enquiryForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your enquiry! We will get back to you soon.');
        enquiryForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to a server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// GSAP Animations
if (typeof gsap !== 'undefined') {
    // Animate elements on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Animate solution cards
    gsap.utils.toArray('.solution-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Animate team members
    gsap.utils.toArray('.team-member').forEach((member, i) => {
        gsap.from(member, {
            scrollTrigger: {
                trigger: member,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Process Section Animation
    const processLine = document.querySelector('.process-line');
    const steps = document.querySelectorAll('.step');
    
    // Create timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.process-section',
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // Animate the process line
    tl.fromTo(processLine, 
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.5, ease: "power3.out" }
    );
    
    // Animate each step with stagger
    tl.fromTo(steps,
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.3,
            ease: "back.out(1.7)"
        },
        "-=1" // overlap with previous animation
    );
}