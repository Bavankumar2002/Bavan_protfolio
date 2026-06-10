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
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Simple form submission (prevent default for demo, if form exists)
const form = document.getElementById("contact-form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thanks for your message! This is a demo so it wasn't actually sent.");
        form.reset();
    });
}

// Reveal animations on scroll using CSS classes
const revealObserverOptions = {
    root: null,
    rootMargin: '0px -50px -50px 0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

// Select sections to animate
const revealElements = document.querySelectorAll(
    '.about-left-col, .about-right-col, .experience-item, .project-card, .contact-card'
);

revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
});

// Skill progress bars filling animation when they scroll into view
const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const targetWidth = fill.getAttribute("data-width") || "0%";
            fill.style.width = targetWidth;
            observer.unobserve(fill);
        }
    });
}, { threshold: 0.1 });

const progressFills = document.querySelectorAll(".progress-bar-fill");
progressFills.forEach(fill => progressObserver.observe(fill));

// Automatic Name Sync (watermark & initials) and Typewriter Animation
document.addEventListener("DOMContentLoaded", () => {
    const developerNameEl = document.getElementById("developer-name");
    const nameWatermarkEl = document.getElementById("name-watermark");
    const logoEl = document.querySelector(".logo");

    if (developerNameEl) {
        const syncName = () => {
            const fullName = developerNameEl.textContent.trim();
            const firstName = fullName.split(/\s+/)[0];

            // Set watermark to uppercase first name
            if (nameWatermarkEl) {
                nameWatermarkEl.textContent = firstName.toUpperCase();
            }

            // Set logo to initials + dot (e.g. "BavanKumar Baskar" -> "BK.")
            if (logoEl) {
                const nameParts = fullName.split(/\s+/).filter(part => part.length > 0);
                let initials = "";
                if (nameParts.length > 0) {
                    const firstWord = nameParts[0];
                    const firstWordCaps = firstWord.replace(/[^A-Z]/g, "");
                    if (firstWordCaps.length >= 2) {
                        initials = firstWordCaps.substring(0, 2);
                    } else if (nameParts.length >= 2) {
                        initials = (firstWord[0] + nameParts[1][0]).toUpperCase();
                    } else {
                        initials = firstWord[0].toUpperCase();
                    }
                }
                if (initials) {
                    logoEl.innerHTML = `${initials}<span class="dot-accent">.</span>`;
                }
            }
        };

        // Run sync initially
        syncName();

        // Observe text modifications to dynamically update watermark and logo initials in real time
        const nameObserver = new MutationObserver(syncName);
        nameObserver.observe(developerNameEl, { textContent: true, characterData: true, childList: true, subtree: true });
    }

    // Typewriter effect logic
    const typewriterElement = document.querySelector(".typewriter-text");
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute("data-words") || "[]");
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let txt = '';

        function type() {
            if (words.length === 0) return;
            const currentWord = words[wordIndex];

            if (isDeleting) {
                txt = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                txt = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            typewriterElement.textContent = txt;

            let typeSpeed = 100;
            if (isDeleting) {
                typeSpeed /= 2; // Delete faster
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typewriter
        setTimeout(type, 1500);
    }
});
