// ===============================
// PRELOADER
// ===============================
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hidden");
        document.body.classList.add("loaded");
    }, 900);
});


// ===============================
// HEADER: уменьшение при прокрутке
// ===============================
const header = document.getElementById("header");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();


// ===============================
// BURGER MENU
// ===============================
const burger = document.getElementById("burger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    burger.classList.remove("active");
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.classList.toggle("active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});


// ===============================
// ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ
// ===============================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealElements.forEach(element => revealObserver.observe(element));


// ===============================
// СЧЁТЧИК 20+
// ===============================
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Плавное замедление в конце
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);

        counter.textContent = current + "+";

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target + "+";
        }
    }

    requestAnimationFrame(update);
}

window.addEventListener("load", () => {
    setTimeout(() => {
        counters.forEach(animateCounter);
    }, 1000);
});


// ===============================
// АКТИВНЫЙ ПУНКТ МЕНЮ
// ===============================
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach(section => sectionObserver.observe(section));


// ===============================
// КНОПКА "НАВЕРХ"
// ===============================
const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 500);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ===============================
// LIGHTBOX ГАЛЕРЕИ
// ===============================
const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;

function openImage(index) {
    currentIndex = index;
    lightboxImage.src = galleryImages[currentIndex].src;
    lightboxImage.alt = galleryImages[currentIndex].alt;
    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");
}

function closeImage() {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
}

function nextImage() {
    currentIndex++;

    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    }

    lightboxImage.src = galleryImages[currentIndex].src;
    lightboxImage.alt = galleryImages[currentIndex].alt;
}

function prevImage() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }

    lightboxImage.src = galleryImages[currentIndex].src;
    lightboxImage.alt = galleryImages[currentIndex].alt;
}

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        openImage(index);
    });
});

closeBtn.addEventListener("click", closeImage);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeImage();
    }
});


// ===============================
// КЛАВИАТУРА
// ===============================
document.addEventListener("keydown", event => {
    if (lightbox.classList.contains("active")) {
        if (event.key === "Escape") closeImage();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "ArrowLeft") prevImage();
    }

    if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
    }
});
