# MDBH Portfolio

A modern, bilingual (English/French) portfolio application built with React, TypeScript, React Three Fiber, and Material-UI.

## Features

- **Modern UI** with Material-UI components
- **Bilingual** support (English/French) with i18next
- **3D Effects** using React Three Fiber
  - Particle field animations
  - Fluid background simulations
  - Interactive scene transitions
- **Smooth Animations** with Framer Motion
- **Fully Responsive** design
- **Single-page** scroll navigation
- **Dynamic content** from translation files

## Tech Stack

- **Frontend Framework:** React 19+ with TypeScript
- **3D Graphics:** React Three Fiber (@react-three/fiber, @react-three/drei)
- **UI Library:** Material-UI (@mui/material)
- **Animations:** Framer Motion, React Spring
- **Internationalization:** i18next, react-i18next
- **Styling:** Tailwind CSS
- **Build Tool:** Vite

## Project Structure

```
portfolio-app/
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── ParticleField.tsx       # 3D particle system
│   │   │   ├── FluidBackground.tsx     # Shader-based fluid effect
│   │   │   └── SceneTransition.tsx     # Section transitions
│   │   ├── Header.tsx                  # Main navigation header
│   │   ├── LanguageSwitcher.tsx        # EN/FR toggle
│   │   └── ScrollProgress.tsx          # Progress indicator
│   ├── sections/
│   │   ├── Hero.tsx                    # Landing section
│   │   ├── Experience.tsx              # Professional experience
│   │   ├── Projects.tsx                # Personal projects
│   │   ├── Skills.tsx                  # Technical skills
│   │   └── Contact.tsx                 # Contact form
│   ├── locales/
│   │   ├── en/translation.json         # English translations
│   │   └── fr/translation.json         # French translations
│   ├── styles/
│   │   └── globals.css                 # Global styles with Tailwind
│   ├── i18n.ts                         # i18next configuration
│   ├── App.tsx                         # Main app component
│   └── main.tsx                        # Entry point
├── public/
│   └── profile_picture.jpg             # Profile photo
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Adding/Editing Content

1. **Translations**: Edit `src/locales/en/translation.json` and `src/locales/fr/translation.json`
2. **Profile Picture**: Replace `public/profile_picture.jpg`
3. **Colors**: Modify theme colors in `src/App.tsx` and `tailwind.config.js`
4. **Sections**: Edit individual section components in `src/sections/`

### Adjusting 3D Effects

- **Particle Count**: Modify `count` prop in ParticleField component
- **Fluid Colors**: Change `color1` and `color2` props in FluidBackground
- **Animation Speed**: Adjust animation parameters in component files

## Features by Section

### Hero
- Animated profile picture
- Rotating specialties
- Interactive particle background
- Smooth scroll CTA

### Experience
- Timeline visualization
- Animated job cards
- Current role badge
- Expandable details

### Projects
- 3D card effects
- Technology tags
- Expandable features
- GitHub links (placeholder)

### Skills
- Categorized skill display
- Interactive hover effects
- Fluid background animation
- Languages section

### Contact
- Validated contact form
- Contact information cards
- Particle background
- Social links

## Language Support

The portfolio supports English and French. The language preference is saved in `localStorage` and persists across sessions.

Toggle languages using the language switcher in the header (EN / FR).

## Performance

The application is optimized for performance:
- Lazy loading of 3D components
- Optimized particle systems
- Efficient animation rendering
- Code splitting
- Responsive images

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2025 Mohamed Dhia BEN HMIDA. All rights reserved.

## Contact

- Email: m.dhia.bh@gmail.com
- Phone: +(216) 27 225 432
- LinkedIn: [mohamed-dhia-ben-hmida](https://linkedin.com/in/mohamed-dhia-ben-hmida-11b018135)
- Location: Tunis, Tunisia
