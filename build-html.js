/**
 * HTML Build Script
 * Combines modular HTML components into a single index.html file
 * 
 * Usage: node build-html.js
 */

const fs = require('fs');
const path = require('path');

// Read HTML component files
function readComponent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return '';
    }
}

// Build the complete HTML
function buildHTML() {
    console.log('🔨 Building HTML from components...\n');

    // Read all components
    const head = readComponent('html/partials/head.html');
    const navigation = readComponent('html/components/navigation.html');
    const mobileSidebar = readComponent('html/components/mobile-sidebar.html');
    const hero = readComponent('html/sections/hero.html');
    // const mobilePortfolio = readComponent('html/sections/mobile-portfolio.html');
    // const webPortfolio = readComponent('html/sections/web-portfolio.html');
    // const desktopPortfolio = readComponent('html/sections/desktop-portfolio.html');
    // const skills = readComponent('html/sections/skills.html');
    // const about = readComponent('html/sections/about.html');
    // const contact = readComponent('html/sections/contact.html');

    // Combine into full HTML document
    const html = `<!DOCTYPE html>
<html lang="en">

${head}

<body>
    ${navigation}
    
    ${mobileSidebar}
    
    ${hero}
    
    <!-- Add more sections here as they are created -->
    <!-- ${''/*mobilePortfolio*/} -->
    <!-- ${''/*webPortfolio*/} -->
    <!-- ${''/*desktopPortfolio*/} -->
    <!-- ${''/*skills*/} -->
    <!-- ${''/*about*/} -->
    <!-- ${''/*contact*/} -->

    <script type="module" src="js/main.js"></script>
</body>
</html>`;

    // Write to index-new.html (to preserve original)
    const outputPath = 'index-built.html';
    fs.writeFileSync(outputPath, html, 'utf8');
    
    console.log(`✅ Successfully built ${outputPath}`);
    console.log(`📦 Components combined:`);
    console.log(`   - head.html`);
    console.log(`   - navigation.html`);
    console.log(`   - mobile-sidebar.html`);
    console.log(`   - hero.html`);
    console.log(`\n💡 Tip: Rename index-built.html to index.html when ready to use`);
}

// Run the build
try {
    buildHTML();
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}
