import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  CalendarDays,
  CheckCircle2,
  Download,
  HelpCircle,
  ListChecks,
  Target,
  UserRound,
} from "lucide-react";

import { situations, getSituation } from "@/data/situations";
import { BLOCS } from "@/data/competences";
import { competencesDeSituation } from "@/lib/relations";
import { lireContenu } from "@/lib/mdx";
import {
  documentationDeSituation,
  formaterTaille,
} from "@/lib/documents";
import { ressource } from "@/lib/chemin";
import { formaterPeriode, isoPeriode } from "@/lib/dates";
import { Breadcrumb, Section, TechBadges } from "@/components/ui";
import {
  LinkedCompetences,
  Livrables,
  TelechargerDocumentation,
} from "@/components/portfolio/Cards";
import { composantsMDX, Note } from "@/components/portfolio/mdx";

export function generateStaticParams() {
  return situations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const situation = getSituation(slug);
  if (!situation) return {};
  return {
    title: situation.titre,
    description: situation.resume,
  };
}

export default async function SituationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const situation = getSituation(slug);
  if (!situation) notFound();

  const competences = competencesDeSituation(situation);
  const corps = lireContenu("situations", slug);
  const documentation = documentationDeSituation(situation);

  return (
    <div data-bloc={situation.blocPrincipal}>
      <Section>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Situations professionnelles", href: "/situations" },
            { label: situation.reference },
          ]}
        />

        {/* ---------------------------------------------------------- Titre */}
        <header className="border-b border-night-700/60 pb-8 pt-8">
          <span className="font-mono text-sm font-bold tracking-wider text-[var(--bloc-accent)]">
            {situation.reference}
          </span>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-100 sm:text-4xl">
            {situation.titre}
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
                  dateTime={isoPeriode(situation.periode)}
                  className="text-sm font-medium text-ink-100"
                >
                  {formaterPeriode(situation.periode)}
                </time>
              </dd>
              </div>
            </div>
            <div>
              <dt className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Épreuve
              </dt>
              <dd className="mt-0.5 font-mono text-sm font-medium text-ink-100">
                {BLOCS[situation.blocPrincipal].code} —{" "}
                {BLOCS[situation.blocPrincipal].titre}
              </dd>
            </div>
          </dl>

          <div className="mt-5">
            <TechBadges items={situation.technologies} />
          </div>
        </header>

        {/* -------------------------------------------------------- Contexte */}
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
            {situation.contexte}
          </p>
        </section>

        {/* ---------------------------------------------------------- En bref */}
        <section aria-labelledby="en-bref" className="mt-5">
          <h2 id="en-bref" className="sr-only">
            En bref
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="surface flex flex-col gap-2 p-5">
              <p className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                <HelpCircle
                  className="size-3.5 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                Le besoin
              </p>
              <p className="text-sm leading-relaxed text-ink-300">
                {situation.besoin}
              </p>
            </div>

            <div className="surface flex flex-col gap-2 p-5">
              <p className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                <ListChecks
                  className="size-3.5 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                Les objectifs
              </p>
              <ul className="space-y-1.5 text-sm leading-relaxed text-ink-300">
                {situation.objectifs.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-[var(--bloc-accent)]"
                    />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface flex flex-col gap-2 p-5">
              <p className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                <UserRound
                  className="size-3.5 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                Mon rôle
              </p>
              <p className="text-sm leading-relaxed text-ink-300">
                {situation.role}
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- Déroulé technique MDX */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
          <article className="prose-doc min-w-0">
            <h2 className="!mt-0">Déroulé technique</h2>
            {corps ? (
              <MDXRemote
                source={corps}
                components={composantsMDX}
                options={{
                  mdxOptions: { remarkPlugins: [remarkGfm] },
                }}
              />
            ) : (
              <Note type="alerte" titre="Documentation à rédiger">
                Le déroulé technique de cette situation n&apos;a pas encore été
                rédigé. Créer le fichier{" "}
                <code>content/situations/{slug}.mdx</code>.
              </Note>
            )}

            {situation.notePreuves && (
              <Note type="caviardage">{situation.notePreuves}</Note>
            )}

            {/* ---------------------------------------------- Conclusion */}
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
                {situation.conclusion}
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

          {/* ------------------------------------------------------- Aside */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            {/* Accès au dossier complet sans avoir à dérouler toute la page.
                Le bouton détaillé reste en fin d'article. */}
            {documentation && (
              <a
                href={ressource(documentation.chemin)}
                download={documentation.nom}
                className="surface group flex items-center gap-3 px-5 py-4 transition-colors hover:border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
              >
                <Download
                  className="size-4 shrink-0 text-[var(--bloc-accent)]"
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-ink-200 group-hover:text-ink-100">
                    Documentation complète
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.68rem] text-ink-400">
                    PDF · {formaterTaille(documentation.taille)}
                  </span>
                </span>
              </a>
            )}

            <LinkedCompetences competences={competences} />
            <Livrables items={situation.livrables} />
          </aside>
        </div>
      </Section>
    </div>
  );
}
