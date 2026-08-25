import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SecondFooterCanvas from './SecondFooterCanvas.tsx';
import SecondProfilePhoto from './SecondProfilePhoto.tsx';
export default function SecondFooter() {
  const { t } = useTranslation();

  return (
    <footer className="second-footer">
      <SecondFooterCanvas />
      <div className="second-container">
        <div className="second-footer-grid">
          <div>
            <div className="second-footer-identity">
              <SecondProfilePhoto
                alt={t('hero.name')}
                className="second-footer-avatar"
                width={96}
                height={96}
              />
              <div>
                <h4>{t('hero.name')}</h4>
                <p>{t('hero.title')}</p>
              </div>
            </div>
            <p>{t('second.footer.note')}</p>
          </div>          <div>
            <h4>{t('second.footer.explore')}</h4>
            <p><a href="#experience">{t('second.nav.experience')}</a></p>
            <p><a href="#projects">{t('second.nav.projects')}</a></p>
            <p><a href="#skills">{t('second.nav.skills')}</a></p>
            <p><a href="#work">{t('second.nav.work')}</a></p>
            <p><a href="#contact">{t('second.nav.contact')}</a></p>
            <p><Link to="/">{t('second.nav.classic')}</Link></p>
          </div>
          <div>
            <h4>{t('second.footer.connect')}</h4>
            <p>
              <a href="mailto:m.dhia.b.h@gmail.com">m.dhia.b.h@gmail.com</a>
            </p>
            <p>
              <a
                href="https://linkedin.com/in/mohamed-dhia-ben-hmida-11b018135"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </p>
            <p>
              <a href="https://github.com/dhiaBenHmida" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </p>
          </div>
        </div>
        <div className="second-footer-bottom">
          © {new Date().getFullYear()} {t('hero.name')}
        </div>
      </div>
    </footer>
  );
}
