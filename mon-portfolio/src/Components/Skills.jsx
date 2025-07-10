// src/components/Skills.jsx
import React, { useState } from 'react';

// Compétences professionnelles
const skillCategories = [
  { key: 'all', label: 'Tous' },
  { key: 'geotech', label: 'Géotechnique' },
  { key: 'infra', label: 'Infrastructures' },
  { key: 'tools', label: 'Outils' },
  { key: 'lab', label: 'Laboratoire' },
];

const professionalSkills = [
  // Géotechnique
  { name: 'Stabilisation des sols', category: 'geotech', icon: 'soil.png' },
  { name: 'Essais triaxiaux / liquéfaction', category: 'geotech', icon: 'triaxial.png' },
  { name: 'Fondations (profondes / superficielles)', category: 'geotech', icon: 'foundation.webp' },

  // Infrastructures
  { name: 'Conception routière', category: 'infra', icon: 'road.avif' },
  { name: 'Barrages et digues', category: 'infra', icon: 'dam.png' },
  { name: 'Voirie et VRD', category: 'infra', icon: 'roadwork.webp' },

  // Outils
  { name: 'AutoCAD', category: 'tools', icon: 'autocad.png' },
  { name: 'Excel technique', category: 'tools', icon: 'excel2.png' },
  { name: 'Gestion de projet', category: 'tools', icon: 'projet2.jpeg' },
  { name: 'Devis quantitatifs', category: 'tools', icon: 'document.jpg' },

  // Laboratoire
  { name: 'CBR / Compression / Cisaillement', category: 'lab', icon: 'test.gif' },
  { name: 'Granulométrie / Atterberg', category: 'lab', icon: 'lab.png' },
];

// Compétences linguistiques (section séparée)
const languageSkills = [
  { name: 'Français – Natif', icon: 'fr.svg' },
  { name: 'Anglais – Excellent', icon: 'en.webp' },
  { name: 'Japonais – Élémentaire', icon: 'jp.png' },

];

function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills =
    selectedCategory === 'all'
      ? professionalSkills
      : professionalSkills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-6">
        {/* Compétences techniques */}
        <h2 className="text-3xl font-bold text-center mb-12">
          Mes <span className="text-primary-600 dark:text-primary-400">Compétences</span>
        </h2>

        {/* Filtres professionnels */}
        <div className="mb-8 flex justify-center flex-wrap gap-2">
          {skillCategories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                selectedCategory === key
                  ? 'bg-primary-600 text-white'
                  : 'border-gray-300 hover:bg-gray-100 dark:border-dark-700 dark:hover:bg-dark-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grille des compétences pro */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20">
          {filteredSkills.map((skill, idx) => (
            <div key={idx} className="bg-white dark:bg-dark-800 p-4 rounded-xl shadow hover:shadow-lg flex flex-col items-center justify-center text-center">
              <img
                src={`/icons/${skill.icon}`}
                alt={skill.name}
                className="w-12 h-12 mb-3 object-contain"
              />
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Compétences linguistiques */}
        <h3 className="text-2xl font-bold text-center mb-8">
          Langues <span className="text-primary-600 dark:text-primary-400">Parlées</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {languageSkills.map((lang, idx) => (
            <div key={idx} className="bg-white dark:bg-dark-800 p-4 rounded-xl shadow hover:shadow-md flex flex-col items-center justify-center text-center">
              <img
                src={`/icons/${lang.icon}`}
                alt={lang.name}
                className="w-10 h-10 mb-3 object-contain"
              />
              <span className="text-sm font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
