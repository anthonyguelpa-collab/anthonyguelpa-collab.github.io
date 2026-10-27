import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CalendarDays, CheckCircle2, Target } from "lucide-react";

import { realisations, getRealisation } from "@/data/realisations";
import {
  competences as toutesCompetences,
  BLOCS,
} from "@/data/competences";
import { lireContenu } from "@/lib/mdx";
import { documentationDeRealisation, formaterTaille } from "@/lib/documents";
import { ressource } from "@/lib/chemin";
import { formaterPeriode, isoPeriode } from "@/lib/dates";
import { Breadcrumb, Section, TechBadges } from "@/components/ui";
import {
  LinkedCompetences,
  Livrables,
  TelechargerDocumentation,
} from "@/components/portfolio/Cards";
import { composantsMDX, Note } from "@/components/portfolio/mdx";

/**
 * Page détaillée d'une réalisation de laboratoire.
 *
 * Tant que `data/realisations.ts` est vide, aucune page n'est générée — la
 * route existe simplement, prête à servir dès qu'un projet est ajouté.
 */
export function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const realisation = getRealisation(slug);
  if (!realisation) return {};
  return { title: realisation.titre, description: realisation.resume };
}

export default async function RealisationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const realisation = getRealisation(slug);
  if (!realisation) notFound();

  const competences = toutesCompetences.filter((c) =>
    realisation.competences.includes(c.id),
  );
  const corps = lireContenu("realisations", slug);
  const documentation = documentationDeRealisation(realisation);

  return (
    <div data-bloc={realisation.blocPrincipal}>
      <Section>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Réalisations professionnelles", href: "/realisations" },
            { label: realisation.reference },
          ]}
        />

        <header className="border-b border-night-700/60 pb-8 pt-8">
          <span className="font-mono text-sm font-bold tracking-wider text-[var(--bloc-accent)]">
            {realisation.reference}
          </span>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-100 sm:text-4xl">
            {realisation.titre}
          </h1>
          <dl className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl border border-night-700/60 bg-night-850/40 px-5 py-3.5">
            <div className="inline-flex items-center gap-2">
              <CalendarDays
                className="size-4 shrink-0 text-[var(--bloc-accent)]"
                aria-hidden
              />
              <div>
              <dt className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Période de réalisation
              </dt>
              <dd className="mt-0.5">
                <time
                  dateTime={isoPeriode(realisation.periode)}
                  className="text-sm font-medium text-ink-100"
                >
                  {formaterPeriode(realisation.periode)}
                </time>
              </dd>
              </div>
            </div>
            <div>
              <dt className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Épreuve
              </dt>
              <dd className="mt-0.5 font-mono text-sm font-medium text-ink-100">
                {BLOCS[realisation.blocPrincipal].code} —{" "}
                {BLOCS[realisation.blocPrincipal].titre}
              </dd>
            </div>
          </dl>

          <div className="mt-5">
            <TechBadges items={realisation.technologies} />
          </div>
        </header>

        <section
          aria-labelledby="contexte"
          className="surface mt-8 border-l-[3px] border-l-[var(--bloc-accent)] px-6 py-5"
        >
          <h2
            id="contexte"
            className="mb-2.5 inline-flex items-center gap-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-200"
          >
            <Target className="size-3.5 text-[var(--bloc-accent)]" aria-hidden />
            Contexte
          </h2>
          <p className="text-pretty leading-relaxed text-ink-300">
            {realisation.contexte}
          </p>
        </section>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
          <article className="prose-doc min-w-0">
            <h2 className="!mt-0">Déroulé technique</h2>
            {corps ? (
              <MDXRemote
                source={corps}
                components={composantsMDX}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            ) : (
              <Note type="alerte" titre="Documentation à rédiger">
                Créer le fichier <code>content/realisations/{slug}.mdx</code>.
              </Note>
            )}

            {realisation.notePreuves && (
              <Note type="caviardage">{realisation.notePreuves}</Note>
            )}

            <h2>Conclusion</h2>
            <div className="not-prose surface border-l-[3px] border-l-[var(--bloc-accent)] px-6 py-5">
              <p className="mb-2.5 inline-flex items-center gap-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-200">
                <CheckCircle2
                  className="size-3.5 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                Objectif
              </p>
              <p className="text-pretty leading-relaxed text-ink-300">
                {realisation.conclusion}
              </p>
            </div>

            {documentation && (
              <TelechargerDocumentation
                chemin={ressource(documentation.chemin)}
                nom={documentation.nom}
                taille={formaterTaille(documentation.taille)}
              />
            )}
          </article>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            <LinkedCompetences
              competences={competences}
              titre="Compétences validées par cette réalisation"
            />
            <Livrables items={realisation.livrables} />
          </aside>
        </div>
      </Section>
    </div>
  );
}
