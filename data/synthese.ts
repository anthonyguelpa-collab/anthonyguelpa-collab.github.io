/**
 * Tableau de synthèse des réalisations professionnelles.
 *
 * Reprend la structure de l'annexe officielle « BTS SIO — Session 2025 —
 * Annexe 8-1 — Tableau de synthèse » : trois périodes en lignes, six
 * domaines de compétences en colonnes.
 *
 * ─────────────────────────────────────────────────────────────────────
 * CE QUE CE TABLEAU AFFICHE — ET CE QU'IL N'AFFICHE PAS
 *
 * Il recense les réalisations réellement documentées dans ce portfolio et
 * les domaines qu'elles mettent en œuvre. Il ne prétend pas que ces
 * compétences sont maîtrisées : il dit seulement où elles sont mises en
 * œuvre et où la preuve se trouve.
 *
 * Les rattachements sont saisis ici et volontairement plus stricts que
 * ceux de la page Compétences : une réalisation n'est portée au tableau
 * que si elle couvre réellement les activités du domaine.
 * ─────────────────────────────────────────────────────────────────────
 */

import { situations, type Situation } from "./situations";
import { exemples, type ExempleVeille } from "./veille";
import { cleTri } from "@/lib/dates";

/* ------------------------------------------------- En-tête administratif */

export const enTeteSynthese = {
  examen: "BTS Services informatiques aux organisations",
  session: "Session 2025",
  intitule: "Tableau de synthèse des réalisations professionnelles",
  reference: "Annexe 8-1",
  epreuve: "Épreuve E5 — Support et mise à disposition de services informatiques",
  champs: [
    { libelle: "Nom et prénom", valeur: "Anthony Guelpa" },
    { libelle: "N° candidat", valeur: "" },
    { libelle: "Centre de formation", valeur: "UFITECH, Nice" },
    { libelle: "Option", valeur: "SISR" },
  ],
  portfolio: "https://anthonyguelpa-collab.github.io/",
} as const;

/* ----------------------------------------------------------- Domaines */

export interface DomaineSynthese {
  id: string;
  /** Libellé repris mot pour mot de l'annexe officielle. */
  titre: string;
  /** Forme abrégée, pour les en-têtes de colonnes. */
  court: string;
  /** Activités listées sous le domaine dans l'annexe. */
  activites: string[];
}

export const domainesSynthese: DomaineSynthese[] = [
  {
    id: "patrimoine",
    titre: "Gérer le patrimoine informatique",
    court: "Patrimoine",
    activites: [
      "Recenser et identifier les ressources numériques",
      "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique",
      "Mettre en place et vérifier les niveaux d'habilitation",
    ],
  },
  {
    id: "incidents",
    titre: "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    court: "Incidents et demandes",
    activites: [
      "Collecter, suivre et orienter des demandes",
      "Traiter des demandes concernant les services réseau et système, applicatifs",
      "Traiter des demandes concernant les applications",
    ],
  },
  {
    id: "presence-en-ligne",
    titre: "Développer la présence en ligne de l'organisation",
    court: "Présence en ligne",
    activites: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques",
      "Référencer les services en ligne de l'organisation",
    ],
  },
  {
    id: "mode-projet",
    titre: "Travailler en mode projet",
    court: "Mode projet",
    activites: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      "Planifier les activités",
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
  },
  {
    id: "service",
    titre: "Mettre à disposition des utilisateurs un service informatique",
    court: "Mise à disposition",
    activites: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      "Déployer un service",
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
  },
  {
    id: "developpement-pro",
    titre: "Organiser son développement professionnel",
    court: "Développement professionnel",
    activites: [
      "Mettre en place son environnement d'apprentissage personnel",
      "Mettre en œuvre des outils et stratégies de veille informationnelle",
      "Gérer son identité professionnelle",
      "Développer son projet professionnel",
    ],
  },
];

/* ------------------------------------------- Rattachements au tableau */

/**
 * Domaines mis en œuvre par chaque situation, pour ce tableau.
 *
 * « Développer la présence en ligne » ne reçoit volontairement aucune
 * réalisation : ni le dossier RGPD ni l'étude de vidéosurveillance ne
 * couvrent suffisamment les activités du domaine pour y figurer.
 *
 * SP-12 est rattachée au patrimoine au titre d'une seule activité du
 * domaine : « vérifier les conditions de la continuité d'un service
 * informatique ». Le raccordement et la procédure de test en relèvent ;
 * la configuration du pare-feu, faite par le prestataire, non.
 */
const RATTACHEMENTS: Record<string, string[]> = {
  "cartographie-architecture-it": ["patrimoine"],
  "strategie-de-sauvegarde": ["patrimoine"],
  "plan-de-reprise-dactivite": ["patrimoine", "mode-projet"],
  "plan-de-securisation-it": ["patrimoine"],
  "formation-et-deploiement-outlook": ["incidents", "service"],
  "procedures-de-support-ebp": ["incidents", "service"],
  "depannage-synchronisation-ebp-praxedo": ["incidents", "service"],
  "automatisation-outlook-planner": ["mode-projet", "service"],
  "mise-en-conformite-rgpd": ["mode-projet"],
  "etude-videosurveillance-parking": ["mode-projet"],
  "documentation-fonctionnelle-ebp": ["incidents", "service"],
  "redondance-acces-internet": ["patrimoine"],
  "solution-de-sauvegarde-automatisee": ["patrimoine", "service"],
};

