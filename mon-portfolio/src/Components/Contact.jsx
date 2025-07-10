// src/components/ContactSection.jsx
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://formspree.io/f/mwkzjrvd', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('Message envoyé avec succès');
    } else {
      setStatus('Erreur lors de l\'envoi du message');
    }

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="" >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Me <span className="text-primary-600 dark:text-primary-400">contacter</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Informations de contact */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
            <p className="mb-8 text-gray-700 dark:text-gray-300">
              N'hésitez pas à me contacter pour toute collaboration ou question.
              Je suis disponible pour échanger sur des projets d’infrastructure, de recherche ou de conseil.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-envelope text-primary-600 dark:text-primary-400"></i>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a href="mailto:kdjandjieme@gmail.com" className="hover:text-primary-600 dark:hover:text-primary-400">kdjandjieme@gmail.com</a><br />
                    <a href="mailto:djandjiememaliki@yahoo.com" className="hover:text-primary-600 dark:hover:text-primary-400">djandjiememaliki@yahoo.com</a>
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4 mt-1">
                  <i className="fas fa-phone-alt text-primary-600 dark:text-primary-400"></i>
                </div>
                <div>
                  <h4 className="font-medium">Téléphone</h4>
                  <a href="tel:+2250705008308" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    +225 07 05 00 83 08
                  </a>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8">
              <h4 className="font-medium mb-4">Réseaux sociaux</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/djandjieme-maliki-otieboame-a50798b0" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://web.facebook.com/malikiotieboame" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com/DjandjiemeM" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-x-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:w-1/2">
            <form id="contact-form" onSubmit={handleSubmit} className="bg-white dark:bg-dark-900 p-8 rounded-xl shadow-md">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Nom</label>
                <input  type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="input w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800" />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800" />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">Objet</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="input w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800" />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className="input w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800"></textarea>
              </div>

              <button type="submit" className="btn-primary  w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                {status ? status : "Envoyer le message"} <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
