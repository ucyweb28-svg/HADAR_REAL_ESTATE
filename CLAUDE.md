Projet : Hadar Real Estate — cabinet privé de conseil en acquisition immobilière en Israël
Repo : github.com/ucyweb28-svg/HADAR_REAL_ESTATE (premier push fait)
Déploiement : Vercel — hadar-real-estate.vercel.app (connecté, déploiement auto sur push main)

Stack : Next.js 14 App Router, TypeScript strict, Tailwind CSS v3.4,
Framer Motion, next-intl (FR/EN/HE avec RTL natif dès la V1)

Positionnement :
Cabinet privé de conseil stratégique en acquisition immobilière — PAS une agence
immobilière classique. Accompagnement complet : sourcing, analyse, négociation,
suivi. Clientèle : acheteurs étrangers FR/US/UK/CA, familles, investisseurs
privés, family offices. Fondateur basé à Jérusalem, opère sur le terrain avec
promoteurs, avocats, banques, architectes.

Activités :
1. Achats groupés ("group purchase") : Hadar constitue des groupes de 5-10
   acheteurs sur un même projet, négocie SEUL avec le promoteur. Les acheteurs
   n'interagissent jamais entre eux et ne négocient jamais directement.
2. Transactions individuelles classiques : sourcing, présentation, négociation
   de biens (résidentiel, location, investissement).

Expertises à faire ressortir :
- Sourcing de projets neufs / off-market avant commercialisation large
- Analyse prix, quartiers, potentiel de valorisation, conditions de paiement
- Négociation avec promoteurs
- Accompagnement investisseurs étrangers
- Suivi étapes locales : offre d'achat, contrat, mifrat technique, avocats,
  garanties bancaires, échéancier de paiement
- Coordination client / promoteur / avocat / intervenants
- Vision stratégique du marché immobilier israélien

Zones : Jérusalem, Tel Aviv, Bat Yam, autres villes israéliennes

Ton : professionnel, premium, rassurant, humain. Éviter le style "agence
immo" ou trop commercial. Inspirer confiance, discrétion, expertise terrain.

Palette :
- #031927 (ink black, fond sombre principal)
- #04314E (deep space blue, secondaire / sections)
- #3D001C (crimson violet, accent profond)
- #FC7A1E (autumn ember, accent chaud / CTA)
- #F2E9DC (linen, fond clair / texte sur fond sombre)

Règles de contraste :
- Texte sur fond ink, blue ou crimson : toujours linen
- Texte sur fond linen : toujours ink, jamais ember
- ember : uniquement en fond de bouton/icône/badge avec texte ink dessus,
  jamais en fond de texte long, jamais de texte ember sur fond linen

Fonts :
- FR/EN : Trap (headings) + Montserrat (body)
- HE : Rubik (headings + body), chargée uniquement sur la locale /he
  (Trap et Montserrat n'ont aucun glyphe hébreu)

Règles :
- Ne jamais hardcoder les API keys
- Toujours npx tsc --noEmit avant de commit
- Commits en anglais, format "feat/fix/chore: description"
- Lire CLAUDE.md au début de chaque session Claude Code
- Layout avec dir="rtl" dynamique selon la locale HE, classes logiques
  Tailwind (ms-/me- plutôt que ml-/mr-)
- Chargement de police conditionnel par locale via next/font

Communication : français
Mode de travail : Claude.ai (stratégie) → Claude Code (exécution)

État actuel :
- Scaffold fonctionnel, i18n fr/en/he OK
- Repo GitHub pushé, Vercel connecté et déployé (hadar-real-estate.vercel.app)
- /fr vérifié en ligne, /en et /he à vérifier en ligne
- Palette et fonts définitives intégrées dans le code (tailwind.config,
  chargement conditionnel par locale via app/fonts/latin.ts et
  app/fonts/hebrew.ts)
- Hero fonctionnel : 4 slides en WebP, nav traduite via next-intl, classes
  logiques RTL (start-/end-)