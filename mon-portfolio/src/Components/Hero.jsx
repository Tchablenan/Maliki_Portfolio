// src/components/Hero.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import profile from '../assets/profile.jpg';

function Hero() {
  
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Docteur & Ingénieur Géotechnique"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 4000); // Change role every 4 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Background blobs */}
      <div className="blob top-1/4 -left-1/4"></div>
      <div className="blob bottom-1/4 -right-1/4 animation-delay-3000"></div>

      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        {/* Hero content */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
           Bienvenu, je suis</h1> 
           <h2 className='text-xl md:text-6xl font-bold mb-4'> <span className="text-primary-600 dark:text-primary-400 py-20" >  Djandjieme Otiebouame Maliki</span></h2>
          
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            <span 
              className=""
              
            >
              {roles[roleIndex]}
            </span>
          </h2>
          <p className="text-lg mb-8 max-w-lg ">
                  Passionné par la création de solutions durables dans le domaine du génie géotechnique et des infrastructures urbaines, je me concentre sur le développement d'infrastructures innovantes et résilientes, qui ont un impact positif sur l'environnement.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-dark-800 rounded-lg font-medium transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900 rounded-full opacity-20 animate-pulse"></div>
            <img
              src={profile}
              alt="Maliki Djandjieme"
              className="relative w-full h-full object-cover rounded-full border-4 border-primary-500 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
