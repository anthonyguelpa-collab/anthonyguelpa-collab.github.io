# Gabarit de la page détaillée d'une réalisation

Ce dossier commence par un tiret bas : Next.js le considère comme un dossier
privé et ne crée donc aucune route à partir de lui. Le fichier `page.tsx`
qu'il contient est prêt à l'emploi et déjà complet.

## Pourquoi il n'est pas actif

L'export statique de Next.js refuse une route dynamique qui ne génèrerait
aucune page. Tant que `data/realisations.ts` est vide, la route
`/realisations/[slug]` ferait donc échouer le déploiement.

## Comment l'activer — au premier projet ajouté

1. Ajouter la première réalisation dans `data/realisations.ts`.
2. Renommer ce dossier `_modele-page-detail` en `[slug]`.
3. Lancer `npm run verifier`, puis `npm run build:statique`.

À partir de là, chaque nouvelle réalisation ne demande plus que son entrée
dans `data/realisations.ts` et son fichier `content/realisations/<slug>.mdx`.
