import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CameraOff,
  Download,
  FileText,
  Radar,
} from "lucide-react";
import type { Competence } from "@/data/competences";
import type { Situation } from "@/data/situations";
import { Badge, BlocTag, TechBadges } from "@/components/ui";
import { formaterPeriode, isoPeriode } from "@/lib/dates";

/* ------------------------------------------------------- CompetenceCard */

export function CompetenceCard({
  competence,
  nbSituations,
}: {
  competence: Competence;
  nbSituations: number;
}) {
  return (
    <Link
      href={`/competences/${competence.bloc}/${competence.slug}`}
      data-bloc={competence.bloc}
      className="surface rule-top group flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
    >
      <div className="flex items-start justify-between gap-3">
        <BlocTag bloc={competence.bloc} />
        <Badge variante={nbSituations > 0 ? "accent" : "alerte"}>
          {nbSituations} situation{nbSituations > 1 ? "s" : ""}
        </Badge>
      </div>

      <h3 className="text-balance text-base font-semibold leading-snug text-ink-100">
        {competence.titre}
      </h3>

      <p className="line-clamp-3 text-sm leading-relaxed text-ink-400">
        {competence.description}
      </p>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 font-mono text-[0.72rem] font-medium text-[var(--bloc-accent)]">
        Voir la compétence
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* --------------------------------------------------------- SituationCard */

export function SituationCard({ situation }: { situation: Situation }) {
  const preuveLabel = {
    completes: { texte: "Preuves complètes", icone: Camera, variante: "positif" as const },
    partielles: { texte: "Preuves partielles", icone: Camera, variante: "neutre" as const },
    absentes: { texte: "Captures à fournir", icone: CameraOff, variante: "alerte" as const },
  }[situation.preuves];
  const IconePreuve = preuveLabel.icone;

  return (
    <Link
      href={`/situations/${situation.slug}`}
      data-bloc={situation.blocPrincipal}
      className="surface rule-top group flex flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.72rem] font-bold tracking-wider text-[var(--bloc-accent)]">
          {situation.reference}
        </span>
        <span aria-hidden className="text-night-500">
          ·
        </span>
        <time
          dateTime={isoPeriode(situation.periode)}
          className="font-mono text-[0.7rem] text-ink-400"
        >
          {formaterPeriode(situation.periode)}
        </time>
      </div>

      <div>
        <h3 className="text-balance text-base font-semibold leading-snug text-ink-100">
          {situation.titre}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-400">
          {situation.resume}
        </p>
      </div>

      <TechBadges items={situation.technologies.slice(0, 5)} />

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-night-700/60 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-ink-400">
          <IconePreuve className="size-3.5" aria-hidden />
          {preuveLabel.texte}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium text-[var(--bloc-accent)]">
          Lire
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* --------------------------------------------- LinkedCompetences (SP → C) */

export function LinkedCompetences({
  competences,
  titre = "Compétences validées par cette situation",
}: {
  competences: Competence[];
  titre?: string;
}) {
  if (competences.length === 0) return null;

  return (
    <section
      aria-labelledby="competences-liees"
      className="surface overflow-hidden"
    >
      <h2
        id="competences-liees"
        className="border-b border-night-700/60 px-5 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-300"
      >
        {titre}
      </h2>
      <ul className="divide-y divide-night-700/50">
        {competences.map((c) => (
          <li key={c.id} data-bloc={c.bloc}>
            <Link
              href={`/competences/${c.bloc}/${c.slug}`}
              className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-night-800/50"
            >
              <BlocTag bloc={c.bloc} />
              <span className="flex-1 text-sm text-ink-200 group-hover:text-ink-100">
                {c.titre}
              </span>
              <ArrowRight className="size-4 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--bloc-accent)]" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ----------------------------------------------- LinkedSituations (C → SP) */

export function LinkedSituations({
  situations,
  titre = "Situations professionnelles qui valident cette compétence",
}: {
  situations: Situation[];
  titre?: string;
}) {
  if (situations.length === 0) {
    return (
      <section className="surface border-l-[3px] border-l-rose-500 px-5 py-4">
        <p className="text-sm text-ink-300">
          Aucune situation professionnelle ne documente encore cette
          compétence. Conformément à la règle de cohérence, elle ne devrait pas
          être affichée tant qu&apos;elle n&apos;est pas étayée.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="situations-liees" className="surface overflow-hidden">
      <h2
        id="situations-liees"
        className="border-b border-night-700/60 px-5 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-300"
      >
        {titre}
      </h2>
      <ul className="divide-y divide-night-700/50">
        {situations.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/situations/${s.slug}`}
              className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-night-800/50"
            >
              <span className="mt-0.5 shrink-0 font-mono text-[0.72rem] font-bold text-[var(--bloc-accent)]">
                {s.reference}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-ink-200 group-hover:text-ink-100">
                  {s.titre}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-ink-400">
                  {s.resume}
                </span>
              </span>
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--bloc-accent)]" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------- Livrables */

export function Livrables({ items }: { items: readonly string[] }) {
  return (
    <section aria-labelledby="livrables" className="surface overflow-hidden">
      <h2
        id="livrables"
        className="border-b border-night-700/60 px-5 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-300"
      >
        Livrables produits
      </h2>
      <ul className="divide-y divide-night-700/50">
        {items.map((l) => (
          <li key={l} className="flex items-start gap-3 px-5 py-3">
            <FileText
              className="mt-0.5 size-4 shrink-0 text-[var(--bloc-accent)]"
              aria-hidden
            />
            <span className="text-sm text-ink-300">{l}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------- LinkedVeille (C → veille) */

export function LinkedVeille({
  exemples,
}: {
  exemples: { slug: string; titre: string; resume: string; date: string }[];
}) {
  if (exemples.length === 0) return null;

  return (
    <section aria-labelledby="veille-liee" className="surface overflow-hidden">
      <h2
        id="veille-liee"
        className="border-b border-night-700/60 px-5 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-300"
      >
        Exemples de veille qui étayent cette compétence
      </h2>
      <ul className="divide-y divide-night-700/50">
        {exemples.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/veille/${e.slug}`}
              className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-night-800/50"
            >
              <Radar
                className="mt-0.5 size-4 shrink-0 text-[var(--bloc-accent)]"
                aria-hidden
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-ink-200 group-hover:text-ink-100">
                  {e.titre}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-ink-400">
                  {e.resume}
                </span>
              </span>
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--bloc-accent)]" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------- TelechargerDocumentation */

/**
 * Bouton de téléchargement de la documentation PDF d'une situation.
 * N'est rendu que si le fichier existe réellement (voir lib/documents.ts) :
 * aucun lien mort ne peut être produit.
 */
export function TelechargerDocumentation({
  chemin,
  nom,
  taille,
}: {
  chemin: string;
  nom: string;
  taille: string;
}) {
  return (
    <section
      aria-labelledby="documentation-pdf"
      className="surface rule-top not-prose mt-12 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h2
          id="documentation-pdf"
          className="text-base font-semibold text-ink-100"
        >
          Documentation technique complète
        </h2>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-400">
          Le dossier d&apos;origine produit pour l&apos;entreprise, en version
          caviardée pour publication : noms d&apos;hôtes, adressage, prestataire
          et adresses de sites remplacés par des équivalents génériques.
        </p>
        <p className="mt-2 font-mono text-[0.7rem] text-ink-400">
          PDF · {taille}
        </p>
      </div>

      <a
        href={chemin}
        download={nom}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--bloc-accent)] px-4 py-2.5 text-sm font-semibold text-night-950 transition-all duration-150 hover:brightness-110"
      >
        <Download className="size-4" aria-hidden />
        Télécharger la documentation PDF
      </a>
    </section>
  );
}

/* ------------------------------------------------------ RealisationCard */

/**
 * Carte d'une réalisation de laboratoire. Même traitement visuel que les
 * situations professionnelles : les deux rubriques se lisent de la même
 * façon, seule leur origine diffère.
 */
export function RealisationCard({
  realisation,
}: {
  realisation: import("@/data/realisations").Realisation;
}) {
  return (
    <Link
      href={`/realisations/${realisation.slug}`}
      data-bloc={realisation.blocPrincipal}
      className="surface rule-top group flex flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.72rem] font-bold tracking-wider text-[var(--bloc-accent)]">
          {realisation.reference}
        </span>
        <span aria-hidden className="text-night-500">
          ·
        </span>
        <time
          dateTime={isoPeriode(realisation.periode)}
          className="font-mono text-[0.7rem] text-ink-400"
        >
          {formaterPeriode(realisation.periode)}
        </time>
      </div>

      <div>
        <h3 className="text-balance text-base font-semibold leading-snug text-ink-100">
          {realisation.titre}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-400">
          {realisation.resume}
        </p>
      </div>

      <TechBadges items={realisation.technologies.slice(0, 5)} />

      <span className="mt-auto inline-flex items-center gap-1.5 border-t border-night-700/60 pt-3 font-mono text-[0.72rem] font-medium text-[var(--bloc-accent)]">
        Lire
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
