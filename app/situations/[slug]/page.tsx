import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CalendarDays, CheckCircle2, Target } from "lucide-react";

import { situations, getSituation } from "@/data/situations";
import { competencesDeSituation } from "@/lib/relations";
import { lireContenu } from "@/lib/mdx";
import {
  documentationDeSituation,
  formaterTaille,
} from "@/lib/documents";
import { ressource } from "@/lib/chemin";
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold tracking-wider text-[var(--bloc-accent)]">
              {situation.reference}
            </span>
            <span aria-hidden className="text-night-500">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-400">
              <CalendarDays className="size-3.5" aria-hidden />
              {situation.periode}
            </span>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-100 sm:text-4xl">
            {situation.titre}
          </h1>
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
            <LinkedCompetences competences={competences} />
            <Livrables items={situation.livrables} />
          </aside>
        </div>
      </Section>
    </div>
  );
}
