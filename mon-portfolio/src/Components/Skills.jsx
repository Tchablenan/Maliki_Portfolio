import React, { useState, useEffect, useRef } from 'react';

// Compétences professionnelles avec icônes placeholder
const skillCategories = [
  { key: 'all', label: 'Toutes', icon: '📊' },
  { key: 'geotech', label: 'Géotechnique', icon: '🏔️' },
  { key: 'infra', label: 'Infrastructures', icon: '🏗️' },
  { key: 'tools', label: 'Outils & Méthodes', icon: '⚙️' },
  { key: 'lab', label: 'Laboratoire', icon: '🔬' },
];

const professionalSkills = [
  // Géotechnique
  { name: 'Stabilisation des sols', category: 'geotech', icon: '⛰️', level: 95, description: 'Techniques avancées de stabilisation' },
  { name: 'Essais triaxiaux / liquéfaction', category: 'geotech', icon: '🧪', level: 90, description: 'Analyse comportementale des sols' },
  { name: 'Fondations profondes & superficielles', category: 'geotech', icon: '🏗️', level: 88, description: 'Conception et dimensionnement' },

  // Infrastructures
  { name: 'Conception routière', category: 'infra', icon: '🛣️', level: 92, description: 'Design et planification routière' },
  { name: 'Barrages et digues', category: 'infra', icon: '🌊', level: 85, description: 'Ouvrages hydrauliques complexes' },
  { name: 'Voirie et VRD', category: 'infra', icon: '🏘️', level: 87, description: 'Réseaux urbains et ruraux' },

  // Outils
  { name: 'AutoCAD', category: 'tools', icon: '📐', level: 94, description: 'Dessin technique et plans' },
  { name: 'Excel technique', category: 'tools', icon: '📊', level: 96, description: 'Calculs et analyses avancées' },
  { name: 'Gestion de projet', category: 'tools', icon: '📋', level: 89, description: 'Planification et coordination' },
  { name: 'Devis quantitatifs', category: 'tools', icon: '💰', level: 91, description: 'Estimation et budgétisation' },

  // Laboratoire
  { name: 'CBR / Compression / Cisaillement', category: 'lab', icon: '⚗️', level: 93, description: 'Tests mécaniques des sols' },
  { name: 'Granulométrie / Atterberg', category: 'lab', icon: '🔍', level: 90, description: 'Caractérisation physique' },
];

// Compétences linguistiques
const languageSkills = [
  { name: 'Français', level: 'Natif', icon: '🇫🇷', proficiency: 100, description: 'Langue maternelle' },
  { name: 'Anglais', level: 'Courant', icon: '🇬🇧', proficiency: 90, description: 'Professionnel et technique' },
  { name: 'Japonais', level: 'Élémentaire', icon: '🇯🇵', proficiency: 30, description: 'Bases conversationnelles' },
];

function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setAnimatedCards(new Set());
    if (isVisible) {
      const timer = setTimeout(() => {
        filteredSkills.forEach((_, index) => {
          setTimeout(() => {
            setAnimatedCards(prev => new Set([...prev, index]));
          }, index * 150);
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, selectedCategory]);

  const filteredSkills =
    selectedCategory === 'all'
      ? professionalSkills
      : professionalSkills.filter((skill) => skill.category === selectedCategory);

  const getLevelBadge = (level) => {
    if (level >= 90) return { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Expert' };
    if (level >= 80) return { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Avancé' };
    if (level >= 70) return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Intermédiaire' };
    return { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Débutant' };
  };

  const getProficiencyStars = (proficiency) => {
    const stars = Math.round(proficiency / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i < stars ? 'bg-yellow-400 shadow-sm' : 'bg-gray-300'
        }`}
      />
    ));
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* En-tête de section */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Expertise & Compétences
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une expertise technique approfondie acquise à travers des projets internationaux 
            et une approche scientifique rigoureuse
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-12 sm:mb-16 transition-all duration-800 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {skillCategories.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`group flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              <span className="text-base sm:text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Grille des compétences techniques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {filteredSkills.map((skill, idx) => (
            <div
              key={`${skill.name}-${selectedCategory}`}
              ref={el => cardsRef.current[idx] = el}
              className={`group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 p-6 sm:p-8 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                animatedCards.has(idx) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              } hover:-translate-y-2`}
            >
              {/* Badge de niveau en haut à droite */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium border ${getLevelBadge(skill.level).color}`}>
                {getLevelBadge(skill.level).label}
              </div>
              {/* En-tête de carte */}
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                  <span className="text-3xl sm:text-4xl">{skill.icon}</span>
                </div>
              </div>

              {/* Contenu de carte */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight text-center">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-center">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Section Langues */}
        <div className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Compétences Linguistiques
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {languageSkills.map((lang, idx) => (
              <div
                key={idx}
                className={`group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-emerald-200 p-6 sm:p-8 text-center transition-all duration-500 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${800 + idx * 200}ms`
                }}
              >
                {/* Drapeau */}
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl inline-block transform group-hover:scale-110 transition-transform duration-300">
                    {lang.icon}
                  </span>
                </div>

                {/* Informations de langue */}
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  {lang.name}
                </h4>
                <div className="text-emerald-600 font-semibold mb-2 text-sm sm:text-base">
                  {lang.level}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {lang.description}
                </p>

                {/* Indicateur de maîtrise */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Niveau de maîtrise
                  </div>
                  <div className="flex justify-center gap-1">
                    {getProficiencyStars(lang.proficiency)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-action subtil */}
        <div className={`text-center mt-16 sm:mt-20 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full text-sm font-medium shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
            <span>💼</span>
            <span>Prêt pour de nouveaux défis techniques</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;