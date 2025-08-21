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
  const profileImage = "/src/assets/profile.jpg";

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .hero-container {
          width: 100vw;
          height: 160vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* Particules flottantes */
        .floating-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-1 {
          top: 25%;
          left: 25%;
          width: 8px;
          height: 8px;
          background: rgba(96, 165, 250, 0.6);
          animation: float-bounce 3s ease-in-out infinite;
        }

        .particle-2 {
          top: 33%;
          right: 33%;
          width: 4px;
          height: 4px;
          background: rgba(34, 211, 238, 0.8);
          animation: ping-effect 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .particle-3 {
          bottom: 33%;
          left: 33%;
          width: 12px;
          height: 12px;
          background: rgba(129, 140, 248, 0.5);
          animation: pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .particle-4 {
          top: 50%;
          right: 25%;
          width: 6px;
          height: 6px;
          background: rgba(196, 181, 253, 0.7);
          animation: float-bounce 4s ease-in-out infinite 0.5s;
        }

        /* Orbes de fond */
        .orb-1 {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          animation: orb-float 6s ease-in-out infinite;
        }

        .orb-2 {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          animation: orb-float 8s ease-in-out infinite reverse;
        }

        /* Formes géométriques */
        .geometric-shape-1 {
          position: absolute;
          top: 25%;
          right: 25%;
          width: 80px;
          height: 80px;
          border: 2px solid rgba(96, 165, 250, 0.3);
          border-radius: 12px;
          transform: rotate(45deg);
          animation: spin-slow 20s linear infinite;
        }

        .geometric-shape-2 {
          position: absolute;
          bottom: 25%;
          left: 16.666667%;
          width: 64px;
          height: 64px;
          border: 1px solid rgba(196, 181, 253, 0.2);
          border-radius: 50%;
          animation: spin-reverse 15s linear infinite;
        }

        .hero-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .hero-content {
            flex-direction: row;
          }
        }

        .hero-text {
          width: 100%;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateX(-40px);
          animation: slide-in-left 1s ease-out 0.2s forwards;
        }

        @media (min-width: 1024px) {
          .hero-text {
            width: 50%;
            margin-bottom: 0;
          }
        }

        .hero-image {
          width: 100%;
          display: flex;
          justify-content: center;
          opacity: 0;
          transform: translateX(40px);
          animation: slide-in-right 1s ease-out 0.5s forwards;
        }

        @media (min-width: 1024px) {
          .hero-image {
            width: 50%;
          }
        }

        /* Animations de texte */
        .greeting {
          font-size: 2.25rem;
          font-weight: 700;
          color: white;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.1s forwards;
        }

        @media (min-width: 768px) {
          .greeting {
            font-size: 3rem;
          }
        }

        @media (min-width: 1280px) {
          .greeting {
            font-size: 3.75rem;
          }
        }

        .name {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradient-shift 3s ease-in-out infinite, fade-in-up 0.8s ease-out 0.5s forwards;
          opacity: 0;
          position: relative;
        }

        @media (min-width: 768px) {
          .name {
            font-size: 2.25rem;
          }
        }

        @media (min-width: 1280px) {
          .name {
            font-size: 3rem;
          }
        }

        .name::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #22d3ee, #a855f7);
          border-radius: 2px;
          animation: expand-line 1s ease-out 0.8s forwards;
          width: 0;
        }

        .role {
          font-size: 1.25rem;
          font-weight: 600;
          color: #bfdbfe;
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.7s forwards;
        }

        @media (min-width: 768px) {
          .role {
            font-size: 1.5rem;
          }
        }

        @media (min-width: 1280px) {
          .role {
            font-size: 1.875rem;
          }
        }

        .typing-text {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #22d3ee;
          animation: typing 3s steps(40, end) infinite, cursor-blink 1s step-end infinite;
        }

        .description {
          font-size: 1.125rem;
          color: #d1d5db;
          line-height: 1.75;
          max-width: 32rem;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 0.9s forwards;
        }

        @media (min-width: 768px) {
          .description {
            font-size: 1.25rem;
          }
        }

        /* Boutons */
        .buttons-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          opacity: 0;
          animation: fade-in-up 0.8s ease-out 1.1s forwards;
        }

        @media (min-width: 640px) {
          .buttons-container {
            flex-direction: row;
          }
        }

        .btn-primary {
          position: relative;
          padding: 1rem 2rem;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          color: white;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #1d4ed8, #6d28d9);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.7s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04),
                      0 0 30px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-primary:hover::after {
          transform: translateX(100%);
        }

        .btn-primary span {
          position: relative;
          z-index: 10;
        }

        .btn-secondary {
          position: relative;
          padding: 1rem 2rem;
          border: 2px solid #22d3ee;
          color: #22d3ee;
          font-weight: 600;
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-secondary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #22d3ee, #3b82f6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .btn-secondary:hover {
          color: white;
          transform: translateY(-2px) scale(1.02);
        }

        .btn-secondary:hover::before {
          transform: scaleX(1);
        }

        .btn-secondary span {
          position: relative;
          z-index: 10;
        }

        /* Image profile */
        .profile-container {
          position: relative;
        }

        .rotating-rings {
          position: absolute;
          inset: -1rem;
        }

        .ring-1 {
          position: absolute;
          width: 18rem;
          height: 18rem;
          border: 2px solid rgba(96, 165, 250, 0.3);
          border-radius: 50%;
          animation: spin-slow 20s linear infinite;
        }

        @media (min-width: 768px) {
          .ring-1 {
            width: 24rem;
            height: 24rem;
          }
        }

        .ring-2 {
          position: absolute;
          inset: -2rem;
          width: 18rem;
          height: 18rem;
          border: 1px solid rgba(196, 181, 253, 0.2);
          border-radius: 50%;
          animation: spin-reverse 15s linear infinite;
        }

        @media (min-width: 768px) {
          .ring-2 {
            width: 24rem;
            height: 24rem;
          }
        }

        .glow-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(30px);
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .image-container {
          position: relative;
          width: 16rem;
          height: 16rem;
        }

        @media (min-width: 768px) {
          .image-container {
            width: 20rem;
            height: 20rem;
          }
        }

        .image-border {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #22d3ee, #a855f7);
          border-radius: 50%;
          padding: 4px;
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .image-inner {
          width: 100%;
          height: 100%;
          background: #0f172a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .profile-img {
          width: calc(100% - 8px);
          height: calc(100% - 8px);
          object-fit: cover;
          border-radius: 50%;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .profile-img:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .floating-icon {
          position: absolute;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          color: white;
        }

        .icon-1 {
          top: -1rem;
          right: -1rem;
          background: linear-gradient(45deg, #22d3ee, #3b82f6);
          animation: float-bounce 3s ease-in-out infinite 0.5s;
        }

        .icon-2 {
          bottom: -1rem;
          left: -1rem;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          animation: float-bounce 3s ease-in-out infinite 1.5s;
        }

        /* Animations */
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

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes expand-line {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes cursor-blink {
          from, to {
            border-color: transparent;
          }
          50% {
            border-color: #22d3ee;
          }
        }

        @keyframes float-bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes ping-effect {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes orb-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) rotate(120deg);
          }
          66% {
            transform: translateY(15px) rotate(240deg);
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

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>

      <section className="hero-container">
        {/* Background elements */}
        <div className="hero-bg">
          {/* Particules flottantes */}
          <div className="floating-particle particle-1"></div>
          <div className="floating-particle particle-2"></div>
          <div className="floating-particle particle-3"></div>
          <div className="floating-particle particle-4"></div>
          
          {/* Orbes de fond */}
          <div className="orb-1"></div>
          <div className="orb-2"></div>
          
          {/* Formes géométriques */}
          <div className="geometric-shape-1"></div>
          <div className="geometric-shape-2"></div>
        </div>

        <div className="hero-content">
          {/* Contenu textuel */}
          <div className="hero-text">
    

            <h2 className="name">
              Djandjieme O. Maliki
            </h2>

            <h3 className="role">
              <span className="typing-text">
                {roles[roleIndex]}
              </span>
            </h3>

            <p className="description">
              Passionné par la création de solutions durables dans le domaine du génie géotechnique et des infrastructures urbaines, je me concentre sur le développement d'infrastructures innovantes et résilientes, qui ont un impact positif sur l'environnement.
            </p>

            <div className="buttons-container">
              <a href="#projects" className="btn-primary">
                <span>Voir mes projets</span>
              </a>
              <a href="#contact" className="btn-secondary">
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Image de profil */}
          <div className="hero-image">
            <div className="profile-container">
              {/* Anneaux rotatifs */}
              <div className="rotating-rings">
                <div className="ring-1"></div>
                <div className="ring-2"></div>
              </div>
              
              {/* Fond lumineux */}
              <div className="glow-bg"></div>
              
              {/* Container de l'image */}
              <div className="image-container">
                <div className="image-border">
                  <div className="image-inner">
                    <img
                      src={profileImage}
                      alt="Maliki Djandjieme"
                      className="profile-img"
                    />
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;