import { useTranslation } from 'react-i18next';
import SecondReveal from './SecondReveal.tsx';

interface SkillCategory {
  title: string;
  items: string[];
}

export default function SecondSkills() {
  const { t } = useTranslation();
  const categories = t('skills.categories', { returnObjects: true }) as Record<string, SkillCategory>;
  const categoryKeys = Object.keys(categories);

  return (
    <section id="skills" className="second-chapter">
      <div className="second-container">
        <SecondReveal className="second-chapter-head">
          <p className="second-mono second-chapter-index">{t('second.chapters.skills.index')}</p>
          <h2 className="second-display second-chapter-title">{t('second.chapters.skills.title')}</h2>
          <p className="second-chapter-sub">{t('second.chapters.skills.sub')}</p>
        </SecondReveal>

        <div className="second-skills">
          {categoryKeys.map((key, index) => {
            const group = categories[key];
            return (
              <div className="second-skill-group" key={key}>
                <h3>
                  {String(index + 1).padStart(2, '0')} — {group.title}
                </h3>
                <ul className="second-sticker-wall">
                  {group.items.map((item, itemIndex) => (
                    <li
                      className="second-sticker"
                      key={item}
                      style={{ ['--rot' as string]: `${(itemIndex % 2 ? 1 : -1) * (1.4 + (itemIndex % 4) * 0.9)}deg` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
