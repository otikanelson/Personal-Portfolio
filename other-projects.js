// Other Projects Page Specific Functionality

// Desktop application data
const desktopApps = {
    'paint': {
        title: 'Paint Application',
        icon: 'fas fa-paint-brush'
    },
    'puzzle': {
        title: 'Puzzle Game',
        icon: 'fas fa-puzzle-piece'
    },
    'database': {
        title: 'Inventory Management',
        icon: 'fas fa-database'
    },
    'algorithm': {
        title: 'Algorithm Visualizer',
        icon: 'fas fa-project-diagram'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeDesktopProjects();
    
    // Override the setActiveProject function for desktop projects
    const originalSetActiveProject = window.setActiveProject;
    
    window.setActiveProject = function(projectId) {
        originalSetActiveProject(projectId);
        updateDesktopDisplay(projectId);
        updateTaskbarIcons(projectId);
    };
    
    // Set initial project
    setActiveProject('paint');
    
    // Initialize desktop boot animation
    setTimeout(() => {
        const desktopFrame = document.querySelector('.desktop-frame');
        if (desktopFrame) {
            desktopFrame.classList.add('booting');
        }
    }, 500);
});

function initializeDesktopProjects() {
    setupTaskbarInteractions();
    setupWindowControls();
    setupDesktopAnimations();
    setupSystemTray();
    setupDesktopKeyboardShortcuts();
}

function setupTaskbarInteractions() {
    // Start button interaction
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            this.classList.add('clicked');
            handleStartButtonClick();
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    }
    
    // App icon interactions
    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            this.classList.add('clicked');
            setActiveProject(projectId);
            
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
        
        // Hover effects
        icon.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
}

function setupWindowControls() {
    const windowControls = document.querySelectorAll('.window-controls span');
    
    windowControls.forEach(control => {
        control.addEventListener('click', function() {
            const action = this.className;
            const window = this.closest('.app-window');
            handleWindowControl(action, window);
        });
    });
}

function handleWindowControl(action, windowElement) {
    switch(action) {
        case 'minimize':
            animateWindowMinimize(windowElement);
            break;
        case 'maximize':
            animateWindowMaximize(windowElement);
            break;
        case 'close':
            animateWindowClose(windowElement);
            break;
    }
}

function animateWindowMinimize(windowElement) {
    windowElement.classList.add('minimizing');
    
    setTimeout(() => {
        windowElement.style.opacity = '0';
        windowElement.style.transform = 'scale(0.1) translateY(300px)';
        
        setTimeout(() => {
            windowElement.style.opacity = '1';
            windowElement.style.transform = 'scale(1) translateY(0)';
            windowElement.classList.remove('minimizing');
        }, 1000);
    }, 400);
}

function animateWindowMaximize(windowElement) {
    windowElement.classList.add('maximizing');
    
    // Temporarily expand window
    const originalStyle = {
        top: windowElement.style.top,
        left: windowElement.style.left,
        right: windowElement.style.right,
        bottom: windowElement.style.bottom
    };
    
    windowElement.style.top = '0px';
    windowElement.style.left = '0px';
    windowElement.style.right = '0px';
    windowElement.style.bottom = '50px';
    
    setTimeout(() => {
        // Restore original size
        Object.assign(windowElement.style, originalStyle);
        windowElement.classList.remove('maximizing');
    }, 1000);
}

function animateWindowClose(windowElement) {
    windowElement.style.animation = 'fadeOut 0.3s ease-out forwards';
    
    setTimeout(() => {
        windowElement.style.animation = '';
        windowElement.style.opacity = '1';
    }, 1000);
}

