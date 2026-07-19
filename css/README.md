# CSS Architecture Documentation

## 📁 Folder Structure

```
css/
├── base/                   # Foundation styles
│   ├── variables.css       # CSS custom properties (colors, sizes, etc.)
│   ├── reset.css           # Browser resets and base element styles
│   └── backgrounds.css     # Background effects (circuit pattern, ink splatter)
│
├── components/             # Reusable UI components
│   ├── navigation.css      # Top navbar and scroll progress
│   ├── hero.css            # Hero section
│   ├── profile-banner.css  # Behance-style profile banner
│   ├── cursor.css          # Custom Figma-style cursor
│   ├── buttons.css         # All button styles
│   ├── skills.css          # Skills carousel and cards
│   ├── portfolio.css       # Portfolio section wrapper
│   ├── mobile-projects.css # Mobile app tiles and detail panels
│   ├── web-projects.css    # Web project tiles with 3D effects
│   ├── desktop-projects.css # Desktop projects with laptop mockup
│   ├── modals.css          # APK warning modal and image lightbox
│   └── mobile-menu.css     # Mobile sidebar menu
│
├── layout/                 # Page layout sections
│   ├── about.css           # About section, tabs, stats, certifications
│   ├── contact.css         # Contact form and social links
│   └── footer.css          # Site footer
│
└── utilities/              # Helper classes and utilities
    ├── animations.css      # Keyframe animations
    ├── helpers.css         # Utility classes (.text-center, .hidden, etc.)
    ├── accessibility.css   # Focus states, reduced motion, high contrast
    ├── scrollbar.css       # Custom scrollbar styles
    └── responsive.css      # Media queries for all breakpoints
```

## 🎯 Import Order

The main `styles.css` file imports in this order:
1. **Base** - Variables and resets
2. **Layout** - Major page sections
3. **Components** - Individual UI components
4. **Utilities** - Helpers, animations, responsive

## 🔧 How to Use

### Main Import
Just include the main file in your HTML:
```html
<link rel="stylesheet" href="styles.css">
```

### Adding New Styles
1. **Component styles** → `css/components/`
2. **Layout styles** → `css/layout/`
3. **Utility classes** → `css/utilities/helpers.css`
4. **Animations** → `css/utilities/animations.css`

### Modifying Variables
Edit `css/base/variables.css` to change:
- Colors
- Spacing
- Shadows
- Gradients

## 📱 Breakpoints

Defined in `css/utilities/responsive.css`:
- **Desktop**: > 1200px
- **Tablet**: 769px - 1200px
- **Mobile**: < 768px
- **Small Mobile**: < 480px
- **Extra Small**: < 374px

## 🎨 CSS Variables

Available throughout all files:
```css
--primary-color: #7c3aed
--primary-light: #a78bfa
--accent-color: #06b6d4
--dark-bg: #0a0a14
--text-primary: #f1f0ff
--text-secondary: #8b8aaa
--gradient-1: linear-gradient(...)
--shadow-glow: 0 0 40px rgba(124, 58, 237, 0.25)
```

## 🔄 Migration Notes

- **Original file**: `styles-original.css` (backup)
- **New structure**: Organized into 23 component files
- **Functionality**: 100% identical to original
- **Benefits**: 
  - Easier maintenance
  - Better organization
  - Faster debugging
  - Reusable components

## 💡 Best Practices

1. Keep component files focused on one feature
2. Use CSS variables for consistent theming
3. Mobile-first responsive design
4. Accessibility-first focus states
5. Use semantic class names

## 🚀 Performance

- All files loaded via `@import`
- Consider combining for production
- Total size: ~80KB unminified
- Gzip-friendly structure
