import type { Metadata } from "next";

import { situations } from "@/data/situations";
import { parDateDecroissante } from "@/lib/dates";
import { Breadcrumb, PageHeader, Section } from "@/components/ui";
import { SituationCard } from "@/components/portfolio/Cards";

export const metadata: Metadata = {
  title: "Situations professionnelles",
  description:
    "Les missions menées en alternance au service informatique, documentées selon la structure attendue : contexte, déroulé technique, preuves et conclusion.",
};

export default function SituationsPage() {
  // Classées de la plus récente à la plus ancienne. Le regroupement par bloc
  // a disparu avec la distinction E4 / E5 : les domaines mis en œuvre sont
  // portés par chaque carte.
  const toutes = parDateDecroissante(situations);

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
            été atteint et les compétences validées. Chaque carte porte les
            domaines de compétences que la situation met en œuvre.
          </>
        }
      />

      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {toutes.map((s) => (
          <li key={s.slug} className="flex">
            <SituationCard situation={s} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
