/**
 * Dynamic Component Loader dengan URL Routing
 * Memungkinkan loading berbagai halaman berdasarkan URL parameter
 */

class ComponentLoader {
    constructor() {
        this.currentPage = 'beranda';
        this.components = {
            beranda: 'beranda.html',
            profil: 'profil-rsudkl.html',
            ppid: 'ppid-rsudkl.html',
            regulasi: 'regulasi-ppid.html',
            galeri: 'galeri-foto.html'
        };
    }

    // Load komponen ke container
    load(containerId, componentPath) {
        const container = document.getElementById(containerId);
        if (!container) return Promise.reject(`Container ${containerId} not found`);

        return fetch(componentPath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                this.reinitializeScripts(containerId);
                return html;
            })
            .catch(error => {
                console.error('Error loading component:', error);
                container.innerHTML = `<div class="alert alert-danger">Gagal memuat komponen</div>`;
            });
    }

    // Reinitialize scripts berdasarkan komponen yang dimuat
    reinitializeScripts(containerId) {
        switch(containerId) {
            case 'navbar-container':
                this.initializeNavbar();
                break;
            case 'main-content':
                this.initializeContent();
                break;
            case 'footer-container':
                this.initializeFooter();
                break;
        }
    }

    // Initialize navbar
    initializeNavbar() {
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                const href = anchor.getAttribute('href');
                if (href.startsWith('#') && !href.endsWith('.html')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Active link tracking
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            let current = '';

            sections.forEach(section => {
                if (window.scrollY >= (section.offsetTop - 100)) {
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

    // Initialize content
    initializeContent() {
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
    }

    // Initialize footer
    initializeFooter() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Load all default components
    loadAll() {
        return Promise.all([
            this.load('navbar-container', 'includes/navbar.html'),
            this.load('main-content', 'beranda.html'),
            this.load('footer-container', 'includes/footer.html')
        ]);
    }

    // Load page berdasarkan nama
    loadPage(pageName) {
        if (this.components[pageName]) {
            this.currentPage = pageName;
            return this.load('main-content', this.components[pageName]);
        }
        console.error(`Page ${pageName} not found`);
        return Promise.reject(`Page ${pageName} not found`);
    }
}

// Initialize loader
const loader = new ComponentLoader();

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loader.loadAll().then(() => {
        console.log('Semua komponen berhasil dimuat');
    });
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

// WhatsApp button
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