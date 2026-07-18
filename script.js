// ═══════════════════════════════════════════════════════════════
// FIGMA CURSOR - SEAMLESS SMOOTH MOTION
// ═══════════════════════════════════════════════════════════════
(function initFigmaCursor() {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'figma-cursor';
    cursor.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Perfectly smooth cursor animation with consistent easing
    function animateCursor() {
        // Calculate distance to target
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        // Consistent smooth easing - no complex calculations
        const ease = 0.15;
        
        // Simple linear interpolation for seamless movement
        cursorX += dx * ease;
        cursorY += dy * ease;
        
        // Use translate3d for hardware acceleration without rounding
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start the smooth animation
    animateCursor();

    // Add click effect with smooth transition
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    // Add hover effect for interactive elements
    const interactiveElements = 'a, button, .btn, .nav-link, .app-tile, .web-tile, .skill-card, input, textarea, .desktop-carousel, .carousel-btn';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.remove('hovering');
        }
    });
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
})();

// Tab functionality
function openTab(evt, tabName) {
    var i, tabContent, tabButtons;
    
    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }
    
    // Remove active class from all tab buttons
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Portfolio category navigation
function navigateToCategory(category) {
    const portfolioSection = document.getElementById('portfolio') || document.getElementById('mobile-portfolio');
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enhanced scroll progress for entire page
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
}
// Sticky Stack Cards Animation Function
function initStickyStackCards() {
    const stackCards = document.querySelectorAll('.stack-card');
    const stackContainer = document.querySelector('.sticky-stack-container');
    
    if (!stackCards.length || !stackContainer) return;
    
    let currentCard = 0;
    const totalCards = stackCards.length;
    let isAnimating = false;
    
    function updateStackCards() {
        const containerRect = stackContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress through the container
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - containerTop) / (containerHeight - windowHeight)));
        
        // Calculate which card should be active
        const cardProgress = scrollProgress * (totalCards + 1); // +1 for smoother transitions
        const newCurrentCard = Math.min(Math.floor(cardProgress), totalCards - 1);
        const cardTransition = cardProgress - newCurrentCard;
        
        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(() => {
                stackCards.forEach((card, index) => {
                    card.classList.remove('active', 'stacked', 'exit');
                    
                    if (index < newCurrentCard) {
                        // Cards that have passed
                        card.classList.add('exit');
                    } else if (index === newCurrentCard) {
                        // Current active card
                        card.classList.add('active');
                        
                        // Animate skill items when card becomes active
                        if (index !== currentCard) {
                            const skillItems = card.querySelectorAll('.skill-item');
                            skillItems.forEach((item, skillIndex) => {
                                item.style.animationDelay = `${0.1 + skillIndex * 0.1}s`;
                            });
                        }
                    } else if (index === newCurrentCard + 1 && cardTransition > 0.5) {
                        // Next card sliding in
                        const slideProgress = (cardTransition - 0.5) * 2; // 0 to 1
                        card.classList.add('active');
                        card.style.transform = `translateX(${100 - slideProgress * 100}%) scale(${0.8 + slideProgress * 0.2})`;
                        card.style.opacity = slideProgress;
                    } else if (index > newCurrentCard) {
                        // Cards stacked behind
                        card.classList.add('stacked');
                    }
                });
                
                currentCard = newCurrentCard;
                isAnimating = false;
            });
        }
    }
    // Initialize first card as active
    if (stackCards.length > 0) {
        stackCards[0].classList.add('active');
    }
    
    // Optimized scroll handler with throttling
    let scrollTimeout;
    function handleScroll() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateStackCards();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    }
    
    // Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', handleScroll, { passive: true });
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px 0px'
    });
    
    observer.observe(stackContainer);
    
    // Initial call
    updateStackCards();
    
    // Add scroll indicator for skills section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'skills-scroll-indicator';
        scrollIndicator.innerHTML = `
            <div class="scroll-hint">
                <i class="fas fa-mouse"></i>
                <span>Scroll to explore skills</span>
                <div class="scroll-arrow">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
        `;
        skillsSection.appendChild(scrollIndicator);
        
        // Hide indicator after user starts scrolling
        let hasScrolled = false;
        function hideIndicator() {
            if (!hasScrolled) {
                hasScrolled = true;
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            }
        }
        
        window.addEventListener('scroll', hideIndicator, { once: true });
    }
}
// Skills animation counter
function animateCounters() {
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

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll progress
    initScrollProgress();
    
    // Initialize infinite carousel for skills
    setTimeout(initInfiniteCarousel, 100);
    
    // Skills Stack Animation
    initSkillsStack();

    // Update navigation links to be active based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = this.querySelector('input[placeholder="Your Name"]')?.value;
            const email = this.querySelector('input[placeholder="Your Email"]')?.value;
            const subject = this.querySelector('input[placeholder="Subject"]')?.value;
            const message = this.querySelector('textarea[placeholder="Your Message"]')?.value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message (in a real app, you'd send this to a server)
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }

    // Mobile sidebar toggle functionality
    const menuToggle = document.querySelector('#menuToggle');
    const mobileSidebar = document.querySelector('#mobileSidebar');
    const sidebarOverlay = document.querySelector('#sidebarOverlay');
    
    if (menuToggle && mobileSidebar && sidebarOverlay) {
        // Close sidebar function
        function closeSidebar() {
            mobileSidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Update icon back to hamburger
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        // Toggle sidebar (open/close)
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if sidebar is currently open
            const isOpen = mobileSidebar.classList.contains('open');
            
            if (isOpen) {
                // Close sidebar
                closeSidebar();
            } else {
                // Open sidebar
                mobileSidebar.classList.add('open');
                sidebarOverlay.classList.add('active');
                menuToggle.classList.add('active');
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
                
                // Update icon to X
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
        
        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Close sidebar when clicking a nav link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                closeSidebar();
            });
        });
        
        // Close sidebar on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        });
    }

    // Intersection Observer for scroll animations
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

    // Enhanced portfolio card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        // Add mouse enter effect
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to icon
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = 'pulse 0.6s ease-in-out';
            }
        });
        
        // Reset animation on mouse leave
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
        
        // Add click effect
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
    // Intersection observer for individual portfolio sections
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    if (portfolioSections.length > 0) {
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

    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
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

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Smooth reveal for skills track
    const skillsTrack = document.querySelectorAll('.skills-track');
    skillsTrack.forEach(track => {
        track.style.opacity = '0';
        track.style.animation = 'none';
        
        setTimeout(() => {
            track.style.opacity = '1';
            track.style.animation = 'scroll 30s linear infinite';
        }, 500);
    });
});

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile sidebar
    if (e.key === 'Escape') {
        const mobileSidebar = document.querySelector('#mobileSidebar');
        const sidebarOverlay = document.querySelector('#sidebarOverlay');
        const menuToggle = document.querySelector('#menuToggle');
        
        if (mobileSidebar && mobileSidebar.classList.contains('open')) {
            mobileSidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Update icon back to hamburger
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Console welcome message
console.log(`
🚀 Welcome to Nelson Otika's Portfolio!
👨‍💻 Software Engineering Student | UI/UX Designer | App Developer
📧 Contact: otikanelson29@gmail.com
🔗 GitHub: https://github.com/otikanelson

Thanks for checking out the source code! 😊
`);

// Simplified Skills Stack Animation
function initSkillsStack() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillsContainer = document.querySelector('.skills-container');
    
    if (!skillCards.length) return;
    
    let currentIndex = 0;
    const totalCards = skillCards.length;
    let autoPlayTimer;
    let isAutoPlaying = true;
    
    // Create navigation dots
    const navContainer = document.createElement('div');
    navContainer.className = 'skills-navigation';
    
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToCard(i));
        navContainer.appendChild(dot);
    }
    
    skillsContainer.appendChild(navContainer);
    
    function showCard(index) {
        skillCards.forEach((card, i) => {
            card.classList.remove('active', 'previous');
            
            if (i === index) {
                card.classList.add('active');
                
                // Animate skill progress bars
                const progressBars = card.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, barIndex) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200 + (barIndex * 100));
                });
                
            } else if (i < index) {
                card.classList.add('previous');
            }
        });
        
        // Update navigation dots
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    function goToCard(index) {
        if (index >= 0 && index < totalCards) {
            showCard(index);
            resetAutoPlay();
        }
    }
    
    function nextCard() {
        const nextIndex = (currentIndex + 1) % totalCards;
        showCard(nextIndex);
    }
    
    function startAutoPlay() {
        if (!isAutoPlaying) return;
        
        autoPlayTimer = setTimeout(() => {
            nextCard();
            startAutoPlay();
        }, 4000);
    }
    
    function resetAutoPlay() {
        clearTimeout(autoPlayTimer);
        if (isAutoPlaying) {
            startAutoPlay();
        }
    }
    
    function stopAutoPlay() {
        isAutoPlaying = false;
        clearTimeout(autoPlayTimer);
    }
    
    // Initialize
    showCard(0);
    
    // Start auto-play when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoPlay();
            } else {
                stopAutoPlay();
            }
        });
    }, { threshold: 0.5 });
    
    const skillsStack = document.querySelector('.skills-stack');
    if (skillsStack) {
        observer.observe(skillsStack);
        
        // Pause on hover
        skillsStack.addEventListener('mouseenter', stopAutoPlay);
        skillsStack.addEventListener('mouseleave', () => {
            isAutoPlaying = true;
            resetAutoPlay();
        });
    }
}
// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Console welcome message
console.log(`
🚀 Welcome to Nelson Otika's Portfolio!
👨‍💻 Software Engineering Student | UI/UX Designer | App Developer
📧 Contact: otikanelson29@gmail.com
🔗 GitHub: https://github.com/otikanelson

Thanks for checking out the source code! 😊
`);
// Simple Sticky Stack Cards Animation
function initStackCards() {
    const skillsSection = document.querySelector('.skills-section');
    const cards = document.querySelectorAll('.card');
    
    if (!skillsSection || !cards.length) return;
    
    window.addEventListener('scroll', () => {
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollY = window.pageYOffset;
        
        // Calculate progress through the section
        const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / (sectionHeight - window.innerHeight)));
        
        // Calculate which card should be active
        const cardIndex = Math.floor(progress * cards.length);
        
        cards.forEach((card, index) => {
            if (index <= cardIndex) {
                // Card is active or has passed
                const offset = (index - cardIndex) * 20;
                const rotation = (index - cardIndex) * 5;
                const scale = 1 - Math.abs(index - cardIndex) * 0.1;
                
                card.style.transform = `translateX(${offset}px) rotate(${rotation}deg) scale(${scale})`;
                card.style.zIndex = cards.length - Math.abs(index - cardIndex);
            } else {
                // Card is waiting
                const offset = (index - cardIndex) * 100;
                card.style.transform = `translateX(${offset}%) rotate(${index * 5}deg)`;
                card.style.zIndex = cards.length - index;
            }
        });
    });
}

