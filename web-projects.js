// Web Projects Page JavaScript - Same structure as mobile projects

class WebProjectsCarousel {
    constructor() {
        this.currentProject = 0;
        this.totalProjects = 4;
        this.isTransitioning = false;
        this.userIsInteracting = false;
        this.interactionTimeout = null;
        
        // URL mappings for different projects
        this.projectUrls = {
            0: 'https://nelsonotika.dev',
            1: 'https://nelsonotika.dev/shop',
            2: 'https://nelsonotika.dev/celebration',
            3: 'https://nelsonotika.dev/tasks'
        };
        
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.setActiveProject(0);
        
        console.log('🌐 Web Projects Page Initialized');
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
        this.browserPrevBtn = document.getElementById('browserPrevBtn');
        this.browserNextBtn = document.getElementById('browserNextBtn');
        
        // Browser specific elements
        this.urlText = document.getElementById('currentUrl');
        this.browserFrame = document.querySelector('.browser-frame');
        this.browserButtons = document.querySelectorAll('.browser-buttons span');
        this.browserUrl = document.querySelector('.browser-url');
        
        // Container for interaction detection
        this.projectsContainer = document.querySelector('.projects-container');
        this.browserContainer = document.querySelector('.browser-container');
    }

    bindEvents() {
        // Carousel navigation
        this.prevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevProject()));
        this.nextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextProject()));
        
        // Browser navigation
        this.browserPrevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevProject()));
        this.browserNextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextProject()));
        
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
        
        // Browser button interactions
        this.browserButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleUserInteraction(() => this.handleBrowserButtonClick(button.className));
            });
        });
        
        // Browser URL bar click
        this.browserUrl?.addEventListener('click', () => {
            this.handleUserInteraction(() => this.handleUrlBarClick());
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
                this.userIsInteracting = true;
            }
        });
    }

    bindMouseEvents() {
        const interactiveElements = [
            this.projectsContainer,
            this.browserContainer,
            ...this.projectCards,
            ...this.navDots
        ].filter(Boolean);

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.userIsInteracting = true;
                this.clearInteractionTimeout();
            });
            
            element.addEventListener('mouseleave', () => {
                this.setInteractionTimeout();
            });
            
            element.addEventListener('mousemove', () => {
                this.userIsInteracting = true;
                this.clearInteractionTimeout();
                this.setInteractionTimeout();
            });
        });
    }

    bindScrollEvents() {
        this.projectCards.forEach(card => {
            card.addEventListener('scroll', () => {
                this.handleUserInteraction();
            });
        });
        
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

        const touchElements = [this.browserContainer, this.projectsContainer].filter(Boolean);

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

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    this.nextProject();
                } else {
                    this.prevProject();
                }
            }
        } else {
            if (Math.abs(diffY) > swipeThreshold) {
                if (diffY > 0) {
                    this.nextProject();
                } else {
                    this.prevProject();
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
        
        this.setInteractionTimeout(5000);
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
            case ' ':
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
            case 'r':
                if (e.metaKey || e.ctrlKey) {
                    e.preventDefault();
                    this.handleUserInteraction(() => this.refreshBrowser());
                }
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
        
        // Update browser URL
        this.updateBrowserUrl();
        
        // Smooth scroll to active card on mobile
        this.scrollToActiveCard();
        
        // Announce change for accessibility
        this.announceProjectChange();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    update3DCarousel() {
        this.projectCards.forEach((card, index) => {
            card.classList.remove('transitioning');
            card.offsetHeight;
            card.classList.add('transitioning');
            
            const offset = index - this.currentProject;
            // Reduced translateY multiplier from 120 to 60 to minimize space
            const translateY = offset * 60; // Changed from 120
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

    updateBrowserUrl() {
        if (this.urlText) {
            const newUrl = this.projectUrls[this.currentProject];
            this.urlText.classList.add('updating');
            
            setTimeout(() => {
                this.urlText.textContent = newUrl;
                this.urlText.classList.remove('updating');
            }, 300);
        }
    }

    scrollToActiveCard() {
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
            'Personal Portfolio Website',
            'E-commerce Platform', 
            'Interactive Birthday Site',
            'Task Management App'
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

    // Browser specific interactions
    handleBrowserButtonClick(buttonType) {
        switch(buttonType) {
            case 'btn-close':
                this.animateBrowserAction('close');
                break;
            case 'btn-minimize':
                this.animateBrowserAction('minimize');
                break;
            case 'btn-maximize':
                this.animateBrowserAction('maximize');
                break;
        }
    }

    animateBrowserAction(action) {
        if (!this.browserFrame) return;
        
        switch(action) {
            case 'close':
                this.browserFrame.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    this.browserFrame.style.animation = 'fadeIn 0.3s ease-out';
                }, 300);
                break;
                
            case 'minimize':
                this.browserFrame.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    this.browserFrame.style.transform = '';
                }, 300);
                break;
                
            case 'maximize':
                this.browserFrame.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.browserFrame.style.transform = '';
                }, 300);
                break;
        }
    }

    handleUrlBarClick() {
        if (this.browserUrl) {
            this.browserUrl.classList.add('focused');
            setTimeout(() => {
                this.browserUrl.classList.remove('focused');
            }, 2000);
        }
    }

    refreshBrowser() {
        if (this.browserFrame) {
            this.browserFrame.classList.add('refreshing');
            setTimeout(() => {
                this.browserFrame.classList.remove('refreshing');
            }, 600);
        }
    }

    nextProject() {
        const next = (this.currentProject + 1) % this.totalProjects;
        this.setActiveProject(next);
    }

    prevProject() {
        const prev = (this.currentProject - 1 + this.totalProjects) % this.totalProjects;
        this.setActiveProject(prev);
    }

    getCurrentProject() {
        return this.currentProject;
    }

    getTotalProjects() {
        return this.totalProjects;
    }

    setUserInteractionState(isInteracting) {
        this.userIsInteracting = isInteracting;
        if (isInteracting) {
            this.clearInteractionTimeout();
        } else {
            this.setInteractionTimeout();
        }
    }
}

// Enhanced error handling for web project images
class WebImageLoader {
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
                console.warn('Failed to load web project screenshot:', this.src);
                
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
                fallback.innerHTML = '🌐<br>Website<br>Preview<br>Unavailable';
                this.parentElement.appendChild(fallback);
            });
        });
    }
}

// Performance optimization utilities
class WebPerformanceOptimizer {
    static optimize() {
        const animatedElements = document.querySelectorAll('.project-card, .screenshot, .nav-dot, .browser-frame');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        setTimeout(() => {
            animatedElements.forEach(element => {
                element.style.willChange = 'auto';
            });
        }, 2000);
        
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
    window.webProjectsCarousel = new WebProjectsCarousel();
    
    // Setup image error handling
    WebImageLoader.setupErrorHandling();
    
    // Apply performance optimizations
    WebPerformanceOptimizer.optimize();
    
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
🚀 Web Projects Page Loaded Successfully!
🌐 Navigation Options:
   • Click project cards to switch
   • Use arrow buttons or navigation dots
   • Keyboard: Arrow keys, Space, Home/End, Cmd+R
   • Touch: Swipe gestures supported
   • Browser controls: Interactive buttons and URL bar

✨ Features:
   • 3D carousel effect
   • Browser mockup with interactive elements
   • Smart interaction detection
   • No interruption during manual navigation
   • Responsive design
   • Accessibility support
   • Performance optimized
`);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WebProjectsCarousel, WebImageLoader, WebPerformanceOptimizer };
}