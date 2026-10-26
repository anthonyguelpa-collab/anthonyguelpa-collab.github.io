import fs from "node:fs";
import path from "node:path";

/**
 * Vérifie au build qu'un fichier du dossier public existe réellement.
 *
 * Permet d'afficher un emplacement explicite « élément à fournir » plutôt
 * qu'une image cassée, lorsqu'une photo ou un logo n'a pas encore été
 * déposé dans le projet.
 */
export function fichierPublicExiste(cheminPublic: string): boolean {
  const relatif = cheminPublic.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", relatif));
}
