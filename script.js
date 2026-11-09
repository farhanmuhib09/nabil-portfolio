
// =====================================
// NABIL'S PORTFOLIO
// STEP 03 - TYPING ANIMATION
// =====================================

const typingText = document.getElementById("typing-text");

const words = [
    "Student",
    "Tech Enthusiast",
    "Web Developer",
    "Creative Learner"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeAnimation() {

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent =
        currentWord.substring(0, charIndex);

    let speed = deleting ? 55 : 100;

    if (!deleting && charIndex === currentWord.length) {

        deleting = true;
        speed = 1500;

    } else if (deleting && charIndex === 0) {

        deleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        speed = 400;
    }

    setTimeout(typeAnimation, speed);
}

// START ANIMATION

typeAnimation();

// STEP 09 - CONTACT FORM

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("visitorName").value.trim();
        const email = document.getElementById("visitorEmail").value.trim();
        const subject = document.getElementById("visitorSubject").value.trim();
        const message = document.getElementById("visitorMessage").value.trim();

        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`;

        const mailtoLink =
            `mailto:farhan.muhib2009@gmail.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        document.getElementById("formStatus").textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;
    });
}

// STEP 10 - FOOTER & BACK TO TOP

// Automatic Copyright Year
const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Back To Top Button
const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* STEP 11 - INTERACTIVE ANIMATIONS */

// 1. Scroll Reveal Animation

const revealElements = document.querySelectorAll(
    "section, .about-card, .education-card, " +
    ".achievement-card, .skill-card, " +
    ".project-card, .contact-info, .contact-form"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// 2. Active Navbar Link

const navLinks = document.querySelectorAll(
    'nav a[href^="#"]'
);

const pageSections = document.querySelectorAll(
    "section[id]"
);

const navObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const currentId = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active-link",
                        link.getAttribute("href") === "#" + currentId
                    );
                });

            }
        });
    },
    {
        threshold: 0.3
    }
);

pageSections.forEach(section => {
    navObserver.observe(section);
});

/* STEP 12 - LOADING SCREEN */

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(function () {

            preloader.classList.add("loader-hidden");

        }, 700);

    }

});
