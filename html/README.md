# HTML Component Structure

This directory contains modular HTML components that make up the portfolio website.

## Directory Structure

```
html/
├── partials/           # Reusable page partials
│   └── head.html      # HTML <head> section with meta tags and styles
├── components/         # UI components
│   ├── navigation.html     # Desktop navigation bar and progress indicator
│   └── mobile-sidebar.html # Mobile sidebar menu
├── sections/           # Main page sections
│   ├── hero.html          # Hero/Profile banner section
│   ├── mobile-portfolio.html
│   ├── web-portfolio.html
│   ├── desktop-portfolio.html
│   ├── skills.html
│   ├── about.html
│   └── contact.html
└── README.md          # This file
```

## Component Organization

### Partials (`partials/`)
Reusable HTML fragments that appear on multiple pages:
- **head.html** - Common `<head>` content (meta tags, stylesheets, fonts)

### Components (`components/`)
Self-contained UI components:
- **navigation.html** - Desktop navbar with menu items
- **mobile-sidebar.html** - Mobile responsive sidebar menu

### Sections (`sections/`)
Main content sections of the page:
- **hero.html** - Profile banner with avatar, bio, and CTA buttons
- **mobile-portfolio.html** - Mobile apps showcase
- **web-portfolio.html** - Web projects showcase
- **desktop-portfolio.html** - Desktop applications showcase
- **skills.html** - Skills and technologies section
- **about.html** - About section with tabs (Experience, Education, Certifications)
- **contact.html** - Contact form and information

## Usage

### Option 1: Manual Assembly
For static sites, copy and paste components into your main `index.html` file.

### Option 2: Build Script (Node.js)
Use the provided `build-html.js` script to automatically combine components:

```bash
node build-html.js
```

This will generate `index.html` from the modular components.

### Option 3: Server-Side Includes (SSI)
If using Apache or Nginx with SSI enabled:

```html
<!--#include file="html/partials/head.html" -->
```

### Option 4: Template Engine
Use a template engine like EJS, Handlebars, or Pug:

```ejs
<%- include('html/partials/head') %>
```

## Benefits of Modular HTML

1. **Maintainability** - Edit components in one place
2. **Reusability** - Use same components across multiple pages
3. **Organization** - Clear structure makes finding code easier
4. **Collaboration** - Team members can work on different components
5. **Testing** - Test individual components in isolation

## Naming Conventions

- **Lowercase with hyphens** - `mobile-sidebar.html`, not `mobileSidebar.html`
- **Descriptive names** - Names should clearly indicate content/purpose
- **Consistent structure** - Follow the directory organization

## Notes

- All paths in components are relative to the root `index.html` file
- Update asset paths (images, links) when using components
- Keep components focused on a single responsibility
- Components should work independently when possible
