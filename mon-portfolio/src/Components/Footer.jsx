// src/components/Footer.jsx
import React from 'react';
import { useEffect } from 'react';

function Footer() {
    useEffect(() => {
    const backToTopButton = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove("opacity-0", "invisible");
        backToTopButton.classList.add("opacity-100", "visible");
      } else {
        backToTopButton.classList.remove("opacity-100", "visible");
        backToTopButton.classList.add("opacity-0", "invisible");
      }
    });
  }, []);
  return (
    <footer className="bg-white dark:bg-dark-900 py-8 border-t border-gray-200 dark:border-dark-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <a
              href="#"
              className="text-2xl font-bold text-primary-600 dark:text-primary-400"
            >
              Maliki Djandjieme
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="#about"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              À propos
            </a>
            <a
              href="#projects"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Projets
            </a>
            <a
              href="#contact"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; 2025 Maliki Djandjieme. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        id="back-to-top"
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-colors opacity-0 invisible"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
}

export default Footer;
