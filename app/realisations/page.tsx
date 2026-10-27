import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";

import { realisations } from "@/data/realisations";
import { parDateDecroissante } from "@/lib/dates";
import { Breadcrumb, PageHeader, Section } from "@/components/ui";
import { RealisationCard } from "@/components/portfolio/Cards";

export const metadata: Metadata = {
  title: "Réalisations professionnelles",
  description:
    "Projets techniques menés en laboratoire dans le cadre du BTS SIO option SISR. Rubrique en cours de constitution.",
};

export default function RealisationsPage() {
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
              Cette rubrique rassemble les projets techniques que je mène en
              laboratoire dans le cadre du BTS SIO option SISR — maquettage,
              configuration et validation de solutions d&apos;infrastructure
              sur un environnement dédié.
            </>
          }
        />

        {realisations.length === 0 ? (
          /* ------------------------------------------- Rubrique à venir */
          <section className="mt-16 flex justify-center pb-10">
            <div className="surface rule-top w-full max-w-xl px-6 py-16 text-center sm:px-10 sm:py-20">
              <span
                aria-hidden
                className="mx-auto grid size-14 place-items-center rounded-xl border border-amber-bright/30 bg-amber-bright/10 text-amber-bright"
              >
                <FlaskConical className="size-6" />
              </span>

              <h2 className="mt-6 text-balance text-xl font-semibold leading-snug text-ink-100 sm:text-2xl">
                Rubrique en cours de constitution
              </h2>
            </div>
          </section>
        ) : (
          /* ------------------------------ Projets publiés (futur) */
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {parDateDecroissante(realisations).map((r) => (
              <li key={r.slug} className="flex">
                <RealisationCard realisation={r} />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}
