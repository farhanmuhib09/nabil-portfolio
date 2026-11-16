
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

    if (!typingText) return;

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

/* =====================================
   STEP 09 - PREMIUM EMAILJS CONTACT FORM
===================================== */

(function () {

    const contactForm = document.getElementById("contactForm");

    // Stop if this page has no contact form
    if (!contactForm) return;

    const status = document.getElementById("contactStatus");
    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    // Check EmailJS library
    if (typeof emailjs === "undefined") {
        if (status) {
            status.textContent =
                "Email service is currently unavailable.";
        }
        console.error("EmailJS library not loaded.");
        return;
    }

    // Initialize EmailJS
    emailjs.init({
        publicKey: "hMOiSeEm9W7uCezUv"
    });

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !subject || !message) {
            status.textContent = "Please fill in all fields.";
            return;
        }

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

            status.textContent =
                "Message sent successfully! Thank you.";

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            status.textContent =
                "Message could not be sent. Please try again.";

        } finally {

            submitButton.disabled = false;

        }

    });

})();

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



/* =====================================
   STEP 10.5 - PORTFOLIO IMAGE PREVIEW
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const portfolioModal = document.getElementById("portfolioModal");
    const portfolioModalImage = document.getElementById("portfolioModalImage");
    const portfolioClose = document.querySelector(".portfolio-close");

    console.log("Portfolio Modal:", portfolioModal);

    if (!portfolioModal || !portfolioModalImage) {
        console.error("Portfolio Modal HTML Not Found!");
        return;
    }

    // OPEN IMAGE PREVIEW
    document.querySelectorAll(".portfolio-image img").forEach((img) => {

        img.style.cursor = "zoom-in";

        img.addEventListener("click", function () {

            portfolioModalImage.src = this.src;
            portfolioModalImage.alt = this.alt;

            portfolioModal.classList.add("active");
            document.body.style.overflow = "hidden";

        });

    });

    // CLOSE FUNCTION
    function closePortfolioModal() {

        portfolioModal.classList.remove("active");
        document.body.style.overflow = "";

        portfolioModalImage.src = "";

    }

    // CLOSE BUTTON
    if (portfolioClose) {
        portfolioClose.addEventListener("click", closePortfolioModal);
    }

    // OUTSIDE CLICK
    portfolioModal.addEventListener("click", function (event) {

        if (event.target === portfolioModal) {
            closePortfolioModal();
        }

    });

    // ESCAPE KEY
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closePortfolioModal();
        }

    });

});

// STEP 10.7 - PORTFOLIO CATEGORY FILTER

let activeFilter = "all";
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        activeFilter = button.dataset.filter;
const filter = activeFilter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        portfolioCards.forEach((card) => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });

    });
});
// STEP 10.8 - PROJECT DETAILS

const projectInformation = {
    word: {
        title: "Professional Document Formatting",
        description: "A self-created practice project featuring a professional report with formatted headings, paragraphs, tables, headers and page numbers.",
        skills: ["MS Word", "Document Formatting", "Page Layout", "Table Design", "PDF Export"]
    },

    excel: {
        title: "Excel Data Entry & Dashboard",
        description: "A self-created practice project featuring sample sales data, automatic calculations, formulas, a sales summary and a chart.",
        skills: ["Excel Data Entry", "Excel Formulas", "Dashboard", "Data Formatting", "Charts"]
    },

    mcq: {
        title: "MCQ Question Paper Formatting",
        description: "A self-created practice project featuring an examination question paper with four options and a separate answer key.",
        skills: ["MCQ Formatting", "MS Word", "Question Paper Design", "Table Formatting", "PDF Conversion"]
    }
};

function showProjectDetails(project) {
    const modal = document.getElementById("projectDetailsModal");
    const info = projectInformation[project];

    if (!modal || !info) {
        console.error("Project Details Error:", project);
        return;
    }

    document.getElementById("detailsTitle").textContent = info.title;
    document.getElementById("detailsDescription").textContent = info.description;

    document.getElementById("detailsSkills").innerHTML =
        info.skills.map(skill => `<span>${skill}</span>`).join("");

    modal.classList.add("active");
}

function closeProjectDetails() {
    document.getElementById("projectDetailsModal")
        .classList.remove("active");
}
console.log("Project Details JS Loaded");
console.log(typeof showProjectDetails);
document.addEventListener("DOMContentLoaded", function () {
    console.log("Modal:", document.getElementById("projectDetailsModal"));
    console.log("Button Function:", typeof showProjectDetails);
});
// STEP 10.9 - POPUP CLOSE CONTROLS

const detailsModal = document.getElementById("projectDetailsModal");

if (detailsModal) {

    detailsModal.addEventListener("click", function(event) {
        if (event.target === detailsModal) {
            closeProjectDetails();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeProjectDetails();
        }
    });

}
// STEP 11.4 - PROJECT SEARCH

const portfolioSearch = document.getElementById("portfolioSearch");

// STEP 11.4 - PROJECT SEARCH

if (portfolioSearch) {
    portfolioSearch.addEventListener("input", function () {
        updatePortfolioCards();
    });
}

// STEP 11.5 - NO RESULTS MESSAGE

const noPortfolioResults = document.getElementById("noPortfolioResults");

function updatePortfolioCards() {
    const searchValue = portfolioSearch
        ? portfolioSearch.value.toLowerCase().trim()
        : "";

    let visibleProjects = 0;

    portfolioCards.forEach((card) => {
        const category = card.dataset.category || "";
        const cardText = card.textContent.toLowerCase();

        const matchesFilter =
            activeFilter === "all" || category === activeFilter;

        const matchesSearch = cardText.includes(searchValue);

        const shouldShow = matchesFilter && matchesSearch;

        card.classList.toggle("hidden", !shouldShow);

        if (shouldShow) {
            visibleProjects++;
        }
    });

    if (noPortfolioResults) {
        noPortfolioResults.hidden = visibleProjects !== 0;
    }
}
console.log("No Results Element:", noPortfolioResults);
console.log("Update Function:", typeof updatePortfolioCards);

if (typeof updatePortfolioCards === "function") {
    updatePortfolioCards();
}

console.log("After Update");

if (noPortfolioResults) {
    console.log("Visible Message:", noPortfolioResults.hidden);
}

console.log("Search Value:", portfolioSearch?.value);
console.log("Active Filter:", activeFilter);
console.log("Total Projects:", portfolioCards.length);

portfolioCards.forEach((card, index) => {
    console.log(
        "Project",
        index + 1,
        "Category:",
        card.dataset.category,
        "Text:",
        card.textContent
    );
});

// STEP 11.6 - PORTFOLIO SCROLL REVEAL

const revealCards = document.querySelectorAll(".portfolio-card.reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealCards.forEach((card) => {
        revealObserver.observe(card);
    });

} else {
    revealCards.forEach((card) => {
        card.classList.add("active");
    });
}

/* =====================================
   STEP 08 - PREMIUM HAMBURGER MENU
===================================== */


