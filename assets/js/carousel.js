/* Simple Carousel Logic */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    // Configuration
    const imageFolder = 'assets/images/carousel/';
    const imageCount = 5; // We assume user puts up to 5 images: slide1.jpg, slide2.jpg, etc.
    const intervalTime = 4000;

    // Generate slides dynamically trying to find images
    // Since we can't easily check file existence with client-side JS without 404 errors showing in console,
    // we will generate the HTML for them and let the onerror handle hiding them or showing placeholders.
    // However, for a smoother experience, we'll create slides and assume the user provides 'slide1.jpg', 'slide2.jpg'.

    let html = '';
    for (let i = 1; i <= imageCount; i++) {
        // Active class for first slide
        const activeClass = i === 1 ? 'active' : '';
        html += `
            <div class="carousel-slide ${activeClass}" 
                 style="background-image: url('${imageFolder}slide${i}.jpg');">
            </div>
        `;
    }
    track.innerHTML = html;

    // Dots
    const dotsContainer = document.querySelector('.carousel-dots');
    let dotsHtml = '';
    for (let i = 0; i < imageCount; i++) {
        dotsHtml += `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`;
    }
    dotsContainer.innerHTML = dotsHtml;

    // Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Auto Play
    let timer = setInterval(nextSlide, intervalTime);

    // Manual Nav
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            currentIndex = parseInt(dot.dataset.index);
            showSlide(currentIndex);
            timer = setInterval(nextSlide, intervalTime);
        });
    });
});
