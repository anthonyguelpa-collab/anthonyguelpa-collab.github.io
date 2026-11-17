import type { Metadata } from "next";
import { Quote } from "lucide-react";

import {
  CRITERE_TRANSVERSE_E4,
  competencesByBloc,
} from "@/data/competences";
import {
  situationsDeCompetence,
  veilleDeCompetence,
  verifierCoherence,
} from "@/lib/relations";
import { tableauSuivi } from "@/lib/suivi";
import { Breadcrumb, PageHeader, Section } from "@/components/ui";
import { DomaineCompetence } from "@/components/portfolio/DomaineCompetence";
import { TableauCompetences } from "@/components/portfolio/TableauCompetences";

export const metadata: Metadata = {
  title: "Compétences",
  description:
    "Les six domaines de compétences de l'épreuve E5 — support et mise à disposition de services informatiques — reliés aux missions réalisées pendant mon alternance.",
};

/**
 * Page Compétences.
 *
 * Chaque domaine est présenté par ce qu'il recouvre et par ce que j'ai
 * réellement fait, avec les situations qui le documentent. Le suivi
 * documentaire reste disponible — il m'est utile pour préparer l'épreuve —
 * mais replié en fin de page : c'est un outil de travail, pas le propos
 * du portfolio.
 */
export default function CompetencesPage() {
  const coherence = verifierCoherence();
  const lignes = tableauSuivi();

  return (
    <Section>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Compétences" }]}
      />

      <PageHeader
        surtitre="Épreuve E5 · Support et mise à disposition de services informatiques"
        titre="Compétences"
        intro={
          <>
            Les six domaines ci-dessous, et leurs libellés, sont repris mot
            pour mot du tableau de synthèse officiel. Pour chacun,
            j&apos;indique ce que la compétence recouvre dans mon cas, ce que
            j&apos;ai réalisé pendant mon alternance, et les situations
            professionnelles où ce travail est documenté.
          </>
        }
      />

      {/* ---------------------------- Les six domaines de l'épreuve */}
      <section id="domaines" data-bloc="e4" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Les six domaines de l&apos;épreuve
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-400">
          Numérotés comme dans le tableau de synthèse, pour qu&apos;on passe
          sans effort de la grille à la preuve.
        </p>

        <div className="mt-8 space-y-5">
          {competencesByBloc("e4").map((c) => (
            <DomaineCompetence
              key={c.id}
              competence={c}
              situations={situationsDeCompetence(c.id)}
              veille={veilleDeCompetence(c.id)}
            />
          ))}
        </div>

        <aside className="surface mt-6 flex gap-4 border-l-[3px] border-l-cyan-bright px-6 py-5">
          <Quote className="mt-0.5 size-4 shrink-0 text-cyan-bright" aria-hidden />
          <div>
            <p className="mb-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-200">
              Critère transverse de la grille
            </p>
            <p className="text-pretty leading-relaxed text-ink-300">
              {CRITERE_TRANSVERSE_E4}
            </p>
          </div>
        </aside>
      </section>

      {/* ------------------- Compétences techniques, hors grille d'épreuve */}
      <section id="technique" data-bloc="e5" className="mt-16 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Compétences techniques d&apos;administration
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-400">
          Ces trois domaines ne figurent pas dans le tableau de synthèse de
          l&apos;épreuve : ils ne sont donc pas numérotés. Je les conserve
          parce qu&apos;ils documentent la spécialité SISR — concevoir,
          déployer, puis exploiter une solution d&apos;infrastructure — et que
          plusieurs de mes situations relèvent d&apos;abord de là.
        </p>

        <div className="mt-8 space-y-5">
          {competencesByBloc("e5").map((c) => (
            <DomaineCompetence
              key={c.id}
              competence={c}
              situations={situationsDeCompetence(c.id)}
              veille={veilleDeCompetence(c.id)}
            />
          ))}
        </div>
      </section>

      {/* ------------------------------------------- Suivi documentaire */}
      <section aria-labelledby="suivi" className="mt-16">
        <details className="surface overflow-hidden">
          <summary className="cursor-pointer list-none px-6 py-4 transition-colors hover:bg-night-800/40">
            <span className="flex flex-wrap items-center justify-between gap-3">
              <span>
                <span
                  id="suivi"
                  className="block text-base font-semibold text-ink-100"
                >
                  Suivi de ma documentation
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-400">
                  Tableau de bord que je tiens pour préparer l&apos;épreuve :
                  où en est la documentation de chaque domaine.
                </span>
              </span>
              <span className="font-mono text-[0.72rem] font-medium text-cyan-bright">
                Afficher
              </span>
            </span>
          </summary>

          <div className="border-t border-night-700/60 px-6 py-6">
            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-ink-400">
              Ces états décrivent l&apos;avancement de ma documentation,
              calculé automatiquement à partir des preuves présentes dans ce
              portfolio. Ils ne constituent ni une auto-évaluation de ma
              maîtrise, ni une validation par un jury.
            </p>
            <TableauCompetences lignes={lignes} />
          </div>
        </details>
      </section>

      {/* Contrôle de cohérence — visible uniquement s'il échoue. */}
      {!coherence.valide && (
        <aside className="surface mt-10 border-l-[3px] border-l-rose-500 px-6 py-5">
          <p className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-rose-300">
            Contrôle de cohérence
          </p>
          {coherence.competencesOrphelines.length > 0 && (
            <p className="text-sm leading-relaxed text-ink-300">
              Compétences affichées sans preuve rattachée :{" "}
              {coherence.competencesOrphelines.join(", ")}.
            </p>
          )}
        </aside>
      )}
    </Section>
  );
}
