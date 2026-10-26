/**
 * Préfixe des ressources statiques.
 *
 * Next.js applique automatiquement `basePath` aux liens de navigation
 * (composant Link), mais PAS au `src` d'une image servie sans optimisation,
 * ni au `href` d'un fichier à télécharger. Sur un hébergement qui sert le
 * site dans un sous-répertoire — GitHub Pages pour un dépôt de projet, par
 * exemple — toutes ces ressources tomberaient en 404.
 *
 * Toute référence à un fichier de public/ passe donc par `ressource()`.
 *
 * La valeur vient de NEXT_PUBLIC_BASE_PATH, renseignée au build depuis
 * BASE_PATH (voir next.config.mjs). Vide par défaut : en développement et
 * sur un hébergement servant le site à la racine, rien ne change.
 */

export const prefixe = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Chemin d'une ressource de public/, préfixé si nécessaire. */
export function ressource(chemin: string): string {
  if (!prefixe) return chemin;
  if (/^(https?:)?\/\//.test(chemin)) return chemin; // déjà absolu
  return `${prefixe}${chemin.startsWith("/") ? "" : "/"}${chemin}`;
}
