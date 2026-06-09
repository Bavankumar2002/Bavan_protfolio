// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Close mobile menu when clicking on a link
navLinks.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// Header scroll effect
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.boxShadow = "none";
    }
});

// Simple form submission (prevent default for demo)
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for your message! This is a demo so it wasn't actually sent.");
    form.reset();
});

// Reveal animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select sections to animate
const animatedElements = document.querySelectorAll('.about-container, .project-card, .contact form');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
