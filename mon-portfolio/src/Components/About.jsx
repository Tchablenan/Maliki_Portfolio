// src/components/AboutSection.jsx
import React from 'react';
import malikiImage from '../assets/maliki.jpg';

function AboutSection() {
  return (
    <section id="about" className="">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          À propos <span className="text-primary-600 dark:text-primary-400">de moi</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image de Maliki */}
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute -inset-4 bg-primary-500 rounded-2xl -rotate-6"></div>
              <img
                src={malikiImage}
                alt="Maliki Djandjieme"
                className="relative w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Texte */}
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">Qui suis-je ?</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Je suis ingénieur géotechnicien, spécialisé en infrastructures urbaines et
              en solutions géo-environnementales. Mon parcours m’a conduit du Togo au Japon,
              avec une thèse doctorale axée sur la stabilisation des sols par matériaux recyclés.
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              À travers mes missions au sein de projets de coopération (JICA, EDF), j’ai acquis
              une expertise terrain dans les domaines de la réhabilitation routière, de la gestion
              des risques géotechniques, de l’environnement et du développement durable. Je suis
              passionné par la recherche appliquée et l’innovation au service des infrastructures
              résilientes et écoresponsables.
            </p>

            {/* Valeurs */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Mes valeurs</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  Intégrité scientifique
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  Innovation durable
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  Transfert de savoir
                </span>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  Travail collaboratif
                </span>
              </div>
            </div>

            {/* Bouton CV */}
            <a
              href="/cv-maliki-djandjieme.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Télécharger mon CV
              <i className="fas fa-download ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
