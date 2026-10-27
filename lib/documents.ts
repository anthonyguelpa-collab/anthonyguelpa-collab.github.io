/**
 * Documentations PDF téléchargeables des situations professionnelles.
 *
 * Convention : le document d'une situation vit à
 * `public/documents/situations/<slug>.pdf`.
 *
 * Le bouton de téléchargement est généré à partir de la présence réelle du
 * fichier, vérifiée au build. Déposer un PDF suffit à faire apparaître le
 * bouton ; aucun composant n'est à modifier. Un document absent ne produit
 * jamais de bouton menant vers un fichier inexistant.
 */

import fs from "node:fs";
import path from "node:path";

import type { Situation } from "@/data/situations";
import type { Realisation } from "@/data/realisations";

const DOSSIER_SITUATIONS = "/documents/situations";
const DOSSIER_REALISATIONS = "/documents/realisations";

export interface Documentation {
  /** Chemin public du fichier, à passer à `ressource()` avant affichage. */
  chemin: string;
  /** Nom de fichier proposé au téléchargement. */
  nom: string;
  /** Nombre de pages, pour informer avant le téléchargement. */
  pages?: number;
  /** Taille en octets. */
  taille: number;
}

/** Taille lisible : 1,4 Mo plutôt que 1468006. */
export function formaterTaille(octets: number): string {
  if (octets >= 1024 * 1024) {
    return `${(octets / 1024 / 1024).toFixed(1).replace(".", ",")} Mo`;
  }
  return `${Math.round(octets / 1024)} Ko`;
}

/**
 * Documentation d'une situation, ou null si aucun fichier n'est présent.
 * La vérification porte sur le disque : pas de lien mort possible.
 */
function documentationSi(chemin: string): Documentation | null {
  const absolu = path.join(process.cwd(), "public", chemin.replace(/^\//, ""));
  if (!fs.existsSync(absolu)) return null;

  const infos = fs.statSync(absolu);
  if (!infos.isFile() || infos.size === 0) return null;

  return { chemin, nom: path.basename(chemin), taille: infos.size };
}

export function documentationDeSituation(
  situation: Situation,
): Documentation | null {
  return documentationSi(
    situation.documentation ?? `${DOSSIER_SITUATIONS}/${situation.slug}.pdf`,
  );
}

/** Même convention pour les réalisations de laboratoire. */
export function documentationDeRealisation(
  realisation: Realisation,
): Documentation | null {
  return documentationSi(
    realisation.documentation ?? `${DOSSIER_REALISATIONS}/${realisation.slug}.pdf`,
  );
}

/** Situations disposant d'une documentation — utilisé par les contrôles. */
export function situationsAvecDocumentation(
  situations: Situation[],
): Situation[] {
  return situations.filter((s) => documentationDeSituation(s) !== null);
}
