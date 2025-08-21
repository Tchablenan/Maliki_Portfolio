import React, { useState, useEffect } from 'react';

function Navbar() {
  // État pour le thème et le menu mobile
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Vérifie si le thème est sauvegardé dans localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');  // Applique la classe 'dark' à html
    }
  }, []);



  // Fonction pour basculer le menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed w-full z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-primary-600 dark:text-primary-400">MD.</a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="nav-link active-nav">Acceuil</a>
            <a href="#about" className="nav-link">A propos</a>
            <a href="#skills" className="nav-link">competences</a>
            <a href="#projects" className="nav-link">Projets</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
          

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-button"
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div id="mobile-menu" className={`md:hidden mt-4 space-y-4 pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <a href="#home" className="block nav-link active-nav">Acceuil</a>
          <a href="#about" className="block nav-link">A propos</a>
          <a href="#skills" className="block nav-link">Competence</a>
          <a href="#projects" className="block nav-link">Projets</a>
          <a href="#experience" className="block nav-link">Experience</a>
          <a href="#contact" className="block nav-link">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
