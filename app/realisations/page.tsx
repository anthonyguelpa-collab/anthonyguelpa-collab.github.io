import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { situations } from "@/data/situations";
import { competencesByBloc } from "@/data/competences";
import { situationsDeCompetence } from "@/lib/relations";
import { Breadcrumb, PageHeader, Section, TechBadges } from "@/components/ui";

export const metadata: Metadata = {
  title: "Réalisations professionnelles",
  description:
    "Les réalisations professionnelles présentées au titre de l'épreuve E5 — administration des systèmes et des réseaux.",
};

export default function RealisationsPage() {
  // Les réalisations présentées pour E5 sont les situations qui valident
  // au moins une compétence du bloc 2.
  const idsE5 = competencesByBloc("e5").map((c) => c.id);
  const realisations = situations.filter((s) =>
    s.competences.some((c) => idsE5.includes(c)),
  );

  return (
    <div data-bloc="e5">
      <Section>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Réalisations professionnelles" },
          ]}
        />

        <PageHeader
          surtitre="Épreuve E5 · Unité U5"
          titre="Réalisations professionnelles"
          intro={
            <>
              Les réalisations retenues pour l&apos;épreuve E5 sont celles qui
              mettent en œuvre la conception, le déploiement ou
              l&apos;exploitation d&apos;une solution d&apos;infrastructure.
              Elles sont présentées ici avec les compétences du bloc 2
              qu&apos;elles valident ; le déroulé technique complet se trouve
              sur la page de chaque situation.
            </>
          }
        />

        <ol className="mt-12 space-y-4">
          {realisations.map((s) => {
            const competencesE5 = competencesByBloc("e5").filter((c) =>
              s.competences.includes(c.id),
            );
            return (
              <li key={s.slug}>
                <Link
                  href={`/situations/${s.slug}`}
                  className="surface rule-top group block p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-bright/50"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold tracking-wider text-amber-bright">
                      {s.reference}
                    </span>
                    <span aria-hidden className="text-night-500">·</span>
                    <span className="font-mono text-xs text-ink-400">
                      {s.periode}
                    </span>
                  </div>

                  <h2 className="mt-2 flex items-center gap-2 text-balance text-xl font-semibold leading-snug text-ink-100">
                    {s.titre}
                    <ArrowRight
                      className="size-4 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-amber-bright"
                      aria-hidden
                    />
                  </h2>

                  <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
                    {s.resume}
                  </p>

                  <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <div>
                      <p className="mb-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                        Compétences E5 validées
                      </p>
                      <ul className="space-y-1.5">
                        {competencesE5.map((c) => (
                          <li
                            key={c.id}
                            className="flex items-start gap-2 text-sm text-ink-300"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-amber-bright"
                            />
                            {c.titre}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                        Livrables
                      </p>
                      <ul className="space-y-1.5">
                        {s.livrables.map((l) => (
                          <li
                            key={l}
                            className="flex items-start gap-2 text-sm text-ink-300"
                          >
                            <FileText
                              className="mt-0.5 size-3.5 shrink-0 text-ink-400"
                              aria-hidden
                            />
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5">
                    <TechBadges items={s.technologies} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </Section>
    </div>
  );
}
