import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import FloatingShapes from '../components/3d/FloatingShapes';
import InteractiveSphere from '../components/3d/InteractiveSphere';

export default function Hero() {
  const { t } = useTranslation();
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const specialties = t('hero.specialties', { returnObjects: true }) as string[];

  useEffect(() => {
    const interval = setInterval(() => {
      setSpecialtyIndex((prev) => (prev + 1) % specialties.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [specialties.length]);

  const scrollToNextSection = () => {
    const experienceSection = document.getElementById('experience');
    experienceSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-20 sm:py-0">
      {/* 3D Background with Floating Shapes - Different color scheme */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
          <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={0.5} color="#f59e0b" />
          <Environment preset="sunset" />
          
          <FloatingShapes />
          <InteractiveSphere position={[5, -2, -5]} scale={1.5} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      {/* Glassmorphic overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 z-0" />

      {/* Asymmetric Content Layout */}
      <div className="relative z-10 min-h-screen flex items-center py-8 sm:py-12">
        <div className="container-custom w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            {/* Left Side - Profile Image with Glassmorphic Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="relative order-2 lg:order-1"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative p-4 sm:p-6 md:p-8 rounded-3xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                }}
              >
                <img
                  src="/profile_picture.jpg"
                  alt="Mohamed Dhia BEN HMIDA"
                  className="relative w-full max-w-sm mx-auto rounded-2xl object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right Side - Text Content with Glassmorphic Background */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="text-left p-4 sm:p-6 md:p-8 rounded-3xl order-1 lg:order-2"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-amber-300"
              >
                {t('hero.greeting')}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                {t('hero.name').split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="inline-block mr-2 sm:mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 min-h-[3rem] sm:min-h-[3.5rem] flex items-center"
              >
                <motion.span
                  key={specialtyIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 leading-tight"
                  style={{
                    textShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
                  }}
                >
                  {specialties[specialtyIndex]}
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
              >
                {t('hero.summary')}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToNextSection}
                className="inline-flex items-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold shadow-lg relative overflow-hidden group"
                style={{
                  background: 'rgba(251, 191, 36, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  color: 'white',
                }}
              >
                <span className="relative z-10">{t('hero.cta')}</span>
                <motion.svg
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.4))',
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Curved bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 z-5">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8f9fa"/>
        </svg>
      </div>
    </section>
  );
}

