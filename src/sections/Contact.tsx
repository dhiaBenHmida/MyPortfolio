import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert,
  IconButton 
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { Canvas } from '@react-three/fiber';
import ParticleField from '../components/3d/ParticleField';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStatus('sending');
    
    try {
      // Send email directly using EmailJS
      if (formRef.current) {
        const result = await emailjs.sendForm(
          'Portfolio_Mail', // Service ID
          'template_qrp5kgh', // Default template
          formRef.current,
          'XX61t_NLMKLeiFhaI' // Public Key
        );
        
        console.log('Email sent successfully:', result);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined,
      });
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      label: t('contact.info.email'),
      value: 'm.dhia.bh@gmail.com',
      link: 'mailto:m.dhia.bh@gmail.com',
    },
    {
      icon: <PhoneIcon />,
      label: t('contact.info.phone'),
      value: '+(216) 27 225 432',
      link: 'tel:+21627225432',
    },
    {
      icon: <LocationIcon />,
      label: t('contact.info.location'),
      value: 'Tunis, Tunisia',
      link: null,
    },
    {
      icon: <LinkedInIcon />,
      label: t('contact.info.linkedin'),
      value: 'LinkedIn Profile',
      link: 'https://linkedin.com/in/mohamed-dhia-ben-hmida-11b018135',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden min-h-screen">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#fbbf24" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
          <ParticleField count={800} radius={15} mouseInfluence={false} />
        </Canvas>
      </div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 z-0" />

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
            <Typography variant="h2" className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#fbbf24' }}>
              {t('contact.title')}
            </Typography>
            <Typography variant="h6" className="text-amber-200 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </Typography>
            <div className="w-24 h-1 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }} />
        </motion.div>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
              <Paper
                elevation={5}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                }}
              >
                <form ref={formRef} onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      fullWidth
                      label={t('contact.form.name')}
                      name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#3498db' },
                        '&.Mui-focused fieldset': { borderColor: '#3498db' },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label={t('contact.form.email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': { borderColor: 'rgba(251, 191, 36, 0.3)' },
                          '&:hover fieldset': { borderColor: '#fbbf24' },
                          '&.Mui-focused fieldset': { borderColor: '#fbbf24' },
                        },
                        '& .MuiInputLabel-root': { color: '#fbbf24' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#fbbf24' },
                      }}
                    />

                  <TextField
                    fullWidth
                    label={t('contact.form.message')}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    variant="outlined"
                    multiline
                    rows={6}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(251, 191, 36, 0.3)' },
                        '&:hover fieldset': { borderColor: '#fbbf24' },
                        '&.Mui-focused fieldset': { borderColor: '#fbbf24' },
                      },
                      '& .MuiInputLabel-root': { color: '#fbbf24' },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#fbbf24' },
                    }}
                  />

                  {status === 'success' && (
                    <Alert severity="success">{t('contact.form.success')}</Alert>
                  )}
                  
                  {status === 'error' && (
                    <Alert severity="error">{t('contact.form.error')}</Alert>
                  )}

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      disabled={status === 'sending'}
                      sx={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        color: 'white',
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(251, 191, 36, 0.5)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                    </Button>
                </Box>
              </form>
            </Paper>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(251, 191, 36, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        cursor: info.link ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: info.link ? '0 6px 20px rgba(251, 191, 36, 0.4)' : undefined,
                          transform: info.link ? 'translateX(5px)' : undefined,
                        }
                      }}
                      onClick={() => info.link && window.open(info.link, '_blank')}
                    >
                      <IconButton
                        sx={{
                          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                          color: 'white',
                          '&:hover': { 
                            background: 'linear-gradient(135deg, #f59e0b, #fb923c)',
                          },
                        }}
                      >
                        {info.icon}
                      </IconButton>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#fbbf24' }}>
                          {info.label}
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: 'white' }}>
                          {info.value}
                        </Typography>
                      </Box>
                    </Paper>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>
      </div>
    </section>
  );
}

