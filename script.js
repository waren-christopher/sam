// SJ Studioz - Premium Interactive Animation & UI Engine

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector(".navbar");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }));
    }

    // 2. Glowing Scroll Progress Bar
    let progressBar = document.getElementById("scroll-progress");
    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.id = "scroll-progress";
        document.body.prepend(progressBar);
    }

    const updateScrollProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;

        // Navbar blur on scroll
        if (navbar) {
            if (scrollTop > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    };

    window.addEventListener("scroll", () => {
        window.requestAnimationFrame(updateScrollProgress);
    }, { passive: true });
    updateScrollProgress();

    // 3. Staggered Scroll-Reveal Engine
    const revealTargets = [
        ".section-title",
        ".role-badge",
        ".service-card",
        ".image-frame",
        ".experience-list li",
        ".event-preview-card",
        ".event-banner-card",
        ".poster-card",
        ".fact-card",
        ".client-card",
        ".footer-info",
        ".footer-details"
    ];

    // Assign data-reveal to matching elements if not already set
    revealTargets.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            if (!el.hasAttribute("data-reveal")) {
                el.setAttribute("data-reveal", "up");
                // Stagger delay within grid/list parents
                const delay = (index % 4) * 0.12;
                el.style.transitionDelay = `${delay}s`;
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
    });

    document.querySelectorAll("[data-reveal], .hidden, .fade-up").forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Smooth 3D Tilt Effect on Cards (Desktop only)
    if (window.matchMedia("(min-width: 992px)").matches) {
        const tiltCards = document.querySelectorAll(".service-card, .event-preview-card, .poster-card, .fact-card");

        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    // 5. Smooth Scroll to Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});
