/**
 * Suivi documentaire des compétences.
 *
 * Les statuts sont CALCULÉS à partir des preuves réellement présentes dans
 * le portfolio — jamais saisis à la main. Ajouter une situation, une
 * réalisation ou un exemple de veille et le relier à une compétence met le
 * tableau à jour tout seul.
 *
 * ─────────────────────────────────────────────────────────────────────
 * CE QUE CES STATUTS SIGNIFIENT — ET CE QU'ILS NE SIGNIFIENT PAS
 *
 * Ils décrivent l'état de MA DOCUMENTATION, pas un niveau de maîtrise et
 * encore moins une validation par un jury. « Documentée » signifie que le
 * portfolio apporte des preuves suffisantes pour en discuter, rien de plus.
 * ─────────────────────────────────────────────────────────────────────
 */

import { competences, type Competence, type Bloc } from "@/data/competences";
import {
  situationsDeCompetence,
  realisationsDeCompetence,
  veilleDeCompetence,
} from "@/lib/relations";

export type Statut = "documentee" | "en-cours" | "non-documentee";

export const STATUTS: Record<
  Statut,
  { libelle: string; description: string }
> = {
  documentee: {
    libelle: "Documentée",
    description:
      "Plusieurs preuves présentes, dont au moins une illustrée de bout en bout.",
  },
  "en-cours": {
    libelle: "Partiellement documentée",
    description:
      "Des réalisations existent, mais les preuves réunies ne couvrent qu'une partie des critères de la grille.",
  },
  "non-documentee": {
    libelle: "Non documentée",
    description: "Aucune preuve disponible dans le portfolio à ce jour.",
  },
};

export interface LigneSuivi {
  competence: Competence;
  bloc: Bloc;
  statut: Statut;
  /** Nombre de situations professionnelles liées. */
  situations: number;
  /** Nombre de réalisations de laboratoire liées. */
  realisations: number;
  /** Nombre d'exemples de veille liés. */
  veille: number;
  /** Total des preuves, tous types confondus. */
  preuves: number;
  /** Preuves illustrées de bout en bout. */
  preuvesCompletes: number;
  /** Lien vers la page détaillée de la compétence. */
  href: string;
}

/**
 * Règle de décision, volontairement simple et vérifiable :
 *
 *   · aucune preuve                                    → non documentée
 *   · au moins 2 preuves dont 1 illustrée complètement → documentée
 *   · tout le reste                                    → en cours
 */
function determinerStatut(preuves: number, completes: number): Statut {
  if (preuves === 0) return "non-documentee";
  if (preuves >= 2 && completes >= 1) return "documentee";
  return "en-cours";
}

export function ligneSuivi(competence: Competence): LigneSuivi {
  const sits = situationsDeCompetence(competence.id);
  const reals = realisationsDeCompetence(competence.id);
  const veilles = veilleDeCompetence(competence.id);

  const completes = [...sits, ...reals, ...veilles].filter(
    (p) => p.preuves === "completes",
  ).length;

  const preuves = sits.length + reals.length + veilles.length;

  return {
    competence,
    bloc: competence.bloc,
    statut: determinerStatut(preuves, completes),
    situations: sits.length,
    realisations: reals.length,
    veille: veilles.length,
    preuves,
    preuvesCompletes: completes,
    href: `/competences/${competence.bloc}/${competence.slug}`,
  };
}

export function tableauSuivi(): LigneSuivi[] {
  return competences.map(ligneSuivi);
}

export interface SyntheseSuivi {
  total: number;
  documentees: number;
  enCours: number;
  nonDocumentees: number;
  /** Part des domaines documentés, en pourcentage entier. */
  progression: number;
  /** Nombre total de preuves recensées, tous types confondus. */
  preuvesTotales: number;
}

export function syntheseSuivi(lignes: LigneSuivi[] = tableauSuivi()): SyntheseSuivi {
  const documentees = lignes.filter((l) => l.statut === "documentee").length;
  const enCours = lignes.filter((l) => l.statut === "en-cours").length;
  const nonDocumentees = lignes.filter(
    (l) => l.statut === "non-documentee",
  ).length;

  return {
    total: lignes.length,
    documentees,
    enCours,
    nonDocumentees,
    progression: lignes.length
      ? Math.round((documentees / lignes.length) * 100)
      : 0,
    preuvesTotales: lignes.reduce((n, l) => n + l.preuves, 0),
  };
}
