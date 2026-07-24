// ═══════════════════════════════════════════════════════════════
// FIGMA CURSOR - SEAMLESS SMOOTH MOTION
// ═══════════════════════════════════════════════════════════════
export function initFigmaCursor() {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'figma-cursor';
    cursor.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Perfectly smooth cursor animation with consistent easing
    function animateCursor() {
        // Calculate distance to target
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        // Consistent smooth easing - no complex calculations
        const ease = 0.15;
        
        // Simple linear interpolation for seamless movement
        cursorX += dx * ease;
        cursorY += dy * ease;
        
        // Use translate3d for hardware acceleration without rounding
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start the smooth animation
    animateCursor();

    // Add click effect with smooth transition
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    // Add hover effect for interactive elements
    const interactiveElements = 'a, button, .btn, .nav-link, .app-tile, .web-tile, .skill-card, input, textarea, .desktop-carousel, .carousel-btn';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursor.classList.remove('hovering');
        }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}
