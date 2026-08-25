import { useTranslation } from 'react-i18next';

export default function SecondMarquee() {
  const { t } = useTranslation();
  const items = t('second.marquee', { returnObjects: true }) as string[];
  const loop = [...items, ...items];

  return (
    <section className="second-marquee" aria-hidden="true">
      <div className="second-marquee-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}
