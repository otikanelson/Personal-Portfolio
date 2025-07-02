// URL mappings for different projects
const projectUrls = {
    'portfolio': 'https://nelsonotika.dev',
    'ecommerce': 'https://nelsonotika.dev/shop',
    'birthday': 'https://nelsonotika.dev/celebration',
    'taskapp': 'https://nelsonotika.dev/tasks'
};

// Override the setActiveProject function for web projects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize web-specific functionality
    initializeWebProjects();
    
    // Override the original setActiveProject
    const originalSetActiveProject = window.setActiveProject;
    
    window.setActiveProject = function(projectId) {
        // Call original function
        originalSetActiveProject(projectId);
        
        // Add web-specific updates
        updateBrowserDisplay(projectId);
        updateProjectUrl(projectId);
    };
    
    // Set initial project
    setActiveProject('portfolio');
});

function initializeWebProjects() {
    // Add browser interaction effects
    setupBrowserInteractions();
    
    // Add loading states
    setupLoadingStates();
    
    // Add URL animations
    setupUrlAnimations();
    
    // Add keyboard shortcuts for web navigation
    setupWebKeyboardShortcuts();
}

function setupBrowserInteractions() {
    const browserFrame = document.querySelector('.browser-frame');
    const browserButtons = document.querySelectorAll('.browser-buttons span');
    
    // Browser button interactions
    browserButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonType = this.className;
            handleBrowserButtonClick(buttonType);
        });
    });
    
    // Browser frame hover effects
    if (browserFrame) {
        browserFrame.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        browserFrame.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    }
    
    // URL bar click effect
    const urlBar = document.querySelector('.browser-url');
    if (urlBar) {
        urlBar.addEventListener('click', function() {
            this.classList.add('focused');
            setTimeout(() => {
                this.classList.remove('focused');
            }, 2000);
        });
    }
}

function handleBrowserButtonClick(buttonType) {
    const browserFrame = document.querySelector('.browser-frame');
    
    switch(buttonType) {
        case 'btn-close':
            // Animate close effect
            browserFrame.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                browserFrame.style.animation = 'fadeIn 0.3s ease-out';
            }, 300);
            break;
            
        case 'btn-minimize':
            // Animate minimize effect
            browserFrame.style.transform = 'scale(0.8) translateY(20px)';
            setTimeout(() => {
                browserFrame.style.transform = '';
            }, 300);
            break;
            
        case 'btn-maximize':
            // Animate maximize effect
            browserFrame.style.transform = 'scale(1.05)';
            setTimeout(() => {
                browserFrame.style.transform = '';
            }, 300);
            break;
    }
}

function updateBrowserDisplay(projectId) {
    const browserFrame = document.querySelector('.browser-frame');
    
    // Add loading state
    browserFrame.classList.add('loading');
    
    setTimeout(() => {
        // Update data attribute for styling
        browserFrame.setAttribute('data-project', projectId);
        
        // Remove loading state
        browserFrame.classList.remove('loading');
        browserFrame.classList.add('loaded');
        
        setTimeout(() => {
            browserFrame.classList.remove('loaded');
        }, 500);
    }, 300);
}

function updateProjectUrl(projectId) {
    const urlText = document.querySelector('.url-text');
    const newUrl = projectUrls[projectId] || 'https://nelsonotika.dev';
    
    if (urlText) {
        // Add updating animation
        urlText.classList.add('updating');
        
        setTimeout(() => {
            urlText.textContent = newUrl;
            urlText.classList.remove('updating');
        }, 300);
    }
}

function setupLoadingStates() {
    // Add loading animation for screenshots
    const screenshots = document.querySelectorAll('.screenshot img');
    
    screenshots.forEach(img => {
        // Add loading state when image starts loading
        img.addEventListener('loadstart', function() {
            this.parentElement.classList.add('loading');
        });
        
        // Remove loading state when loaded
        img.addEventListener('load', function() {
            this.parentElement.classList.remove('loading');
        });
        
        // Handle error state
        img.addEventListener('error', function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.classList.add('error');
        });
    });
}

function setupUrlAnimations() {
    // Animate URL changes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0.3; transform: scale(0.95); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0.3; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        
        .browser-url.focused {
            background: rgba(99, 102, 241, 0.1);
            border-color: var(--primary-color);
        }
        
        .screenshot.error {
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .screenshot.error::after {
            content: '⚠️ Image not available';
            color: #666;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
}

function setupWebKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Cmd/Ctrl + R for refresh animation
        if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
            e.preventDefault();
            refreshBrowser();
        }
        
        // Cmd/Ctrl + T for new tab effect
        if ((e.metaKey || e.ctrlKey) && e.key === 't') {
            e.preventDefault();
            newTabEffect();
        }
        
        // Cmd/Ctrl + W for close tab effect
        if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
            e.preventDefault();
            handleBrowserButtonClick('btn-close');
        }
    });
}

