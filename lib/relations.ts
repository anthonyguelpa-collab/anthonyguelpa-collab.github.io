/**
 * Moteur de navigation bidirectionnelle.
 *
 * Les liens « compétence → situations » et « situation → compétences » sont
 * tous dérivés du seul tableau `situations`. Ajouter une compétence à une
 * situation suffit : les deux sens du lien apparaissent automatiquement,
 * et il est impossible de créer un lien orphelin.
 */

import { competences, type Competence, type Bloc } from "@/data/competences";
import { situations, type Situation } from "@/data/situations";
import { exemples, type ExempleVeille } from "@/data/veille";

/** Compétences validées par une situation, dans l'ordre du référentiel. */
export function competencesDeSituation(situation: Situation): Competence[] {
  return competences.filter((c) => situation.competences.includes(c.id));
}

/** Situations qui valident une compétence donnée. */
export function situationsDeCompetence(competenceId: string): Situation[] {
  return situations.filter((s) => s.competences.includes(competenceId));
}

/** Compétences d'une situation, restreintes à un bloc. */
export function competencesDeSituationParBloc(
  situation: Situation,
  bloc: Bloc,
): Competence[] {
  return competencesDeSituation(situation).filter((c) => c.bloc === bloc);
}

/** Exemples de veille qui étayent une compétence. */
export function veilleDeCompetence(competenceId: string): ExempleVeille[] {
  return exemples.filter((e) => e.competences.includes(competenceId));
}

/**
 * Nombre total de preuves par compétence — situations et exemples de veille.
 * La règle de cohérence UFIP admet les deux types de preuve.
 */
export function compteurParCompetence(): Record<string, number> {
  const compteur: Record<string, number> = {};
  for (const competence of competences) {
    compteur[competence.id] =
      situationsDeCompetence(competence.id).length +
      veilleDeCompetence(competence.id).length;
  }
  return compteur;
}

/**
 * Contrôle d'intégrité exécuté au build.
 * Deux règles UFIP y sont vérifiées :
 *   · toute compétence affichée doit être étayée par au moins une situation ;
 *   · toute situation doit référencer des compétences qui existent.
 */
export function verifierCoherence(): {
  valide: boolean;
  competencesOrphelines: string[];
  referencesInvalides: { situation: string; competence: string }[];
} {
  const idsConnus = new Set(competences.map((c) => c.id));

  const competencesOrphelines = competences
    .filter(
      (c) =>
        situationsDeCompetence(c.id).length === 0 &&
        veilleDeCompetence(c.id).length === 0,
    )
    .map((c) => c.titre);

  const referencesInvalides: { situation: string; competence: string }[] = [];
  for (const situation of situations) {
    for (const id of situation.competences) {
      if (!idsConnus.has(id)) {
        referencesInvalides.push({ situation: situation.slug, competence: id });
      }
    }
  }
  for (const exemple of exemples) {
    for (const id of exemple.competences) {
      if (!idsConnus.has(id)) {
        referencesInvalides.push({ situation: exemple.slug, competence: id });
      }
    }
  }

  return {
    valide: competencesOrphelines.length === 0 && referencesInvalides.length === 0,
    competencesOrphelines,
    referencesInvalides,
  };
}
