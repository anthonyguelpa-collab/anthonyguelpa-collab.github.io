/**
 * Dates de réalisation des situations et des réalisations professionnelles.
 *
 * Une période est saisie au format ISO court (AAAA-MM) ou complet
 * (AAAA-MM-JJ), avec une fin facultative lorsque la mission s'est étalée.
 * L'affichage en français est dérivé, jamais saisi à la main : une seule
 * écriture de la date, un seul endroit à corriger.
 *
 * Le champ `source` trace d'où vient la date :
 *   · "document"    — relevée dans le document d'origine ;
 *   · "a-confirmer" — estimation d'après l'enchaînement des missions,
 *                     à confirmer. Le contrôle de validation les liste.
 */

export interface Periode {
  /** Début, au format AAAA-MM ou AAAA-MM-JJ. */
  debut: string;
  /** Fin, si la mission s'est déroulée sur plusieurs semaines ou mois. */
  fin?: string;
  source: "document" | "a-confirmer";
}

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function decouper(iso: string): { annee: number; mois: number; jour?: number } {
  const [a, m, j] = iso.split("-");
  return {
    annee: Number(a),
    mois: Number(m),
    jour: j ? Number(j) : undefined,
  };
}

function capitaliser(mot: string): string {
  return mot.charAt(0).toUpperCase() + mot.slice(1);
}

/** « Mars 2026 », « 12 mars 2026 ». */
function formaterDate(iso: string, avecMajuscule = true): string {
  const { annee, mois, jour } = decouper(iso);
  const nomMois = MOIS[mois - 1] ?? "";
  if (jour) return `${jour} ${nomMois} ${annee}`;
  return `${avecMajuscule ? capitaliser(nomMois) : nomMois} ${annee}`;
}

/**
 * « Mars 2026 » pour une date unique,
 * « Mars – avril 2026 » si l'année est la même,
 * « Décembre 2025 – janvier 2026 » sinon.
 */
export function formaterPeriode(periode: Periode): string {
  if (!periode.fin) return formaterDate(periode.debut);

  const d = decouper(periode.debut);
  const f = decouper(periode.fin);

  if (d.annee === f.annee && d.mois === f.mois) {
    return formaterDate(periode.debut);
  }

  if (d.annee === f.annee) {
    const debutSansAnnee = d.jour
      ? `${d.jour} ${MOIS[d.mois - 1]}`
      : capitaliser(MOIS[d.mois - 1]);
    return `${debutSansAnnee} – ${formaterDate(periode.fin, false)}`;
  }

  return `${formaterDate(periode.debut)} – ${formaterDate(periode.fin, false)}`;
}

/** Forme courte pour les cartes : « 03/2026 » ou « 03 – 04/2026 ». */
export function formaterPeriodeCourte(periode: Periode): string {
  const d = decouper(periode.debut);
  const pad = (n: number) => String(n).padStart(2, "0");

  if (!periode.fin) return `${pad(d.mois)}/${d.annee}`;

  const f = decouper(periode.fin);
  if (d.annee === f.annee && d.mois === f.mois) return `${pad(d.mois)}/${d.annee}`;
  if (d.annee === f.annee) return `${pad(d.mois)} – ${pad(f.mois)}/${d.annee}`;
  return `${pad(d.mois)}/${d.annee} – ${pad(f.mois)}/${f.annee}`;
}

/** Valeur de l'attribut `dateTime`, pour que la date soit lisible par une machine. */
export function isoPeriode(periode: Periode): string {
  return periode.debut;
}

/** Clé de tri — la plus récente d'abord. */
export function cleTri(periode: Periode): number {
  const { annee, mois, jour } = decouper(periode.debut);
  return annee * 10000 + mois * 100 + (jour ?? 0);
}

/** Trie du plus récent au plus ancien, sans modifier le tableau d'origine. */
export function parDateDecroissante<T extends { periode: Periode }>(
  elements: readonly T[],
): T[] {
  return [...elements].sort((a, b) => cleTri(b.periode) - cleTri(a.periode));
}
