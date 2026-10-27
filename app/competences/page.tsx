import type { Metadata } from "next";
import { Quote } from "lucide-react";

import {
  BLOCS,
  CRITERE_TRANSVERSE_E4,
  competencesByBloc,
} from "@/data/competences";
import { compteurParCompetence, verifierCoherence } from "@/lib/relations";
import { tableauSuivi, syntheseSuivi } from "@/lib/suivi";
import { Breadcrumb, PageHeader, Section, BlocTag } from "@/components/ui";
import { CompetenceCard } from "@/components/portfolio/Cards";
import { TableauCompetences } from "@/components/portfolio/TableauCompetences";

export const metadata: Metadata = {
  title: "Compétences",
  description:
    "Les 9 compétences des blocs E4 et E5 du référentiel BTS SIO option SISR, chacune étayée par au moins une situation professionnelle.",
};

export default function CompetencesPage() {
  const compteur = compteurParCompetence();
  const coherence = verifierCoherence();
  const lignes = tableauSuivi();
  const synthese = syntheseSuivi(lignes);

  return (
    <Section>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Compétences" }]}
      />

      <PageHeader
        surtitre="Référentiel BTS SIO · SISR"
        titre="Compétences"
        intro={
          <>
            Les libellés et les critères sont repris mot pour mot des grilles
            de notation officielles des épreuves E4 et E5. Chaque compétence
            renvoie aux situations professionnelles qui la valident — et
            aucune n&apos;est affichée sans être étayée par au moins une
            preuve.
          </>
        }
      />

      {/* Critère transverse rappelé en tête de la grille E4. */}
      <aside className="surface mt-8 flex gap-4 border-l-[3px] border-l-cyan-bright px-6 py-5">
        <Quote className="mt-0.5 size-4 shrink-0 text-cyan-bright" aria-hidden />
        <div>
          <p className="mb-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-200">
            Critère transverse de la grille E4
          </p>
          <p className="text-pretty leading-relaxed text-ink-300">
            {CRITERE_TRANSVERSE_E4}
          </p>
        </div>
      </aside>

      {/* ------------------------------------------- Tableau de suivi */}
      <section aria-labelledby="suivi" className="mt-14">
        <h2
          id="suivi"
          className="text-2xl font-semibold tracking-tight text-ink-100"
        >
          Suivi documentaire
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Les neuf domaines, avec les preuves que ce portfolio apporte pour
          chacun. Chaque ligne mène à la compétence, où figurent les activités
          du référentiel et les situations qui la valident.
        </p>

        <div className="mt-7">
          <TableauCompetences lignes={lignes} synthese={synthese} />
        </div>
      </section>

      {(["e4", "e5"] as const).map((bloc) => (
        <section key={bloc} id={bloc} data-bloc={bloc} className="mt-16 scroll-mt-24">
          <div className="flex flex-wrap items-center gap-3">
            <BlocTag bloc={bloc} />
            <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
              {BLOCS[bloc].titre}
            </h2>
          </div>
          <p className="mt-2 font-mono text-xs text-ink-400">
            {BLOCS[bloc].epreuve}
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-400">
            {BLOCS[bloc].sousTitre}
          </p>

          <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competencesByBloc(bloc).map((c) => (
              <li key={c.id} className="flex">
                <CompetenceCard
                  competence={c}
                  nbSituations={compteur[c.id] ?? 0}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Contrôle de cohérence — visible uniquement s'il échoue. */}
      {!coherence.valide && (
        <aside className="surface mt-14 border-l-[3px] border-l-rose-500 px-6 py-5">
          <p className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose-300">
            Contrôle de cohérence
          </p>
          {coherence.competencesOrphelines.length > 0 && (
            <p className="text-sm leading-relaxed text-ink-300">
              Compétences affichées sans situation professionnelle :{" "}
              {coherence.competencesOrphelines.join(", ")}.
            </p>
          )}
        </aside>
      )}
    </Section>
  );
}
