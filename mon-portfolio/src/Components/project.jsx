// src/components/Projects.jsx
import React from 'react';

const projects = [
  {
    title: 'Projet CACAO – Corridor de croissance',
    location: 'JICA – Afrique de l’Ouest',
    year: '2024 – Présent',
    description:
      'Coordination régionale d’un programme d’infrastructures : urbanisme, transport, déchets solides entre le Togo, la Côte d’Ivoire et le Burkina Faso.',
    link: 'https://news.abidjan.net/articles/725209/cote-divoire-la-mobilisation-de-plus-de-4800-milliards-de-fcfa-pour-les-projets-prioritaires-du-plan-directeur-de-lamenagement-des-corridors-pour-lanneau-de-croissance-en-afrique-de-louest-cacao-au-centre-dune-mission', // lien fictif
  },
  {
    title: 'Recherche doctorale – Stabilisation du sable',
    location: 'Université de Yokohama',
    year: '2020 – 2023',
    description:
      'Étude expérimentale sur le renforcement du sable avec cendres de boues papetières pour les conduites souterraines.',
    link: '/documents/these-maliki.pdf', // exemple local
  },
  {
    title: 'Encadrement triaxiaux & liquéfaction',
    location: 'Université de Yokohama',
    year: '2023 – 2024',
    description:
      'Encadrement d’étudiants et recherches sur la liquéfaction des sols et les essais dynamiques triaxiaux.',
  },
  {
    title: 'Réhabilitation de 4000 km de routes rurales',
    location: 'EDF – Togo',
    year: '2020 – 2021',
    description:
      'Suivi de chantier, attachements, coordination terrain sur les routes rurales dans plusieurs régions du Togo.',
  },
  {
    title: 'Réhabilitation du barrage de Kangounou',
    location: 'Togo',
    year: '2019',
    description:
      'Étude géotechnique, matériaux, stabilisation de pente, supervision des travaux hydrauliques.',
  },
  {
    title: 'Stage WIM – Système de pesage dynamique',
    location: 'JICA – Tokyo',
    year: '2019',
    description:
      'Implémentation d’un système WIM pour routes africaines, dans le cadre d’un programme de coopération.',
  },
  {
    title: 'Stabilisation de sol latéritique',
    location: '2iE – Burkina Faso',
    year: '2018',
    description:
      'Essais CBR, formulation cimentée avec grave concassée pour renforcer les structures routières rurales.',
  },
  {
    title: 'Bitumage de voirie (14 km)',
    location: 'Lomé – Togo',
    year: '2013',
    description:
      'Réalisation de fondations, couches de base, enrobé bitumineux sur voirie urbaine en centre-ville.',
  },
];

function Projects() {
  return (
    <section id="projects" className="">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          Mes <span className="text-primary-600 dark:text-primary-400">Projets Réalisés</span>
        </h2>

        <div className="relative pl-6 md:pl-12 border-l-4 border-primary-500">
          {projects.map((proj, i) => {
            const Wrapper = proj.link ? 'a' : 'div';
            const wrapperProps = proj.link
              ? {
                  href: proj.link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'block group mb-12 relative animate-fade-in-up',
                }
              : {
                  className: 'group mb-12 relative animate-fade-in-up',
                };

            return (
              <Wrapper key={i} {...wrapperProps}>
                {/* Pastille timeline */}
                <div className="absolute -left-[15px] top-2 w-6 h-6 rounded-full bg-primary-600 border-4 border-white dark:border-dark-900 shadow-md group-hover:scale-110 transition-transform duration-300" />

                {/* Carte projet */}
                <div className="ml-6 bg-white dark:bg-dark-800 p-6 rounded-xl shadow-md group-hover:shadow-xl transition duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                      {proj.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                      {proj.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">
                    {proj.location}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-justify">{proj.description}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
