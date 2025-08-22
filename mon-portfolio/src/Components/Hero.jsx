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
  const profileImage = "assets/profile.jpg";

  return (
    <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-800 to-violet-800 p-4 sm:p-6 md:p-8 lg:p-12" id="home">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        
        {/* Floating particles */}
        <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-blue-400/60 rounded-full animate-bounce sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 lg:top-[20%] lg:left-[15%]"></div>
        <div className="absolute top-[20%] right-[15%] w-0.5 h-0.5 bg-cyan-400/80 rounded-full animate-ping sm:w-1 sm:h-1 lg:top-[25%] lg:right-[20%]"></div>
        <div className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 bg-indigo-400/50 rounded-full animate-pulse sm:w-2 sm:h-2 md:w-3 md:h-3 lg:bottom-[25%] lg:left-[20%]"></div>
        <div className="absolute top-[35%] right-[10%] w-1 h-1 bg-violet-300/70 rounded-full animate-bounce delay-500 sm:w-1.5 sm:h-1.5 lg:top-[40%] lg:right-[15%]"></div>
        
        {/* Background orbs */}
        <div className="absolute -top-[20%] -left-[20%] w-32 h-32 bg-gradient-radial from-blue-600/15 to-transparent rounded-full blur-2xl animate-pulse sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 lg:-top-[30%] lg:-left-[30%]"></div>
        <div className="absolute -bottom-[20%] -right-[20%] w-32 h-32 bg-gradient-radial from-purple-600/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 lg:-bottom-[30%] lg:-right-[30%]"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-[15%] right-[10%] w-6 h-6 border border-blue-400/30 rounded-md rotate-45 animate-spin duration-[20s] sm:w-8 sm:h-8 sm:rounded-lg md:w-10 md:h-10 lg:w-20 lg:h-20 lg:top-[20%] lg:right-[15%] lg:rounded-xl"></div>
        <div className="absolute bottom-[15%] left-[8%] w-5 h-5 border border-violet-300/20 rounded-full animate-spin duration-[15s] reverse-spin sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-16 lg:h-16 lg:bottom-[20%] lg:left-[10%]"></div>
        
      </div>

      {/* Main content container */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Mobile and Tablet Layout (< 1024px) */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 md:space-y-10 lg:hidden">
          
          {/* Profile image - Mobile/Tablet */}
          <div className="relative flex justify-center items-center opacity-0 animate-[slideInDown_1s_ease-out_0.3s_forwards]">
            
            {/* Rotating rings - Mobile/Tablet */}
            <div className="absolute flex justify-center items-center">
              <div className="absolute w-32 h-32 border border-blue-400/30 rounded-full animate-spin duration-[20s] sm:w-40 sm:h-40 sm:border-2 md:w-48 md:h-48"></div>
              <div className="absolute w-40 h-40 border border-violet-300/20 rounded-full animate-spin duration-[15s] reverse-spin sm:w-48 sm:h-48 md:w-56 md:h-56"></div>
            </div>
            
            {/* Glow background - Mobile/Tablet */}
            <div className="absolute w-32 h-32 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-xl animate-pulse sm:w-40 sm:h-40 md:w-48 md:h-48"></div>
            
            {/* Image container - Mobile/Tablet */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full p-0.5 animate-pulse">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Maliki Djandjieme"
                    className="w-[calc(100%-4px)] h-[calc(100%-4px)] object-cover rounded-full transition-all duration-500 hover:scale-105 hover:brightness-110"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text content - Mobile/Tablet */}
          <div className="w-full max-w-xl mx-auto px-2 opacity-0 animate-[slideInUp_1s_ease-out_0.5s_forwards]">
            
            <h1 className="text-xl font-bold mb-2 relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientShift_3s_ease-in-out_infinite] sm:text-2xl sm:mb-3 md:text-3xl leading-tight">
              Djandjieme O. Maliki
              <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-0 animate-[expandLine_1s_ease-out_0.8s_forwards] sm:h-1"></span>
            </h1>

            <h2 className="text-sm font-semibold text-blue-200 mb-4 min-h-[1.5em] sm:text-base sm:mb-5 md:text-lg">
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyan-400 animate-[typing_3s_steps(40,end)_infinite,cursorBlink_1s_step-end_infinite]">
                {roles[roleIndex]}
              </span>
            </h2>

            <p className="text-xs text-gray-300 leading-relaxed mb-6 sm:text-sm sm:mb-8 md:text-base md:leading-loose">
              Passionné par la création de solutions durables dans le domaine du génie géotechnique et des infrastructures urbaines, je me concentre sur le développement d'infrastructures innovantes et résilientes, qui ont un impact positif sur l'environnement.
            </p>

            <div className="flex flex-col gap-3 w-full max-w-sm mx-auto sm:max-w-md md:flex-row md:justify-center md:gap-4">
              <a 
                href="#projects" 
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-sm text-center md:flex-1 md:max-w-48"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10">Voir mes projets</span>
              </a>
              <a 
                href="#contact" 
                className="group relative px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-xl bg-transparent overflow-hidden transition-all duration-300 hover:text-white hover:-translate-y-1 hover:scale-105 text-sm text-center md:flex-1 md:max-w-48"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10">Contact</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout (≥ 1024px) */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:min-h-[80vh]">
          
          {/* Text content - Desktop */}
          <div className="w-full lg:w-1/2 lg:pr-12 xl:pr-16 opacity-0 transform -translate-x-10 animate-[slideInLeft_1s_ease-out_0.2s_forwards]">
            
            <h1 className="text-4xl font-bold mb-3 relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientShift_3s_ease-in-out_infinite] xl:text-5xl 2xl:text-6xl leading-tight">
              Djandjieme O. Maliki
              <span className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-0 animate-[expandLine_1s_ease-out_0.8s_forwards]"></span>
            </h1>

            <h2 className="text-xl font-semibold text-blue-200 mb-6 min-h-[1.8em] xl:text-2xl 2xl:text-3xl">
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-3 border-cyan-400 animate-[typing_3s_steps(40,end)_infinite,cursorBlink_1s_step-end_infinite]">
                {roles[roleIndex]}
              </span>
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl xl:text-xl xl:leading-loose 2xl:text-xl">
              Passionné par la création de solutions durables dans le domaine du génie géotechnique et des infrastructures urbaines, je me concentre sur le développement d'infrastructures innovantes et résilientes, qui ont un impact positif sur l'environnement.
            </p>

            <div className="flex gap-6">
              <a 
                href="#projects" 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10">Voir mes projets</span>
              </a>
              <a 
                href="#contact" 
                className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-xl bg-transparent overflow-hidden transition-all duration-300 hover:text-white hover:-translate-y-1 hover:scale-105 text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10">Contact</span>
              </a>
            </div>
          </div>

          {/* Profile image - Desktop */}
          <div className="w-full lg:w-1/2 flex justify-center items-center opacity-0 transform translate-x-10 animate-[slideInRight_1s_ease-out_0.5s_forwards]">
            <div className="relative flex justify-center items-center">
              
              {/* Rotating rings - Desktop */}
              <div className="absolute flex justify-center items-center">
                <div className="absolute w-64 h-64 border-2 border-blue-400/30 rounded-full animate-spin duration-[20s] xl:w-80 xl:h-80 2xl:w-96 2xl:h-96"></div>
                <div className="absolute w-72 h-72 border border-violet-300/20 rounded-full animate-spin duration-[15s] reverse-spin xl:w-88 xl:h-88 2xl:w-[26rem] 2xl:h-[26rem]"></div>
              </div>
              
              {/* Glow background - Desktop */}
              <div className="absolute w-64 h-64 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-2xl animate-pulse xl:w-80 xl:h-80 2xl:w-96 2xl:h-96"></div>
              
              {/* Image container - Desktop */}
              <div className="relative w-48 h-48 xl:w-60 xl:h-60 2xl:w-72 2xl:h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full p-1 animate-pulse">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Maliki Djandjieme"
                      className="w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover rounded-full transition-all duration-500 hover:scale-105 hover:brightness-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-40px); }
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

        /* Ultra-wide screens support */
        @media (min-width: 1920px) {
          .hero-ultra-wide {
            max-height: 80vh;
          }
        }

        /* Portrait orientation on tablets */
        @media (orientation: portrait) and (min-width: 768px) and (max-width: 1024px) {
          .tablet-portrait-spacing {
            padding: 2rem;
          }
        }

        /* Landscape orientation on mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          .mobile-landscape {
            min-height: 100vh;
            padding: 1rem;
          }
          .mobile-landscape .content {
            flex-direction: row;
            gap: 2rem;
          }
          .mobile-landscape .text-content {
            width: 60%;
            text-align: left;
          }
          .mobile-landscape .image-content {
            width: 40%;
          }
        }

        /* Very small screens */
        @media (max-width: 320px) {
          .ultra-small {
            padding: 0.5rem;
          }
          .ultra-small h1 {
            font-size: 1.125rem;
          }
          .ultra-small h2 {
            font-size: 0.875rem;
          }
          .ultra-small p {
            font-size: 0.75rem;
          }
        }
      `}</style>
      
    </section>
  );
}

export default Hero;