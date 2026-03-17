// Extra visual effects
document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-panel').forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(panel);
    });

    // Add visible class styling dynamically via style injection or assume CSS handles .visible
    // Let's inject a style rule for simplicity
    const style = document.createElement('style');
    style.innerHTML = `
        .glass-panel.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Bubble Generator
    const bubbleContainer = document.getElementById('bubbles-container');
    if (bubbleContainer) {
        const bubbleCount = 40;
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // Random properties
            const size = Math.random() * 20 + 5 + 'px'; // 5px to 25px
            const left = Math.random() * 100 + '%';
            const duration = Math.random() * 2 + 1 + 's'; // 1s to 3s
            const delay = Math.random() * 2 + 's';
            const wobble = (Math.random() * 50 - 25) + 'px';

            bubble.style.width = size;
            bubble.style.height = size;
            bubble.style.left = left;
            bubble.style.animationDuration = duration;
            bubble.style.animationDelay = delay;
            bubble.style.setProperty('--wobble', wobble);

            bubbleContainer.appendChild(bubble);
        }
    }

    // Intro Animation Handler
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        // Wait for animations
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            setTimeout(() => {
                introOverlay.style.display = 'none';
                if (bubbleContainer) bubbleContainer.innerHTML = ''; // Cleanup bubbles
            }, 500);
        }, 2500);
    }
});
