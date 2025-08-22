import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Code, Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 border-t border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="group">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-purple-800 transition-all duration-500">
                    Maliki Djandjieme
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                    <Code size={16} className="text-blue-500" />
                    <span className="text-sm font-medium">Ingénieur DevOps & Cloud</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
                  Passionné par l'infrastructure cloud, l'automatisation et les technologies émergentes. 
                  Toujours à la recherche de nouveaux défis techniques.
                </p>

                {/* Social Links */}
                <div className="flex gap-3 mt-6">
                  <a 
                    href="https://www.linkedin.com/in/djandjieme-maliki-otieboame-a50798b0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  >
                    <Linkedin size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  
                  <a 
                    href="https://github.com/votre-github" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  >
                    <Github size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>

                  <a 
                    href="https://x.com/DjandjiemeM" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  >
                    <Twitter size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h4>
                <nav className="flex flex-col space-y-3">
                  {[
                    { href: "#about", label: "À propos", icon: "👨‍💻" },
                    { href: "#skills", label: "Compétences", icon: "🚀" },
                    { href: "#projects", label: "Projets", icon: "💼" },
                    { href: "#contact", label: "Contact", icon: "📧" }
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-2"
                    >
                      <span className="text-sm group-hover:scale-125 transition-transform duration-300">
                        {link.icon}
                      </span>
                      <span className="font-medium relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h4>
                <div className="space-y-3">
                  <a 
                    href="mailto:kdjandjieme@gmail.com"
                    className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">kdjandjieme@gmail.com</span>
                  </a>
                  
                  <a 
                    href="tel:+2250705008308"
                    className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone size={14} className="text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium">+225 07 05 00 83 08</span>
                  </a>
                </div>

                {/* Availability Status */}
                <div className="mt-6 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      Disponible pour nouveaux projets
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <span>&copy; {currentYear} Maliki Djandjieme.</span>
                  <span>Fait avec</span>
                  <Heart size={14} className="text-red-500 animate-pulse" />
                  <span>en Côte d'Ivoire</span>
                </div>

                <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Hébergé sur Vercel
                  </span>
                  <span>•</span>
                  <span>Conçu avec React & Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-110 hover:shadow-xl group ${
          isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}
      >
        <ArrowUp size={20} className="group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </>
  );
}

export default Footer;