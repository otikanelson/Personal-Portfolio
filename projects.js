// Projects Page Functionality

let currentProject = 'fitness';
let currentScreenshot = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsPage();
});

function initializeProjectsPage() {
    // Set up project card interactions
    setupProjectCards();
    
    // Set up navigation dots
    setupNavigationDots();
    
    // Set up screenshot navigation
    setupScreenshotNavigation();
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Set initial active states
    setActiveProject('fitness');
}

function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            setActiveProject(projectId);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.98)';
                this.style.opacity = '0.9';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.7';
            }
        });
    });
}

function setupNavigationDots() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            setActiveProject(projectId);
        });
    });
}

function setupScreenshotNavigation() {
    // Auto-cycle screenshots every 4 seconds
    setInterval(() => {
        nextScreenshot();
    }, 4000);
}

function setupScrollAnimations() {
    // Animate project cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function setActiveProject(projectId) {
    currentProject = projectId;
    currentScreenshot = 0;
    
    // Update active project card
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-project') === projectId) {
            card.classList.add('active');
            
            // Scroll to active card if needed
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    });
    
    // Update navigation dots
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-project') === projectId) {
            dot.classList.add('active');
        }
    });
    
    // Update phone display
    updatePhoneDisplay(projectId);
}

function updatePhoneDisplay(projectId) {
    // Hide all screenshot sets
    const screenshotSets = document.querySelectorAll('.screenshot-set');
    screenshotSets.forEach(set => {
        set.classList.remove('active');
    });
    
    // Show active screenshot set
    const activeSet = document.querySelector(`[data-project="${projectId}"]`);
    if (activeSet) {
        activeSet.classList.add('active');
        
        // Reset to first screenshot
        const screenshots = activeSet.querySelectorAll('.screenshot');
        screenshots.forEach((screenshot, index) => {
            screenshot.classList.remove('active');
            if (index === 0) {
                screenshot.classList.add('active');
            }
        });
    }
}

function nextScreenshot() {
    const activeSet = document.querySelector('.screenshot-set.active');
    if (!activeSet) return;
    
    const screenshots = activeSet.querySelectorAll('.screenshot');
    const totalScreenshots = screenshots.length;
    
    // Remove current active
    screenshots[currentScreenshot].classList.remove('active');
    
    // Move to next screenshot
    currentScreenshot = (currentScreenshot + 1) % totalScreenshots;
    
    // Add active to new screenshot
    screenshots[currentScreenshot].classList.add('active');
}

function previousScreenshot() {
    const activeSet = document.querySelector('.screenshot-set.active');
    if (!activeSet) return;
    
    const screenshots = activeSet.querySelectorAll('.screenshot');
    const totalScreenshots = screenshots.length;
    
    // Remove current active
    screenshots[currentScreenshot].classList.remove('active');
    
    // Move to previous screenshot
    currentScreenshot = currentScreenshot === 0 ? totalScreenshots - 1 : currentScreenshot - 1;
    
    // Add active to new screenshot
    screenshots[currentScreenshot].classList.add('active');
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            previousScreenshot();
            e.preventDefault();
            break;
        case 'ArrowRight':
            nextScreenshot();
            e.preventDefault();
            break;
        case 'ArrowUp':
            navigateProject('up');
            e.preventDefault();
            break;
        case 'ArrowDown':
            navigateProject('down');
            e.preventDefault();
            break;
    }
});

function navigateProject(direction) {
    const projects = ['fitness', 'train', 'weather', 'shopping'];
    const currentIndex = projects.indexOf(currentProject);
    
    let newIndex;
    if (direction === 'up') {
        newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    } else {
        newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    }
    
    setActiveProject(projects[newIndex]);
}

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe up - next project
            navigateProject('down');
        } else {
            // Swipe down - previous project
            navigateProject('up');
        }
    }
}

// Smooth scroll for project carousel
function smoothScrollToProject(projectId) {
    const targetCard = document.querySelector(`[data-project="${projectId}"]`);
    if (targetCard) {
        targetCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Performance optimization - debounce scroll events
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

// Enhanced project card animations
function animateProjectCard(card, isActive) {
    if (isActive) {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'scale(1) translateY(0)';
        card.style.opacity = '1';
        
        // Animate icon
        const icon = card.querySelector('.project-icon');
        if (icon) {
            icon.style.animation = 'pulse 0.6s ease-in-out';
        }
        
        // Animate content with stagger
        const elements = card.querySelectorAll('.project-title, .project-description, .project-features, .learn-more-btn');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    } else {
        card.style.transform = 'scale(0.95) translateY(10px)';
        card.style.opacity = '0.7';
    }
}

// Initialize intersection observer for performance
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project');
            // Pre-load images for better performance
            preloadProjectImages(projectId);
        }
    });
}, { rootMargin: '100px' });

// Pre-load images for smooth transitions
function preloadProjectImages(projectId) {
    const screenshotSet = document.querySelector(`.screenshot-set[data-project="${projectId}"]`);
    if (screenshotSet) {
        const images = screenshotSet.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.loading = 'lazy';
            }
        });
    }
}

// Initialize observers
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.screenshot img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
        
        img.addEventListener('load', function() {
            // Remove loading state
            this.parentElement.classList.remove('loading');
        });
    });
});

// Accessibility improvements
function announceProjectChange(projectName) {
    // Create announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Now viewing ${projectName} project`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Update setActiveProject to include accessibility
const originalSetActiveProject = setActiveProject;
setActiveProject = function(projectId) {
    originalSetActiveProject(projectId);
    
    // Get project name for announcement
    const projectCard = document.querySelector(`[data-project="${projectId}"]`);
    const projectName = projectCard ? projectCard.querySelector('.project-title').textContent : projectId;
    
    announceProjectChange(projectName);
};

// Console welcome message
console.log(`
📱 Mobile Projects Page Loaded Successfully!
🎮 Navigation Controls:
   • Click cards or dots to switch projects
   • Use arrow keys for navigation
   • Swipe on mobile devices
   • Screenshots auto-cycle every 4 seconds

💡 Features:
   • Smooth animations and transitions
   • Keyboard accessibility
   • Touch gesture support
   • Performance optimized
`);