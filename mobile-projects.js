// Mobile Projects JavaScript - PROPER HTML + JS STRUCTURE FIX

class ProjectsCarousel {
    constructor() {
        this.currentProject = 0;
        this.totalProjects = 3;
        this.currentScreenshots = [0, 0, 0]; // Track current screenshot for each project
        this.isTransitioning = false;
        this.userIsInteracting = false;
        this.interactionTimeout = null;
        
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.setActiveProject(0);
        this.initializeScreenshotIndicators();
        
        console.log('📱 Mobile Projects Page Initialized (HTML+JS Structure)');
    }

    bindElements() {
        // Main elements
        this.carousel = document.getElementById('projectCarousel');
        this.projectCards = document.querySelectorAll('.project-card');
        this.projectScreenshotGroups = document.querySelectorAll('.project-screenshots');
        this.navDots = document.querySelectorAll('.nav-dot');
        
        // Navigation buttons
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.phonePrevBtn = document.getElementById('phonePrevBtn');
        this.phoneNextBtn = document.getElementById('phoneNextBtn');
        
        // Phone specific elements
        this.phoneNavigation = document.querySelector('.phone-navigation');
        this.screenshotIndicators = document.querySelector('.screenshot-indicators');
        
        // Container for interaction detection
        this.projectsContainer = document.querySelector('.projects-container');
        this.phoneContainer = document.querySelector('.phone-container');
    }

