import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MorphingShape from '../components/3d/MorphingShape';
import CurvedDivider from '../components/CurvedDivider';

interface Job {
  id: string;
  position: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export default function Experience() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[];

  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Canvas camera={{ position: [0, 0, 12] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#fbbf24" />
          <Environment preset="sunset" />
          <MorphingShape position={[-6, 2, -5]} color="#fbbf24" />
          <MorphingShape position={[6, -2, -8]} color="#f59e0b" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      {/* Diagonal accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-amber-500/5 to-transparent transform -skew-x-12 z-0" />
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            {t('experience.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline line with gradient */}
          <div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.5), rgba(251, 191, 36, 0.3))'
            }}
          />

          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative mb-12 md:mb-16 flex flex-col md:flex-row items-start ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot with glow */}
              <motion.div 
                className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform md:-translate-x-1/2 mt-2 z-10 ring-4 ring-white"
                style={{ 
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.6)',
                    '0 0 30px rgba(251, 191, 36, 0.8)',
                    '0 0 20px rgba(251, 191, 36, 0.6)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Content card */}
              <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ 
                    scale: 1.03, 
                    rotateY: index % 2 === 0 ? 5 : -5,
                    y: -10,
                    boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)' 
                  }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                    perspective: 1000,
                  }}
                >
                  {/* Badge for current job */}
                  {index === 0 && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full mb-3">
                      {t('experience.current')}
                    </span>
                  )}

                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#f59e0b' }}>
                    {job.position}
                  </h3>
                  <p className="font-semibold mb-1" style={{ color: '#fbbf24' }}>{job.company}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {job.period} • {job.location}
                  </p>

                  <ul className="space-y-2">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <span className="mr-2 mt-1 flex-shrink-0" style={{ color: '#fbbf24' }}>▪</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curved bottom divider */}
      <CurvedDivider direction="bottom" color="#e5e7eb" variant="wave2" />
    </section>
  );
}