function refreshBrowser() {
    const browserContent = document.querySelector('.browser-content');
    const browserFrame = document.querySelector('.browser-frame');
    
    // Add refresh animation
    browserFrame.style.animation = 'refreshSpin 0.6s ease-out';
    
    // Simulate loading
    browserContent.style.opacity = '0.5';
    
    setTimeout(() => {
        browserContent.style.opacity = '1';
        browserFrame.style.animation = '';
    }, 600);
}

function newTabEffect() {
    const browserFrame = document.querySelector('.browser-frame');
    
    // Create a subtle flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        z-index: 10;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
    `;
    
    browserFrame.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '1';
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                browserFrame.removeChild(flash);
            }, 200);
        }, 100);
    }, 10);
}

// Add refresh spin animation
const refreshStyle = document.createElement('style');
refreshStyle.textContent = `
    @keyframes refreshSpin {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        50% { transform: rotate(-5deg); }
        75% { transform: rotate(3deg); }
        100% { transform: rotate(0deg); }
    }
`;
document.head.appendChild(refreshStyle);

// Enhanced screenshot navigation for web projects
function nextScreenshot() {
    const activeSet = document.querySelector('.screenshot-set.active');
    if (!activeSet) return;
    
    const screenshots = activeSet.querySelectorAll('.screenshot');
    const totalScreenshots = screenshots.length;
    
    // Add transition effect
    const browserContent = document.querySelector('.browser-content');
    browserContent.style.transform = 'translateX(-10px)';
    
    setTimeout(() => {
        // Remove current active
        screenshots[currentScreenshot].classList.remove('active');
        
        // Move to next screenshot
        currentScreenshot = (currentScreenshot + 1) % totalScreenshots;
        
        // Add active to new screenshot
        screenshots[currentScreenshot].classList.add('active');
        
        // Reset transform
        browserContent.style.transform = '';
    }, 150);
}

function previousScreenshot() {
    const activeSet = document.querySelector('.screenshot-set.active');
    if (!activeSet) return;
    
    const screenshots = activeSet.querySelectorAll('.screenshot');
    const totalScreenshots = screenshots.length;
    
    // Add transition effect
    const browserContent = document.querySelector('.browser-content');
    browserContent.style.transform = 'translateX(10px)';
    
    setTimeout(() => {
        // Remove current active
        screenshots[currentScreenshot].classList.remove('active');
        
        // Move to previous screenshot
        currentScreenshot = currentScreenshot === 0 ? totalScreenshots - 1 : currentScreenshot - 1;
        
        // Add active to new screenshot
        screenshots[currentScreenshot].classList.add('active');
        
        // Reset transform
        browserContent.style.transform = '';
    }, 150);
}

// Add smooth transitions to browser content
const browserStyle = document.createElement('style');
browserStyle.textContent = `
    .browser-content {
        transition: transform 0.15s ease, opacity 0.3s ease;
    }
    
    .browser-frame {
        transition: all 0.3s ease;
    }
    
    .browser-url {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(browserStyle);

// Initialize tooltip system for browser elements
function initializeBrowserTooltips() {
    const tooltipElements = [
        { selector: '.btn-close', text: 'Close' },
        { selector: '.btn-minimize', text: 'Minimize' },
        { selector: '.btn-maximize', text: 'Maximize' },
        { selector: '.browser-url', text: 'Address Bar' },
        { selector: '.browser-menu', text: 'Menu' }
    ];
    
    tooltipElements.forEach(({ selector, text }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute('title', text);
            element.setAttribute('aria-label', text);
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializeBrowserTooltips();
});

// Console message for web projects
console.log(`
🌐 Web Projects Page Loaded Successfully!
🖥️  Browser Controls:
   • Cmd/Ctrl + R: Refresh animation
   • Cmd/Ctrl + T: New tab effect
   • Cmd/Ctrl + W: Close tab effect
   • Click browser buttons for interactions

💡 Features:
   • Realistic browser mockup
   • Dynamic URL updates
   • Loading states and animations
   • Keyboard shortcuts support
   • Responsive design
`);