import { useTranslation } from 'react-i18next';
import SecondReveal from './SecondReveal.tsx';

interface Job {
  id: string;
  position: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export default function SecondExperience() {
  const { t } = useTranslation();
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[];

  return (
    <section id="experience" className="second-chapter">
      <div className="second-container">
        <SecondReveal className="second-chapter-head">
          <p className="second-mono second-chapter-index">{t('second.chapters.experience.index')}</p>
          <h2 className="second-display second-chapter-title">{t('second.chapters.experience.title')}</h2>
          <p className="second-chapter-sub">{t('second.chapters.experience.sub')}</p>
        </SecondReveal>

        {jobs.map((job, index) => (
          <article className="second-job" key={job.id}>
            <p className="second-mono second-job-index">{String(index + 1).padStart(2, '0')}</p>
            <h3>{job.position}</h3>
            <div className="second-job-meta">
              <span>{job.company}</span>
              <span>{job.period}</span>
              <span>{job.location}</span>
            </div>
            <ul>
              {job.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
