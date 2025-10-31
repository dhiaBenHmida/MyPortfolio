import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent, CardActions, Chip, Button, Box, Typography } from '@mui/material';
import { GitHub as GitHubIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import MorphingShape from '../components/3d/MorphingShape';
import CurvedDivider from '../components/CurvedDivider';

interface Project {
  id: string;
  name: string;
  description: string;
  features: string[];
  technologies: string[];
  github: string | null;
  githubTraining?: string;
}

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const projects = t('projects.items', { returnObjects: true }) as Project[];
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleExpand = (projectId: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 12] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#fbbf24" />
          <Environment preset="sunset" />
          <MorphingShape position={[-5, 3, -6]} color="#fbbf24" />
          <MorphingShape position={[5, -3, -8]} color="#f59e0b" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-amber-500/5 to-transparent transform skew-x-12 z-0" />
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            {t('projects.title')}
          </Typography>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{ perspective: 1000 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(251, 191, 36, 0.3)',
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" sx={{ color: '#f59e0b', fontWeight: 'bold', mb: 2 }}>
                    {project.name}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>

                  {/* Features - Expandable */}
                  {expandedProjects.has(project.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: '#34495e' }}>
                        Key Features:
                      </Typography>
                      <ul className="space-y-1">
                        {project.features.map((feature, idx) => {
                          const isImportantNote = feature.startsWith('IMPORTANT:') || feature.startsWith('IMPORTANT :');
                          return (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              {!isImportantNote && <span className="text-primary mr-2 mt-1">•</span>}
                              <span 
                                style={isImportantNote ? {
                                  fontWeight: 700,
                                  fontSize: '0.95rem',
                                  color: '#f59e0b',
                                  backgroundColor: 'rgba(251, 191, 36, 0.1)',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  border: '2px solid rgba(251, 191, 36, 0.3)',
                                  display: 'block',
                                  marginTop: '8px'
                                } : {}}
                              >
                                {feature}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}

                  {/* Technologies */}
                  <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                          color: 'white',
                          fontWeight: 500,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => toggleExpand(project.id)}
                    endIcon={
                      <motion.div
                        animate={{ rotate: expandedProjects.has(project.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExpandMoreIcon />
                      </motion.div>
                    }
                    sx={{ color: '#fbbf24' }}
                  >
                    {expandedProjects.has(project.id) ? 'Show Less' : 'Show More'}
                  </Button>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {project.github && (
                      <Button
                        size="small"
                        startIcon={<GitHubIcon />}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: '#f59e0b',
                          '&:hover': {
                            color: '#fbbf24',
                            bgcolor: 'rgba(251, 191, 36, 0.1)'
                          }
                        }}
                      >
                        View App on GitHub
                      </Button>
                    )}

                    {project.githubTraining && (
                      <Button
                        size="small"
                        startIcon={<GitHubIcon />}
                        href={project.githubTraining}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: '#f59e0b',
                          '&:hover': {
                            color: '#fbbf24',
                            bgcolor: 'rgba(251, 191, 36, 0.1)'
                          }
                        }}
                      >
                        View Training on GitHub
                      </Button>
                    )}

                    {!project.github && !project.githubTraining && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#f59e0b', 
                          fontStyle: 'italic',
                          display: 'flex',
                          alignItems: 'center',
                          px: 1
                        }}
                      >
                        Private project - Demo available on request
                      </Typography>
                    )}
                  </Box>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Curved bottom divider */}
      <CurvedDivider direction="bottom" color="#ffffff" variant="wave3" />
    </section>
  );
}