export function domainesDeSituation(slug: string): string[] {
  return RATTACHEMENTS[slug] ?? [];
}

/* ----------------------------------------------------------- Périodes */

/**
 * Bornes de la formation, à l'origine du classement par année.
 * Entrée en formation : septembre 2025. Seconde année : septembre 2026.
 * Une réalisation n'est classée que d'après sa date réelle — jamais
 * placée dans une période pour remplir une ligne.
 */
export const ENTREE_EN_FORMATION = "2025-09";
export const DEBUT_SECONDE_ANNEE = "2026-09";

export type Periodicite = "formation" | "annee-1" | "annee-2" | "anterieure";

export const PERIODES: { cle: Periodicite; titre: string; detail: string }[] = [
  {
    cle: "formation",
    titre: "Réalisation en cours de formation",
    detail: "Travaux conduits dans le cadre des enseignements",
  },
  {
    cle: "annee-1",
    titre: "Réalisations en milieu professionnel en cours de première année",
    detail: "Septembre 2025 – août 2026",
  },
  {
    cle: "annee-2",
    titre: "Réalisations en milieu professionnel en cours de seconde année",
    detail: "Depuis septembre 2026",
  },
];

/** Classement d'une date ISO courte (AAAA-MM) dans l'une des périodes. */
export function periodeDe(debut: string): Periodicite {
  if (debut < ENTREE_EN_FORMATION) return "anterieure";
  if (debut < DEBUT_SECONDE_ANNEE) return "annee-1";
  return "annee-2";
}

/* --------------------------------------------------------- Agrégation */

export interface LigneSynthese {
  cle: string;
  /** Référence courte : « SP-03 », ou « Veille » pour un exemple de veille. */
  reference: string;
  titre: string;
  href: string;
  /** Période affichée, au format court : « 03/2026 ». */
  periodeCourte: string;
  /** Vrai lorsque le mois est approché et non relevé sur un document. */
  dateEstimee: boolean;
  /**
   * Vrai lorsque la réalisation est antérieure à l'entrée en formation.
   * Elle est rattachée à la première année et signalée comme telle, plutôt
   * que supprimée ou silencieusement reclassée.
   */
  anterieure: boolean;
  domaines: string[];
  type: "situation" | "veille";
}

function courte(situation: Situation): string {
  const d = situation.periode.debut.split("-");
  const f = situation.periode.fin?.split("-");
  if (!d[1]) return d[0];
  if (!f || !f[1] || (f[0] === d[0] && f[1] === d[1])) return `${d[1]}/${d[0]}`;
  if (f[0] === d[0]) return `${d[1]} – ${f[1]}/${d[0]}`;
  return `${d[1]}/${d[0]} – ${f[1]}/${f[0]}`;
}

function ligneSituation(s: Situation): LigneSynthese {
  const p = periodeDe(s.periode.debut);
  return {
    cle: s.slug,
    reference: s.reference,
    titre: s.titre,
    href: `/situations/${s.slug}`,
    periodeCourte: courte(s),
    dateEstimee: s.periode.source === "estimee",
    anterieure: p === "anterieure",
    domaines: domainesDeSituation(s.slug),
    type: "situation",
  };
}

function ligneVeille(e: ExempleVeille): LigneSynthese {
  return {
    cle: e.slug,
    reference: "Veille",
    titre: e.titre,
    href: `/veille/${e.slug}`,
    periodeCourte: e.date,
    dateEstimee: false,
    anterieure: false,
    domaines: ["developpement-pro"],
    type: "veille",
  };
}

/**
 * Lignes du tableau, regroupées par période.
 *
 * Les réalisations antérieures à l'entrée en formation sont rattachées à
 * la première année et marquées : elles relèvent bien du milieu
 * professionnel, mais leur date doit rester visible.
 */
export function lignesParPeriode(): Record<Periodicite, LigneSynthese[]> {
  const groupes: Record<Periodicite, LigneSynthese[]> = {
    formation: [],
    "annee-1": [],
    "annee-2": [],
    anterieure: [],
  };

  for (const s of [...situations].sort((a, b) => cleTri(a.periode) - cleTri(b.periode))) {
    const ligne = ligneSituation(s);
    const cible = ligne.anterieure ? "annee-1" : periodeDe(s.periode.debut);
    groupes[cible].push(ligne);
  }

  // Les exemples de veille étayent « Organiser son développement
  // professionnel » : ils sont portés à la première année, période pendant
  // laquelle la démarche a été mise en place et documentée.
  for (const e of exemples) groupes["annee-1"].push(ligneVeille(e));

  return groupes;
}
