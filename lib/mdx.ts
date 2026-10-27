/**
 * Chargement et compilation des documentations MDX.
 *
 * Les fichiers vivent dans content/situations/ et content/veille/.
 * Ils sont compilés au build : le site reste entièrement statique.
 */

import fs from "node:fs";
import path from "node:path";

const RACINE_CONTENU = path.join(process.cwd(), "content");

export type Collection = "situations" | "realisations" | "veille";

/** Lit le corps MDX d'un document. Retourne null si le fichier n'existe pas. */
export function lireContenu(
  collection: Collection,
  slug: string,
): string | null {
  const chemin = path.join(RACINE_CONTENU, collection, `${slug}.mdx`);
  if (!fs.existsSync(chemin)) return null;
  return fs.readFileSync(chemin, "utf8");
}

/** Liste les slugs disponibles dans une collection. */
export function listerSlugs(collection: Collection): string[] {
  const dossier = path.join(RACINE_CONTENU, collection);
  if (!fs.existsSync(dossier)) return [];
  return fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
