import { useTranslation } from 'react-i18next';
import SecondReveal from './SecondReveal.tsx';
import SecondProfilePhoto from './SecondProfilePhoto.tsx';

export default function SecondHero() {
  const { t } = useTranslation();
  const specialties = t('hero.specialties', { returnObjects: true }) as string[];

  return (
    <section id="hero" className="second-hero">
      <div className="second-container">
        <div className="second-hero-kickers">
          <p className="second-mono" style={{ margin: 0 }}>{t('second.hero.kickerLeft')}</p>
          <p className="second-mono" style={{ margin: 0 }}>{t('second.hero.kickerRight')}</p>
        </div>
        <div className="second-hero-grid">
          <div className="second-hero-copy">
            <SecondReveal>
              <h1 className="second-display">
                {t('second.hero.headlineLead')}{' '}
                <mark className="second-mark-hl">{t('second.hero.headlineMark')}</mark>
              </h1>
            </SecondReveal>
            <p className="second-lede" style={{ color: 'var(--second-ink)', fontWeight: 600 }}>
              {t('hero.name')} · {t('hero.title')}
            </p>
            <p className="second-lede">{t('hero.summary')}</p>
            <div className="second-cta-row">
              <a className="second-btn second-btn-primary second-btn-lg" href="#experience">
                {t('second.hero.ctaPrimary')} →
              </a>
              <a className="second-btn second-btn-secondary second-btn-lg" href="#contact">
                {t('second.hero.ctaSecondary')}
              </a>
            </div>
            <div className="second-pills">
              {specialties.map((item) => (
                <span className="second-pill" key={item}>{item}</span>
              ))}
            </div>
          </div>

          <SecondReveal className="second-hero-portrait" delay={120}>
            <figure className="second-hero-portrait-frame">
              <SecondProfilePhoto alt={t('hero.name')} loading="eager" />
              <figcaption className="second-mono">{t('hero.title')}</figcaption>
            </figure>
          </SecondReveal>
        </div>
      </div>
    </section>
  );
}
