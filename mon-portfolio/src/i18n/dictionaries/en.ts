import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Dr Maliki Djandjieme — Geotechnical Engineer, PhD",
    description:
      "PhD in geotechnical engineering (Yokohama National University) and JICA infrastructure consultant. Soil stabilization, foundations, roads and dams across West Africa.",
    keywords: ["geotechnical engineering", "geotechnical engineer", "soil stabilization", "foundations", "dams", "roads", "JICA", "Togo", "Ivory Coast"],
  },
  nav: {
    items: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "services", label: "Expertise" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "research", label: "Research" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    language: "Language",
    skip: "Skip to content",
    menuContactTitle: "Have an infrastructure project in mind?",
    menuContactText: "Soil investigation, foundations, roads or dams: let's talk about your project.",
    follow: "Follow me",
  },
  hero: {
    headline: "Geotechnics",
    greeting: "Hello, I'm",
    name: "Dr Maliki Djandjieme",
    badge: "Available for consulting assignments",
    cta: "Get in touch",
    intro:
      "A Japan-trained PhD in geotechnical engineering, I design durable ground solutions for roads, dams and foundations across West Africa.",
    photoAlt: "Portrait of Dr Maliki Djandjieme at his desk",
  },
  partnersLabel: "Institutions and partners",
  about: {
    title: "About me",
    text:
      "Civil and geotechnical engineer, I support infrastructure projects from soil investigation to site delivery, bridging applied research in Japan and fieldwork in West Africa.",
    yearsValue: "8+",
    yearsLabel: "Years of experience",
    statement:
      "A PhD graduate of Yokohama National University, I now coordinate JICA infrastructure programmes across Togo, Burkina Faso and Côte d'Ivoire.",
    cta: "Let's work together",
    cv: "Download CV",
    photoAlt: "Maliki Djandjieme outdoors, holding his diploma",
    portraitAlt: "Portrait of Maliki Djandjieme",
    stats: [
      { value: "4", label: "Countries of work" },
      { value: "4,000 km", label: "of rural roads supervised" },
      { value: "4", label: "Scientific publications" },
    ],
  },
  services: {
    kicker: "Expertise",
    lead: "Well-understood ground for structures that last.",
    text:
      "From laboratory testing to site supervision, a scientific approach serving reliable, cost-effective and sustainable projects.",
    title: "Expertise.",
    items: [
      {
        icon: 1,
        title: "Geotechnics & testing",
        description: "Site investigations, laboratory and in-situ testing to validate design assumptions and construction quality.",
        tags: ["CBR", "Triaxial", "SPT"],
      },
      {
        icon: 2,
        title: "Soil stabilization",
        description: "Treatment of sands and laterites, alternative binders based on paper sludge ash.",
        tags: ["PS ash", "Laterite", "Eco-materials"],
      },
      {
        icon: 3,
        title: "Foundations & earthworks",
        description: "Foundation design, levelling, compaction and slope stability on difficult ground.",
        tags: ["Foundations", "Compaction", "Slopes"],
      },
      {
        icon: 4,
        title: "Roads & pavements",
        description: "Design, rehabilitation and maintenance of rural and urban roads, drainage and stormwater systems.",
        tags: ["Pavements", "Drainage", "Alizé"],
      },
      {
        icon: 5,
        title: "Dams & hydraulics",
        description: "Rehabilitation of embankments and spillways, fill material selection, dredging and bank protection.",
        tags: ["Embankments", "Spillways", "Hydrology"],
      },
      {
        icon: 6,
        title: "Project management",
        description: "Formulation, monitoring and evaluation, and multi-country coordination with technical and financial partners.",
        tags: ["JICA", "UEMOA", "M&E"],
      },
    ],
  },
  projects: {
    title: "Selected projects",
    text: "A selection of programmes, research and field works carried out in Japan and West Africa.",
    linkLabel: "Learn more",
    items: [
      {
        id: "cacao",
        title: "CACAO programme — Growth corridors",
        period: "2024 — present",
        place: "JICA · Togo, Burkina Faso, Côte d'Ivoire",
        description:
          "Regional coordination of the corridor master plan for the West Africa Growth Ring: transport, urban planning and mobility.",
        tags: ["Regional planning", "Multi-country", "Corridors"],
      },
      {
        id: "phd",
        title: "Sand stabilization with paper sludge ash",
        period: "2020 — 2023",
        place: "Yokohama National University, Japan",
        description:
          "Doctoral research: a PS ash-based stabilizer to reinforce backfill around buried pipelines and manholes.",
        tags: ["Doctoral research", "Recycled materials", "Publication"],
      },
      {
        id: "liquefaction",
        title: "Triaxial testing & liquefaction",
        period: "2023 — 2024",
        place: "Yokohama National University, Japan",
        description:
          "Stabilization studies against liquefaction and supervision of students on geotechnical testing methods.",
        tags: ["Cyclic triaxial", "Seismic zones", "Mentoring"],
      },
      {
        id: "rural-roads",
        title: "Rehabilitation of 4,000 km of rural roads",
        period: "2020 — 2023",
        place: "Ministry of Agriculture · Togo",
        description:
          "Execution files, quantities and cost estimates, supervision of earthworks and compaction alongside the control missions.",
        tags: ["Supervision", "Quantities & estimates", "Quality control"],
      },
      {
        id: "kangounou",
        title: "Kangounou dam rehabilitation",
        period: "2018 — 2019",
        place: "Kountoire, Togo",
        description:
          "Embankment and spillway: topographic surveys, local fill material selection, slope stabilization and reservoir dredging.",
        tags: ["Dam", "Slope stability", "Dredging"],
      },
      {
        id: "laterite",
        title: "Characterization of lateritic soils",
        period: "2014 — 2015",
        place: "LEMHaB — 2iE, Burkina Faso",
        description:
          "Grain size, Atterberg limits, CBR and mechanical tests to make the most of local materials in road structures.",
        tags: ["Atterberg", "CBR", "Local materials"],
      },
      {
        id: "urban-roads",
        title: "Urban roads and pavement layers",
        period: "2013",
        place: "CECO BTP · Lomé, Togo",
        description:
          "Earthworks monitoring and construction of sub-base, base and wearing courses, with material quality control.",
        tags: ["Pavement layers", "Asphalt", "Urban drainage"],
      },
    ],
  },
  marquee: ["Geotechnics", "Soil stabilization", "Foundations", "Dams", "Roads", "Eco-materials", "Triaxial testing", "International cooperation"],
  experience: {
    title: "Experience",
    text: "More than eight years across design offices, construction sites, laboratories and international cooperation.",
    items: [
      {
        period: "2024 — present",
        role: "Consultant in infrastructure and regional development",
        organization: "JICA — Japan International Cooperation Agency",
        location: "Abidjan, Côte d'Ivoire",
        highlights: [
          "Coordination of road, corridor and urban mobility projects in Togo, Burkina Faso and Côte d'Ivoire.",
          "Technical and financial management: formulation, monitoring and evaluation.",
          "Liaison with regional stakeholders, including UEMOA.",
        ],
      },
      {
        period: "2023 — 2024",
        role: "Assistant researcher in urban innovation",
        organization: "Yokohama National University",
        location: "Yokohama, Japan",
        highlights: [
          "Triaxial tests and soil stabilization studies against liquefaction.",
          "Training and supervision of students on geotechnical testing methods.",
        ],
      },
      {
        period: "2020 — 2023",
        role: "PhD candidate — geotechnical engineer",
        organization: "Yokohama National University",
        location: "Yokohama, Japan",
        highlights: [
          "Soil stabilization to improve liquefaction resistance around buried pipelines.",
          "Development of ash-based stabilizers to reinforce embankments.",
        ],
      },
      {
        period: "2015 — 2020",
        role: "Civil engineer — roads and earthworks",
        organization: "EDF — Djantchieme Company and Worker Training",
        location: "Dapaong, Togo",
        highlights: [
          "Supervision of earthworks, levelling and compaction.",
          "Maintenance of 20.3 km of rural roads and hydraulic structures (culverts, gutters).",
          "Dredging of reservoirs for agriculture and livestock.",
        ],
      },
      {
        period: "2013 — 2015",
        role: "Laboratory and company internships",
        organization: "LEMHaB-2iE · CECO BTP · CECO TDE",
        location: "Ouagadougou & Lomé",
        highlights: [
          "Soil identification and mechanical tests (grain size, Atterberg, CBR, SPT).",
          "Cement-stabilized silty sand sub-bases, asphalt surfacing and water networks.",
        ],
      },
    ],
  },
  research: {
    title: "Research & awards",
    text: "Published work on sustainable ground materials, awarded in Japan and supported by JICA.",
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
        venue: "9th International Congress on Environmental Geotechnics, Greece",
      },
      {
        year: "2021",
        title: "Fundamental study on the mechanical characteristics of sand treated by a PS ash-based improving material",
        venue: "Advances in Sustainable Construction and Resource Management (Springer), pp. 107-116",
      },
      {
        year: "Accepted",
        title: "Normal and seismic characteristics of fill sand improved with biomass waste-derived materials",
        venue: "Fills under pavements and foundations",
      },
    ],
    distinctionsTitle: "Awards & certifications",
    distinctions: [
      { year: "JICA", title: "Certificate of excellence", issuer: "Japan International Cooperation Agency" },
      { year: "2020", title: "Best presentation award", issuer: "CREST 2020" },
      { year: "2019", title: "Participation in TICAD 7", issuer: "Ministry of Foreign Affairs of Japan" },
      { year: "2018", title: "JICA-DSP programme & ABE Initiative", issuer: "JICA" },
    ],
    membershipsTitle: "Member of",
    memberships: ["JGS — Japanese Geotechnical Society", "JSCE — Japan Society of Civil Engineers", "ONIT — National Order of Engineers of Togo"],
    readLabel: "Read the paper",
  },
  education: {
    title: "Education & skills",
    text: "A dual academic grounding, between Japan and the 2iE Institute in Ouagadougou.",
    degrees: [
      { year: "2023", title: "PhD in Engineering — geotechnics and geo-environment", school: "Yokohama National University, Japan" },
      { year: "2020", title: "Master of Engineering — geotechnics and urban innovation", school: "Yokohama National University, Japan" },
      { year: "2018", title: "Master's degree in road and infrastructure design", school: "2iE International Institute, Burkina Faso" },
      { year: "2015", title: "Bachelor of Civil Engineering", school: "2iE International Institute, Burkina Faso" },
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "French", level: "Fluent", value: 100 },
      { name: "English", level: "Professional", value: 90 },
      { name: "Japanese", level: "B2", value: 65 },
      { name: "Moba, Hausa, Ewe", level: "Conversational", value: 55 },
    ],
    softwareTitle: "Software",
    software: ["PLAXIS", "GeoStudio", "AutoCAD Civil 3D", "QGIS", "Alizé", "RDM6", "Origin", "Fusion 360", "MS Project", "OpenProject", "Microsoft Office"],
  },
  contact: {
    title: "Have an infrastructure project in mind?",
    text: "Geotechnical study, foundations, roads, dams or a research collaboration: write to me, I reply quickly.",
    formTitle: "Send a message",
    formText: "Tell me about your project in a few lines.",
    name: "Full name",
    namePlaceholder: "Your name",
    email: "Email address",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    subjects: ["Geotechnical expertise", "Roads & pavements", "Dams & hydraulics", "Research & collaboration", "Other request"],
    message: "Message",
    messagePlaceholder: "Describe your needs…",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you! Your message has been sent.",
    error: "Sending failed. Please try again or email me directly.",
    location: "Based in Abidjan, available across West Africa and internationally",
  },
  footer: {
    title: "Building on solid ground.",
    text: "Available for expert assignments, consulting and research collaborations. Feel free to reach out anytime.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
  notFound: {
    title: "Page not found",
    text: "This page does not exist or has been moved.",
    back: "Back to home",
  },
};
