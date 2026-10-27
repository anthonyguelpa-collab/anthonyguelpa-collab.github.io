import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, Workflow } from "lucide-react";

import { realisations } from "@/data/realisations";
import { situations } from "@/data/situations";
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
          <>
            {/* ------------------------------------------- Rubrique à venir */}
            <section className="surface rule-top mt-12 px-6 py-12 text-center sm:px-10 sm:py-16">
              <span
                aria-hidden
                className="mx-auto grid size-14 place-items-center rounded-xl border border-amber-bright/30 bg-amber-bright/10 text-amber-bright"
              >
                <FlaskConical className="size-6" />
              </span>

              <h2 className="mx-auto mt-6 max-w-2xl text-balance text-xl font-semibold leading-snug text-ink-100 sm:text-2xl">
                Rubrique en cours de constitution
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-ink-300">
                Les projets de laboratoire de l&apos;année sont en cours de
                réalisation. Ils seront publiés ici au fur et à mesure, avec le
                même niveau de détail que les situations professionnelles :
                contexte, déroulé technique complet, preuves de réalisation et
                compétences validées.
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-ink-400">
                En attendant, les compétences du bloc E5 sont déjà étayées par
                les missions menées en entreprise.
              </p>
            </section>

            {/* --------------------- Distinction avec les situations pro */}
            <section className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="surface flex flex-col gap-3 p-6">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-lg border border-amber-bright/30 bg-amber-bright/10 text-amber-bright"
                >
                  <FlaskConical className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-ink-100">
                  Réalisations professionnelles
                </h3>
                <p className="text-sm leading-relaxed text-ink-400">
                  Les projets techniques conduits <strong className="text-ink-300">en laboratoire</strong>,
                  sur un environnement de formation dédié. Cette page.
                </p>
                <p className="mt-auto pt-2 font-mono text-[0.7rem] text-ink-400">
                  0 projet publié pour l&apos;instant
                </p>
              </article>

              <article className="surface flex flex-col gap-3 p-6">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
                >
                  <Workflow className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-ink-100">
                  Situations professionnelles
                </h3>
                <p className="text-sm leading-relaxed text-ink-400">
                  Les missions réellement menées{" "}
                  <strong className="text-ink-300">en entreprise</strong> pendant
                  mon alternance, dans leur rubrique dédiée.
                </p>
                <Link
                  href="/situations"
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-[0.72rem] font-medium text-cyan-bright transition-colors hover:text-cyan-soft"
                >
                  Consulter les {situations.length} situations
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </article>
            </section>
          </>
        ) : (
          /* ------------------------------ Projets publiés (futur) */
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {realisations.map((r) => (
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
