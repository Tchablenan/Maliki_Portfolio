import React, { useState, useEffect, useRef } from 'react';

// Compétences professionnelles avec icônes placeholder
const skillCategories = [
  { key: 'all', label: 'Tous', icon: '🔧' },
  { key: 'geotech', label: 'Géotechnique', icon: '⛏️' },
  { key: 'infra', label: 'Infrastructures', icon: '🏗️' },
  { key: 'tools', label: 'Outils', icon: '🛠️' },
  { key: 'lab', label: 'Laboratoire', icon: '🔬' },
];

const professionalSkills = [
  // Géotechnique
  { name: 'Stabilisation des sols', category: 'geotech', icon: '⛏️', level: 95 },
  { name: 'Essais triaxiaux / liquéfaction', category: 'geotech', icon: '🔬', level: 90 },
  { name: 'Fondations (profondes / superficielles)', category: 'geotech', icon: '🏗️', level: 88 },

  // Infrastructures
  { name: 'Conception routière', category: 'infra', icon: '🛣️', level: 92 },
  { name: 'Barrages et digues', category: 'infra', icon: '🏞️', level: 85 },
  { name: 'Voirie et VRD', category: 'infra', icon: '🛤️', level: 87 },

  // Outils
  { name: 'AutoCAD', category: 'tools', icon: '📐', level: 94 },
  { name: 'Excel technique', category: 'tools', icon: '📊', level: 96 },
  { name: 'Gestion de projet', category: 'tools', icon: '📋', level: 89 },
  { name: 'Devis quantitatifs', category: 'tools', icon: '📄', level: 91 },

  // Laboratoire
  { name: 'CBR / Compression / Cisaillement', category: 'lab', icon: '⚗️', level: 93 },
  { name: 'Granulométrie / Atterberg', category: 'lab', icon: '🔬', level: 90 },
];

// Compétences linguistiques
const languageSkills = [
  { name: 'Français – Natif', icon: '🇫🇷', level: 100 },
  { name: 'Anglais – Excellent', icon: '🇬🇧', level: 90 },
  { name: 'Japonais – Élémentaire', icon: '🇯🇵', level: 30 },
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
    if (isVisible) {
      const animateCards = () => {
        cardsRef.current.forEach((card, index) => {
          if (card) {
            setTimeout(() => {
              setAnimatedCards(prev => new Set([...prev, index]));
            }, index * 100);
          }
        });
      };
      animateCards();
    }
  }, [isVisible, selectedCategory]);

  const filteredSkills =
    selectedCategory === 'all'
      ? professionalSkills
      : professionalSkills.filter((skill) => skill.category === selectedCategory);

  return (
    <>
      <style>{`
        .skills-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          position: relative;
          overflow: hidden;
        }

        .skills-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* Particules de fond */
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: float-orb 8s ease-in-out infinite;
        }

        .orb-1 {
          top: 10%;
          left: 10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          animation-delay: 0s;
        }

        .orb-2 {
          top: 60%;
          right: 15%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
          animation-delay: 3s;
        }

        .orb-3 {
          bottom: 20%;
          left: 20%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
          animation-delay: 6s;
        }

        /* Grille hexagonale de fond */
        .hex-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, rgba(147, 51, 234, 0.1) 2px, transparent 2px);
          background-size: 100px 100px;
          animation: drift 20s linear infinite;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
        }

        /* Titre principal */
        .main-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: white;
          opacity: 0;
          transform: translateY(30px);
          animation: ${props => props.isVisible ? 'fade-in-up 1s ease-out 0.2s forwards' : 'none'};
        }

        @media (min-width: 768px) {
          .main-title {
            font-size: 3rem;
          }
        }

        .title-highlight {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06d6a0);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradient-flow 3s ease-in-out infinite;
        }

        /* Filtres */
        .filters-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(20px);
          animation: ${props => props.isVisible ? 'fade-in-up 0.8s ease-out 0.4s forwards' : 'none'};
        }

        .filter-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid transparent;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -3px rgba(59, 130, 246, 0.4);
        }

        .filter-btn:hover:not(.active) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -3px rgba(255, 255, 255, 0.1);
        }

        .filter-btn span {
          position: relative;
          z-index: 10;
        }

        .filter-icon {
          font-size: 1rem;
          position: relative;
          z-index: 10;
        }

        /* Grille des compétences */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 5rem;
        }

        @media (min-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        .skill-card {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }

        .skill-card.animated {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .skill-card:hover::before {
          opacity: 1;
        }

        .skill-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
          position: relative;
          z-index: 10;
          transition: transform 0.3s ease;
        }

        .skill-card:hover .skill-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .skill-name {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
          position: relative;
          z-index: 10;
        }

        .skill-level {
          position: relative;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 3px;
          transition: width 1s ease-out;
          width: 0;
          position: relative;
        }

        .skill-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        .skill-card.animated .skill-progress {
          animation: progress-fill 1.5s ease-out forwards;
        }

        /* Section Langues */
        .languages-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: white;
          opacity: 0;
          transform: translateY(30px);
          animation: ${props => props.isVisible ? 'fade-in-up 1s ease-out 1.5s forwards' : 'none'};
        }

        .languages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .language-card {
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(15px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(20px);
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .language-card:nth-child(1) { animation-delay: 1.7s; }
        .language-card:nth-child(2) { animation-delay: 1.9s; }
        .language-card:nth-child(3) { animation-delay: 2.1s; }

        .language-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.4);
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(59, 130, 246, 0.1);
        }

        .language-flag {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          display: block;
          transition: transform 0.3s ease;
        }

        .language-card:hover .language-flag {
          transform: scale(1.1);
        }

        .language-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: white;
          opacity: 0.9;
        }

        /* Animations */
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

        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-orb {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          33% {
            transform: translateY(-20px) scale(1.1);
          }
          66% {
            transform: translateY(10px) scale(0.9);
          }
        }

        @keyframes drift {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100px);
          }
        }

        @keyframes progress-fill {
          from {
            width: 0;
          }
          to {
            width: var(--progress-width);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      <section ref={sectionRef} className="skills-section">
        {/* Éléments de fond */}
        <div className="skills-bg">
          <div className="hex-pattern"></div>
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <div className="bg-orb orb-3"></div>
        </div>

        <div className="container">
          {/* Titre principal */}
          <h2 className="main-title" style={{opacity: isVisible ? 1 : 0}}>
            Mes <span className="title-highlight">Compétences</span>
          </h2>

          {/* Filtres */}
          <div className="filters-container" style={{opacity: isVisible ? 1 : 0}}>
            {skillCategories.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
              >
                <span className="filter-icon">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Grille des compétences professionnelles */}
          <div className="skills-grid">
            {filteredSkills.map((skill, idx) => (
              <div
                key={`${skill.name}-${selectedCategory}`}
                ref={el => cardsRef.current[idx] = el}
                className={`skill-card ${animatedCards.has(idx) ? 'animated' : ''}`}
              >
                <span className="skill-icon">{skill.icon}</span>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-level">
                  <div 
                    className="skill-progress"
                    style={{
                      '--progress-width': `${skill.level}%`,
                      width: animatedCards.has(idx) ? `${skill.level}%` : '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Section Langues */}
          <h3 className="languages-title" style={{opacity: isVisible ? 1 : 0}}>
            Langues <span className="title-highlight">Parlées</span>
          </h3>

          <div className="languages-grid">
            {languageSkills.map((lang, idx) => (
              <div
                key={idx}
                className="language-card"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animationDelay: `${1.7 + idx * 0.2}s`
                }}
              >
                <span className="language-flag">{lang.icon}</span>
                <div className="language-name">{lang.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;