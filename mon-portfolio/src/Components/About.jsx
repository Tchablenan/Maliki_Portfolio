import React, { useState, useEffect, useRef } from 'react';

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Placeholder image
  const malikiImage = "/src/assets/maliki.jpg";

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

  const values = [
    "Intégrité scientifique",
    "Innovation durable", 
    "Transfert de savoir",
    "Travail collaboratif"
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .about-section {
          position: relative;
          padding: 6rem 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          overflow: hidden;
        }

        .about-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* Éléments de fond animés */
        .bg-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-about-1 {
          top: 10%;
          left: 5%;
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          animation: float-gentle 6s ease-in-out infinite;
        }

        .particle-about-2 {
          top: 70%;
          right: 10%;
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
          animation: float-gentle 8s ease-in-out infinite reverse;
        }

        .particle-about-3 {
          bottom: 20%;
          left: 15%;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1));
          animation: float-gentle 7s ease-in-out infinite 2s;
        }

        .geometric-about {
          position: absolute;
          top: 30%;
          right: 5%;
          width: 100px;
          height: 100px;
          border: 2px solid rgba(59, 130, 246, 0.2);
          transform: rotate(45deg);
          animation: spin-slow 25s linear infinite;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 4rem;
          color: #1e293b;
          opacity: 0;
          transform: translateY(30px);
          animation: ${props => props.isVisible ? 'fade-in-up 0.8s ease-out 0.2s forwards' : 'none'};
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 3rem;
          }
        }

        .title-highlight {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradient-shift 3s ease-in-out infinite;
        }

        .content-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
        }

        @media (min-width: 768px) {
          .content-grid {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        /* Section Image */
        .image-section {
          width: 100%;
          display: flex;
          justify-content: center;
          opacity: 0;
          transform: translateX(-40px);
          animation: ${props => props.isVisible ? 'slide-in-left 1s ease-out 0.4s forwards' : 'none'};
        }

        @media (min-width: 768px) {
          .image-section {
            width: 40%;
          }
        }

        .image-container {
          position: relative;
          width: 300px;
          height: 300px;
        }

        @media (min-width: 768px) {
          .image-container {
            width: 320px;
            height: 320px;
          }
        }

        .image-bg-1 {
          position: absolute;
          inset: -20px;
          background: linear-gradient(45deg, #3b82f6, #5CC5F6FF);
          border-radius: 24px;
          transform: rotate(-6deg);
          animation: float-rotate 8s ease-in-out infinite;
        }

        .image-bg-2 {
          position: absolute;
          inset: -10px;
          background: linear-gradient(45deg, #1B0CA0FF, #1678F9FF);
          border-radius: 20px;
          transform: rotate(3deg);
          animation: float-rotate 6s ease-in-out infinite reverse;
        }

        .image-main {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-main:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-main:hover .image-overlay {
          opacity: 1;
        }

        /* Section Texte */
        .text-section {
          width: 100%;
          opacity: 0;
          transform: translateX(40px);
          animation: ${props => props.isVisible ? 'slide-in-right 1s ease-out 0.6s forwards' : 'none'};
        }

        @media (min-width: 768px) {
          .text-section {
            width: 60%;
          }
        }

        .section-subtitle {
          font-size: 2rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .section-subtitle::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
          animation: ${props => props.isVisible ? 'expand-line 1s ease-out 1s forwards' : 'none'};
          transform: scaleX(0);
          transform-origin: left;
        }

        .text-content {
          font-size: 1.125rem;
          line-height: 1.75;
          color: #475569;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
        }

        .text-content:nth-child(3) {
          animation: ${props => props.isVisible ? 'fade-in-up 0.8s ease-out 0.8s forwards' : 'none'};
        }

        .text-content:nth-child(4) {
          animation: ${props => props.isVisible ? 'fade-in-up 0.8s ease-out 1s forwards' : 'none'};
        }

        /* Section Valeurs */
        .values-section {
          margin: 2rem 0;
          opacity: 0;
          transform: translateY(20px);
          animation: ${props => props.isVisible ? 'fade-in-up 0.8s ease-out 1.2s forwards' : 'none'};
        }

        .values-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .values-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .value-tag {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          border: 2px solid transparent;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #334155;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .value-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .value-tag::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: white;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .value-tag:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 25px -3px rgba(59, 130, 246, 0.3);
        }

        .value-tag:hover::before {
          opacity: 1;
        }

        .value-tag span {
          position: relative;
          z-index: 10;
          transition: color 0.3s ease;
        }

        .value-tag:hover span {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        /* Bouton CV */
        .cv-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          color: white;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(20px);
          animation: ${props => props.isVisible ? 'fade-in-up 0.8s ease-out 1.4s forwards' : 'none'};
        }

        .cv-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1d4ed8, #7c2d12, #be185d);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cv-button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .cv-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4);
          animation: gradient-shift 2s ease-in-out infinite;
        }

        .cv-button:hover::before {
          opacity: 1;
        }

        .cv-button:hover::after {
          transform: translateX(100%);
        }

        .cv-button span {
          position: relative;
          z-index: 10;
        }

        .download-icon {
          position: relative;
          z-index: 10;
          transition: transform 0.3s ease;
        }

        .cv-button:hover .download-icon {
          transform: translateY(-2px);
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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expand-line {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) rotate(-3deg);
          }
        }

        @keyframes float-rotate {
          0%, 100% {
            transform: rotate(-6deg) translateY(0px);
          }
          50% {
            transform: rotate(-8deg) translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }
      `}</style>

      <section ref={sectionRef} className="about-section">
        {/* Éléments de fond */}
        <div className="about-bg">
          <div className="bg-particle particle-about-1"></div>
          <div className="bg-particle particle-about-2"></div>
          <div className="bg-particle particle-about-3"></div>
          <div className="geometric-about"></div>
        </div>

        <div className="container">
          {/* Titre principal */}
          <h2 className="section-title" style={{opacity: isVisible ? 1 : 0}}>
            À propos <span className="title-highlight">de moi</span>
          </h2>

          <div className="content-grid">
            {/* Section Image */}
            <div className="image-section" style={{opacity: isVisible ? 1 : 0}}>
              <div className="image-container">
                <div className="image-bg-1"></div>
                <div className="image-bg-2"></div>
                <div className="image-main">
                  <img
                    src={malikiImage}
                    alt="Maliki Djandjieme"
                    className="profile-image"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="image-overlay"></div>
                </div>
              </div>
            </div>

            {/* Section Texte */}
            <div className="text-section" style={{opacity: isVisible ? 1 : 0}}>
              <h3 className="section-subtitle">Qui suis-je ?</h3>
              
              <p className="text-content" style={{opacity: isVisible ? 1 : 0}}>
                Je suis ingénieur géotechnicien, spécialisé en infrastructures urbaines et
                en solutions géo-environnementales. Mon parcours m'a conduit du Togo au Japon,
                avec une thèse doctorale axée sur la stabilisation des sols par matériaux recyclés.
              </p>
              
              <p className="text-content" style={{opacity: isVisible ? 1 : 0}}>
                À travers mes missions au sein de projets de coopération (JICA, EDF), j'ai acquis
                une expertise terrain dans les domaines de la réhabilitation routière, de la gestion
                des risques géotechniques, de l'environnement et du développement durable. Je suis
                passionné par la recherche appliquée et l'innovation au service des infrastructures
                résilientes et écoresponsables.
              </p>

              {/* Valeurs */}
              <div className="values-section" style={{opacity: isVisible ? 1 : 0}}>
                <h4 className="values-title">Mes valeurs</h4>
                <div className="values-grid">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="value-tag"
                      style={{
                        animationDelay: `${1.2 + index * 0.1}s`
                      }}
                    >
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton CV */}
              <a
                href="/cv-maliki-djandjieme.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-button"
                style={{opacity: isVisible ? 1 : 0}}
              >
                <span>Télécharger mon CV</span>
                <div className="download-icon">📄</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;