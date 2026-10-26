import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckSquare, Gauge } from "lucide-react";

import {
  BLOCS,
  competences,
  getCompetenceBySlug,
  type Bloc,
} from "@/data/competences";
import { situationsDeCompetence, veilleDeCompetence } from "@/lib/relations";
import { Breadcrumb, Section, BlocTag } from "@/components/ui";
import { LinkedSituations, LinkedVeille } from "@/components/portfolio/Cards";

export function generateStaticParams() {
  return competences.map((c) => ({ bloc: c.bloc, slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bloc: string; slug: string }>;
}): Promise<Metadata> {
  const { bloc, slug } = await params;
  const competence = getCompetenceBySlug(bloc as Bloc, slug);
  if (!competence) return {};
  return {
    title: competence.titre,
    description: competence.description.slice(0, 160),
  };
}

export default async function CompetencePage({
  params,
}: {
  params: Promise<{ bloc: string; slug: string }>;
}) {
  const { bloc, slug } = await params;
  if (bloc !== "e4" && bloc !== "e5") notFound();

  const competence = getCompetenceBySlug(bloc, slug);
  if (!competence) notFound();

  const situations = situationsDeCompetence(competence.id);
  const veille = veilleDeCompetence(competence.id);

  return (
    <div data-bloc={competence.bloc}>
      <Section>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Compétences", href: "/competences" },
            {
              label: BLOCS[competence.bloc].code,
              href: `/competences#${competence.bloc}`,
            },
            { label: competence.titreCourt },
          ]}
        />

        <header className="border-b border-night-700/60 pb-8 pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <BlocTag bloc={competence.bloc} />
            <span className="font-mono text-xs text-ink-400">
              {BLOCS[competence.bloc].epreuve}
            </span>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-100 sm:text-4xl">
            {competence.titre}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-ink-300">
            {competence.description}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          {/* ------------------------------------------- Situations liées */}
          <div className="flex min-w-0 flex-col gap-5">
            {situations.length > 0 && <LinkedSituations situations={situations} />}
            <LinkedVeille exemples={veille} />
            {situations.length === 0 && veille.length === 0 && (
              <LinkedSituations situations={situations} />
            )}
          </div>

          {/* ------------------------- Critères et indicateurs de la grille */}
          <aside className="flex flex-col gap-5">
            <section className="surface overflow-hidden">
              <h2 className="flex items-center gap-2 border-b border-night-700/60 px-5 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-300">
                <CheckSquare
                  className="size-3.5 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                Critères de la grille
              </h2>
              <ul className="divide-y divide-night-700/50">
                {competence.criteres.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 px-5 py-3 text-sm leading-relaxed text-ink-300"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-[var(--bloc-accent)]"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            <section className="surface overflow-hidden">
              <h2 className="flex items-center gap-2 border-b border-night-700/60 px-5 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-300">
                <Gauge
                  className="size-3.5 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                Indicateurs de performance
              </h2>
              <ul className="divide-y divide-night-700/50">
                {competence.indicateurs.map((i) => (
                  <li
                    key={i}
                    className="px-5 py-3 text-sm italic leading-relaxed text-ink-400"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </Section>
    </div>
  );
}
