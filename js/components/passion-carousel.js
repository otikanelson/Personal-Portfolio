// ═══════════════════════════════════════════════════════════════
// PASSION BUILDING - ACHIEVEMENTS CAROUSEL (wide slides + dots)
// ═══════════════════════════════════════════════════════════════

export function initAchievementsCarousel() {
    const carousel = document.getElementById('achievementsCarousel');
    const track = carousel?.querySelector('.achievements-track');
    const slides = carousel ? Array.from(carousel.querySelectorAll('.achievement-slide')) : [];
    const dots = Array.from(document.querySelectorAll('.achievements-dot'));
    const prevBtn = document.getElementById('achievementsPrev');
    const nextBtn = document.getElementById('achievementsNext');

    if (!carousel || slides.length === 0) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse drag
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = carousel.scrollLeft;
        carousel.classList.add('dragging');
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const walk = (touchStartX - touchX) * 1.2;
        carousel.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        carousel.classList.remove('dragging');
    }, { passive: true });

    // Helper: distance from slide's left edge to carousel's scroll position
    function slideOffset(index) {
        return slides[index].offsetLeft - track.offsetLeft;
    }

    function scrollToSlide(index) {
        index = Math.max(0, Math.min(slides.length - 1, index));
        carousel.scrollTo({ left: slideOffset(index), behavior: 'smooth' });
    }

    function getActiveIndex() {
        const pos = carousel.scrollLeft;
        let closest = 0;
        let closestDist = Infinity;
        slides.forEach((slide, i) => {
            const dist = Math.abs(slideOffset(i) - pos);
            if (dist < closestDist) {
                closestDist = dist;
                closest = i;
            }
        });
        return closest;
    }

    function updateActiveDot() {
        const active = getActiveIndex();
        dots.forEach((dot, i) => dot.classList.toggle('active', i === active));
    }

    carousel.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateActiveDot);
    });

    // Dot clicks
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index, 10);
            scrollToSlide(index);
        });
    });

    // Arrow buttons
    prevBtn?.addEventListener('click', () => {
        scrollToSlide(getActiveIndex() - 1);
    });

    nextBtn?.addEventListener('click', () => {
        scrollToSlide(getActiveIndex() + 1);
    });

    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToSlide(getActiveIndex() - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollToSlide(getActiveIndex() + 1);
        }
    });

    // Prevent text selection while dragging
    carousel.addEventListener('selectstart', (e) => {
        if (isDown) e.preventDefault();
    });

    updateActiveDot();

    console.log('✅ Achievements carousel (wide slides) initialized');
}