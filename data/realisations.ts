/**
 * Réalisations professionnelles — épreuve E5.
 *
 * ─────────────────────────────────────────────────────────────────────
 * DISTINCTION À NE PAS CONFONDRE
 *
 *  · Situations professionnelles (data/situations.ts)
 *    Les missions réellement menées EN ENTREPRISE pendant l'alternance.
 *    Elles restent dans leur rubrique et ne doivent pas être déplacées ici.
 *
 *  · Réalisations professionnelles (ce fichier)
 *    Les projets techniques menés EN LABORATOIRE dans le cadre du BTS.
 *    Rubrique volontairement vide pour l'instant : elle sera complétée
 *    au fil de l'année.
 * ─────────────────────────────────────────────────────────────────────
 *
 * POUR AJOUTER UNE RÉALISATION
 *
 *   1. Ajouter une entrée dans le tableau `realisations` ci-dessous.
 *   2. Créer `content/realisations/<slug>.mdx` avec le déroulé technique.
 *   3. Déposer les captures dans `public/captures/<dossier>/`.
 *   4. Déposer éventuellement un PDF dans
 *      `public/documents/realisations/<slug>.pdf`.
 *   5. Lancer `npm run verifier`.
 *
 * La page d'ensemble, les pages détaillées, les liens depuis les compétences
 * et le tableau de suivi de l'accueil se mettent à jour automatiquement :
 * aucun composant n'est à modifier.
 */

import type { Bloc } from "./competences";

export interface Realisation {
  slug: string;
  /** Référence courte affichée sur les cartes : RP-01, RP-02… */
  reference: string;
  titre: string;
  /** Une phrase, affichée sur la vue d'ensemble. */
  resume: string;
  /** Contexte : objectif du projet et cadre dans lequel il a été mené. */
  contexte: string;
  /** Conclusion : objectif atteint ou non, et pourquoi. */
  conclusion: string;
  periode: string;
  /** Bloc dominant — détermine l'accent couleur de la page. */
  blocPrincipal: Bloc;
  /** Identifiants des compétences validées par cette réalisation. */
  competences: string[];
  /** Badges technologiques réellement mis en œuvre. */
  technologies: string[];
  /** Livrables produits. */
  livrables: string[];
  /** État des preuves visuelles, même convention que les situations. */
  preuves: "completes" | "partielles" | "absentes";
  /** Note affichée lorsque des preuves manquent. */
  notePreuves?: string;
  /** Chemin d'un PDF au nom différent de la convention. */
  documentation?: string;
}

/**
 * Vide à dessein — voir le commentaire en tête de fichier.
 * Les projets de laboratoire viendront s'ajouter ici au cours de l'année.
 */
export const realisations: Realisation[] = [];

export function getRealisation(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug);
}

/** Réalisations validant une compétence donnée. */
export function realisationsPourCompetence(competenceId: string): Realisation[] {
  return realisations.filter((r) => r.competences.includes(competenceId));
}
