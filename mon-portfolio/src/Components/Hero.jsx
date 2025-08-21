import React, { useState, useEffect } from 'react';

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Docteur & Ingénieur Géotechnique"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Placeholder profile image
  const profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";

  return (
    <section className="w-screen min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-800 to-violet-800 py-4 sm:py-8 md:py-12 lg:py-0 lg:h-screen">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        
        {/* Floating particles */}
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-blue-400/60 rounded-full animate-bounce sm:w-1.5 sm:h-1.5 md:w-2 md:h-2"></div>
        <div className="absolute top-[25%] right-[20%] w-0.5 h-0.5 bg-cyan-400/80 rounded-full animate-ping sm:w-1 sm:h-1"></div>
        <div className="absolute bottom-[25%] left-[20%] w-1.5 h-1.5 bg-indigo-400/50 rounded-full animate-pulse sm:w-2 sm:h-2 md:w-3 md:h-3"></div>
        <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-violet-300/70 rounded-full animate-bounce delay-500 sm:w-1.5 sm:h-1.5"></div>
        
        {/* Background orbs */}
        <div className="absolute -top-[30%] -left-[30%] w-48 h-48 bg-gradient-radial from-blue-600/15 to-transparent rounded-full blur-2xl animate-pulse sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96"></div>
        <div className="absolute -bottom-[30%] -right-[30%] w-48 h-48 bg-gradient-radial from-purple-600/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-[20%] right-[15%] w-10 h-10 border border-blue-400/30 rounded-lg rotate-45 animate-spin duration-[20s] sm:w-12 sm:h-12 sm:rounded-xl md:w-15 md:h-15 lg:w-20 lg:h-20"></div>
        <div className="absolute bottom-[20%] left-[10%] w-8 h-8 border border-violet-300/20 rounded-full animate-spin duration-[15s] reverse sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"></div>
        
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center relative z-10 gap-8 sm:px-6 sm:gap-10 md:gap-12 lg:flex-row lg:px-8 lg:gap-12 xl:gap-16">
        
        {/* Text content */}
        <div className="w-full text-center opacity-0 transform -translate-x-10 animate-[slideInLeft_1s_ease-out_0.2s_forwards] lg:w-[55%] lg:text-left">
          
          <h1 className="text-2xl font-bold mb-2 relative opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientShift_3s_ease-in-out_infinite] sm:text-3xl sm:mb-3 md:text-4xl lg:text-4xl xl:text-5xl leading-tight">
            Djandjieme O. Maliki
            <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-0 animate-[expandLine_1s_ease-out_0.8s_forwards] sm:-bottom-1 sm:h-1 lg:left-0 lg:transform-none"></span>
          </h1>

          <h2 className="text-base font-semibold text-blue-200 mb-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards] min-h-[1.8em] sm:text-lg sm:mb-5 md:text-xl lg:text-2xl xl:text-3xl">
            <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyan-400 animate-[typing_3s_steps(40,end)_infinite,cursorBlink_1s_step-end_infinite] md:border-r-3">
              {roles[roleIndex]}
            </span>
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.9s_forwards] max-w-full sm:text-base sm:leading-relaxed sm:max-w-lg sm:mb-8 sm:mx-auto md:text-lg md:max-w-xl md:leading-loose lg:text-lg lg:leading-relaxed lg:max-w-2xl lg:mx-0 px-2 sm:px-0">
            Passionné par la création de solutions durables dans le domaine du génie géotechnique et des infrastructures urbaines, je me concentre sur le développement d'infrastructures innovantes et résilientes, qui ont un impact positif sur l'environnement.
          </p>

          <div className="flex flex-col gap-3 opacity-0 animate-[fadeInUp_0.8s_ease-out_1.1s_forwards] w-full max-w-sm mx-auto sm:flex-row sm:justify-center sm:gap-4 sm:max-w-md lg:justify-start lg:mx-0 lg:max-w-none">
            <a 
              href="#projects" 
              className="group relative px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-sm flex-1 sm:text-base sm:px-8 sm:py-4 sm:flex-none lg:px-8 lg:py-4 text-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative z-10">Voir mes projets</span>
            </a>
            <a 
              href="#contact" 
              className="group relative px-6 py-3.5 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-xl bg-transparent overflow-hidden transition-all duration-300 hover:text-white hover:-translate-y-1 hover:scale-105 text-sm flex-1 sm:text-base sm:px-8 sm:py-4 sm:flex-none lg:px-8 lg:py-4 text-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="relative z-10">Contact</span>
            </a>
          </div>
        </div>

        {/* Profile image */}
        <div className="w-full flex justify-center opacity-0 transform translate-x-10 animate-[slideInRight_1s_ease-out_0.5s_forwards] order-first lg:w-[45%] lg:order-none">
          <div className="relative flex justify-center items-center">
            
            {/* Rotating rings */}
            <div className="absolute flex justify-center items-center">
              <div className="absolute w-40 h-40 border border-blue-400/30 rounded-full animate-spin duration-[20s] sm:w-48 sm:h-48 sm:border-2 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72"></div>
              <div className="absolute w-48 h-48 border border-violet-300/20 rounded-full animate-spin duration-[15s] reverse-spin sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"></div>
            </div>
            
            {/* Glow background */}
            <div className="absolute w-40 h-40 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-xl animate-pulse sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72"></div>
            
            {/* Image container */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-56 xl:h-56">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full p-0.5 animate-pulse sm:p-1">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Maliki Djandjieme"
                    className="w-[calc(100%-4px)] h-[calc(100%-4px)] object-cover rounded-full transition-all duration-500 hover:scale-105 hover:brightness-110 sm:w-[calc(100%-6px)] sm:h-[calc(100%-6px)] md:w-[calc(100%-8px)] md:h-[calc(100%-8px)]"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Custom animations - uniquement celles non disponibles dans Tailwind */}
      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes expandLine {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes cursorBlink {
          from, to { border-color: transparent; }
          50% { border-color: #22d3ee; }
        }

        .reverse-spin {
          animation-direction: reverse;
        }

        /* Support pour les très grands écrans */
        @media (min-width: 1440px) and (max-width: 1920px) {
          .hero-container {
            height: 90vh;
          }
        }

        /* Support pour landscape mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-container {
            height: auto;
            min-height: 100vh;
            padding: 1rem 0;
          }
        }
      `}</style>
      
    </section>
  );
}

export default Hero;