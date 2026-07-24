// ═══════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS & OBSERVERS
// ═══════════════════════════════════════════════════════════════

// Skills animation counter
export function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');

    counters.forEach(counter => {
        const raw = counter.textContent.trim();
        const numMatch = raw.match(/[\d.]+/);
        if (!numMatch) return;
        const target = parseFloat(numMatch[0]);
        const isDecimal = numMatch[0].includes('.');
        const decimals = isDecimal ? (numMatch[0].split('.')[1] || '').length : 0;
        const suffix = raw.replace(/[\d.]+/, '');
        let current = 0;
        const increment = target / 80;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toFixed(decimals) + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = current.toFixed(decimals) + suffix;
            }
        }, 20);
    });
}

// Intersection Observer for scroll animations
export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe portfolio cards for individual animations
    document.querySelectorAll('.portfolio-card, .skill-card, .stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Intersection observer for individual portfolio sections
export function initPortfolioAnimations() {
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    if (portfolioSections.length === 0) return;

    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate-in class to trigger the main section animation
                entry.target.classList.add('animate-in');
                
                // Animate project tiles/cards in sequence with staggered delay
                const tiles = entry.target.querySelectorAll('.app-tile, .web-tile, .desktop-showcase');
                tiles.forEach((tile, index) => {
                    setTimeout(() => {
                        tile.style.opacity = '1';
                        tile.style.transform = 'translateY(0) scale(1)';
                    }, 600 + (index * 150)); // Start after section animation
                });
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    portfolioSections.forEach(section => {
        // Initially hide tiles for animation
        const tiles = section.querySelectorAll('.app-tile, .web-tile, .desktop-showcase');
        tiles.forEach(tile => {
            tile.style.opacity = '0';
            tile.style.transform = 'translateY(30px) scale(0.95)';
            tile.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        portfolioObserver.observe(section);
    });
}

// Trigger counter animation when stats section is visible
export function initStatsObserver() {
    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Parallax effect for floating elements
export function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Smooth reveal for skills track
export function initSkillsTrackReveal() {
    const skillsTrack = document.querySelectorAll('.skills-track');
    skillsTrack.forEach(track => {
        track.style.opacity = '0';
        track.style.animation = 'none';
        
        setTimeout(() => {
            track.style.opacity = '1';
            track.style.animation = 'scroll 30s linear infinite';
        }, 500);
    });
}

// Persistent accordion expand/contract for .web-tile project cards.
// Unlike pure CSS :hover, the expanded state sticks after the cursor
// leaves the row — whichever tile was last hovered stays expanded.
export function initWebTileAccordion() {
    const stage = document.querySelector('.web-stage');
    if (!stage) return;

    const tiles = Array.from(stage.querySelectorAll('.web-tile'));
    if (!tiles.length) return;

    function expand(tile) {
        tiles.forEach(t => t.classList.remove('expanded'));
        tile.classList.add('expanded');
    }

    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => expand(tile));
    });

    // Default: whichever tile has .active (e.g. Darb), falling back to the first tile
    const initial = stage.querySelector('.web-tile.active') || tiles[0];
    expand(initial);
}