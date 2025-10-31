import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MorphingShape from '../components/3d/MorphingShape';
import CurvedDivider from '../components/CurvedDivider';

interface SkillCategory {
  title: string;
  items: string[];
}

interface SkillCategories {
  [key: string]: SkillCategory;
}

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const categories = t('skills.categories', { returnObjects: true }) as SkillCategories;

  const categoryKeys = Object.keys(categories);

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden min-h-screen">
      {/* Curved top divider */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8f9fa"/>
        </svg>
      </div>

      {/* 3D Background with Morphing Shapes */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 12] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <Environment preset="sunset" />
          <MorphingShape position={[-5, 3, -5]} color="#fbbf24" />
          <MorphingShape position={[5, -3, -8]} color="#f59e0b" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      {/* Diagonal background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent transform skew-x-12 z-0" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <Typography variant="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {t('skills.title')}
          </Typography>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categoryKeys.map((categoryKey, index) => {
            const category = categories[categoryKey];
            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: 1000 }}
              >
                  <div
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      padding: '3px',
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      borderRadius: '8px',
                    }}
                  >
                  <div
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      padding: '1.5rem',
                      minHeight: '100%',
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                      color: '#f59e0b',
                      fontWeight: 'bold',
                      mb: 2,
                      pb: 1,
                      borderBottom: '3px solid #fbbf24',
                      textAlign: 'center',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      {category.title}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      {category.items.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1 + skillIndex * 0.05,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <Chip
                            label={skill}
                            sx={{
                              bgcolor: '#f0f0f0',
                              color: '#34495e',
                              fontWeight: 500,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                              color: 'white',
                              transform: 'translateY(-2px) scale(1.1)',
                              boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)',
                            }
                            }}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="h5" 
              component="h3"
              sx={{ 
                color: '#2c3e50',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              {t('languages.title')}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {Object.entries(t('languages.items', { returnObjects: true }) as Record<string, string>).map(([key, value]) => (
                <Chip
                  key={key}
                  label={value}
                  sx={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: 'white',
                    fontWeight: 600,
                    px: 3,
                    py: 3,
                    fontSize: '1.1rem',
                    height: 'auto',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
                      transform: 'scale(1.05)',
                    }
                  }}
                />
              ))}
            </Box>
          </Paper>
        </motion.div>
      </div>

      {/* Curved bottom divider */}
      <CurvedDivider direction="bottom" color="#1f2937" variant="wave1" />
    </section>
  );
}

