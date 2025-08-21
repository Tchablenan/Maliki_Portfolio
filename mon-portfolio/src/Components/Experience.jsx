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
    colors: {
      primary: 'bg-blue-600',
      secondary: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      dot: 'bg-blue-500'
    }
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
    colors: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      dot: 'bg-purple-500'
    }
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
    colors: {
      primary: 'bg-emerald-600',
      secondary: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500'
    }
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
    colors: {
      primary: 'bg-orange-600',
      secondary: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      dot: 'bg-orange-500'
    }
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
    colors: {
      primary: 'bg-indigo-600',
      secondary: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-700',
      dot: 'bg-indigo-500'
    }
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
    colors: {
      primary: 'bg-cyan-600',
      secondary: 'bg-cyan-50',
      border: 'border-cyan-200',
      text: 'text-cyan-700',
      dot: 'bg-cyan-500'
    }
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
    colors: {
      primary: 'bg-green-600',
      secondary: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      dot: 'bg-green-500'
    }
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
    colors: {
      primary: 'bg-amber-600',
      secondary: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      dot: 'bg-amber-500'
    }
  },
];

// Icônes optimisées
const WorkIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zM8 5a1 1 0 011-1h2a1 1 0 011 1v1H8V5z" clipRule="evenodd" />
  </svg>
);

const EducationIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
    <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.125 2.524 1 1 0 01-1.45 0z" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const LocationIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-current`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

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
      { threshold: 0.1, rootMargin: '20px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <section id="experience" className="py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        
        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes bounce-in {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes count-up {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
          
          .animate-fade-in-up-delay {
            animation: fade-in-up 0.8s ease-out 0.3s both;
          }
          
          .animate-bounce-in {
            animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          
          .animate-count-up {
            animation: count-up 1s ease-out;
          }
          
          .animate-fade-in {
            animation: fade-in-up 0.5s ease-out;
          }
        `}</style>
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg mb-4 sm:mb-6 animate-bounce hover:animate-pulse transition-all duration-300">
            <WorkIcon className="w-5 h-5 sm:w-7 sm:h-7 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 animate-fade-in-up">
            Mon Parcours
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay">
            Un voyage professionnel entre l'Afrique et l'Asie, au service des infrastructures durables
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 animate-pulse"></div>
          
          {/* Timeline Items */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {displayedExperiences.map((exp, index) => {
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
                  className={`relative flex items-start gap-3 sm:gap-4 md:gap-6 transform transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${exp.colors.primary} rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-xl ${isVisible ? 'animate-bounce-in scale-100' : 'scale-0'}`}
                         style={{ animationDelay: `${index * 200}ms` }}>
                      {exp.type === 'education' ? 
                        <EducationIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-pulse" /> : 
                        <WorkIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-pulse" />
                      }
                      {/* Ripple effect */}
                      <div className={`absolute inset-0 ${exp.colors.dot} rounded-full animate-ping opacity-30`}></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 min-w-0">
                    <div className={`bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border-l-3 sm:border-l-4 ${exp.colors.border} overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] transform-gpu`}>
                      
                      {/* Animated background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${exp.colors.secondary} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute top-0 right-0 w-20 h-20 opacity-20 overflow-hidden">
                        <div className={`w-2 h-2 ${exp.colors.dot} rounded-full absolute top-4 right-4 animate-bounce`} style={{ animationDelay: '0s' }}></div>
                        <div className={`w-1 h-1 ${exp.colors.dot} rounded-full absolute top-8 right-12 animate-bounce`} style={{ animationDelay: '0.5s' }}></div>
                        <div className={`w-1.5 h-1.5 ${exp.colors.dot} rounded-full absolute top-12 right-6 animate-bounce`} style={{ animationDelay: '1s' }}></div>
                      </div>
                      
                      {/* Card Header */}
                      <div className="p-3 sm:p-4 lg:p-6">
                        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-105 transform-gpu">
                              {exp.title}
                            </h3>
                            <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                              {exp.institution}
                            </p>
                          </div>
                          <div className={`px-2 py-1 ${exp.colors.secondary} ${exp.colors.text} text-xs font-medium rounded-md flex-shrink-0 hover:scale-110 transition-transform duration-300 animate-fade-in`}>
                            {exp.type === 'education' ? 'Formation' : 'Expérience'}
                          </div>
                        </div>

                        {/* Meta Information */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3 sm:mb-4">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group-hover:animate-pulse">
                            <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 animate-spin-slow" />
                            <span className="text-xs sm:text-sm font-medium truncate">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 group-hover:animate-pulse">
                            <LocationIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 animate-bounce-slow" />
                            <span className="text-xs sm:text-sm font-medium truncate">{exp.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                          {exp.description}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${exp.colors.primary} text-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 transform-gpu animate-fade-in-up cursor-pointer`}
                              style={{ animationDelay: `${(index * 200) + (skillIndex * 100)}ms` }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Show More Button */}
        {!showAll && experiences.length > 4 && (
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 animate-bounce-in group"
            >
              <span className="group-hover:animate-pulse">Voir toutes les expériences</span>
              <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
            </button>
          </div>
        )}

        {/* Professional Stats or Achievement Banner */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 transition-all duration-500 hover:-translate-y-1 animate-fade-in-up">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center group cursor-pointer">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 group-hover:scale-125 transition-transform duration-300 animate-count-up">8+</div>
                <div className="text-xs sm:text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300">Années d'expérience</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 group-hover:scale-125 transition-transform duration-300 animate-count-up" style={{ animationDelay: '0.2s' }}>3</div>
                <div className="text-xs sm:text-sm text-gray-600 group-hover:text-purple-600 transition-colors duration-300">Pays d'intervention</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mb-1 group-hover:scale-125 transition-transform duration-300 animate-count-up" style={{ animationDelay: '0.4s' }}>1</div>
                <div className="text-xs sm:text-sm text-gray-600 group-hover:text-emerald-600 transition-colors duration-300">Doctorat</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 mb-1 group-hover:scale-125 transition-transform duration-300 animate-count-up" style={{ animationDelay: '0.6s' }}>5+</div>
                <div className="text-xs sm:text-sm text-gray-600 group-hover:text-orange-600 transition-colors duration-300">Projets majeurs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;