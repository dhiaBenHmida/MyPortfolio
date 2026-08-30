import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import SecondBlobCursor from './SecondBlobCursor.tsx';
import SecondPageLoader from './SecondPageLoader.tsx';
import { useGyroDepth } from './useGyroDepth.ts';

interface SecondShellProps {
  children: ReactNode;
}

const CHAPTER_IDS = ['experience', 'projects', 'skills', 'work', 'contact'] as const;

export default function SecondShell({ children }: SecondShellProps) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<(typeof CHAPTER_IDS)[number] | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useGyroDepth(rootRef);

  useEffect(() => {
    const sections = CHAPTER_IDS
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: (typeof CHAPTER_IDS)[number] | null = null;
        let bestRatio = 0;
        for (const id of CHAPTER_IDS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActiveChapter(bestRatio > 0 ? bestId : null);
      },
      {
        root: null,
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: '-20% 0px -45% 0px',
      }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    const next = i18n.language?.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('language', next);
  };

  const langLabel = i18n.language?.startsWith('fr') ? 'FR' : 'EN';
  const closeMenu = () => setMenuOpen(false);

  const navClass = (id: (typeof CHAPTER_IDS)[number]) =>
    activeChapter === id ? 'is-active' : undefined;

  return (
    <div className="second-root" ref={rootRef}>
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
            <li>
              <a href="#experience" className={navClass('experience')}>
                {t('second.nav.experience')}
              </a>
            </li>
            <li>
              <a href="#projects" className={navClass('projects')}>
                {t('second.nav.projects')}
              </a>
            </li>
            <li>
              <a href="#skills" className={navClass('skills')}>
                {t('second.nav.skills')}
              </a>
            </li>
            <li>
              <a href="#work" className={navClass('work')}>
                {t('second.nav.work')}
              </a>
            </li>
            <li>
              <a href="#contact" className={navClass('contact')}>
                {t('second.nav.contact')}
              </a>
            </li>
          </ul>
          <div className="second-nav-actions">
            <Link to="/" className="second-mono" style={{ color: 'var(--second-ink-soft)', textDecoration: 'none' }}>
              {t('second.nav.classic')}
            </Link>
            <button type="button" className="second-lang" onClick={toggleLanguage}>
              {langLabel}
            </button>
            <a className="second-btn second-btn-accent second-btn-md gyro-near" href="#contact">
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
          <a href="#experience" className={navClass('experience')} onClick={closeMenu}>
            {t('second.nav.experience')}
          </a>
          <a href="#projects" className={navClass('projects')} onClick={closeMenu}>
            {t('second.nav.projects')}
          </a>
          <a href="#skills" className={navClass('skills')} onClick={closeMenu}>
            {t('second.nav.skills')}
          </a>
          <a href="#work" className={navClass('work')} onClick={closeMenu}>
            {t('second.nav.work')}
          </a>
          <a href="#contact" className={navClass('contact')} onClick={closeMenu}>
            {t('second.nav.contact')}
          </a>
          <Link to="/" onClick={closeMenu}>{t('second.nav.classic')}</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
