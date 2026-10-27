import type { Metadata } from "next";

import { situations } from "@/data/situations";
import { parDateDecroissante } from "@/lib/dates";
import { BLOCS } from "@/data/competences";
import { Breadcrumb, PageHeader, Section, BlocTag } from "@/components/ui";
import { SituationCard } from "@/components/portfolio/Cards";

export const metadata: Metadata = {
  title: "Situations professionnelles",
  description:
    "Les missions menées en alternance au service informatique, documentées selon la structure attendue : contexte, déroulé technique, preuves et conclusion.",
};

export default function SituationsPage() {
  // Groupées par bloc — l'organisation attendue par le référentiel — puis
  // classées de la plus récente à la plus ancienne à l'intérieur de chaque bloc.
  const parBloc = {
    e5: parDateDecroissante(situations.filter((s) => s.blocPrincipal === "e5")),
    e4: parDateDecroissante(situations.filter((s) => s.blocPrincipal === "e4")),
  };

  return (
    <Section>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Situations professionnelles" }]}
      />

      <PageHeader
        surtitre={`${situations.length} situations documentées`}
        titre="Situations professionnelles"
        intro={
          <>
            Chaque situation suit la même structure : le contexte de la
            mission, le déroulé technique rédigé comme un tutoriel, les preuves
            de réalisation, puis une conclusion indiquant si l&apos;objectif a
            été atteint et les compétences validées. Les situations sont
            regroupées par bloc dominant, mais la plupart en valident des deux.
          </>
        }
      />

      {(["e5", "e4"] as const).map((bloc) => (
        <section key={bloc} data-bloc={bloc} className="mt-14">
          <div className="flex flex-wrap items-center gap-3">
            <BlocTag bloc={bloc} />
            <h2 className="text-xl font-semibold tracking-tight text-ink-100">
              {BLOCS[bloc].titre}
            </h2>
            <span className="font-mono text-xs text-ink-400">
              {parBloc[bloc].length} situation{parBloc[bloc].length > 1 ? "s" : ""}
            </span>
          </div>

          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {parBloc[bloc].map((s) => (
              <li key={s.slug} className="flex">
                <SituationCard situation={s} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Section>
  );
}
