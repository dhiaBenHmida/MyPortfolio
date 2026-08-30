import { useTranslation } from 'react-i18next';
import SecondReveal from './SecondReveal.tsx';
import SecondProfilePhoto from './SecondProfilePhoto.tsx';
interface Perk {
  title: string;
  body: string;
}

interface CvLink {
  label: string;
  href: string;
}

export default function SecondChampionsCta() {
  const { t } = useTranslation();
  const perks = t('second.work.perks', { returnObjects: true }) as Perk[];
  const cvs = t('second.work.cvs', { returnObjects: true }) as CvLink[];
  const jobs = t('experience.jobs', { returnObjects: true }) as unknown[];
  const projects = t('projects.items', { returnObjects: true }) as unknown[];

  return (
    <section id="work" className="second-chapter">
      <div className="second-container">
        <SecondReveal className="second-chapter-head">
          <div className="second-champions-intro">
            <SecondProfilePhoto
              alt={t('hero.name')}
              className="second-champions-avatar"
              width={120}
              height={120}
            />
            <p className="second-chapter-sub" style={{ margin: 0 }}>{t('second.chapters.work.sub')}</p>
          </div>
          <p className="second-mono second-chapter-index">{t('second.chapters.work.index')}</p>
          <h2 className="second-display second-chapter-title">{t('second.chapters.work.title')}</h2>
        </SecondReveal>

        <div className="second-champions">
          <div className="second-role-card">
            <p className="second-mono" style={{ margin: 0 }}>{t('second.nav.work')}</p>
            <h3>{t('second.chapters.work.title')}</h3>
            <ul className="second-perk-list">
              {perks.map((perk) => (
                <li key={perk.title}>
                  <strong>{perk.title}</strong>
                  {perk.body}
                </li>
              ))}
            </ul>
            <div className="second-role-stats">
              <div>
                <strong>8</strong>
                <span>{t('second.proof.years')}</span>
              </div>
              <div>
                <strong>{jobs.length}</strong>
                <span>{t('second.proof.roles')}</span>
              </div>
              <div>
                <strong>{projects.length}</strong>
                <span>{t('second.proof.projects')}</span>
              </div>
            </div>
            <div className="second-cta-row">
              <a className="second-btn second-btn-accent second-btn-lg" href="#contact">
                {t('second.work.cta')} →
              </a>
            </div>
          </div>

          <div className="second-cv-panel">
            <h3>{t('second.work.cvTitle')}</h3>
            <div className="second-cv-links">
              {cvs.map((cv) => (
                <a key={cv.href} href={cv.href} target="_blank" rel="noreferrer">
                  {cv.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
