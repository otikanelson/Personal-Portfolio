// ═══════════════════════════════════════════════════════════════
// NAVIGATION & SCROLL FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════

// Enhanced scroll progress for entire page
export function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
}

// Update navigation links to be active based on scroll position
export function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
}

// Smooth scroll for navigation links
export function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile sidebar toggle functionality
export function initMobileSidebar() {
    const menuToggle = document.querySelector('#menuToggle');
    const mobileSidebar = document.querySelector('#mobileSidebar');
    const sidebarOverlay = document.querySelector('#sidebarOverlay');
    
    if (!menuToggle || !mobileSidebar || !sidebarOverlay) return;

    // Close sidebar function
    function closeSidebar() {
        mobileSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Update icon back to hamburger
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Toggle sidebar (open/close)
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Check if sidebar is currently open
        const isOpen = mobileSidebar.classList.contains('open');
        
        if (isOpen) {
            // Close sidebar
            closeSidebar();
        } else {
            // Open sidebar
            mobileSidebar.classList.add('open');
            sidebarOverlay.classList.add('active');
            menuToggle.classList.add('active');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Update icon to X
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
    });
    
    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking a nav link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });
    
    // Close sidebar on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });

    // ESC key to close mobile sidebar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
}

// Portfolio category navigation
export function navigateToCategory(category) {
    const portfolioSection = document.getElementById('portfolio') || document.getElementById('mobile-portfolio');
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
}
