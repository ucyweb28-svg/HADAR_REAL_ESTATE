Projet : Hadar Real Estate — cabinet privé de conseil en acquisition immobilière en Israël
Repo : github.com/ucyweb28-svg/HADAR_REAL_ESTATE (créé, premier push en cours)
Déploiement : Vercel (pas encore connecté — sous-domaine auto pour l'instant, domaine custom transféré plus tard)

Stack : Next.js 14 App Router, TypeScript strict, Tailwind CSS v4,
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
- #233C58 (deep space blue, secondaire / sections)
- #5C0029 (crimson violet, accent profond)
- #BA5C12 (autumn ember, accent chaud / CTA)
- #F2E9DC (linen, fond clair / texte sur fond sombre)

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
- Scaffold Next.js 14 fonctionnel, i18n configuré, /fr /en /he testés (200)
- npx tsc --noEmit propre, aucune erreur TypeScript
- git init fait, git config identity fait
- Premier commit/push en cours vers GitHub
- Vercel non connecté
- Palette et fonts définitives validées ci-dessus — pas encore intégrées
  dans le code (tailwind.config à mettre à jour)