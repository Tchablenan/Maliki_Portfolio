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
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 relative overflow-hidden" id="contact">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute top-20 left-20 w-20 h-20 bg-yellow-400 rounded-full blur-sm opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-500 rounded-full blur-2xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Entrons en Contact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Prêt à collaborer sur votre prochain projet ? Je serais ravi d'échanger avec vous sur vos idées et défis techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Informations de contact
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                N'hésitez pas à me contacter pour toute collaboration ou question.
                Je suis disponible pour échanger sur des projets d'infrastructure, de recherche ou de conseil.
              </p>

              <div className="flex flex-col gap-8">
                {/* Email */}
                <div className="flex items-start gap-6 p-6 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:bg-blue-50/80 dark:hover:bg-blue-900/20 hover:-translate-y-1 hover:border-blue-200/50 dark:hover:border-blue-700/50 hover:shadow-lg group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 relative">
                    <div className="absolute inset-0.5 rounded-xl bg-gradient-to-br from-white/30 to-white/10"></div>
                    <Mail size={20} className="text-white relative z-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 tracking-tight">Email</h4>
                    <div className="flex flex-col gap-2">
                      <a 
                        href="mailto:kdjandjieme@gmail.com" 
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium text-sm hover:translate-x-1 relative"
                      >
                        <span className="relative">
                          kdjandjieme@gmail.com
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </a>
                      <a 
                        href="mailto:djandjiememaliki@yahoo.com" 
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium text-sm hover:translate-x-1 relative"
                      >
                        <span className="relative">
                          djandjiememaliki@yahoo.com
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6 p-6 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:bg-green-50/80 dark:hover:bg-green-900/20 hover:-translate-y-1 hover:border-green-200/50 dark:hover:border-green-700/50 hover:shadow-lg group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 relative flex-shrink-0">
                    <div className="absolute inset-0.5 rounded-xl bg-gradient-to-br from-white/30 to-white/10"></div>
                    <Phone size={20} className="text-white relative z-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3 tracking-tight">Téléphone</h4>
                    <div className="flex flex-col gap-2">
                      <a 
                        href="tel:+2250705008308" 
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-semibold text-lg tracking-wide hover:translate-x-1 relative"
                      >
                        <span className="relative">
                          +225 07 05 00 83 08
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Retrouvez-moi sur</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.linkedin.com/in/djandjieme-maliki-otieboame-a50798b0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  >
                    <Linkedin size={20} className="text-white transition-transform duration-300 hover:rotate-12" />
                  </a>
                  <a 
                    href="https://web.facebook.com/malikiotieboame" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  >
                    <Facebook size={20} className="text-white transition-transform duration-300 hover:rotate-12" />
                  </a>
                  <a 
                    href="https://x.com/DjandjiemeM" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 to-black flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  >
                    <Twitter size={20} className="text-white transition-transform duration-300 hover:rotate-12" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Envoyez-moi un message
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col transition-all duration-300 hover:-translate-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="flex flex-col transition-all duration-300 hover:-translate-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col transition-all duration-300 hover:-translate-y-1">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Objet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div className="flex flex-col transition-all duration-300 hover:-translate-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-base bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white resize-none min-h-[150px]"
                  placeholder="Décrivez votre projet ou votre demande..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none rounded-xl font-semibold text-base shadow-lg cursor-pointer transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
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
                <div className={`flex items-center gap-2 p-4 rounded-xl border font-medium animate-pulse ${
                  status === 'success' 
                    ? 'bg-green-100/50 dark:bg-green-900/20 border-green-200/50 dark:border-green-700/50 text-green-800 dark:text-green-400'
                    : 'bg-red-100/50 dark:bg-red-900/20 border-red-200/50 dark:border-red-700/50 text-red-800 dark:text-red-400'
                }`}>
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
  );
}

export default Contact;