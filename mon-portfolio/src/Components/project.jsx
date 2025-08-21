import React, { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Projet CACAO – Corridor de croissance',
    location: 'JICA – Afrique de l\'Ouest',
    year: '2024 – Présent',
    description:
      'Coordination régionale d\'un programme d\'infrastructures : urbanisme, transport, déchets solides entre le Togo, la Côte d\'Ivoire et le Burkina Faso.',
    link: 'https://news.abidjan.net/articles/725209/cote-divoire-la-mobilisation-de-plus-de-4800-milliards-de-fcfa-pour-les-projets-prioritaires-du-plan-directeur-de-lamenagement-des-corridors-pour-lanneau-de-croissance-en-afrique-de-louest-cacao-au-centre-dune-mission',
    category: 'Infrastructure',
    status: 'En cours',
    color: 'emerald',
    icon: 'fas fa-road'
  },
  {
    title: 'Recherche doctorale – Stabilisation du sable',
    location: 'Université de Yokohama',
    year: '2020 – 2023',
    description:
      'Étude expérimentale sur le renforcement du sable avec cendres de boues papetières pour les conduites souterraines.',
    link: '/documents/these-maliki.pdf',
    category: 'Recherche',
    status: 'Terminé',
    color: 'blue',
    icon: 'fas fa-flask'
  },
  {
    title: 'Encadrement triaxiaux & liquéfaction',
    location: 'Université de Yokohama',
    year: '2023 – 2024',
    description:
      'Encadrement d\'étudiants et recherches sur la liquéfaction des sols et les essais dynamiques triaxiaux.',
    category: 'Enseignement',
    status: 'Terminé',
    color: 'purple',
    icon: 'fas fa-chalkboard-teacher'
  },
  {
    title: 'Réhabilitation de 4000 km de routes rurales',
    location: 'EDF – Togo',
    year: '2020 – 2021',
    description:
      'Suivi de chantier, attachements, coordination terrain sur les routes rurales dans plusieurs régions du Togo.',
    category: 'Infrastructure',
    status: 'Terminé',
    color: 'orange',
    icon: 'fas fa-road'
  },
  {
    title: 'Réhabilitation du barrage de Kangounou',
    location: 'Togo',
    year: '2019',
    description:
      'Étude géotechnique, matériaux, stabilisation de pente, supervision des travaux hydrauliques.',
    category: 'Hydraulique',
    status: 'Terminé',
    color: 'cyan',
    icon: 'fas fa-water'
  },
  {
    title: 'Stage WIM – Système de pesage dynamique',
    location: 'JICA – Tokyo',
    year: '2019',
    description:
      'Implémentation d\'un système WIM pour routes africaines, dans le cadre d\'un programme de coopération.',
    category: 'Innovation',
    status: 'Terminé',
    color: 'indigo',
    icon: 'fas fa-weight'
  },
  {
    title: 'Stabilisation de sol latéritique',
    location: '2iE – Burkina Faso',
    year: '2018',
    description:
      'Essais CBR, formulation cimentée avec grave concassée pour renforcer les structures routières rurales.',
    category: 'Géotechnique',
    status: 'Terminé',
    color: 'amber',
    icon: 'fas fa-mountain'
  },
  {
    title: 'Bitumage de voirie (14 km)',
    location: 'Lomé – Togo',
    year: '2013',
    description:
      'Réalisation de fondations, couches de base, enrobé bitumineux sur voirie urbaine en centre-ville.',
    category: 'Voirie',
    status: 'Terminé',
    color: 'slate',
    icon: 'fas fa-road'
  },
];

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

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

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

  const colorClasses = {
    emerald: 'emerald-gradient',
    blue: 'blue-gradient',
    purple: 'purple-gradient',
    orange: 'orange-gradient',
    cyan: 'cyan-gradient',
    indigo: 'indigo-gradient',
    amber: 'amber-gradient',
    slate: 'slate-gradient'
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet"
      />
      <style>{`
        .projects-section {
          padding: 96px 0;
          background: linear-gradient(135deg, #f1f5ff 0%, #ffffff 50%, #faf5ff 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .projects-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
          mask-image: radial-gradient(ellipse at center, white, transparent);
          -webkit-mask-image: radial-gradient(ellipse at center, white, transparent);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 64px;
        }

        .header-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          border-radius: 16px;
          margin-bottom: 24px;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .header-icon i {
          color: white;
          font-size: 28px;
        }

        .header h2 {
          font-size: 48px;
          font-weight: 700;
          background: linear-gradient(135deg, #0f172a, #312e81, #6b21a8);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }

        .header p {
          font-size: 20px;
          color: #64748b;
          max-width: 768px;
          margin: 0 auto;
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .filter-btn {
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.7);
          color: #64748b;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .filter-btn:hover {
          background: white;
          transform: scale(1.05);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #6366f1, #9333ea);
          color: white;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        }

        .timeline-container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .timeline-line {
          position: absolute;
          left: 32px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #c7d2fe, #ddd6fe, #fce7f3);
        }

        .projects-list {
          margin: 0;
          padding: 0;
        }

        .project-item {
          position: relative;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateX(32px);
          transition: all 0.7s ease-out;
        }

        .project-item.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .timeline-dot {
          position: absolute;
          left: 24px;
          top: 32px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 4px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.5s ease-out;
          transform: scale(0);
        }

        .project-item.visible .timeline-dot {
          transform: scale(1);
        }

        .timeline-dot i {
          color: white;
          font-size: 12px;
        }

        .emerald-gradient { background: linear-gradient(135deg, #10b981, #059669); }
        .blue-gradient { background: linear-gradient(135deg, #3b82f6, #4f46e5); }
        .purple-gradient { background: linear-gradient(135deg, #8b5cf6, #ec4899); }
        .orange-gradient { background: linear-gradient(135deg, #f97316, #dc2626); }
        .cyan-gradient { background: linear-gradient(135deg, #06b6d4, #3b82f6); }
        .indigo-gradient { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
        .amber-gradient { background: linear-gradient(135deg, #f59e0b, #f97316); }
        .slate-gradient { background: linear-gradient(135deg, #64748b, #475569); }

        .project-card {
          margin-left: 80px;
          position: relative;
          text-decoration: none;
          color: inherit;
          display: block;
          group: true;
        }

        .card-wrapper {
          position: relative;
        }

        .card-glow {
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          filter: blur(4px);
        }

        .project-card:hover .card-glow {
          opacity: 1;
        }

        .card-content {
          position: relative;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .project-card:hover .card-content {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .card-left {
          flex: 1;
        }

        .card-badges {
          display: flex;
          gap: 12px;
          margin-bottom: 8px;
        }

        .category-badge {
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 50px;
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .status-badge {
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 500;
          border-radius: 50px;
        }

        .status-badge.ongoing {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        }

        .status-badge.completed {
          background: rgba(107, 114, 128, 0.1);
          color: #374151;
        }

        .project-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .project-card:hover .project-title {
          color: #6366f1;
        }

        .card-meta {
          text-align: right;
          margin-left: 16px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .meta-item i.fa-calendar-alt {
          color: #6366f1;
        }

        .meta-item i.fa-map-marker-alt {
          color: #10b981;
        }

        .project-description {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .project-link {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          color: #6366f1;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .project-card:hover .project-link {
          gap: 12px;
        }

        .project-link i {
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-link i {
          transform: translateX(4px);
        }

        .show-more {
          text-align: center;
          margin-top: 48px;
        }

        .show-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          transition: all 0.3s ease;
        }

        .show-more-btn:hover {
          background: linear-gradient(135deg, #5855eb, #8b2fc9);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.5);
          transform: translateY(-4px);
        }

        .show-more-btn i {
          transition: transform 0.3s ease;
        }

        .show-more-btn:hover i {
          transform: translateY(4px);
        }

        @media (max-width: 768px) {
          .projects-section {
            padding: 64px 0;
          }

          .header h2 {
            font-size: 36px;
          }

          .header p {
            font-size: 18px;
          }

          .timeline-line {
            left: 24px;
          }

          .timeline-dot {
            left: 16px;
            width: 24px;
            height: 24px;
            top: 28px;
          }

          .project-card {
            margin-left: 56px;
          }

          .card-content {
            padding: 24px;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .card-meta {
            text-align: left;
            margin-left: 0;
            margin-top: 12px;
          }

          .project-title {
            font-size: 20px;
          }

          .category-filters {
            gap: 8px;
          }

          .filter-btn {
            padding: 10px 20px;
            font-size: 13px;
          }
        }
      `}</style>

      <section className="projects-section" id="projects">
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="header-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <h2>Mes Projets Réalisés</h2>
            <p>Une sélection de projets d'infrastructure et de recherche menés en Afrique et au Japon</p>
          </div>

          {/* Category Filter */}
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Timeline */}
          <div className="timeline-container">
            {/* Vertical Line */}
            <div className="timeline-line"></div>
            
            <div className="projects-list">
              {displayedProjects.map((project, index) => {
                const isVisible = visibleItems.has(index.toString());
                const Wrapper = project.link ? 'a' : 'div';
                const wrapperProps = project.link
                  ? {
                      href: project.link,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {};

                return (
                  <div
                    key={index}
                    data-index={index}
                    ref={(el) => {
                      if (el && observerRef.current) {
                        observerRef.current.observe(el);
                      }
                    }}
                    className={`project-item ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div className={`timeline-dot ${colorClasses[project.color]}`}>
                      <i className={project.icon}></i>
                    </div>

                    {/* Project Card */}
                    <Wrapper {...wrapperProps} className="project-card">
                      <div className="card-wrapper">
                        {/* Hover glow effect */}
                        <div className={`card-glow ${colorClasses[project.color]}`}></div>
                        
                        <div className="card-content">
                          {/* Header */}
                          <div className="card-header">
                            <div className="card-left">
                              <div className="card-badges">
                                <span className={`category-badge ${colorClasses[project.color]}`}>
                                  {project.category}
                                </span>
                                <span className={`status-badge ${
                                  project.status === 'En cours' ? 'ongoing' : 'completed'
                                }`}>
                                  {project.status}
                                </span>
                              </div>
                              <h3 className="project-title">
                                {project.title}
                              </h3>
                            </div>
                            <div className="card-meta">
                              <div className="meta-item">
                                <i className="fas fa-calendar-alt"></i>
                                <span>{project.year}</span>
                              </div>
                              <div className="meta-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{project.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="project-description">
                            {project.description}
                          </p>

                          {/* Link indicator */}
                          {project.link && (
                            <div className="project-link">
                              <span>Voir le projet</span>
                              <i className="fas fa-external-link-alt"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </Wrapper>
                  </div>
                );
              })}
            </div>

            {/* Show More Button */}
            {!showAll && filteredProjects.length > 4 && (
              <div className="show-more">
                <button
                  onClick={() => setShowAll(true)}
                  className="show-more-btn"
                >
                  <span>Voir tous les projets</span>
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;