import { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './styles/globals.css';
import './i18n';
import Header from './components/Header';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fbbf24',
    },
    secondary: {
      main: '#f59e0b',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
  },
});

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <footer className="bg-gray-900 text-white py-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Mohamed Dhia BEN HMIDA. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Made with React, Three.js & Material-UI
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
