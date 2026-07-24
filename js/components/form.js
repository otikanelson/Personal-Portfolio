// ═══════════════════════════════════════════════════════════════
// CONTACT FORM HANDLING
// ═══════════════════════════════════════════════════════════════

// Form submission handling
export function initContactForm() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const name = this.querySelector('input[placeholder="Your Name"]')?.value;
        const email = this.querySelector('input[placeholder="Your Email"]')?.value;
        const subject = this.querySelector('input[placeholder="Subject"]')?.value;
        const message = this.querySelector('textarea[placeholder="Your Message"]')?.value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Success message (in a real app, you'd send this to a server)
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        
        // Reset form
        this.reset();
    });
}
