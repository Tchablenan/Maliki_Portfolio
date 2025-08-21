import React, { useState, useEffect, useRef } from 'react';

// Expériences et études classées par ordre chronologique décroissant
const experiences = [
  {
    type: 'work',
    title: 'Chargé de programme – Infrastructures & Urbanisme',
    institution: 'JICA Côte d\'Ivoire',
    period: 'Mai 2024 – Présent',
    location: 'Abidjan, Côte d\'Ivoire',
    description:
      'Gestion du projet CACAO. Coordination des projets de transport, urbanisme, déchets et développement régional entre le Togo, la Côte d\'Ivoire et le Burkina Faso.',
    skills: ['Gestion de projet', 'Coordination internationale', 'Urbanisme'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'work',
    title: 'Chercheur adjoint',
    institution: 'Université de Yokohama',
    period: 'Sept. 2023 – Fév. 2024',
    location: 'Yokohama, Japon',
    description:
      'Encadrement des étudiants pour les essais triaxiaux et la liquéfaction. Recherches sur la stabilisation de sol en zone sismique.',
    skills: ['Recherche', 'Géotechnique', 'Encadrement'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'education',
    title: 'Doctorat en Ingénierie Géo-Environnementale',
    institution: 'Université Nationale de Yokohama, Japon',
    period: '2020 – 2023',
    location: 'Yokohama, Japon',
    description:
      'Stabilisation du sable avec cendres de boues papetières. Expérimentations en laboratoire et rédaction scientifique.',
    skills: ['Recherche scientifique', 'Expérimentation', 'Publication'],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    type: 'work',
    title: 'Ingénieur civil (Projet EDF)',
    institution: 'EDF – Togo',
    period: '2020 – 2021',
    location: 'Togo',
    description:
      'Réhabilitation de 4000 km de routes rurales. Études, devis, supervision des travaux et coordination sur le terrain.',
    skills: ['Ingénierie civile', 'Supervision', 'Coordination'],
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'education',
    title: 'Master en Génie des Infrastructures Urbaines',
    institution: 'Université Nationale de Yokohama, Japon',
    period: '2018 – 2020',
    location: 'Yokohama, Japon',
    description:
      'Formation approfondie en infrastructures urbaines durables, aménagement et résilience.',
    skills: ['Infrastructures urbaines', 'Développement durable', 'Résilience'],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    type: 'work',
    title: 'Ingénieur géotechnique (Projet Kangounou)',
    institution: 'Togo',
    period: '2018 – 2019',
    location: 'Togo',
    description:
      'Projet de réhabilitation de digue. Étude topographique, choix de matériaux, réalisation de déversoir.',
    skills: ['Géotechnique', 'Topographie', 'Hydraulique'],
    color: 'from-cyan-500 to-blue-500'
  },
  {
    type: 'education',
    title: 'Master en Conception d\'Infrastructures Routières',
    institution: '2iE, Burkina Faso',
    period: '2016 – 2018',
    location: 'Ouagadougou, Burkina Faso',
    description:
      'Spécialisation en voirie, VRD, stabilisation des sols et ouvrages hydrauliques.',
    skills: ['Voirie', 'VRD', 'Stabilisation des sols'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'work',
    title: 'Stage – Voirie urbaine bitumée',
    institution: 'Lomé',
    period: '2013',
    location: 'Lomé, Togo',
    description:
      'Projet de bitumage de 14 km en milieu urbain. Réalisation des couches de fondation, base et revêtement.',
    skills: ['Bitumage', 'Travaux urbains', 'Fondations'],
    color: 'from-amber-500 to-orange-500'
  },
];

function Experience() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [showAll, setShowAll] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <section id="experience" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <i className="fas fa-briefcase  text-3xl"></i>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-4">
            Mon Parcours
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Un voyage professionnel entre l'Afrique et l'Asie, au service des infrastructures durables
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Ligne centrale */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-200 via-purple-300 to-indigo-200 dark:from-blue-800 dark:via-purple-700 dark:to-indigo-800"></div>
          
          <div className="space-y-12">
            {displayedExperiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.has(index.toString());
              
              return (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => {
                    if (el && observerRef.current) {
                      observerRef.current.observe(el);
                    }
                  }}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 transform transition-all duration-700 ease-out ${
                      isVisible 
                        ? 'translate-y-0 opacity-100' 
                        : `${isLeft ? '-translate-x-8' : 'translate-x-8'} translate-y-4 opacity-0`
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="group relative">
                      {/* Hover glow effect */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${exp.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur`}></div>
                      
                      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {exp.type === 'education' ? (
                              <i className="fas fa-graduation-cap  text-xl"></i>
                            ) : (
                              <i className="fas fa-briefcase  text-xl"></i>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              {exp.institution}
                            </p>
                          </div>
                        </div>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <i className="fas fa-calendar-alt text-blue-500 dark:text-blue-400"></i>
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <i className="fas fa-map-marker-alt text-green-500 dark:text-green-400"></i>
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className={`px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r ${exp.color}  shadow-sm hover:scale-105 transition-transform duration-200`}
                              style={{ animationDelay: `${(index * 100) + (skillIndex * 50)}ms` }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    <div 
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} border-4 border-white dark:border-slate-900 shadow-lg transition-all duration-500 ${
                        isVisible ? 'scale-100' : 'scale-0'
                      }`}
                      style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-transparent animate-ping"></div>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 hidden md:block ${isLeft ? '-translate-x-8' : 'translate-x-8'}`}>
                    <div 
                      className={`w-8 h-0.5 bg-gradient-to-r ${exp.color} transition-all duration-500 ${
                        isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 100 + 300}ms`,
                        transformOrigin: isLeft ? 'right' : 'left'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More Button */}
          {!showAll && experiences.length > 4 && (
            <div className="text-center mt-16">
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Voir toutes les expériences</span>
                <i className="fas fa-chevron-down text-white group-hover:translate-y-1 transition-transform duration-300"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bg-grid-slate-100 {
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .dark .bg-grid-slate-700\\/25 {
          background-image: radial-gradient(circle, rgba(51, 65, 85, 0.25) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}

export default Experience;