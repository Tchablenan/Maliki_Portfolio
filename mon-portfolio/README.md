# Portfolio — Dr Maliki Djandjieme

Site personnel du Dr Maliki Otieboame Djandjieme, ingénieur géotechnicien (PhD, Université Nationale de Yokohama) et consultant JICA en infrastructures.

Design inspiré du template premium **Bran Star** (typographie Marcellus + DM Sans, accent cyan `#00C2FF`, mode clair/sombre), reconstruit en **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr, /en ou /ja
npm run build      # build de production
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Langues

Le site existe en **français** (`/fr`, langue par défaut), **anglais** (`/en`) et **japonais** (`/ja`).
`src/proxy.ts` redirige `/` vers la langue du navigateur.

## Modifier le contenu

Tout le texte est dans des fichiers typés : TypeScript signale une erreur si une langue oublie un champ.

| Quoi | Où |
|---|---|
| Textes (FR / EN / JA) | `src/i18n/dictionaries/fr.ts`, `en.ts`, `ja.ts` |
| Structure des textes | `src/i18n/types.ts` |
| E-mails, téléphone, réseaux sociaux, images des projets | `src/data/profile.ts` |
| Photos et illustrations | `src/assets/images/` |
| CV téléchargeable | `public/cv/CV-Maliki-Djandjieme.pdf` |
| Décors du template (pixels, formes, icônes) | `public/decor/` |

Pour ajouter un projet : ajoutez son identifiant dans `ProjectId` et son image dans `projectVisuals` (`src/data/profile.ts`), puis son texte dans les trois dictionnaires.

## Structure

```
src/
├── app/
│   ├── [lang]/layout.tsx   # <html>, polices, métadonnées SEO par langue
│   ├── [lang]/page.tsx     # assemble les sections
│   ├── globals.css         # jetons de design, mode sombre, animations
│   ├── sitemap.ts · robots.ts · icon.svg
├── components/
│   ├── Header.tsx          # logo, langues, thème, menu plein écran
│   ├── ContactForm.tsx     # formulaire (Formspree)
│   └── sections/           # Hero, About, Services, Projects, Experience, Research, Education, Contact, Footer…
├── data/profile.ts
├── i18n/
└── proxy.ts                # redirection vers la bonne langue
```

## Déploiement (Vercel)

Dans les réglages du projet Vercel : **Root Directory** = `mon-portfolio`.
Le fichier `vercel.json` force le framework Next.js, même si le projet Vercel est encore réglé sur « Vite ».