/* PREMIUM MULTI-PAGE HAMBURGER MENU */

const menuToggleButton = document.getElementById("menuToggle");
const navigationMenu = document.getElementById("navMenu");

if (menuToggleButton && navigationMenu) {

    function closeNavigationMenu() {
        navigationMenu.classList.remove("menu-open");
        menuToggleButton.classList.remove("active");

        document.body.classList.remove("menu-overlay-active");

        menuToggleButton.setAttribute("aria-expanded", "false");
        menuToggleButton.setAttribute("aria-label", "Open navigation menu");
    }

    menuToggleButton.addEventListener("click", function () {

        const isOpen = navigationMenu.classList.toggle("menu-open");

        document.body.classList.toggle("menu-overlay-active", isOpen);
        menuToggleButton.classList.toggle("active", isOpen);

        menuToggleButton.setAttribute("aria-expanded", String(isOpen));

        menuToggleButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

    // CLOSE MENU AFTER CLICKING ANY PAGE LINK
    navigationMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            closeNavigationMenu();
        });

    });

    // CLOSE MENU WHEN CLICKING OUTSIDE
    document.addEventListener("click", function (event) {

        if (
            !navigationMenu.contains(event.target) &&
            !menuToggleButton.contains(event.target)
        ) {
            closeNavigationMenu();
        }

    });

    // CLOSE MENU WITH ESCAPE KEY
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeNavigationMenu();
        }

    });

}

/* STEP 16 - MULTI-PAGE ACTIVE NAVIGATION */

const smartNavMenu = document.getElementById("navMenu");

if (smartNavMenu) {

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    const smartNavLinks = smartNavMenu.querySelectorAll("a");

    smartNavLinks.forEach(link => {

        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        link.classList.toggle(
            "active",
            linkPage === currentPage
        );

    });

}


