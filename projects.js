// Projects Page JavaScript - No Auto-scroll Interruption

class ProjectsCarousel {
    constructor() {
        this.currentProject = 0;
        this.totalProjects = 2;
        this.isTransitioning = false;
        this.userIsInteracting = false;
        this.interactionTimeout = null;
        
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.setActiveProject(0);
        
        console.log('📱 Mobile Projects Page Initialized');
    }

    bindElements() {
        // Main elements
        this.carousel = document.getElementById('projectCarousel');
        this.projectCards = document.querySelectorAll('.project-card');
        this.screenshots = document.querySelectorAll('.screenshot');
        this.navDots = document.querySelectorAll('.nav-dot');
        
        // Navigation buttons
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.phonePrevBtn = document.getElementById('phonePrevBtn');
        this.phoneNextBtn = document.getElementById('phoneNextBtn');
        
        // Container for interaction detection
        this.projectsContainer = document.querySelector('.projects-container');
        this.phoneContainer = document.querySelector('.phone-container');
    }

    bindEvents() {
        // Carousel navigation
        this.prevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevProject()));
        this.nextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextProject()));
        
        // Phone navigation
        this.phonePrevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevProject()));
        this.phoneNextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextProject()));
        
        // Project card clicks
        this.projectCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.handleUserInteraction(() => this.setActiveProject(index));
            });
        });
        
        // Navigation dot clicks
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.handleUserInteraction(() => this.setActiveProject(index));
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.shouldHandleKeyboard(e)) {
                this.handleKeyboard(e);
            }
        });
        
        // Touch/swipe events
        this.bindTouchEvents();
        
        // Mouse interaction detection
        this.bindMouseEvents();
        
        // Scroll interaction detection
        this.bindScrollEvents();
        
        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.userIsInteracting = true; // Prevent auto-scroll when tab is hidden
            }
        });
    }

    bindMouseEvents() {
        // Detect mouse interactions in the projects area
        const interactiveElements = [
            this.projectsContainer,
            this.phoneContainer,
            ...this.projectCards,
            ...this.navDots
        ].filter(Boolean);

        interactiveElements.forEach(element => {
            // Mouse enter - user is potentially interacting
            element.addEventListener('mouseenter', () => {
                this.userIsInteracting = true;
                this.clearInteractionTimeout();
            });
            
            // Mouse leave - start timeout to resume auto behavior
            element.addEventListener('mouseleave', () => {
                this.setInteractionTimeout();
            });
            
            // Any mouse movement within the area
            element.addEventListener('mousemove', () => {
                this.userIsInteracting = true;
                this.clearInteractionTimeout();
                this.setInteractionTimeout();
            });
        });
    }

    bindScrollEvents() {
        // Detect scrolling within project cards
        this.projectCards.forEach(card => {
            card.addEventListener('scroll', () => {
                this.handleUserInteraction();
            });
        });
        
        // Detect page scrolling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            this.userIsInteracting = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.setInteractionTimeout();
            }, 150);
        });
    }

    bindTouchEvents() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const touchElements = [this.phoneContainer, this.projectsContainer].filter(Boolean);

        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                this.handleUserInteraction();
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            element.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
            }, { passive: true });
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Determine if it's a horizontal or vertical swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    this.nextProject(); // Swipe left
                } else {
                    this.prevProject(); // Swipe right
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(diffY) > swipeThreshold) {
                if (diffY > 0) {
                    this.nextProject(); // Swipe up
                } else {
                    this.prevProject(); // Swipe down
                }
            }
        }
    }

    handleUserInteraction(callback) {
        this.userIsInteracting = true;
        this.clearInteractionTimeout();
        
        if (callback) {
            callback();
        }
        
        // Set a longer timeout after user interaction
        this.setInteractionTimeout(5000); // 5 seconds instead of default 3
    }

    setInteractionTimeout(delay = 3000) {
        this.clearInteractionTimeout();
        this.interactionTimeout = setTimeout(() => {
            this.userIsInteracting = false;
        }, delay);
    }

    clearInteractionTimeout() {
        if (this.interactionTimeout) {
            clearTimeout(this.interactionTimeout);
            this.interactionTimeout = null;
        }
    }

    shouldHandleKeyboard(e) {
        // Don't handle keyboard if user is typing in an input
        const activeElement = document.activeElement;
        const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
        return !inputElements.includes(activeElement.tagName);
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.handleUserInteraction(() => this.prevProject());
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                this.handleUserInteraction(() => this.nextProject());
                break;
            case ' ': // Spacebar
                e.preventDefault();
                this.handleUserInteraction(() => this.nextProject());
                break;
            case 'Home':
                e.preventDefault();
                this.handleUserInteraction(() => this.setActiveProject(0));
                break;
            case 'End':
                e.preventDefault();
                this.handleUserInteraction(() => this.setActiveProject(this.totalProjects - 1));
                break;
        }
    }

    setActiveProject(index) {
        if (this.isTransitioning || index === this.currentProject) {
            return;
        }

        this.isTransitioning = true;
        const previousProject = this.currentProject;
        this.currentProject = index;

        // Update 3D carousel positions
        this.update3DCarousel();
        
        // Update project cards
        this.updateProjectCards();
        
        // Update screenshots
        this.updateScreenshots();
        
        // Update navigation dots
        this.updateNavigationDots();
        
        // Smooth scroll to active card on mobile
        this.scrollToActiveCard();
        
        // Announce change for accessibility
        this.announceProjectChange();

        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    update3DCarousel() {
        this.projectCards.forEach((card, index) => {
            card.classList.remove('transitioning');
            // Force reflow
            card.offsetHeight;
            card.classList.add('transitioning');
            
            const offset = index - this.currentProject;
            const translateY = offset * 120;
            const translateZ = Math.abs(offset) * -150;
            const rotateX = Math.abs(offset) * -15;
            const zIndex = this.totalProjects - Math.abs(offset);
            
            if (index === this.currentProject) {
                card.style.transform = 'translateY(0px) translateZ(50px) rotateX(0deg)';
                card.style.zIndex = 10;
            } else {
                card.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg)`;
                card.style.zIndex = zIndex;
            }
        });
    }

    updateProjectCards() {
        this.projectCards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentProject);
        });
    }

    updateScreenshots() {
        this.screenshots.forEach((screenshot, index) => {
            screenshot.classList.toggle('active', index === this.currentProject);
        });
    }

    updateNavigationDots() {
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentProject);
        });
    }

    scrollToActiveCard() {
        // Only scroll on mobile/tablet viewports
        if (window.innerWidth <= 1024) {
            const activeCard = this.projectCards[this.currentProject];
            if (activeCard) {
                setTimeout(() => {
                    activeCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        }
    }

    announceProjectChange() {
        const projectNames = [
            'Fitness Tracker App',
            'Train Booking System', 
            'Weather Forecast App',
            'E-Commerce Shopping App'
        ];
        
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Now viewing ${projectNames[this.currentProject]}`;
        announcement.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (announcement.parentNode) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    nextProject() {
        const next = (this.currentProject + 1) % this.totalProjects;
        this.setActiveProject(next);
    }

    prevProject() {
        const prev = (this.currentProject - 1 + this.totalProjects) % this.totalProjects;
        this.setActiveProject(prev);
    }

    // Public methods for external access
    getCurrentProject() {
        return this.currentProject;
    }

    getTotalProjects() {
        return this.totalProjects;
    }

    // Method to programmatically set user interaction state
    setUserInteractionState(isInteracting) {
        this.userIsInteracting = isInteracting;
        if (isInteracting) {
            this.clearInteractionTimeout();
        } else {
            this.setInteractionTimeout();
        }
    }
}

// Enhanced error handling for images
class ImageLoader {
    static setupErrorHandling() {
        const images = document.querySelectorAll('.screenshot img');
        
        images.forEach(img => {
            img.addEventListener('loadstart', function() {
                this.parentElement.classList.add('loading');
            });
            
            img.addEventListener('load', function() {
                this.parentElement.classList.remove('loading');
            });
            
            img.addEventListener('error', function() {
                this.parentElement.classList.remove('loading');
                this.parentElement.classList.add('error');
                console.warn('Failed to load screenshot:', this.src);
                
                // Create fallback content
                const fallback = document.createElement('div');
                fallback.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                `;
                fallback.innerHTML = '📱<br>Preview<br>Unavailable';
                this.parentElement.appendChild(fallback);
            });
        });
    }
}

// Performance optimization utilities
class PerformanceOptimizer {
    static optimize() {
        // Add will-change property for better performance
        const animatedElements = document.querySelectorAll('.project-card, .screenshot, .nav-dot');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        // Remove will-change after initial animations
        setTimeout(() => {
            animatedElements.forEach(element => {
                element.style.willChange = 'auto';
            });
        }, 2000);
        
        // Preload next/previous images
        this.preloadImages();
    }
    
    static preloadImages() {
        const screenshots = document.querySelectorAll('.screenshot img');
        screenshots.forEach(img => {
            const imageUrl = img.src;
            if (imageUrl) {
                const preloadImg = new Image();
                preloadImg.src = imageUrl;
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel
    window.projectsCarousel = new ProjectsCarousel();
    
    // Setup image error handling
    ImageLoader.setupErrorHandling();
    
    // Apply performance optimizations
    PerformanceOptimizer.optimize();
    
    // Add intersection observer for performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    console.log(`
🚀 Mobile Projects Page Loaded Successfully!
📱 Navigation Options:
   • Click project cards to switch
   • Use arrow buttons or navigation dots
   • Keyboard: Arrow keys, Space, Home/End
   • Touch: Swipe gestures supported
   • Auto-scroll: Disabled during user interaction

✨ Features:
   • 3D carousel effect
   • Smart interaction detection
   • No interruption during manual navigation
   • Responsive design
   • Accessibility support
   • Performance optimized
`);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsCarousel, ImageLoader, PerformanceOptimizer };
}