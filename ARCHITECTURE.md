# Architecture Documentation - TimeTravel Agency

## Overview

TimeTravel Agency is built with a **component-based architecture** following React best practices. The application is structured for scalability, maintainability, and performance, with a focus on immersive animations and a futuristic UI.

## Directory Structure

```
TimeTravelAgency/
├── public/              # Static assets (images, etc.)
├── src/
│   ├── components/      # React components
│   │   ├── Chatbot.jsx
│   │   ├── Destinations.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pricing.jsx
│   │   └── Timeline.jsx
│   ├── styles/          # Component-specific styles
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # User documentation
```

## Component Architecture

### App.jsx (Root Component)
- Main container component
- Imports and renders the primary sections: Navbar, Hero, Destinations, Timeline, Pricing, Footer, and Chatbot.
- Provides the global background and grain effect.

### Navbar Component
- **Purpose**: Navigation and brand visibility.
- **Features**: Sticky positioning, smooth scrolling, and responsive menu.

### Hero Component
- **Purpose**: High-impact landing section.
- **Features**: Staggered text animations (using Framer Motion), visual effects, and primary CTA.

### Destinations Component
- **Purpose**: Showcase travel options.
- **Features**: Interactive cards for different time periods (e.g., Rome, Tokyo) with hover effects.

### Timeline Component
- **Purpose**: Visual history of time travel achievements.
- **Features**: Vertical or horizontal chronological display of events.

### Pricing Component
- **Purpose**: Presentation of subscription tiers.
- **Features**: Tiered cards (Bronze, Silver, Gold) highlighting different benefits.

### Chatbot Component
- **Purpose**: User support and engagement.
- **Features**: Floating AI assistant UI for real-time interaction simulation.

## Styling Strategy

### Global Styles (index.css)
- Tailwind CSS directives.
- Custom font imports and global reset.

### Component Styles
- **Scoped CSS**: Some components use dedicated `.css` files (e.g., `TiltedCard.css`).
- **Tailwind CSS**: Extensively used for utility-first styling.
- **CSS Variables**: Theme colors and spacing are managed via variables for consistency.

## Performance Considerations

1. **Vite Bundling**: Efficient code splitting and minification.
2. **Framer Motion**: Optimized animations that use hardware acceleration.
3. **Lazy Loading**: Assets and components are loaded as needed where applicable.
