import type { Dictionary } from "../types";

export const fr: Dictionary = {
  meta: {
    title: "Dr Maliki Djandjieme — Ingénieur géotechnicien, PhD",
    description:
      "Docteur en géotechnique (Université Nationale de Yokohama) et consultant JICA en infrastructures. Stabilisation des sols, fondations, routes et barrages en Afrique de l'Ouest.",
    keywords: ["géotechnique", "ingénieur géotechnicien", "stabilisation des sols", "fondations", "barrages", "routes", "JICA", "Togo", "Côte d'Ivoire"],
  },
  nav: {
    items: [
      { id: "home", label: "Accueil" },
      { id: "about", label: "À propos" },
      { id: "services", label: "Expertises" },
      { id: "projects", label: "Projets" },
      { id: "experience", label: "Parcours" },
      { id: "research", label: "Recherche" },
      { id: "education", label: "Formation" },
      { id: "contact", label: "Contact" },
    ],
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    toggleTheme: "Changer de thème",
    language: "Langue",
    skip: "Aller au contenu",
    menuContactTitle: "Un projet d'infrastructure en tête ?",
    menuContactText: "Étude de sol, fondations, routes ou barrages : parlons de votre projet.",
    follow: "Me suivre",
  },
  hero: {
    headline: "Géotechnicien",
    greeting: "Bonjour, je suis",
    name: "Dr Maliki Djandjieme",
    badge: "Disponible pour des missions d'expertise",
    cta: "Me contacter",
    intro:
      "Docteur en géotechnique formé au Japon, je conçois des solutions de sol durables pour les routes, barrages et fondations d'Afrique de l'Ouest.",
    photoAlt: "Portrait du Dr Maliki Djandjieme à son bureau",
  },
  partnersLabel: "Institutions et partenaires",
  about: {
    title: "À propos",
    text:
      "Ingénieur civil et géotechnicien, j'accompagne les projets d'infrastructures de l'étude de sol jusqu'au chantier, entre recherche appliquée au Japon et terrain en Afrique de l'Ouest.",
    yearsValue: "8+",
    yearsLabel: "Années d'expérience",
    statement:
      "Docteur de l'Université Nationale de Yokohama, je coordonne aujourd'hui des programmes d'infrastructures pour la JICA entre le Togo, le Burkina Faso et la Côte d'Ivoire.",
    cta: "Travaillons ensemble",
    cv: "Télécharger le CV",
    photoAlt: "Maliki Djandjieme en extérieur, tenant son diplôme",
    portraitAlt: "Portrait de Maliki Djandjieme",
    stats: [
      { value: "4", label: "Pays d'intervention" },
      { value: "4 000 km", label: "de routes rurales suivies" },
      { value: "4", label: "Publications scientifiques" },
    ],
  },
  services: {
    kicker: "Expertises",
    lead: "Des sols maîtrisés pour des ouvrages qui durent.",
    text:
      "De l'essai en laboratoire à la supervision de chantier, une approche scientifique au service de projets fiables, économes et durables.",
    title: "Expertises.",
    items: [
      {
        icon: 1,
        title: "Géotechnique & essais",
        description: "Campagnes d'investigation, essais en laboratoire et in situ pour valider les hypothèses de conception.",
        tags: ["CBR", "Triaxial", "SPT"],
      },
      {
        icon: 2,
        title: "Stabilisation des sols",
        description: "Traitement des sables et latérites, liants alternatifs à base de cendres de boues papetières.",
        tags: ["Cendres PS", "Latérite", "Éco-matériaux"],
      },
      {
        icon: 3,
        title: "Fondations & terrassements",
        description: "Dimensionnement des fondations, nivellement, compactage et stabilité des talus en terrain difficile.",
        tags: ["Fondations", "Compactage", "Talus"],
      },
      {
        icon: 4,
        title: "Routes & chaussées",
        description: "Conception, réhabilitation et entretien de routes rurales et urbaines, drainage et assainissement.",
        tags: ["Chaussées", "Drainage", "Alizé"],
      },
      {
        icon: 5,
        title: "Barrages & hydraulique",
        description: "Réhabilitation de digues et déversoirs, choix des matériaux de remblai, curage et protection des berges.",
        tags: ["Digues", "Déversoirs", "Hydrologie"],
      },
      {
        icon: 6,
        title: "Gestion de projets",
        description: "Formulation, suivi-évaluation et coordination multi-pays avec les partenaires techniques et financiers.",
        tags: ["JICA", "UEMOA", "Suivi-évaluation"],
      },
    ],
  },
  projects: {
    title: "Projets marquants",
    text: "Une sélection de programmes, recherches et chantiers menés au Japon et en Afrique de l'Ouest.",
    linkLabel: "En savoir plus",
    items: [
      {
        id: "cacao",
        title: "Programme CACAO — Corridors de croissance",
        period: "2024 — aujourd'hui",
        place: "JICA · Togo, Burkina Faso, Côte d'Ivoire",
        description:
          "Coordination régionale du plan directeur des corridors pour l'anneau de croissance en Afrique de l'Ouest : transport, urbanisme et mobilité.",
        tags: ["Planification régionale", "Multi-pays", "Corridors"],
      },
      {
        id: "phd",
        title: "Stabilisation du sable par cendres de boues papetières",
        period: "2020 — 2023",
        place: "Université Nationale de Yokohama, Japon",
        description:
          "Thèse de doctorat : un stabilisant à base de cendres PS pour renforcer les remblais autour des conduites et regards enterrés.",
        tags: ["Recherche doctorale", "Matériaux recyclés", "Publication"],
      },
      {
        id: "liquefaction",
        title: "Essais triaxiaux & liquéfaction",
        period: "2023 — 2024",
        place: "Université Nationale de Yokohama, Japon",
        description:
          "Études de stabilisation contre la liquéfaction et encadrement des étudiants sur les essais géotechniques.",
        tags: ["Triaxial cyclique", "Zone sismique", "Encadrement"],
      },
      {
        id: "rural-roads",
        title: "Réhabilitation de 4 000 km de routes rurales",
        period: "2020 — 2023",
        place: "Ministère de l'Agriculture · Togo",
        description:
          "Dossiers d'exécution, métrés et devis, supervision des terrassements et du compactage avec les missions de contrôle.",
        tags: ["Supervision", "Métrés & devis", "Contrôle qualité"],
      },
      {
        id: "kangounou",
        title: "Réhabilitation du barrage de Kangounou",
        period: "2018 — 2019",
        place: "Kountoire, Togo",
        description:
          "Digue et déversoir : études topographiques, choix des matériaux de remblai locaux, stabilisation des talus et curage de la retenue.",
        tags: ["Barrage", "Stabilité des talus", "Curage"],
      },
      {
        id: "laterite",
        title: "Caractérisation des sols latéritiques",
        period: "2014 — 2015",
        place: "LEMHaB — 2iE, Burkina Faso",
        description:
          "Granulométrie, limites d'Atterberg, CBR et essais mécaniques pour valoriser les matériaux locaux en structures routières.",
        tags: ["Atterberg", "CBR", "Matériaux locaux"],
      },
      {
        id: "urban-roads",
        title: "Voiries urbaines et couches de chaussée",
        period: "2013",
        place: "CECO BTP · Lomé, Togo",
        description:
          "Suivi des terrassements et mise en œuvre des couches de fondation, de base et de roulement, contrôle des matériaux.",
        tags: ["Couches de chaussée", "Enrobés", "Drainage urbain"],
      },
    ],
  },
  marquee: ["Géotechnique", "Stabilisation des sols", "Fondations", "Barrages", "Routes", "Éco-matériaux", "Essais triaxiaux", "Coopération internationale"],
  experience: {
    title: "Parcours",
    text: "Plus de huit ans entre bureaux d'études, chantiers, laboratoires et coopération internationale.",
    items: [
      {
        period: "2024 — aujourd'hui",
        role: "Consultant en infrastructures et développement régional",
        organization: "JICA — Agence japonaise de coopération internationale",
        location: "Abidjan, Côte d'Ivoire",
        highlights: [
          "Coordination de projets de routes, corridors et mobilité urbaine au Togo, au Burkina Faso et en Côte d'Ivoire.",
          "Gestion technique et financière : formulation, suivi et évaluation.",
          "Coordination avec les partenaires régionaux, dont l'UEMOA.",
        ],
      },
      {
        period: "2023 — 2024",
        role: "Chercheur assistant en innovation urbaine",
        organization: "Université Nationale de Yokohama",
        location: "Yokohama, Japon",
        highlights: [
          "Essais triaxiaux et études de stabilisation contre la liquéfaction.",
          "Formation et encadrement des étudiants aux méthodes d'essais géotechniques.",
        ],
      },
      {
        period: "2020 — 2023",
        role: "Doctorant — ingénieur géotechnicien",
        organization: "Université Nationale de Yokohama",
        location: "Yokohama, Japon",
        highlights: [
          "Stabilisation des sols pour améliorer la résistance à la liquéfaction autour des conduites enterrées.",
          "Développement de stabilisants à base de cendres pour renforcer les remblais.",
        ],
      },
      {
        period: "2015 — 2020",
        role: "Ingénieur génie civil — routes et terrassements",
        organization: "EDF — Entreprise Djantchieme et Formation",
        location: "Dapaong, Togo",
        highlights: [
          "Supervision des terrassements, du nivellement et du compactage.",
          "Entretien de 20,3 km de routes rurales et ouvrages hydrauliques (dalots, caniveaux).",
          "Curage de retenues d'eau pour l'agriculture et l'élevage.",
        ],
      },
      {
        period: "2013 — 2015",
        role: "Stages en laboratoire et en entreprise",
        organization: "LEMHaB-2iE · CECO BTP · CECO TDE",
        location: "Ouagadougou & Lomé",
        highlights: [
          "Essais d'identification et mécaniques des sols (granulométrie, Atterberg, CBR, SPT).",
          "Couches de fondation en sable limoneux traité au ciment, enrobés et réseaux d'eau.",
        ],
      },
    ],
  },
  research: {
    title: "Recherche & distinctions",
    text: "Des travaux publiés sur les matériaux de sol durables, récompensés au Japon et soutenus par la JICA.",
    publicationsTitle: "Publications",
    publications: [
      {
        year: "2022",
        title: "Swelling and strength characteristics of sand treated with paper sludge ash-based stabilizer",
        venue: "Construction and Building Materials (Elsevier), 341, 127849",
        href: "https://doi.org/10.1016/j.conbuildmat.2022.127849",
      },
      {
        year: "2023",
        title: "Effects of dry-wet cycles on the mechanical properties of sand treated with a paper sludge ash-based stabilizer",
        venue: "9th International Congress on Environmental Geotechnics, Grèce",
      },
      {
        year: "2021",
        title: "Fundamental study on the mechanical characteristics of sand treated by a PS ash-based improving material",
        venue: "Advances in Sustainable Construction and Resource Management (Springer), p. 107-116",
      },
      {
        year: "Accepté",
        title: "Normal and seismic characteristics of fill sand improved with biomass waste-derived materials",
        venue: "Remblais sous chaussées et fondations",
      },
    ],
    distinctionsTitle: "Distinctions & certifications",
    distinctions: [
      { year: "JICA", title: "Certificat d'excellence", issuer: "Agence japonaise de coopération internationale" },
      { year: "2020", title: "Prix de la meilleure présentation", issuer: "CREST 2020" },
      { year: "2019", title: "Participation à la TICAD 7", issuer: "Ministère des Affaires étrangères du Japon" },
      { year: "2018", title: "Programme JICA-DSP & initiative ABE", issuer: "JICA" },
    ],
    membershipsTitle: "Membre de",
    memberships: ["JGS — Société japonaise de géotechnique", "JSCE — Société japonaise des ingénieurs civils", "ONIT — Ordre national des ingénieurs du Togo"],
    readLabel: "Lire l'article",
  },
  education: {
    title: "Formation & compétences",
    text: "Un double ancrage académique, entre le Japon et l'Institut 2iE de Ouagadougou.",
    degrees: [
      { year: "2023", title: "Doctorat en ingénierie — géotechnique et géo-environnement", school: "Université Nationale de Yokohama, Japon" },
      { year: "2020", title: "Master of Engineering — géotechnique et innovation urbaine", school: "Université Nationale de Yokohama, Japon" },
      { year: "2018", title: "Master en conception de routes et d'infrastructures", school: "Institut international 2iE, Burkina Faso" },
      { year: "2015", title: "Licence en génie civil", school: "Institut international 2iE, Burkina Faso" },
    ],
    languagesTitle: "Langues",
    languages: [
      { name: "Français", level: "Courant", value: 100 },
      { name: "Anglais", level: "Professionnel", value: 90 },
      { name: "Japonais", level: "B2", value: 65 },
      { name: "Moba, haoussa, éwé", level: "Conversation", value: 55 },
    ],
    softwareTitle: "Logiciels",
    software: ["PLAXIS", "GeoStudio", "AutoCAD Civil 3D", "QGIS", "Alizé", "RDM6", "Origin", "Fusion 360", "MS Project", "OpenProject", "Microsoft Office"],
  },
  contact: {
    title: "Un projet d'infrastructure en tête ?",
    text: "Étude géotechnique, fondations, routes, barrages ou collaboration de recherche : écrivez-moi, je réponds rapidement.",
    formTitle: "Envoyer un message",
    formText: "Présentez votre projet en quelques lignes.",
    name: "Nom complet",
    namePlaceholder: "Votre nom",
    email: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    subject: "Objet",
    subjects: ["Expertise géotechnique", "Routes & chaussées", "Barrages & hydraulique", "Recherche & collaboration", "Autre demande"],
    message: "Message",
    messagePlaceholder: "Décrivez votre besoin…",
    submit: "Envoyer",
    sending: "Envoi en cours…",
    success: "Merci ! Votre message a bien été envoyé.",
    error: "L'envoi a échoué. Réessayez ou écrivez-moi directement par e-mail.",
    location: "Basé à Abidjan, disponible en Afrique de l'Ouest et à l'international",
  },
  footer: {
    title: "Bâtir sur des fondations solides.",
    text: "Disponible pour des missions d'expertise, de conseil et des collaborations de recherche. Écrivez-moi à tout moment.",
    rights: "Tous droits réservés.",
    backToTop: "Retour en haut",
  },
  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
};
