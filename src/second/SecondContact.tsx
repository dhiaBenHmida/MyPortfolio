import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import SecondReveal from './SecondReveal.tsx';

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

export default function SecondContact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = 'Email is invalid';
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('sending');

    try {
      if (!formRef.current) {
        setStatus('error');
        return;
      }
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="second-chapter">
      <div className="second-container">
        <SecondReveal className="second-chapter-head">
          <p className="second-mono second-chapter-index">{t('second.chapters.contact.index')}</p>
          <h2 className="second-display second-chapter-title">{t('second.chapters.contact.title')}</h2>
          <p className="second-chapter-sub">{t('second.chapters.contact.sub')}</p>
        </SecondReveal>

        <div className="second-contact-band">
          <div className="second-contact-card">
            <div className="second-contact-grid">
              <div className="second-contact-info">
                <p>
                  <a href="mailto:m.dhia.b.h@gmail.com">m.dhia.b.h@gmail.com</a>
                </p>
                <p>
                  <a href="tel:+21627225432">+(216) 27 225 432</a>
                </p>
                <p>
                  <a href="tel:+21695410551">+(216) 95 410 551</a>
                </p>
                <p>Tunis, Tunisia</p>
                <p>
                  <a
                    href="https://linkedin.com/in/mohamed-dhia-ben-hmida-11b018135"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>

              <form className="second-form" ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" name="from_name" value={formData.name} />
                <input type="hidden" name="from_email" value={formData.email} />
                <input type="hidden" name="reply_to" value={formData.email} />

                {status === 'success' ? (
                  <div className="second-alert second-alert-ok">{t('contact.form.success')}</div>
                ) : null}
                {status === 'error' ? (
                  <div className="second-alert second-alert-err">{t('contact.form.error')}</div>
                ) : null}

                <label>
                  {t('contact.form.name')}
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name ? <span className="second-field-error">{errors.name}</span> : null}
                </label>

                <label>
                  {t('contact.form.email')}
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email ? <span className="second-field-error">{errors.email}</span> : null}
                </label>

                <label>
                  {t('contact.form.message')}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message ? <span className="second-field-error">{errors.message}</span> : null}
                </label>

                <button
                  className="second-btn second-btn-accent second-btn-lg"
                  type="submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
