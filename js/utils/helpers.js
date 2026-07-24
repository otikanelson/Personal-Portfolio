// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// Utility function to debounce scroll events
export function debounce(func, wait) {
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

// Console welcome message
export function logWelcomeMessage() {
    console.log(`
🚀 Welcome to Nelson Otika's Portfolio!
👨‍💻 Software Engineering Student | UI/UX Designer | App Developer
📧 Contact: otikanelson29@gmail.com
🔗 GitHub: https://github.com/otikanelson

Thanks for checking out the source code! 😊
    `);
}