/* =========================================
   PORTFOLIO PAGE FILTER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const portfolioShowcase = document.querySelector(
        ".portfolio-showcase"
    );

    if (!portfolioShowcase) return;

    const filterButtons = portfolioShowcase.querySelectorAll(
        ".portfolio-filter"
    );

    const portfolioItems = portfolioShowcase.querySelectorAll(
        ".portfolio-showcase-card"
    );

    const emptyMessage = portfolioShowcase.querySelector(
        ".portfolio-empty-message"
    );

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            const selectedFilter = this.dataset.filter;
            let visibleItems = 0;

            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            portfolioItems.forEach(item => {

                const category = item.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    selectedFilter === category;

                item.hidden = !shouldShow;

                if (shouldShow) {
                    visibleItems++;
                }

            });

            if (emptyMessage) {
                emptyMessage.hidden = visibleItems > 0;
            }

        });

    });

});

/* =========================================
   PREMIUM CERTIFICATE GALLERY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const certificateSection = document.querySelector(
        ".certificate-section"
    );

    if (!certificateSection) return;

    const track = certificateSection.querySelector(
        "#certificateTrack"
    );

    const cards = track
        ? Array.from(track.querySelectorAll(".certificate-card"))
        : [];

    const prevButton = certificateSection.querySelector("#certPrev");
    const nextButton = certificateSection.querySelector("#certNext");
    const dotsContainer = certificateSection.querySelector("#certificateDots");

    if (!track || !cards.length) return;

    let currentIndex = 0;
    let autoPlay;
    let startX = 0;

    function getVisibleCards() {
    if (window.innerWidth <= 600) return 1;
    return 2;
}

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCards());
    }

    function getGap() {
        return parseFloat(getComputedStyle(track).gap) || 0;
    }

    function createDots() {
        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";

        const totalDots = getMaxIndex() + 1;

        for (let i = 0; i < totalDots; i++) {

            const dot = document.createElement("span");

            dot.addEventListener("click", function () {
                currentIndex = i;
                updateSlider();
                restartAutoPlay();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {

        currentIndex = Math.min(
            currentIndex,
            getMaxIndex()
        );

        const cardWidth = cards[0].getBoundingClientRect().width;
        const movement = currentIndex * (cardWidth + getGap());

        track.style.transform = `translateX(-${movement}px)`;

        if (dotsContainer) {
            Array.from(dotsContainer.children).forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }

        if (nextButton) {
            nextButton.disabled = currentIndex === getMaxIndex();
        }
    }

    function nextSlide() {
        currentIndex =
            currentIndex >= getMaxIndex()
                ? 0
                : currentIndex + 1;

        updateSlider();
    }

    function prevSlide() {
        currentIndex =
            currentIndex <= 0
                ? getMaxIndex()
                : currentIndex - 1;

        updateSlider();
    }

    function stopAutoPlay() {
        clearInterval(autoPlay);
    }

    function startAutoPlay() {
        stopAutoPlay();

        if (getMaxIndex() > 0) {
            autoPlay = setInterval(nextSlide, 5000);
        }
    }

    function restartAutoPlay() {
        startAutoPlay();
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            restartAutoPlay();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            prevSlide();
            restartAutoPlay();
        });
    }

    certificateSection.addEventListener("mouseenter", stopAutoPlay);
    certificateSection.addEventListener("mouseleave", startAutoPlay);

    certificateSection.addEventListener("touchstart", function (event) {
        startX = event.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    certificateSection.addEventListener("touchend", function (event) {
        const endX = event.changedTouches[0].screenX;
        const difference = startX - endX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        startAutoPlay();
    }, { passive: true });

    window.addEventListener("resize", function () {
        createDots();
        updateSlider();
        startAutoPlay();
    });

    createDots();
    updateSlider();
    startAutoPlay();


    /* CERTIFICATE FULL PREVIEW */

    const modal = document.getElementById("certificateModal");
    const fullImage = document.getElementById("fullCertificate");
    const downloadLink = document.getElementById("downloadCertificate");
    const closeButton = document.getElementById("certificateClose");

    window.openCertificate = function (imageSrc) {

        if (!modal || !fullImage || !downloadLink) return;

        fullImage.src = imageSrc;
        downloadLink.href = imageSrc;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    function closeCertificate() {
        if (!modal) return;

        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeCertificate();
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeCertificate);
    }

    if (fullImage) {
        fullImage.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeCertificate();
        }
    });

});

console.log("Certificate Modal:", document.getElementById("certificateModal"));
console.log("Certificate Image:", document.getElementById("fullCertificate"));
console.log("Download Button:", document.getElementById("downloadCertificate"));

/* =========================================
   CERTIFICATE PREVIEW & DOWNLOAD FIX
========================================= */

(function () {

    const modal = document.getElementById("certificateModal");
    const fullImage = document.getElementById("fullCertificate");
    const downloadLink = document.getElementById("downloadCertificate");
    const closeButton = document.getElementById("certificateClose");

    if (!modal || !fullImage || !downloadLink) return;

    window.openCertificate = function (imageSrc) {

        fullImage.src = imageSrc;
        downloadLink.href = imageSrc;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";

    };

    function closePreview() {

        modal.classList.remove("active");
        document.body.style.overflow = "";

    }

    if (closeButton) {
        closeButton.addEventListener("click", closePreview);
    }

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closePreview();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closePreview();
        }

    });

})();

/* =========================================
   PREMIUM SCROLL REVEAL SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(
        ".dashboard-stats > *, .dashboard-quick-access > *, .dashboard-footer-note"
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

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

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("active");
        });

    }

});

/* PREMIUM SCROLL PROGRESS SYSTEM */

(function () {

    const progressBar = document.createElement("div");
    progressBar.id = "scrollProgress";

    document.body.appendChild(progressBar);

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progressBar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    window.addEventListener("resize", updateScrollProgress);

    updateScrollProgress();

})();
