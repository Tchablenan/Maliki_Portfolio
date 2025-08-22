import React, { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Projet CACAO – Corridor de croissance',
    location: 'JICA – Afrique de l\'Ouest',
    year: '2024 – Présent',
    description: 'Coordination régionale d\'un programme d\'infrastructures : urbanisme, transport, déchets solides entre le Togo, la Côte d\'Ivoire et le Burkina Faso.',
    link: 'https://news.abidjan.net/articles/725209/cote-divoire-la-mobilisation-de-plus-de-4800-milliards-de-fcfa-pour-les-projets-prioritaires-du-plan-directeur-de-lamenagement-des-corridors-pour-lanneau-de-croissance-en-afrique-de-louest-cacao-au-centre-dune-mission',
    category: 'Infrastructure',
    status: 'En cours',
    type: 'Coordination',
    technologies: ['Planification régionale', 'Gestion multi-pays', 'Développement durable'],
    colors: {
      primary: 'bg-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    }
  },
  {
    title: 'Recherche doctorale – Stabilisation du sable',
    location: 'Université de Yokohama',
    year: '2020 – 2023',
    description: 'Étude expérimentale sur le renforcement du sable avec cendres de boues papetières pour les conduites souterraines.',
    link: '/documents/these-maliki.pdf',
    category: 'Recherche',
    status: 'Terminé',
    type: 'Recherche académique',
    technologies: ['Géotechnique expérimentale', 'Matériaux recyclés', 'Modélisation numérique'],
    colors: {
      primary: 'bg-purple-600',
      light: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600'
    }
  },
  {
    title: 'Encadrement triaxiaux & liquéfaction',
    location: 'Université de Yokohama',
    year: '2023 – 2024',
    description: 'Encadrement d\'étudiants et recherches sur la liquéfaction des sols et les essais dynamiques triaxiaux.',
    category: 'Enseignement',
    status: 'Terminé',
    type: 'Formation',
    technologies: ['Essais triaxiaux', 'Liquéfaction', 'Encadrement pédagogique'],
    colors: {
      primary: 'bg-green-600',
      light: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-600'
    }
  },
  {
    title: 'Réhabilitation de 4000 km de routes rurales',
    location: 'EDF – Togo',
    year: '2020 – 2021',
    description: 'Suivi de chantier, attachements, coordination terrain sur les routes rurales dans plusieurs régions du Togo.',
    category: 'Infrastructure',
    status: 'Terminé',
    type: 'Supervision de chantier',
    technologies: ['Suivi de travaux', 'Coordination terrain', 'Contrôle qualité'],
    colors: {
      primary: 'bg-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    }
  },
  {
    title: 'Réhabilitation du barrage de Kangounou',
    location: 'Togo',
    year: '2019',
    description: 'Étude géotechnique, matériaux, stabilisation de pente, supervision des travaux hydrauliques.',
    category: 'Hydraulique',
    status: 'Terminé',
    type: 'Ouvrage hydraulique',
    technologies: ['Étude géotechnique', 'Stabilisation de pente', 'Supervision hydraulique'],
    colors: {
      primary: 'bg-cyan-600',
      light: 'bg-cyan-50',
      text: 'text-cyan-700',
      border: 'border-cyan-200',
      gradient: 'from-cyan-500 to-cyan-600'
    }
  },
  {
    title: 'Stage WIM – Système de pesage dynamique',
    location: 'JICA – Tokyo',
    year: '2019',
    description: 'Implémentation d\'un système WIM pour routes africaines, dans le cadre d\'un programme de coopération.',
    category: 'Innovation',
    status: 'Terminé',
    type: 'Transfert de technologie',
    technologies: ['Système WIM', 'Coopération technique', 'Innovation routière'],
    colors: {
      primary: 'bg-indigo-600',
      light: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  },
  {
    title: 'Stabilisation de sol latéritique',
    location: '2iE – Burkina Faso',
    year: '2018',
    description: 'Essais CBR, formulation cimentée avec grave concassée pour renforcer les structures routières rurales.',
    category: 'Géotechnique',
    status: 'Terminé',
    type: 'Étude de laboratoire',
    technologies: ['Essais CBR', 'Formulation cimentée', 'Matériaux locaux'],
    colors: {
      primary: 'bg-orange-600',
      light: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
      gradient: 'from-orange-500 to-orange-600'
    }
  },
  {
    title: 'Bitumage de voirie (14 km)',
    location: 'Lomé – Togo',
    year: '2013',
    description: 'Réalisation de fondations, couches de base, enrobé bitumineux sur voirie urbaine en centre-ville.',
    category: 'Voirie',
    status: 'Terminé',
    type: 'Travaux de voirie',
    technologies: ['Fondations routières', 'Enrobé bitumineux', 'Voirie urbaine'],
    colors: {
      primary: 'bg-gray-600',
      light: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-200',
      gradient: 'from-gray-500 to-gray-600'
    }
  },
];

// Icônes optimisées
const ProjectIcon = ({ className = "w-6 h-6" }) => (
  <svg className={`${className} text-current`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-current`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-current`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} text-current`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-current`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

function Projects() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showAll, setShowAll] = useState(false);
  const observerRef = useRef(null);

  // Get unique categories
  const categories = ['Tous', ...new Set(projects.map(p => p.category))];

  // Filter projects
  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

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

  const getCategoryColors = (category) => {
    const colorMap = {
      'Infrastructure': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hover: 'hover:bg-blue-100' },
      'Recherche': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', hover: 'hover:bg-purple-100' },
      'Enseignement': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', hover: 'hover:bg-green-100' },
      'Hydraulique': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', hover: 'hover:bg-cyan-100' },
      'Innovation': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', hover: 'hover:bg-indigo-100' },
      'Géotechnique': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', hover: 'hover:bg-orange-100' },
      'Voirie': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', hover: 'hover:bg-gray-100' },
    };
    return colorMap[category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', hover: 'hover:bg-gray-100' };
  };

  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 min-h-screen overflow-hidden " id="projects">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        
        {/* Animations CSS */}
        <style jsx>{`
          @keyframes float-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes scale-in {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slide-up {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
            }
          }
          
          .animate-float-up {
            animation: float-up 0.8s ease-out;
          }
          
          .animate-float-up-delay {
            animation: float-up 0.8s ease-out 0.2s both;
          }
          
          .animate-scale-in {
            animation: scale-in 0.6s ease-out;
          }
          
          .animate-slide-up {
            animation: slide-up 0.5s ease-out;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          .hover-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .filter-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .tech-tag {
            transition: all 0.2s ease;
          }
          
          .tech-tag:hover {
            transform: scale(1.1);
          }
        `}</style>

        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 ">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg mb-4 sm:mb-6 animate-bounce hover:animate-pulse-glow transition-all duration-300">
            <ProjectIcon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 animate-float-up">
            Projets & Réalisations
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-3 sm:mb-4 animate-scale-in"></div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-float-up-delay">
            Portfolio de projets d'infrastructure, de recherche et d'innovation menés en Afrique et au Japon
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-button px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transform-gpu ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105 animate-pulse-glow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 border border-gray-200 shadow-sm'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {displayedProjects.map((project, index) => {
            const isVisible = visibleItems.has(index.toString());
            const categoryColors = getCategoryColors(project.category);
            const ProjectWrapper = project.link ? 'a' : 'div';
            const wrapperProps = project.link
              ? {
                  href: project.link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'block group'
                }
              : { className: 'block group' };

            return (
              <div
                key={index}
                data-index={index}
                ref={(el) => {
                  if (el && observerRef.current) {
                    observerRef.current.observe(el);
                  }
                }}
                className={`transform transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProjectWrapper {...wrapperProps}>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 overflow-hidden hover-lift h-full flex flex-col relative group">
                    
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`w-1 h-1 sm:w-2 sm:h-2 ${project.colors.primary} rounded-full animate-bounce`} style={{ animationDelay: '0s' }}></div>
                      <div className={`w-1 h-1 ${project.colors.primary} rounded-full absolute top-2 left-2 animate-bounce`} style={{ animationDelay: '0.5s' }}></div>
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col h-full relative z-10">
                      {/* Header badges */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 sm:mb-4">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border} hover:scale-105 transition-transform duration-200`}>
                            {project.category}
                          </span>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'En cours' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse' 
                              : 'bg-gray-50 text-gray-600 border border-gray-200'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        {project.link && (
                          <ExternalLinkIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-300 flex-shrink-0 group-hover:scale-110" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-all duration-300 leading-tight line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Meta Information */}
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0 group-hover:animate-spin" />
                          <span className="font-medium truncate">{project.year}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <LocationIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 group-hover:animate-bounce" />
                          <span className="truncate">{project.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-3">
                        {project.description}
                      </p>

                      {/* Project Type */}
                      <div className="mb-3 sm:mb-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border hover:scale-105 transition-transform duration-200">
                          {project.type}
                        </span>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`tech-tag px-2 py-1 ${project.colors.light} ${project.colors.text} rounded text-xs font-medium cursor-pointer`}
                            style={{ animationDelay: `${techIndex * 100}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium hover:scale-110 transition-transform duration-200 cursor-pointer">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </ProjectWrapper>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {!showAll && filteredProjects.length > 6 && (
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-sm sm:text-base group animate-bounce-in focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="group-hover:animate-pulse">Voir tous les projets</span>
              <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
            </button>
          </div>
        )}

       
      </div>
    </section>
  );
}

export default Projects;