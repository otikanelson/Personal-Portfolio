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
    initScrollAnimations, 
    initPortfolioAnimations, 
    initStatsObserver, 
    initParallax, 
    initSkillsTrackReveal 
} from './components/animations.js';
import { initContactForm } from './components/form.js';
import { 
    initPortfolioInteractions, 
    initKeyboardNavigation, 
    initLoadingAnimation 
} from './components/interactions.js';
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
});

// Initialize everything that depends on dynamically loaded components
window.addEventListener('componentsLoaded', function() {
    // Skills
    initSkillsGitGraph();
    
    // Scroll animations
    initScrollAnimations();
    initPortfolioAnimations();
    initStatsObserver();
    initParallax();
    initSkillsTrackReveal();
    
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
