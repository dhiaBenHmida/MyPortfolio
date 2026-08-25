import { useTranslation } from 'react-i18next';

const TONES = ['paper', 'ink', 'paper', 'clay'] as const;

export default function SecondProof() {
  const { t } = useTranslation();
  const jobs = t('experience.jobs', { returnObjects: true }) as unknown[];
  const projects = t('projects.items', { returnObjects: true }) as unknown[];

  const items = [
    { value: '8', label: t('second.proof.years') },
    { value: String(jobs.length), label: t('second.proof.roles') },
    { value: String(projects.length), label: t('second.proof.projects') },
    { value: '3', label: t('second.proof.langs') },
  ];

  return (
    <section aria-label="Proof">
      <div className="second-container second-proof">
        {items.map((item, index) => (
          <div className={`second-proof-item second-tone-${TONES[index % TONES.length]}`} key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
