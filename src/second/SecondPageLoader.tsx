import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SEEN_KEY = 'second-loader-seen';

export default function SecondPageLoader() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean | null>(null);
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    let start = 0;
    const step = (now: number) => {
      const tNorm = Math.min((now - start) / 1100, 1);
      setPct(Math.round(100 * (1 - Math.pow(1 - tNorm, 4))));
      if (tNorm < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setExiting(true);
        setTimeout(() => setVisible(false), 700);
      }
    };

    raf.current = requestAnimationFrame((now) => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const seen = sessionStorage.getItem(SEEN_KEY);
      if (reduce || seen) {
        setVisible(false);
        return;
      }
      sessionStorage.setItem(SEEN_KEY, '1');
      setVisible(true);
      start = now;
      raf.current = requestAnimationFrame(step);
    });

    return () => cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`second-loader${exiting ? ' is-exiting' : ''}`} aria-hidden="true">
      <div className="second-mono second-loader-brand">{t('second.loader.brand')}</div>
      <div className="second-mono second-loader-status">{t('second.loader.status')}</div>
      <p className="second-display second-loader-pct">
        {pct}
        <span>%</span>
      </p>
    </div>
  );
}
