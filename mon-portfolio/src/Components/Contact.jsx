import React, { useState } from 'react';
import { Mail, Phone, Send, Linkedin, Facebook, Twitter, CheckCircle, AlertCircle } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mwkzjrvd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <>
      <style jsx>{`
        .contact-section {
          min-height: 100vh;
          padding: 5rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%);
          position: relative;
          overflow: hidden;
        }

        .dark .contact-section {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a8a 100%);
        }

        .bg-decoration {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.1;
        }

        .bg-decoration-1 {
          top: -10rem;
          right: -10rem;
          width: 20rem;
          height: 20rem;
          background: #60a5fa;
        }

        .bg-decoration-2 {
          bottom: -10rem;
          left: -10rem;
          width: 20rem;
          height: 20rem;
          background: #a855f7;
        }

        .bg-decoration-3 {
          top: 5rem;
          left: 5rem;
          width: 5rem;
          height: 5rem;
          background: #fbbf24;
          filter: blur(20px);
        }

        .bg-decoration-4 {
          bottom: 5rem;
          right: 5rem;
          width: 8rem;
          height: 8rem;
          background: #10b981;
          filter: blur(40px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
        }

        .header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          background: linear-gradient(to right, #2563eb, #7c3aed, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #6b7280;
          max-width: 32rem;
          margin: 0 auto;
          line-height: 1.6;
        }

        .dark .subtitle {
          color: #d1d5db;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
          max-width: 90rem;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          width: 150%;
        }

        .dark .info-card {
          background: rgba(31, 41, 55, 0.7);
          border: 1px solid rgba(75, 85, 99, 0.2);
        }

        .info-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .dark .info-title {
          color: #ffffff;
        }

        .info-description {
          color: #6b7280;
          margin-bottom: 2rem;
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .dark .info-description {
          color: #d1d5db;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 1.5rem;
          border-radius: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
        }

        .contact-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
        }

        .contact-item:hover::before {
          left: 100%;
        }

        .contact-item:hover {
          background: rgba(59, 130, 246, 0.08);
          transform: translateY(-2px);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .contact-item.phone:hover {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.2);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
        }

        .dark .contact-item:hover {
          background: rgba(59, 130, 246, 0.1);
        }

        .dark .contact-item.phone:hover {
          background: rgba(16, 185, 129, 0.1);
        }

        .contact-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          flex-shrink: 0;
        }

        .contact-icon::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: subtract;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
        }

        .contact-item:hover .contact-icon {
          transform: scale(1.05) rotate(3deg);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .email-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .phone-icon {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }

        .contact-details {
          flex: 1;
          min-width: 0;
        }

        .contact-details h4 {
          font-weight: 700;
          font-size: 1.125rem;
          color: #1f2937;
          margin-bottom: 0.75rem;
          letter-spacing: -0.025em;
        }

        .dark .contact-details h4 {
          color: #ffffff;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-details a {
          color: #6b7280;
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.25rem 0;
          border-radius: 0.375rem;
          position: relative;
        }

        .contact-details a::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }

        .contact-details a:hover::before {
          width: 100%;
        }

        .contact-details a:hover {
          color: #3b82f6;
          transform: translateX(4px);
        }

        .dark .contact-details a {
          color: #d1d5db;
        }

        .dark .contact-details a:hover {
          color: #60a5fa;
        }

        .phone-link {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }

        .social-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .dark .social-section {
          border-top: 1px solid #4b5563;
        }

        .social-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .dark .social-title {
          color: #ffffff;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .social-link svg {
          width: 1.25rem;
          height: 1.25rem;
          color: white;
          transition: transform 0.3s ease;
        }

        .social-link:hover svg {
          transform: rotate(12deg);
        }

        .linkedin {
          background: linear-gradient(to right, #2563eb, #1d4ed8);
        }

        .facebook {
          background: linear-gradient(to right, #3b82f6, #2563eb);
        }

        .twitter {
          background: linear-gradient(to right, #1f2937, #000000);
        }

        .form-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark .form-card {
          background: rgba(31, 41, 55, 0.8);
          border: 1px solid rgba(75, 85, 99, 0.2);
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .dark .form-title {
          color: #ffffff;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .form-group:hover {
          transform: translateY(-2px);
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .dark .form-label {
          color: #d1d5db;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          ring: 2px solid #3b82f6;
          border-color: transparent;
          box-shadow: 0 0 0 2px #3b82f6;
        }

        .dark .form-input, .dark .form-textarea {
          border: 1px solid #4b5563;
          background: rgba(55, 65, 81, 0.5);
          color: #ffffff;
        }

        .form-textarea {
          resize: none;
          min-height: 150px;
        }

        .submit-button {
          width: 100%;
          position: relative;
          overflow: hidden;
          padding: 1rem 2rem;
          background: linear-gradient(to right, #2563eb, #7c3aed);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(to right, #1d4ed8, #6d28d9);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          transform: scale(1.02);
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .status-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid;
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        .status-success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.2);
          color: #047857;
        }

        .dark .status-success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
          color: #34d399;
        }

        .status-error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.2);
          color: #dc2626;
        }

        .dark .status-error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #f87171;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }
          
          .contact-section {
            padding: 3rem 0;
          }
          
          .container {
            padding: 0 1rem;
          }
        }
      `}</style>

      <section className="contact-section">
        {/* Background decorations */}
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>
        <div className="bg-decoration bg-decoration-3"></div>
        <div className="bg-decoration bg-decoration-4"></div>

        <div className="container">
          {/* Header */}
          <div className="header">
            <h2 className="main-title">Entrons en Contact</h2>
            <p className="subtitle">
              Prêt à collaborer sur votre prochain projet ? Je serais ravi d'échanger avec vous sur vos idées et défis techniques.
            </p>
          </div>

          <div className="grid">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-card">
                <h3 className="info-title">Informations de contact</h3>
                <p className="info-description">
                  N'hésitez pas à me contacter pour toute collaboration ou question.
                  Je suis disponible pour échanger sur des projets d'infrastructure, de recherche ou de conseil.
                </p>

                <div className="contact-items">
                  {/* Email */}
                  <div className="contact-item">
                    <div className="contact-icon email-icon">
                      <Mail size={20} color="white" />
                    </div>
                    <div className="contact-details">
                      <h4>Email</h4>
                      <div className="contact-links">
                        <a href="mailto:kdjandjieme@gmail.com">kdjandjieme@gmail.com</a>
                        <a href="mailto:djandjiememaliki@yahoo.com">djandjiememaliki@yahoo.com</a>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="contact-item phone">
                    <div className="contact-icon phone-icon">
                      <Phone size={20} color="white" />
                    </div>
                    <div className="contact-details">
                      <h4>Téléphone</h4>
                      <div className="contact-links">
                        <a href="tel:+2250705008308" className="phone-link">+225 07 05 00 83 08</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="social-section">
                  <h4 className="social-title">Retrouvez-moi sur</h4>
                  <div className="social-links">
                    <a href="https://www.linkedin.com/in/djandjieme-maliki-otieboame-a50798b0" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                      <Linkedin />
                    </a>
                    <a href="https://web.facebook.com/malikiotieboame" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                      <Facebook />
                    </a>
                    <a href="https://x.com/DjandjiemeM" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                      <Twitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="form-card">
              <h3 className="form-title">Envoyez-moi un message</h3>
              
              <div className="form-container">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Objet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Décrivez votre projet ou votre demande..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  <span className="button-content">
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer le message</span>
                        <Send size={20} />
                      </>
                    )}
                  </span>
                </button>

                {/* Status Messages */}
                {status && (
                  <div className={`status-message ${status === 'success' ? 'status-success' : 'status-error'}`}>
                    {status === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>
                      {status === 'success' 
                        ? 'Message envoyé avec succès ! Je vous répondrai bientôt.' 
                        : 'Erreur lors de l\'envoi. Veuillez réessayer.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
