import React, { useState, useEffect } from 'react';

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const roles = ["Docteur & Ingénieur Géotechnique"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Placeholder profile image
  const profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pingEffect {
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out 0.2s forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 1s ease-out 0.5s forwards;
        }

        .animate-fade-in-up-1 {
          animation: fadeInUp 0.8s ease-out 0.1s forwards;
        }

        .animate-fade-in-up-2 {
          animation: fadeInUp 0.8s ease-out 0.5s forwards;
        }

        .animate-fade-in-up-3 {
          animation: fadeInUp 0.8s ease-out 0.7s forwards;
        }

        .animate-fade-in-up-4 {
          animation: fadeInUp 0.8s ease-out 0.9s forwards;
        }

        .animate-fade-in-up-5 {
          animation: fadeInUp 0.8s ease-out 1.1s forwards;
        }

        .animate-gradient-shift {
          animation: gradientShift 3s ease-in-out infinite;
        }

        .animate-expand-line {
          animation: expandLine 1s ease-out 0.8s forwards;
        }

        .animate-typing {
          animation: typing 3s steps(40, end) infinite, cursorBlink 1s step-end infinite;
        }

        .animate-float-bounce {
          animation: floatBounce 3s ease-in-out infinite;
        }

        .animate-float-bounce-delayed {
          animation: floatBounce 3s ease-in-out infinite 0.5s;
        }

        .animate-float-bounce-delayed-2 {
          animation: floatBounce 4s ease-in-out infinite 0.5s;
        }

        .animate-ping-effect {
          animation: pingEffect 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-pulse-glow-fast {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .animate-orb-float {
          animation: orbFloat 6s ease-in-out infinite;
        }

        .animate-orb-float-reverse {
          animation: orbFloat 8s ease-in-out infinite reverse;
        }

        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 15s linear infinite;
        }

        .gradient-text {
          background: linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .typing-cursor {
          border-right: 2px solid #22d3ee;
        }

        @media (min-width: 769px) {
          .typing-cursor {
            border-right: 3px solid #22d3ee;
          }
        }

        .btn-hover-effect::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #1d4ed8, #6d28d9);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-hover-effect::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.7s ease;
        }

        .btn-hover-effect:hover::before {
          opacity: 1;
        }

        .btn-hover-effect:hover::after {
          transform: translateX(100%);
        }

        .btn-secondary-effect::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #22d3ee, #3b82f6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .btn-secondary-effect:hover::before {
          transform: scaleX(1);
        }
      `}</style>

      <section className="w-screen min-h-screen flex items-center relative overflow-hidden m-0 py-4 bg-gradient-to-br from-slate-900 via-blue-800 to-violet-800 sm:py-8 md:py-12 lg:py-0 lg:h-screen">
        
        {/* Background elements */}
        <div className="absolute inset-0 z-[1]">
          
          {/* Floating particles */}
          <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-blue-400/60 rounded-full animate-float-bounce sm:w-1.5 sm:h-1.5 md:w-2 md:h-2"></div>
          <div className="absolute top-[25%] right-[20%] w-0.5 h-0.5 bg-cyan-400/80 rounded-full animate-ping-effect sm:w-1 sm:h-1"></div>
          <div className="absolute bottom-[25%] left-[20%] w-1.5 h-1.5 bg-indigo-400/50 rounded-full animate-pulse-glow sm:w-2 sm:h-2 md:w-3 md:h-3"></div>
          <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-violet-300/70 rounded-full animate-float-bounce-delayed-2 sm:w-1.5 sm:h-1.5"></div>
          
          {/* Background orbs */}
          <div className="absolute -top-[30%] -left-[30%] w-48 h-48 bg-gradient-radial from-blue-600/15 to-transparent rounded-full blur-[20px] animate-orb-float sm:w-56 sm:h-56 md:w-72 md:h-72 md:blur-[30px] lg:w-96 lg:h-96 lg:blur-[40px]"></div>
          <div className="absolute -bottom-[30%] -right-[30%] w-48 h-48 bg-gradient-radial from-purple-600/15 to-transparent rounded-full blur-[20px] animate-orb-float-reverse sm:w-56 sm:h-56 md:w-72 md:h-72 md:blur-[30px] lg:w-96 lg:h-96 lg:blur-[40px]"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-[20%] right-[15%] w-10 h-10 border border-blue-400/30 rounded-lg rotate-45 animate-spin-slow sm:w-12 sm:h-12 sm:rounded-xl md:w-15 md:h-15 lg:w-20 lg:h-20"></div>
          <div className="absolute bottom-[20%] left-[10%] w-8 h-8 border border-violet-300/20 rounded-full animate-spin-reverse sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"></div>
          
        </div>

        <div className="w-full max-w-7xl mx-auto px-3 flex flex-col items-center justify-center relative z-10 gap-6 sm:px-4 sm:gap-8 md:gap-12 lg:flex-row lg:px-8 lg:gap-16">
          
          {/* Text content */}
          <div className="w-full text-center opacity-0 animate-slide-in-left lg:w-[55%] lg:text-left">
            
            <h2 className="text-2xl font-bold mb-3 relative opacity-0 animate-fade-in-up-2 gradient-text animate-gradient-shift sm:text-3xl sm:mb-4 md:text-4xl lg:text-5xl xl:text-6xl">
              Djandjieme O. Maliki
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-0 animate-expand-line sm:-bottom-1.5 sm:h-1 lg:left-0 lg:transform-none"></span>
            </h2>

            <h3 className="text-sm font-semibold text-blue-200 mb-4 opacity-0 animate-fade-in-up-3 min-h-[1.5em] sm:text-base sm:mb-5 md:text-lg lg:text-xl xl:text-2xl">
              <span className="inline-block overflow-hidden whitespace-nowrap typing-cursor animate-typing">
                {roles[roleIndex]}
              </span>
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-6 opacity-0 animate-fade-in-up-4 max-w-full sm:text-base sm:leading-relaxed sm:max-w-md sm:mb-8 md:text-lg md:max-w-lg lg:text-xl lg:leading-relaxed lg:max-w-2xl">
              Passionné par la création de solutions durables dans le domaine du génie géotechnique et des infrastructures urbaines, je me concentre sur le développement d'infrastructures innovantes et résilientes, qui ont un impact positif sur l'environnement.
            </p>

            <div className="flex flex-col gap-3 opacity-0 animate-fade-in-up-5 w-full max-w-xs mx-auto sm:flex-row sm:justify-center sm:gap-4 sm:max-w-none lg:justify-start">
              <a 
                href="#projects" 
                className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 btn-hover-effect text-sm flex-1 sm:text-base sm:px-7 sm:py-3.5 sm:flex-none lg:px-8 lg:py-4 lg:rounded-xl"
              >
                <span className="relative z-10">Voir mes projets</span>
              </a>
              <a 
                href="#contact" 
                className="relative px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg bg-transparent overflow-hidden transition-all duration-300 hover:text-white hover:-translate-y-0.5 hover:scale-105 btn-secondary-effect text-sm flex-1 sm:text-base sm:px-7 sm:py-3.5 sm:flex-none lg:px-8 lg:py-4 lg:rounded-xl"
              >
                <span className="relative z-10">Contact</span>
              </a>
            </div>
          </div>

          {/* Profile image */}
          <div className="w-full flex justify-center opacity-0 animate-slide-in-right order-first lg:w-[45%] lg:order-none">
            <div className="relative flex justify-center items-center">
              
              {/* Rotating rings */}
              <div className="absolute flex justify-center items-center">
                <div className="absolute w-48 h-48 border border-blue-400/30 rounded-full animate-spin-slow sm:w-56 sm:h-56 sm:border-2 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96"></div>
                <div className="absolute w-56 h-56 border border-violet-300/20 rounded-full animate-spin-reverse sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-88 lg:h-88 xl:w-[26rem] xl:h-[26rem]"></div>
              </div>
              
              {/* Glow background */}
              <div className="absolute w-48 h-48 bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-[15px] animate-pulse-glow-fast sm:w-56 sm:h-56 sm:blur-[20px] md:w-64 md:h-64 md:blur-[25px] lg:w-80 lg:h-80 lg:blur-[30px]"></div>
              
              {/* Image container */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full p-0.5 animate-pulse-glow-fast sm:p-1">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Maliki Djandjieme"
                      className="w-[calc(100%-6px)] h-[calc(100%-6px)] object-cover rounded-full transition-all duration-500 hover:scale-105 hover:brightness-110 sm:w-[calc(100%-8px)] sm:h-[calc(100%-8px)]"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Custom styles for landscape mobile */}
        <style>{`
          @media (max-height: 500px) and (orientation: landscape) {
            .hero-container {
              height: auto;
              min-height: 100vh;
              padding: 1rem 0;
            }
          }
        `}</style>
        
      </section>
    </>
  );
}

export default Hero;