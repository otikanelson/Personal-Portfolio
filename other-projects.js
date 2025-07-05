class OtherProjectsCarousel {
    constructor() {
        this.currentProject = 0;
        this.totalProjects = 4;
        this.isTransitioning = false;
        this.userIsInteracting = false;
        this.interactionTimeout = null;
        
        // Application data for window titles and icons
        this.applicationData = {
            0: {
                title: 'Paint Application',
                icon: 'fas fa-paint-brush'
            },
            1: {
                title: 'Puzzle Game',
                icon: 'fas fa-puzzle-piece'
            },
            2: {
                title: 'Inventory Management',
                icon: 'fas fa-database'
            },
            3: {
                title: 'Algorithm Visualizer',
                icon: 'fas fa-project-diagram'
            }
        };
        
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.setActiveProject(0);
        this.initializeDesktopFeatures();
        
        console.log('💻 Other Projects Page Initialized');
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
        this.desktopPrevBtn = document.getElementById('desktopPrevBtn');
        this.desktopNextBtn = document.getElementById('desktopNextBtn');
        
        // Desktop specific elements
        this.desktopFrame = document.querySelector('.desktop-frame');
        this.appWindows = document.querySelectorAll('.app-window');
        this.appIcons = document.querySelectorAll('.app-icon');
        this.startButton = document.querySelector('.start-button');
        this.windowControls = document.querySelectorAll('.window-controls span');
        this.timeDisplay = document.querySelector('.time');
        
        // Container for interaction detection
        this.projectsContainer = document.querySelector('.projects-container');
        this.desktopContainer = document.querySelector('.desktop-container');
    }

    bindEvents() {
        // Carousel navigation
        this.prevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevProject()));
        this.nextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextProject()));
        
        // Desktop navigation
        this.desktopPrevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevProject()));
        this.desktopNextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextProject()));
        
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
        
        // Desktop app icon clicks
        this.appIcons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                this.handleUserInteraction(() => this.setActiveProject(index));
                this.animateIconClick(icon);
            });
        });
        
        // Window control interactions
        this.windowControls.forEach(control => {
            control.addEventListener('click', () => {
                this.handleUserInteraction(() => this.handleWindowControl(control.className));
            });
        });
        
        // Start button interaction
        this.startButton?.addEventListener('click', () => {
            this.handleUserInteraction(() => this.handleStartButtonClick());
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
            this.desktopContainer,
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

        const touchElements = [this.desktopContainer, this.projectsContainer].filter(Boolean);

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
            case 'F5':
                e.preventDefault();
                this.handleUserInteraction(() => this.refreshDesktop());
                break;
        }
    }

    setActiveProject(index) {
        if (this.isTransitioning || index === this.currentProject) {
            return;
        }

        this.isTransitioning = true;
        this.currentProject = index;

        // Update 3D carousel positions
        this.update3DCarousel();
        
        // Update project cards
        this.updateProjectCards();
        
        // Update desktop display
        this.updateDesktopDisplay();
        
        // Update navigation dots
        this.updateNavigationDots();
        
        // Update window title
        this.updateWindowTitle();
        
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

    updateDesktopDisplay() {
        // Update app windows
        this.appWindows.forEach((window, index) => {
            window.classList.toggle('active', index === this.currentProject);
        });
        
        // Update app icons in taskbar
        this.appIcons.forEach((icon, index) => {
            icon.classList.toggle('active', index === this.currentProject);
        });
        
        // Add desktop transition effect
        if (this.desktopFrame) {
            this.desktopFrame.setAttribute('data-project', this.currentProject);
        }
    }

    updateNavigationDots() {
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentProject);
        });
    }

    updateWindowTitle() {
        const activeWindow = document.querySelector('.app-window.active');
        const appData = this.applicationData[this.currentProject];
        
        if (activeWindow && appData) {
            const windowTitle = activeWindow.querySelector('.window-title');
            if (windowTitle) {
                const icon = windowTitle.querySelector('i');
                const textNodes = Array.from(windowTitle.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                
                if (icon) {
                    icon.className = appData.icon;
                }
                
                // Update text content while preserving structure
                windowTitle.innerHTML = `<i class="${appData.icon}"></i> ${appData.title}`;
            }
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
            'JavaFX Paint Application',
            '2D Puzzle Game', 
            'Inventory Management System',
            'Algorithm Visualizer'
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

    // Desktop specific interactions
    handleWindowControl(controlType) {
        switch(controlType) {
            case 'close':
                this.animateWindowAction('close');
                break;
            case 'minimize':
                this.animateWindowAction('minimize');
                break;
            case 'maximize':
                this.animateWindowAction('maximize');
                break;
        }
    }

    animateWindowAction(action) {
        const activeWindow = document.querySelector('.app-window.active');
        if (!activeWindow) return;
        
        switch(action) {
            case 'close':
                activeWindow.style.animation = 'windowMinimize 0.3s ease-out';
                setTimeout(() => {
                    activeWindow.style.animation = '';
                }, 300);
                break;
                
            case 'minimize':
                activeWindow.classList.add('minimizing');
                setTimeout(() => {
                    activeWindow.classList.remove('minimizing');
                }, 400);
                break;
                
            case 'maximize':
                activeWindow.classList.add('maximizing');
                setTimeout(() => {
                    activeWindow.classList.remove('maximizing');
                }, 400);
                break;
        }
    }

    handleStartButtonClick() {
        if (this.startButton) {
            this.startButton.classList.add('clicked');
            setTimeout(() => {
                this.startButton.classList.remove('clicked');
            }, 300);
        }
    }

    animateIconClick(icon) {
        icon.classList.add('clicked');
        setTimeout(() => {
            icon.classList.remove('clicked');
        }, 300);
    }

    refreshDesktop() {
        if (this.desktopFrame) {
            this.desktopFrame.style.animation = 'desktopBoot 0.6s ease-out';
            setTimeout(() => {
                this.desktopFrame.style.animation = '';
            }, 600);
        }
    }

    initializeDesktopFeatures() {
        // Initialize desktop boot animation
        setTimeout(() => {
            if (this.desktopFrame) {
                this.desktopFrame.classList.add('booting');
            }
        }, 300);
        
        // Update time display
        this.updateTimeDisplay();
        setInterval(() => this.updateTimeDisplay(), 1000);
    }

    updateTimeDisplay() {
        if (this.timeDisplay) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
            this.timeDisplay.textContent = timeString;
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

// Enhanced error handling for other project images
class OtherImageLoader {
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
                console.warn('Failed to load other project screenshot:', this.src);
                
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
                fallback.innerHTML = '💻<br>Desktop App<br>Preview<br>Unavailable';
                this.parentElement.appendChild(fallback);
            });
        });
    }
}

// Performance optimization utilities
class OtherPerformanceOptimizer {
    static optimize() {
        const animatedElements = document.querySelectorAll('.project-card, .screenshot, .nav-dot, .desktop-frame, .app-window');
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
    window.otherProjectsCarousel = new OtherProjectsCarousel();
    
    // Setup image error handling
    OtherImageLoader.setupErrorHandling();
    
    // Apply performance optimizations
    OtherPerformanceOptimizer.optimize();
    
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
🚀 Other Projects Page Loaded Successfully!
💻 Navigation Options:
   • Click project cards to switch
   • Use arrow buttons or navigation dots
   • Click taskbar icons or window controls
   • Keyboard: Arrow keys, Space, Home/End, F5
   • Touch: Swipe gestures supported

✨ Features:
   • 3D carousel effect
   • Desktop environment mockup
   • Interactive taskbar and windows
   • Smart interaction detection
   • No interruption during manual navigation
   • Responsive design
   • Accessibility support
   • Performance optimized
`);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OtherProjectsCarousel, OtherImageLoader, OtherPerformanceOptimizer };
}