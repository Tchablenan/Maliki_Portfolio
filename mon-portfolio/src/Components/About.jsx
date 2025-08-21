import React, { useState, useEffect, useRef } from 'react';

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Placeholder image
  const malikiImage = "/assets/maliki.jpg";

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
    <section 
      ref={sectionRef} 
      className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 overflow-hidden"
    >
      {/* Éléments de fond animés */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[5%] w-8 h-8 sm:w-12 sm:h-12 lg:w-15 lg:h-15 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 animate-bounce opacity-60"></div>
        <div className="absolute top-[70%] right-[10%] w-6 h-6 sm:w-10 sm:h-10 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-green-100 to-blue-100 animate-pulse opacity-60"></div>
        <div className="absolute bottom-[20%] left-[15%] w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 animate-spin opacity-40" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-[30%] right-[5%] w-12 h-12 sm:w-20 sm:h-20 lg:w-25 lg:h-25 border-2 border-blue-200 transform rotate-45 animate-spin opacity-30" style={{animationDuration: '25s'}}></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 relative z-10">
        {/* Titre principal */}
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-slate-800 transition-all duration-800 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          À propos{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            de moi
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Section Image */}
          <div className={`w-full lg:w-2/5 flex justify-center transition-all duration-1000 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Arrières-plans animés */}
              <div className="absolute -inset-4 sm:-inset-5 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl transform -rotate-6 animate-pulse opacity-80"></div>
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-indigo-800 to-blue-600 rounded-2xl transform rotate-3  opacity-70" style={{animationDuration: '3s'}}></div>
              
              {/* Container image principal */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2 group">
                <img
                  src={malikiImage}
                  alt="Maliki Djandjieme"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Section Texte */}
          <div className={`w-full lg:w-3/5 transition-all duration-1000 delay-400 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800 mb-4 sm:mb-6">
                Qui suis-je ?
              </h3>
              <div className="absolute left-0 top-full w-12 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
            </div>
            
            <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
              <p className={`text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 transition-all duration-800 delay-600 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                Je suis ingénieur géotechnicien, spécialisé en infrastructures urbaines et
                en solutions géo-environnementales. Mon parcours m'a conduit du Togo au Japon,
                avec une thèse doctorale axée sur la stabilisation des sols par matériaux recyclés.
              </p>
              
              <p className={`text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 transition-all duration-800 delay-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                À travers mes missions au sein de projets de coopération (JICA, EDF), j'ai acquis
                une expertise terrain dans les domaines de la réhabilitation routière, de la gestion
                des risques géotechniques, de l'environnement et du développement durable. Je suis
                passionné par la recherche appliquée et l'innovation au service des infrastructures
                résilientes et écoresponsables.
              </p>
            </div>

            {/* Section Valeurs */}
            <div className={`mt-6 sm:mt-8 transition-all duration-800 delay-800 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
                Mes valeurs
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-slate-100 to-slate-200 border-2 border-transparent rounded-full text-xs sm:text-sm font-medium text-slate-700 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton CV */}
            <div className={`mt-6 sm:mt-8 transition-all duration-800 delay-900 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}>
              <a
                href="/cv-maliki-djandjieme.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">Télécharger mon CV</span>
                <div className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-300 text-base sm:text-lg">
                  📄
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;