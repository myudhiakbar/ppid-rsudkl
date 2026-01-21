// Load components dynamically
function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (container) {
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${componentPath}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                // Re-initialize scripts after loading navbar
                if (containerId === 'navbar-container') {
                    initializeNavbar();
                }
                // Re-initialize scripts after loading footer
                if (containerId === 'footer-container') {
                    initializeFooter();
                }
                // Re-initialize scripts after loading main content
                if (containerId === 'main-content') {
                    initializeContent();
                }
            })
            .catch(error => console.error('Error loading component:', error));
    }
}

// Initialize navbar event listeners
function initializeNavbar() {
    // Smooth scroll untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && !href.endsWith('.html')) {
                e.preventDefault();
                const targetId = href;
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add active class to navbar links on scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
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
}

// Initialize content (carousel, etc)
function initializeContent() {
    // Initialize Owl Carousel
    if (typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 1 },
                768: { items: 1 },
                992: { items: 1 }
            }
        });
    }

    // Initialize Infografis Modal Functionality
    initializeInfografisModal();
}

// Initialize Infografis Modal
function initializeInfografisModal() {
    // Handle click on infografis images
    const infografisImages = document.querySelectorAll('.infografis-click');
    const infografisModalImage = document.getElementById('infografisModalImage');

    infografisImages.forEach(img => {
        img.addEventListener('click', function () {
            const imageSource = this.getAttribute('data-img') || this.getAttribute('src');
            if (infografisModalImage) {
                infografisModalImage.src = imageSource;
            }
        });
    });
}

// Initialize footer event listeners
function initializeFooter() {
    // Set tahun saat ini di footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadComponent('navbar-container', 'includes/navbar.html');
    loadComponent('main-content', 'beranda.html');
    loadComponent('footer-container', 'includes/footer.html');
});

// Set tahun saat ini di footer
document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
});
$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
});

// Konfigurasi WhatsApp
const phoneNumber = "6289670067215";
const message = "Halo, Bisakah anda membantu saya?";

function openWhatsApp() {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', openWhatsApp);
    }
});