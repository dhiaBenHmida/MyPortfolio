import { Link } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import SecondBlobCursor from './SecondBlobCursor.tsx';
import SecondPageLoader from './SecondPageLoader.tsx';

interface SecondShellProps {
  children: ReactNode;
}

export default function SecondShell({ children }: SecondShellProps) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const next = i18n.language?.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('language', next);
  };

  const langLabel = i18n.language?.startsWith('fr') ? 'FR' : 'EN';
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="second-root">
      <SecondPageLoader />
      <SecondBlobCursor />
      <a className="second-brand" href="#hero">
        <span className="second-brand-mark">MD</span>
        <span className="second-brand-text">
          BEN HMIDA
          <br />
          PORTFOLIO
        </span>
      </a>
      <header className="second-nav">
        <div className="second-container second-nav-inner">
          <span aria-hidden="true" />
          <ul className="second-nav-pills">
            <li><a href="#experience">{t('second.nav.experience')}</a></li>
            <li><a href="#projects">{t('second.nav.projects')}</a></li>
            <li><a href="#skills">{t('second.nav.skills')}</a></li>
            <li><a href="#work">{t('second.nav.work')}</a></li>
            <li><a href="#contact">{t('second.nav.contact')}</a></li>
          </ul>
          <div className="second-nav-actions">
            <Link to="/" className="second-mono" style={{ color: 'var(--second-ink-soft)', textDecoration: 'none' }}>
              {t('second.nav.classic')}
            </Link>
            <button type="button" className="second-lang" onClick={toggleLanguage}>
              {langLabel}
            </button>
            <a className="second-btn second-btn-accent second-btn-md" href="#contact">
              {t('second.nav.contact')}
            </a>
            <button
              type="button"
              className="second-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="second-mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
            </button>
          </div>
        </div>
        <nav
          id="second-mobile-nav"
          className={`second-container second-mobile-nav${menuOpen ? ' is-open' : ''}`}
          hidden={!menuOpen}
        >
          <a href="#experience" onClick={closeMenu}>{t('second.nav.experience')}</a>
          <a href="#projects" onClick={closeMenu}>{t('second.nav.projects')}</a>
          <a href="#skills" onClick={closeMenu}>{t('second.nav.skills')}</a>
          <a href="#work" onClick={closeMenu}>{t('second.nav.work')}</a>
          <a href="#contact" onClick={closeMenu}>{t('second.nav.contact')}</a>
          <Link to="/" onClick={closeMenu}>{t('second.nav.classic')}</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
