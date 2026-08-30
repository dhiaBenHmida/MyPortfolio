import { useTranslation } from 'react-i18next';
import SecondReveal from './SecondReveal.tsx';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github: string;
}

const TONES = ['ink', 'paper', 'clay', 'paper', 'saffron'] as const;

function ProjectMark({ index, tone }: { index: number; tone: (typeof TONES)[number] }) {
  const fill = tone === 'paper' || tone === 'saffron' ? 'var(--second-clay)' : 'var(--second-saffron)';
  const ink = tone === 'paper' || tone === 'saffron' ? 'var(--second-ink)' : 'currentColor';

  if (index === 0) {
    return (
      <svg className="second-project-mark" viewBox="0 0 52 32" aria-hidden="true">
        <rect x="2" y="20" width="8" height="10" fill={fill} />
        <rect x="14" y="12" width="8" height="18" fill={ink} />
        <rect x="26" y="6" width="8" height="24" fill={fill} />
        <rect x="38" y="2" width="8" height="28" fill={ink} />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className="second-project-mark" viewBox="0 0 52 32" aria-hidden="true">
        <circle cx="10" cy="16" r="7" fill="var(--second-blue)" />
        <circle cx="26" cy="16" r="7" fill="var(--second-blue)" opacity="0.55" />
        <circle cx="42" cy="16" r="7" fill="var(--second-blue)" opacity="0.25" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg className="second-project-mark" viewBox="0 0 52 32" aria-hidden="true">
        <rect x="4" y="4" width="10" height="10" fill={ink} />
        <rect x="20" y="4" width="10" height="10" fill={fill} />
        <rect x="36" y="4" width="10" height="10" fill={ink} />
        <rect x="4" y="18" width="10" height="10" fill={fill} />
        <rect x="20" y="18" width="10" height="10" fill={ink} />
        <rect x="36" y="18" width="10" height="10" fill={fill} />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg className="second-project-mark" viewBox="0 0 52 32" aria-hidden="true">
        <circle cx="26" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg className="second-project-mark" viewBox="0 0 52 32" aria-hidden="true">
      <rect x="6" y="22" width="7" height="8" fill={ink} />
      <rect x="17" y="14" width="7" height="16" fill={fill} />
      <rect x="28" y="8" width="7" height="22" fill={ink} />
      <rect x="39" y="4" width="7" height="26" fill={fill} />
    </svg>
  );
}

export default function SecondProjects() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as Project[];

  return (
    <section id="projects" className="second-chapter">
      <div className="second-container">
        <SecondReveal className="second-chapter-head">
          <p className="second-mono second-chapter-index">{t('second.chapters.projects.index')}</p>
          <h2 className="second-display second-chapter-title">{t('second.chapters.projects.title')}</h2>
          <p className="second-chapter-sub">{t('second.chapters.projects.sub')}</p>
        </SecondReveal>

        <div className="second-projects">
          {projects.map((project, index) => {
            const tone = TONES[index % TONES.length];
            return (
              <article className={`second-project second-tone-${tone}`} key={project.id}>
                <div className="second-project-top">
                  <p className="second-mono" style={{ margin: 0 }}>{String(index + 1).padStart(2, '0')}</p>
                  <ProjectMark index={index} tone={tone} />
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="second-project-tech">{project.technologies.slice(0, 8).join(' · ')}</p>
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    {t('projects.viewGithub')} →
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
