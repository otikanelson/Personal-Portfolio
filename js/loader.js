// ═══════════════════════════════════════════════════════════════
// HTML COMPONENT LOADER
// Dynamically loads HTML components into the page
// ═══════════════════════════════════════════════════════════════

(async function() {
    // Component configuration
    const components = [
        { path: 'html/components/navigation.html', target: 'navigation' },
        { path: 'html/components/mobile-sidebar.html', target: 'mobile-sidebar' },
        { path: 'html/sections/hero.html', target: 'hero' },
        { path: 'html/sections/mobile-portfolio.html', target: 'mobile-portfolio' },
        { path: 'html/sections/web-portfolio.html', target: 'web-portfolio' },
        { path: 'html/sections/desktop-portfolio.html', target: 'desktop-portfolio' },
        { path: 'html/sections/skills.html', target: 'skills' },
        { path: 'html/sections/about.html', target: 'about' },
        { path: 'html/sections/contact.html', target: 'contact' },
        { path: 'html/components/footer.html', target: 'footer' }
    ];

    // Load a single component
    async function loadComponent(path, targetId) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                console.warn(`Component not found: ${path}`);
                return false;
            }
            const html = await response.text();
            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = html;
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Error loading component ${path}:`, error);
            return false;
        }
    }

    // Load all components
    async function loadAllComponents() {
        console.log('📦 Loading HTML components...');
        const results = await Promise.all(
            components.map(({ path, target }) => loadComponent(path, target))
        );
        
        const loaded = results.filter(Boolean).length;
        console.log(`✅ Loaded ${loaded}/${components.length} components`);
        
        // Dispatch event when all components are loaded
        window.dispatchEvent(new Event('componentsLoaded'));
    }

    // Start loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllComponents);
    } else {
        await loadAllComponents();
    }
})();
