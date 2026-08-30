import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TONES = ['paper', 'ink', 'paper', 'clay'] as const;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function useCountUp(target: number, active: boolean, durationMs = 1100): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, durationMs, target]);

  return value;
}

export default function SecondProof() {
  const { t } = useTranslation();
  const jobs = t('experience.jobs', { returnObjects: true }) as unknown[];
  const projects = t('projects.items', { returnObjects: true }) as unknown[];
  const bandRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const years = useCountUp(8, active);
  const roles = useCountUp(jobs.length, active);
  const projectCount = useCountUp(projects.length, active);
  const langs = useCountUp(3, active);

  useEffect(() => {
    const node = bandRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const items = [
    { value: years, label: t('second.proof.years') },
    { value: roles, label: t('second.proof.roles') },
    { value: projectCount, label: t('second.proof.projects') },
    { value: langs, label: t('second.proof.langs') },
  ];

  return (
    <section aria-label="Proof">
      <div className="second-container second-proof" ref={bandRef}>
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
