import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, CheckCircle2, ExternalLink, Target } from "lucide-react";

import { exemples, getExemple, getTheme, STATUTS } from "@/data/veille";
import { lireContenu } from "@/lib/mdx";
import { competences as toutesCompetences } from "@/data/competences";
import { Breadcrumb, Section, Badge } from "@/components/ui";
import { composantsMDX, Note } from "@/components/portfolio/mdx";
import { LinkedCompetences } from "@/components/portfolio/Cards";

export function generateStaticParams() {
  return exemples.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exemple = getExemple(slug);
  if (!exemple) return {};
  return { title: exemple.titre, description: exemple.resume };
}

export default async function ExempleVeillePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exemple = getExemple(slug);
  if (!exemple) notFound();

  const theme = getTheme(exemple.themeId);
  const statut = STATUTS[exemple.statut];
  const corps = lireContenu("veille", slug);
  const competencesLiees = toutesCompetences.filter((c) =>
    exemple.competences.includes(c.id),
  );

  return (
    <Section>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Veille technologique", href: "/veille" },
          { label: exemple.titre },
        ]}
      />

      <header className="border-b border-night-700/60 pb-8 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variante={
              statut.ton === "positif"
                ? "positif"
                : statut.ton === "negatif"
                  ? "alerte"
                  : "neutre"
            }
          >
            {statut.libelle}
          </Badge>
          {theme && (
            <span className="font-mono text-xs text-ink-400">
              Thème · {theme.titre}
            </span>
          )}
          <span aria-hidden className="text-night-500">·</span>
          <span className="font-mono text-xs text-ink-400">{exemple.date}</span>
        </div>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-100 sm:text-4xl">
          {exemple.titre}
        </h1>
      </header>

      {/* -------------------------------------------------------- Contexte */}
      <section
        aria-labelledby="contexte-veille"
        className="surface mt-8 border-l-[3px] border-l-cyan-bright px-6 py-5"
      >
        <h2
          id="contexte-veille"
          className="mb-2.5 inline-flex items-center gap-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-200"
        >
          <Target className="size-3.5 text-cyan-bright" aria-hidden />
          Contexte
        </h2>
        <p className="text-pretty leading-relaxed text-ink-300">
          {exemple.contexte}
        </p>
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <article className="prose-doc min-w-0">
          <h2 className="!mt-0">Présentation de la solution</h2>
          {corps ? (
            <MDXRemote
              source={corps}
              components={composantsMDX}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          ) : (
            <Note type="alerte" titre="Documentation à rédiger">
              Créer le fichier <code>content/veille/{slug}.mdx</code>.
            </Note>
          )}

          <h2>Conclusion</h2>
          <div className="not-prose surface border-l-[3px] border-l-cyan-bright px-6 py-5">
            <p className="mb-2.5 inline-flex items-center gap-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-200">
              <CheckCircle2 className="size-3.5 text-cyan-bright" aria-hidden />
              Solution adoptée ou non
            </p>
            <p className="text-pretty leading-relaxed text-ink-300">
              {exemple.conclusion}
            </p>
          </div>
        </article>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
          <LinkedCompetences
            competences={competencesLiees}
            titre="Compétences étayées par cet exemple"
          />

          {exemple.sources.length > 0 && (
            <section className="surface overflow-hidden">
              <h2 className="border-b border-night-700/60 px-5 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-300">
                Sources
              </h2>
              <ul className="divide-y divide-night-700/50">
                {exemple.sources.map((s) => (
                  <li key={s.libelle}>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-start gap-2 px-5 py-3 text-sm text-ink-300 transition-colors hover:bg-night-800/50 hover:text-cyan-bright"
                      >
                        <ExternalLink
                          className="mt-0.5 size-3.5 shrink-0 text-ink-400"
                          aria-hidden
                        />
                        {s.libelle}
                      </a>
                    ) : (
                      <span className="block px-5 py-3 text-sm text-ink-300">
                        {s.libelle}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link
            href="/veille"
            className="surface inline-flex items-center gap-2 px-5 py-3.5 text-sm text-ink-300 transition-colors hover:border-cyan-bright/50 hover:text-ink-100"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Revenir à la veille
          </Link>
        </aside>
      </div>
    </Section>
  );
}
