import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 rounded-full glass-effect hover:bg-primary/10 transition-colors"
    >
      <span className="text-sm font-semibold">
        {i18n.language === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
      </span>
    </motion.button>
  );
}

