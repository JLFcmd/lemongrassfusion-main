// Main Application Logic
document.addEventListener('DOMContentLoaded', async () => {
    await loadPartials();
    initMobileMenu();
    initScrollEffects();
    initParticles();
});

function initParticles() {
    const script = document.createElement('script');
    script.src = 'assets/js/components/click-spark.js';
    document.body.appendChild(script);
}

async function loadPartials() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    if (headerContainer) {
        try {
            const response = await fetch('partials/header.html');
            if (response.ok) {
                headerContainer.innerHTML = await response.text();
                // Re-initialize menu listeners after injection
                initMobileMenu();
            }
        } catch (e) {
            console.error('Error loading header:', e);
        }
    }

    if (footerContainer) {
        try {
            const response = await fetch('partials/footer.html');
            if (response.ok) {
                footerContainer.innerHTML = await response.text();
            }
        } catch (e) {
            console.error('Error loading footer:', e);
        }
    }
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
        // Remove old listeners to avoid duplicates if re-initialized
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);

        newToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = newToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
                // Clean up any inline styles if they existed previously
                header.style.background = '';
            }
        }
    });
}