// Initialize stack cards when DOM is ready
initStackCards();

// ═══════════════════════════════════════════════════════════════
// SKILLS CAROUSEL - CSS MARQUEE (NO JAVASCRIPT NEEDED)
// ═══════════════════════════════════════════════════════════════
function initInfiniteCarousel() {
    // This function is now minimal since CSS handles the marquee
    console.log('CSS Marquee carousels initialized - no JavaScript animation needed!');
    
    // Optional: Log which carousels are found
    const carousels = document.querySelectorAll('.skills-carousel');
    carousels.forEach((carousel, index) => {
        const groups = carousel.querySelectorAll('.marquee-group');
        console.log(`Carousel ${index}: Found ${groups.length} marquee groups`);
    });
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Stop all existing animations
        document.querySelectorAll('.skills-carousel').forEach(carousel => {
            const animationId = carousel.getAttribute('data-animation-id');
            if (animationId) {
                cancelAnimationFrame(parseInt(animationId));
            }
            carousel.style.animation = 'none';
            carousel.style.transform = 'translateX(0)';
            
            // Remove clones
            const clones = carousel.querySelectorAll('.skill-card.cloned');
            clones.forEach(clone => clone.remove());
        });
        
        // Clean up styles
        document.querySelectorAll('[id^="carousel-style-"]').forEach(style => style.remove());
        
        // Reinitialize after cleanup
        setTimeout(initInfiniteCarousel, 50);
    }, 300);
});