function handleStartButtonClick() {
    // Create a simple start menu effect
    const startMenu = document.createElement('div');
    startMenu.className = 'start-menu';
    startMenu.innerHTML = `
        <div class="start-menu-content">
            <div class="start-menu-item">
                <i class="fas fa-paint-brush"></i>
                <span>Paint Application</span>
            </div>
            <div class="start-menu-item">
                <i class="fas fa-puzzle-piece"></i>
                <span>Puzzle Game</span>
            </div>
            <div class="start-menu-item">
                <i class="fas fa-database"></i>
                <span>Database System</span>
            </div>
            <div class="start-menu-item">
                <i class="fas fa-project-diagram"></i>
                <span>Algorithm Visualizer</span>
            </div>
        </div>
    `;
    
    // Add styles for start menu
    startMenu.style.cssText = `
        position: absolute;
        bottom: 50px;
        left: 15px;
        width: 200px;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 10px 0;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 20;
    `;
    
    document.querySelector('.desktop-frame').appendChild(startMenu);
    
    // Animate in
    setTimeout(() => {
        startMenu.style.opacity = '1';
        startMenu.style.transform = 'translateY(0)';
    }, 10);
    
    // Add click handlers for menu items
    const menuItems = startMenu.querySelectorAll('.start-menu-item');
    menuItems.forEach((item, index) => {
        item.style.cssText = `
            padding: 10px 15px;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            transition: background 0.2s ease;
        `;
        
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(99, 102, 241, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
        
        item.addEventListener('click', function() {
            const projects = ['paint', 'puzzle', 'database', 'algorithm'];
            setActiveProject(projects[index]);
            closeStartMenu(startMenu);
        });
    });
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeStartMenu(startMenu);
    }, 3000);
}

function closeStartMenu(startMenu) {
    startMenu.style.opacity = '0';
    startMenu.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        if (startMenu.parentNode) {
            startMenu.parentNode.removeChild(startMenu);
        }
    }, 300);
}

function updateDesktopDisplay(projectId) {
    // Hide all app windows
    const appWindows = document.querySelectorAll('.app-window');
    appWindows.forEach(window => {
        if (window.classList.contains('active')) {
            window.classList.add('switching-out');
            
            setTimeout(() => {
                window.classList.remove('active', 'switching-out');
            }, 300);
        }
    });
    
    // Show active app window
    setTimeout(() => {
        const activeWindow = document.querySelector(`[data-project="${projectId}"].app-window`);
        if (activeWindow) {
            activeWindow.classList.add('switching-in');
            activeWindow.classList.add('active');
            
            setTimeout(() => {
                activeWindow.classList.remove('switching-in');
            }, 300);
        }
    }, 300);
}

function updateTaskbarIcons(projectId) {
    // Update taskbar app icons
    const appIcons = document.querySelectorAll('.app-icon');
    appIcons.forEach(icon => {
        icon.classList.remove('active');
        if (icon.getAttribute('data-project') === projectId) {
            icon.classList.add('active');
        }
    });
}

function setupDesktopAnimations() {
    // Add loading states for app windows
    const appWindows = document.querySelectorAll('.app-window');
    appWindows.forEach(window => {
        const images = window.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('loadstart', function() {
                window.classList.add('loading');
            });
            
            img.addEventListener('load', function() {
                window.classList.remove('loading');
            });
            
            img.addEventListener('error', function() {
                window.classList.remove('loading');
                console.warn('Failed to load desktop app image:', this.src);
            });
        });
    });
}

function setupSystemTray() {
    // Update time every minute
    updateSystemTime();
    setInterval(updateSystemTime, 60000);
    
    // Add system tray icon interactions
    const trayIcons = document.querySelectorAll('.tray-icons i');
    trayIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            handleTrayIconClick(this.className);
        });
        
        // Add notification effect occasionally
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                icon.classList.add('notification');
                setTimeout(() => {
                    icon.classList.remove('notification');
                }, 2000);
            }
        }, 30000); // Check every 30 seconds
    });
}

function updateSystemTime() {
    const timeElement = document.querySelector('.time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        timeElement.classList.add('updating');
        setTimeout(() => {
            timeElement.textContent = timeString;
            timeElement.classList.remove('updating');
        }, 250);
    }
}

function handleTrayIconClick(iconClass) {
    const desktopFrame = document.querySelector('.desktop-frame');
    
    if (iconClass.includes('fa-wifi')) {
        // Simulate wifi toggle
        showSystemNotification('WiFi', 'Connected to NelsonNetwork');
    } else if (iconClass.includes('fa-volume')) {
        // Simulate volume control
        showSystemNotification('Volume', 'Volume set to 75%');
    } else if (iconClass.includes('fa-battery')) {
        // Simulate battery info
        showSystemNotification('Battery', '87% - 4 hours remaining');
    }
}

function showSystemNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'system-notification';
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    
    notification.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: 250px;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 15px;
        color: white;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        z-index: 30;
    `;
    
    document.querySelector('.desktop-frame').appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function setupDesktopKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + Tab for app switching
        if (e.altKey && e.key === 'Tab') {
            e.preventDefault();
            switchToNextApp();
        }
        
        // Windows key for start menu
        if (e.key === 'Meta' || e.key === 'OS') {
            e.preventDefault();
            const startButton = document.querySelector('.start-button');
            if (startButton) {
                startButton.click();
            }
        }
        
        // F11 for fullscreen simulation
        if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        }
        
        // Ctrl + Alt + Del simulation
        if (e.ctrlKey && e.altKey && e.key === 'Delete') {
            e.preventDefault();
            showTaskManager();
        }
    });
}

function switchToNextApp() {
    const projects = ['paint', 'puzzle', 'database', 'algorithm'];
    const currentIndex = projects.indexOf(currentProject);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex]);
}

function toggleFullscreen() {
    const desktopFrame = document.querySelector('.desktop-frame');
    
    if (desktopFrame.classList.contains('fullscreen')) {
        desktopFrame.classList.remove('fullscreen');
        desktopFrame.style.transform = 'scale(1)';
        desktopFrame.style.position = 'relative';
    } else {
        desktopFrame.classList.add('fullscreen');
        desktopFrame.style.transform = 'scale(1.1)';
        desktopFrame.style.position = 'fixed';
        desktopFrame.style.top = '0';
        desktopFrame.style.left = '0';
        desktopFrame.style.right = '0';
        desktopFrame.style.bottom = '0';
        desktopFrame.style.zIndex = '1000';
    }
    
    setTimeout(() => {
        if (desktopFrame.classList.contains('fullscreen')) {
            desktopFrame.style.transform = 'scale(1)';
        }
    }, 300);
}

function showTaskManager() {
    showSystemNotification('Task Manager', 'Press Ctrl+Shift+Esc to open');
}

// Enhanced desktop right-click context menu
document.addEventListener('DOMContentLoaded', function() {
    const desktopContent = document.querySelector('.desktop-content');
    
    if (desktopContent) {
        desktopContent.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showDesktopContextMenu(e.clientX, e.clientY);
        });
    }
});

function showDesktopContextMenu(x, y) {
    // Remove existing context menu
    const existingMenu = document.querySelector('.desktop-context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const contextMenu = document.createElement('div');
    contextMenu.className = 'desktop-context-menu';
    contextMenu.innerHTML = `
        <div class="context-menu-item" onclick="refreshDesktop()">
            <i class="fas fa-sync-alt"></i> Refresh
        </div>
        <div class="context-menu-item" onclick="changeWallpaper()">
            <i class="fas fa-image"></i> Change Wallpaper
        </div>
        <div class="context-menu-item" onclick="showDesktopProperties()">
            <i class="fas fa-cog"></i> Properties
        </div>
    `;
    
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    
    document.querySelector('.desktop-frame').appendChild(contextMenu);
    
    setTimeout(() => {
        contextMenu.classList.add('show');
    }, 10);
    
    // Close menu when clicking elsewhere
    document.addEventListener('click', function closeMenu() {
        contextMenu.classList.remove('show');
        setTimeout(() => {
            if (contextMenu.parentNode) {
                contextMenu.parentNode.removeChild(contextMenu);
            }
        }, 200);
        document.removeEventListener('click', closeMenu);
    });
}

function refreshDesktop() {
    const desktopFrame = document.querySelector('.desktop-frame');
    desktopFrame.style.animation = 'refreshSpin 0.6s ease-out';
    
    setTimeout(() => {
        desktopFrame.style.animation = '';
        showSystemNotification('Desktop', 'Desktop refreshed');
    }, 600);
}

function changeWallpaper() {
    const desktopFrame = document.querySelector('.desktop-frame');
    const wallpapers = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ];
    
    const currentBg = desktopFrame.style.background;
    let newBg;
    do {
        newBg = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    } while (newBg === currentBg);
    
    desktopFrame.style.background = newBg;
    showSystemNotification('Desktop', 'Wallpaper changed');
}

function showDesktopProperties() {
    showSystemNotification('Properties', 'Desktop: 1920x1080, 32-bit color');
}

// Console message for other projects
console.log(`
🖥️  Other Projects Page Loaded Successfully!
💻 Desktop Controls:
   • Alt + Tab: Switch between applications
   • Right-click: Desktop context menu
   • Windows key: Start menu
   • F11: Toggle fullscreen mode
   • Click taskbar icons to switch apps

🎮 Interactive Features:
   • Realistic desktop environment
   • Window controls (minimize, maximize, close)
   • System tray with live time
   • Start menu with applications
   • Context menu and notifications
   • Keyboard shortcuts support
`);