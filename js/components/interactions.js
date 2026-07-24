// ═══════════════════════════════════════════════════════════════
// USER INTERACTIONS & ENHANCEMENTS
// ═══════════════════════════════════════════════════════════════

// Enhanced portfolio card interactions
export function initPortfolioInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        // Add mouse enter effect
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to icon
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = 'pulse 0.6s ease-in-out';
            }
        });
        
        // Reset animation on mouse leave
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
        
        // Add click effect
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
}

// Add keyboard navigation support
export function initKeyboardNavigation() {
    // Tab navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Add loading animation
export function initLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}
