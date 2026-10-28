import Link from "next/link";
import { ArrowRight, Check, FolderOpen } from "lucide-react";

import type { Competence } from "@/data/competences";
import type { Situation } from "@/data/situations";
import type { ExempleVeille } from "@/data/veille";
import { Badge, BlocTag } from "@/components/ui";

/**
 * Présentation développée d'un domaine de compétences.
 *
 * L'objectif est qu'un examinateur comprenne, sans quitter la page, le lien
 * entre un libellé du référentiel et une expérience réelle : ce que la
 * compétence recouvre, ce que j'ai fait, où c'est documenté, avec quels
 * outils. Les critères et indicateurs de la grille restent sur la page
 * détaillée de chaque compétence.
 */
export function DomaineCompetence({
  competence,
  situations,
  veille,
}: {
  competence: Competence;
  situations: Situation[];
  veille: ExempleVeille[];
}) {
  // Technologies réellement mises en œuvre dans les situations rattachées.
  const technologies = Array.from(
    new Set(situations.flatMap((s) => s.technologies)),
  ).slice(0, 10);

  const href = `/competences/${competence.bloc}/${competence.slug}`;

  return (
    <article
      id={competence.slug}
      data-bloc={competence.bloc}
      className="surface rule-top scroll-mt-24 p-6 sm:p-7"
    >
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <BlocTag bloc={competence.bloc} />
          {veille.length > 0 && (
            <Badge>
              {veille.length} exemple{veille.length > 1 ? "s" : ""} de veille
            </Badge>
          )}
        </div>

        <h3 className="mt-3 text-balance text-xl font-semibold leading-snug tracking-tight text-ink-100">
          {competence.titre}
        </h3>

        <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-ink-300">
          {competence.description}
        </p>
      </header>

      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        {/* ------------------------------------------- Ce que j'ai réalisé */}
        <div>
          <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Ce que j&apos;ai réalisé
          </h4>
          <ul className="mt-3 space-y-2.5">
            {competence.realise.map((r) => (
              <li
                key={r}
                className="flex gap-2.5 text-sm leading-relaxed text-ink-300"
              >
                <Check
                  className="mt-[0.2rem] size-3.5 shrink-0 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                {r}
              </li>
            ))}
          </ul>

          {technologies.length > 0 && (
            <>
              <h4 className="mt-6 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Technologies et méthodes
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {technologies.map((t) => (
                  <li key={t}>
                    <Badge>{t}</Badge>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* ------------------------------------------- Preuves rattachées */}
        <div>
          <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Où c&apos;est documenté
          </h4>

          <ul className="mt-3 space-y-2">
            {situations.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/situations/${s.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-night-700/60 bg-night-850/40 px-4 py-2.5 transition-colors hover:border-[color-mix(in_oklab,var(--bloc-accent)_45%,transparent)]"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-[0.7rem] font-bold text-[var(--bloc-accent)]">
                    {s.reference}
                  </span>
                  <span className="flex-1 text-sm leading-snug text-ink-300 group-hover:text-ink-100">
                    {s.titre}
                  </span>
                  <ArrowRight
                    className="mt-0.5 size-3.5 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--bloc-accent)]"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}

            {veille.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/veille/${e.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-night-700/60 bg-night-850/40 px-4 py-2.5 transition-colors hover:border-[color-mix(in_oklab,var(--bloc-accent)_45%,transparent)]"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-[0.66rem] font-bold uppercase text-ink-400">
                    Veille
                  </span>
                  <span className="flex-1 text-sm leading-snug text-ink-300 group-hover:text-ink-100">
                    {e.titre}
                  </span>
                  <ArrowRight
                    className="mt-0.5 size-3.5 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--bloc-accent)]"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={href}
            className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium text-[var(--bloc-accent)]"
          >
            <FolderOpen className="size-3.5" aria-hidden />
            Critères et indicateurs de la grille
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
