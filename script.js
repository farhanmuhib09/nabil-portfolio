
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


// STEP 09 - EMAILJS CONTACT FORM

(function () {
    emailjs.init({
        publicKey: "hMOiSeEm9W7uCezUv"
    });
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("visitorName").value.trim();
        const email = document.getElementById("visitorEmail").value.trim();
        const subject = document.getElementById("visitorSubject").value.trim();
        const message = document.getElementById("visitorMessage").value.trim();

        const status = document.getElementById("formStatus");
        const submitButton = contactForm.querySelector('button[type="submit"]');

        status.textContent = "Sending your message...";
        submitButton.disabled = true;

        try {
            await emailjs.send(
                "service_q25gzpg",
                "template_3i3o4qr",
                {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                }
            );

            status.textContent = "Message sent successfully! Thank you.";
            contactForm.reset();

        } catch (error) {
            console.error("EmailJS Error:", error);
            status.textContent = "Message could not be sent. Please try again.";
        } finally {
            submitButton.disabled = false;
        }
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

/* =========================================
   STEP 04 - PREMIUM CERTIFICATE SLIDER
========================================= */

(function () {

    function initCertificateSlider() {

        const track = document.getElementById("certificateTrack");
        const prevBtn = document.getElementById("certPrev");
        const nextBtn = document.getElementById("certNext");
        const dotsContainer = document.getElementById("certificateDots");

        if (!track || !prevBtn || !nextBtn || !dotsContainer) {
            return;
        }

        const cards = Array.from(
            track.querySelectorAll(".certificate-card")
        );

        if (cards.length === 0) return;

        let currentIndex = 0;
        let maxIndex = 0;
        let autoSlide;

        // Calculate visible cards

        function getSliderSettings() {

            const cardWidth = cards[0].getBoundingClientRect().width;

            const trackStyle = window.getComputedStyle(track);
            const gap = parseFloat(trackStyle.gap) || 0;

            const step = cardWidth + gap;

            const visibleCards = Math.max(
                1,
                Math.round((track.clientWidth + gap) / step)
            );

            maxIndex = Math.max(0, cards.length - visibleCards);

            return { step, visibleCards };
        }

        // Create Pagination Dots

        function createDots() {

            dotsContainer.innerHTML = "";

            for (let i = 0; i <= maxIndex; i++) {

                const dot = document.createElement("span");

                dot.addEventListener("click", function () {
                    currentIndex = i;
                    updateSlider();
                    restartAutoSlide();
                });

                dotsContainer.appendChild(dot);
            }
        }

        // Update Slider

        function updateSlider() {

            const settings = getSliderSettings();

            currentIndex = Math.min(currentIndex, maxIndex);

            track.style.transform =
                `translateX(-${currentIndex * settings.step}px)`;

            const dots = dotsContainer.querySelectorAll("span");

            dots.forEach((dot, index) => {
                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );
            });

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === maxIndex;
        }

        // Previous Button

        prevBtn.addEventListener("click", function () {

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }

            updateSlider();
            restartAutoSlide();
        });

        // Next Button

        nextBtn.addEventListener("click", function () {

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }

            updateSlider();
            restartAutoSlide();
        });

        // Automatic Sliding

        function startAutoSlide() {

            clearInterval(autoSlide);

            if (maxIndex > 0) {

                autoSlide = setInterval(function () {

                    currentIndex =
                        currentIndex >= maxIndex
                            ? 0
                            : currentIndex + 1;

                    updateSlider();

                }, 5000);
            }
        }

        function restartAutoSlide() {
            startAutoSlide();
        }

        // Pause on Mouse Hover

        const slider = track.closest(".certificate-slider");

        slider.addEventListener("mouseenter", function () {
            clearInterval(autoSlide);
        });

        slider.addEventListener("mouseleave", function () {
            startAutoSlide();
        });

        // Responsive Resize

        window.addEventListener("resize", function () {
            createDots();
            updateSlider();
            startAutoSlide();
        });

        // Initial Setup

        createDots();
        updateSlider();
        startAutoSlide();

    }

    // Start after HTML loads

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initCertificateSlider
        );
    } else {
        initCertificateSlider();
    }

})();


// =========================================
// CERTIFICATE FULL SIZE PREVIEW
// =========================================


// =========================================
// STEP 06 - ADVANCED CERTIFICATE FUNCTIONS
// =========================================

window.openCertificate = function (imageSrc) {

    const modal = document.getElementById("certificateModal");
    const fullImage = document.getElementById("fullCertificate");
    const downloadBtn = document.getElementById("downloadCertificate");

    if (!modal || !fullImage || !downloadBtn) return;

    fullImage.src = imageSrc;

    // Set Download Image
    downloadBtn.href = imageSrc;

    const filename = imageSrc.split("/").pop();

    downloadBtn.download = filename || "NABIL-Certificate.jpg";

    // Show Preview
    modal.classList.add("active");

    document.body.style.overflow = "hidden";

};


// Close Certificate Preview

window.closeCertificate = function () {

    const modal = document.getElementById("certificateModal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

};



// Close Preview with ESC

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        window.closeCertificate();
    }

});


// Prevent closing when clicking the image

document.addEventListener("DOMContentLoaded", function () {

    const fullImage = document.getElementById("fullCertificate");

    if (fullImage) {
        fullImage.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

});

/* =========================================
   STEP 07 - TOUCH & KEYBOARD NAVIGATION
========================================= */

(function () {

    const slider = document.querySelector(".certificate-slider");
    const prevBtn = document.getElementById("certPrev");
    const nextBtn = document.getElementById("certNext");
    const modal = document.getElementById("certificateModal");

    if (!slider || !prevBtn || !nextBtn) return;

    let touchStartX = 0;
    let touchEndX = 0;

    // Touch Start
    slider.addEventListener("touchstart", function (event) {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    // Touch End
    slider.addEventListener("touchend", function (event) {

        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) < 50) return;

        if (difference > 0) {
            nextBtn.click();
        } else {
            prevBtn.click();
        }

    }, { passive: true });


    // Keyboard Navigation
    document.addEventListener("keydown", function (event) {

        if (modal && modal.classList.contains("active")) return;

        const target = event.target;

        if (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable
        ) return;

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

    });

})();
