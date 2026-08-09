/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE FUNCTIONALITY
   ═══════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // Get theme from localStorage or default to 'dark'
    const getStoredTheme = () => localStorage.getItem('theme') || 'dark';
    
    // Set theme on document
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon();
    };

    // Update icon visibility based on theme
    const updateThemeIcon = () => {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeToggle) {
            const sunIcon = themeToggle.querySelector('.fa-sun');
            const moonIcon = themeToggle.querySelector('.fa-moon');
            
            if (sunIcon && moonIcon) {
                if (theme === 'light') {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
            }
        }
    };

    // Toggle between light and dark theme
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Initialize theme on page load
    const initTheme = () => {
        const storedTheme = getStoredTheme();
        document.documentElement.setAttribute('data-theme', storedTheme);
        updateThemeIcon();
    };

    // Set up event listeners
    const setupThemeToggle = () => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle && !themeToggle.dataset.initialized) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
            themeToggle.dataset.initialized = 'true';
            updateThemeIcon();
        }
    };

    // Initialize on DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            setupThemeToggle();
        });
    } else {
        initTheme();
        setupThemeToggle();
    }

    // Re-initialize when components are loaded (for dynamically loaded content)
    window.addEventListener('componentsLoaded', () => {
        setupThemeToggle();
    });

})();