    bindEvents() {
        // Carousel navigation (changes projects)
        this.prevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevProject()));
        this.nextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextProject()));
        
        // Phone navigation (cycles through screenshots of current project) - FIXED
        this.phonePrevBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.prevScreenshot()));
        this.phoneNextBtn?.addEventListener('click', () => this.handleUserInteraction(() => this.nextScreenshot()));
        
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
                this.userIsInteracting = true;
            }
        });
    }

    bindMouseEvents() {
        const interactiveElements = [
            this.projectsContainer,
            this.phoneContainer,
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
                this.handleSwipeOnMockup(touchStartX, touchStartY, touchEndX, touchEndY, e.target);
            }, { passive: true });
        });
    }

    // Separate swipe handling for mockup vs carousel
    handleSwipeOnMockup(startX, startY, endX, endY, target) {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;

        // Check if swipe was on phone mockup
        const isPhoneSwipe = target.closest('.phone-container');

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > swipeThreshold) {
                if (isPhoneSwipe) {
                    // Swipe on phone mockup - change screenshots
                    if (diffX > 0) {
                        this.nextScreenshot();
                    } else {
                        this.prevScreenshot();
                    }
                } else {
                    // Swipe outside phone - change projects
                    if (diffX > 0) {
                        this.nextProject();
                    } else {
                        this.prevProject();
                    }
                }
            }
        } else {
            if (Math.abs(diffY) > swipeThreshold) {
                // Vertical swipes always change projects
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
                e.preventDefault();
                this.handleUserInteraction(() => this.prevScreenshot()); // Screenshot navigation
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.handleUserInteraction(() => this.nextScreenshot()); // Screenshot navigation
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.handleUserInteraction(() => this.prevProject()); // Project navigation
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.handleUserInteraction(() => this.nextProject()); // Project navigation
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
        
        // Update screenshot groups
        this.updateScreenshotGroups();
        
        // Update navigation dots
        this.updateNavigationDots();
        
        // Update phone navigation visibility
        this.updatePhoneNavigationVisibility();
        
        // Update screenshot indicators
        this.updateScreenshotIndicators();
        
        // Smooth scroll to active card on mobile
        this.scrollToActiveCard();
        
        // Announce change for accessibility
        this.announceProjectChange();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }

    // Screenshot navigation methods
    nextScreenshot() {
        const currentProjectGroup = document.querySelector(`.project-screenshots[data-project="${this.currentProject}"]`);
        if (!currentProjectGroup) return;
        
        const screenshots = currentProjectGroup.querySelectorAll('.screenshot');
        if (screenshots.length <= 1) return; // No need to navigate if only one screenshot
        
        const currentScreenshot = this.currentScreenshots[this.currentProject];
        const nextScreenshot = (currentScreenshot + 1) % screenshots.length;
        
        this.setActiveScreenshot(nextScreenshot);
    }

    prevScreenshot() {
        const currentProjectGroup = document.querySelector(`.project-screenshots[data-project="${this.currentProject}"]`);
        if (!currentProjectGroup) return;
        
        const screenshots = currentProjectGroup.querySelectorAll('.screenshot');
        if (screenshots.length <= 1) return; // No need to navigate if only one screenshot
        
        const currentScreenshot = this.currentScreenshots[this.currentProject];
        const prevScreenshot = (currentScreenshot - 1 + screenshots.length) % screenshots.length;
        
        this.setActiveScreenshot(prevScreenshot);
    }

    setActiveScreenshot(screenshotIndex) {
        const currentProjectGroup = document.querySelector(`.project-screenshots[data-project="${this.currentProject}"]`);
        if (!currentProjectGroup) return;
        
        const screenshots = currentProjectGroup.querySelectorAll('.screenshot');
        
        // Update screenshot visibility
        screenshots.forEach((screenshot, index) => {
            screenshot.classList.toggle('active', index === screenshotIndex);
        });
        
        // Update current screenshot tracking
        this.currentScreenshots[this.currentProject] = screenshotIndex;
        
        // Update screenshot indicators
        this.updateScreenshotIndicators();
    }

    // Initialize screenshot indicators for all projects
    initializeScreenshotIndicators() {
        this.updateScreenshotIndicators();
    }

    updateScreenshotIndicators() {
        if (!this.screenshotIndicators) return;
        
        const currentProjectGroup = document.querySelector(`.project-screenshots[data-project="${this.currentProject}"]`);
        if (!currentProjectGroup) return;
        
        const screenshots = currentProjectGroup.querySelectorAll('.screenshot');
        
        // Clear existing indicators
        this.screenshotIndicators.innerHTML = '';
        
        // Only show indicators if there are multiple screenshots
        if (screenshots.length > 1) {
            screenshots.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'screenshot-dot';
                indicator.classList.toggle('active', index === this.currentScreenshots[this.currentProject]);
                indicator.setAttribute('data-screenshot', index);
                indicator.title = `Screenshot ${index + 1}`;
                
                // Add click handler
                indicator.addEventListener('click', () => {
                    this.handleUserInteraction(() => this.setActiveScreenshot(index));
                });
                
                this.screenshotIndicators.appendChild(indicator);
            });
        }
    }

    update3DCarousel() {
        this.projectCards.forEach((card, index) => {
            card.classList.remove('transitioning');
            card.offsetHeight;
            card.classList.add('transitioning');
            
            const offset = index - this.currentProject;
            const translateY = offset * 60;
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

    updateScreenshotGroups() {
        this.projectScreenshotGroups.forEach((group, index) => {
            group.classList.toggle('active', index === this.currentProject);
        });
    }

    updateNavigationDots() {
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentProject);
        });
    }

    updatePhoneNavigationVisibility() {
        if (!this.phoneNavigation) return;
        
        const currentProjectGroup = document.querySelector(`.project-screenshots[data-project="${this.currentProject}"]`);
        if (!currentProjectGroup) return;
        
        const screenshots = currentProjectGroup.querySelectorAll('.screenshot');
        
        // Show/hide phone navigation based on screenshot count
        if (screenshots.length > 1) {
            this.phoneNavigation.style.display = 'flex';
        } else {
            this.phoneNavigation.style.display = 'none';
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
            'FREBFIT - Fitness Application for FREBSON FITNESS',
            'VOLAIR - React Native Cross-Platform App', 
            'Train Booking System - NIIT Internship Project'
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

    getCurrentProject() {
        return this.currentProject;
    }

    getTotalProjects() {
        return this.totalProjects;
    }

    getCurrentScreenshot() {
        return {
            project: this.currentProject,
            screenshot: this.currentScreenshots[this.currentProject],
            total: document.querySelector(`.project-screenshots[data-project="${this.currentProject}"]`)?.querySelectorAll('.screenshot').length || 1
        };
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
        const animatedElements = document.querySelectorAll('.project-card, .screenshot, .nav-dot');
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
    window.projectsCarousel = new ProjectsCarousel();
    ImageLoader.setupErrorHandling();
    PerformanceOptimizer.optimize();
    
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
📱 Navigation Fixed (HTML+JS Structure):
   • Side arrows: Change between projects
   • Phone arrows: Cycle through screenshots of current project
   • Dots below: Jump to specific projects
   • Screenshot dots (when multiple): Jump to specific screenshots
   • Keyboard: Left/Right = Screenshots, Up/Down = Projects
   • Touch: Swipe on phone = Screenshots, Swipe outside = Projects

✨ Benefits of HTML+JS Structure:
   • Clean HTML structure with proper project groupings
   • JavaScript works with existing DOM elements
   • Better SEO and accessibility
   • Easier to add/remove screenshots
   • More maintainable code structure
`);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsCarousel, ImageLoader, PerformanceOptimizer };
}