// ═══════════════════════════════════════════════════════════════
// MAIN JAVASCRIPT ENTRY POINT
// Portfolio by Nelson Otika
// ═══════════════════════════════════════════════════════════════

// Import components
import { initFigmaCursor } from './components/cursor.js';
import { 
    initScrollProgress, 
    initActiveNavigation, 
    initSmoothScroll, 
    initMobileSidebar 
} from './components/navigation.js';
import './components/tabs.js';
import { initSkillsGitGraph } from './components/skills.js';
import { 
    initUniversalScrollAnimations,
    initScrollAnimations, 
    initPortfolioAnimations,
    initStatsObserver, 
    initParallax, 
    initSkillsTrackReveal,
    initWebTileAccordion
} from './components/animations.js';
import { initContactForm } from './components/form.js';
import { 
    initPortfolioInteractions, 
    initKeyboardNavigation, 
    initLoadingAnimation 
} from './components/interactions.js';
import { initAchievementsCarousel } from './components/passion-carousel.js';
import { debounce, logWelcomeMessage } from './utils/helpers.js';

// ═══════════════════════════════════════════════════════════════
// INITIALIZE ON DOM LOAD
// ═══════════════════════════════════════════════════════════════

// Initialize cursor immediately (before DOM load)
initFigmaCursor();

// Main initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Navigation (doesn't depend on loaded components)
    initScrollProgress();
    initActiveNavigation();
    initSmoothScroll();
    initMobileSidebar();
    
    // Check if we need to scroll to a specific section (from case study navigation)
    checkAndScrollToSection();
});

// Check sessionStorage for section to scroll to (when navigating from case study pages)
function checkAndScrollToSection() {
    const sectionId = sessionStorage.getItem('scrollToSection');
    
    if (sectionId) {
        // Clear the stored value
        sessionStorage.removeItem('scrollToSection');
        
        // Wait a bit for components to load, then scroll
        setTimeout(() => {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
    }
}

// Initialize everything that depends on dynamically loaded components
window.addEventListener('componentsLoaded', function() {
    // Skills
    initSkillsGitGraph();
    
    // Passion building carousel
    initAchievementsCarousel();
    
    // Scroll animations
    initUniversalScrollAnimations(); // New universal scroll animation system
    initScrollAnimations();
    initPortfolioAnimations();
    initStatsObserver();
    initParallax();
    initSkillsTrackReveal();
    initWebTileAccordion();
    
    // Form handling
    initContactForm();
    
    // Interactions
    initPortfolioInteractions();
    initKeyboardNavigation();
    initLoadingAnimation();
    
    // Welcome message
    logWelcomeMessage();
});

// ═══════════════════════════════════════════════════════════════
// GLOBAL EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);