// src/components/Experience.jsx
import React from 'react';

// Expériences et études classées par ordre chronologique décroissant
const experiences = [
  {
    type: 'work',
    title: 'Chargé de programme – Infrastructures & Urbanisme',
    institution: 'JICA Côte d’Ivoire',
    period: 'Mai 2024 – Présent',
    description:
      'Gestion du projet CACAO. Coordination des projets de transport, urbanisme, déchets et développement régional entre le Togo, la Côte d’Ivoire et le Burkina Faso.',
  },
  {
    type: 'work',
    title: 'Chercheur adjoint',
    institution: 'Université de Yokohama',
    period: 'Sept. 2023 – Fév. 2024',
    description:
      'Encadrement des étudiants pour les essais triaxiaux et la liquéfaction. Recherches sur la stabilisation de sol en zone sismique.',
  },
  {
    type: 'education',
    title: 'Doctorat en Ingénierie Géo-Environnementale',
    institution: 'Université Nationale de Yokohama, Japon',
    period: '2020 – 2023',
    description:
      'Stabilisation du sable avec cendres de boues papetières. Expérimentations en laboratoire et rédaction scientifique.',
  },
  {
    type: 'work',
    title: 'Ingénieur civil (Projet EDF)',
    institution: 'EDF – Togo',
    period: '2020 – 2021',
    description:
      'Réhabilitation de 4000 km de routes rurales. Études, devis, supervision des travaux et coordination sur le terrain.',
  },
  {
    type: 'education',
    title: 'Master en Génie des Infrastructures Urbaines',
    institution: 'Université Nationale de Yokohama, Japon',
    period: '2018 – 2020',
    description:
      'Formation approfondie en infrastructures urbaines durables, aménagement et résilience.',
  },
  {
    type: 'work',
    title: 'Ingénieur géotechnique (Projet Kangounou)',
    institution: 'Togo',
    period: '2018 – 2019',
    description:
      'Projet de réhabilitation de digue. Étude topographique, choix de matériaux, réalisation de déversoir.',
  },
  {
    type: 'education',
    title: 'Master en Conception d’Infrastructures Routières',
    institution: '2iE, Burkina Faso',
    period: '2016 – 2018',
    description:
      'Spécialisation en voirie, VRD, stabilisation des sols et ouvrages hydrauliques.',
  },
  {
    type: 'work',
    title: 'Stage – Voirie urbaine bitumée',
    institution: 'Lomé',
    period: '2013',
    description:
      'Projet de bitumage de 14 km en milieu urbain. Réalisation des couches de fondation, base et revêtement.',
  },
];

function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Mon <span className="text-primary-600 dark:text-primary-400">Parcours</span>
        </h2>

        <div className="relative">
          <div className="space-y-8 md:space-y-0 md:grid grid-cols-9 mx-auto">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <React.Fragment key={index}>
                  <div className={`timeline-item col-span-4 ${isLeft ? '' : 'md:col-start-6'}`}>
                    <div className="flex flex-col p-6 bg-white dark:bg-dark-800 rounded-xl shadow-md">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                          <i
                            className={`fas ${
                              exp.type === 'education' ? 'fa-graduation-cap' : 'fa-briefcase'
                            } text-white`}
                          ></i>
                        </div>
                        <h3 className="text-lg font-bold">{exp.title}</h3>
                      </div>
                      <div className="ml-12">
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">{exp.institution}</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-2">
                          <i className="fas fa-calendar-alt"></i> {exp.period}
                        </p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300 text-justify">{exp.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ligne verticale centrale */}
                  <div className="hidden md:flex col-span-1 justify-center">
                    <div className="w-1 h-full bg-gray-200 dark:bg-dark-700 relative">
                      <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-dark-900"></div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
