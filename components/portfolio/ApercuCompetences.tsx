import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BLOCS, type Bloc } from "@/data/competences";
import type { LigneSuivi, SyntheseSuivi } from "@/lib/suivi";

/**
 * Aperçu compact du suivi des compétences, pour la page d'accueil.
 *
 * Volontairement réduit à l'essentiel : combien de domaines par épreuve,
 * combien sont documentés. Le tableau détaillé — activités du référentiel,
 * nombre de preuves, accès à chaque compétence — vit sur la page Compétences.
 */
export function ApercuCompetences({
  lignes,
  synthese,
}: {
  lignes: LigneSuivi[];
  synthese: SyntheseSuivi;
}) {
  const parBloc = (bloc: Bloc) => {
    const duBloc = lignes.filter((l) => l.bloc === bloc);
    return {
      total: duBloc.length,
      documentees: duBloc.filter((l) => l.statut === "documentee").length,
      enCours: duBloc.filter((l) => l.statut === "en-cours").length,
    };
  };

  return (
    <div className="surface overflow-hidden">
      <div className="grid sm:grid-cols-2">
        {(["e4", "e5"] as const).map((bloc, index) => {
          const b = parBloc(bloc);
          return (
            <div
              key={bloc}
              data-bloc={bloc}
              className={`p-6 ${
                index === 0
                  ? "border-b border-night-700/60 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--bloc-accent)]">
                  Épreuve {BLOCS[bloc].code}
                </p>
                <p className="font-mono text-sm text-ink-400">
                  <span className="text-lg font-semibold text-ink-100">
                    {b.documentees}
                  </span>
                  &nbsp;/&nbsp;{b.total}
                </p>
              </div>

              <p className="mt-2 text-sm leading-snug text-ink-300">
                {BLOCS[bloc].titre}
              </p>

              {/* Une case par domaine : lisible sans lire le chiffre. */}
              <div
                role="img"
                aria-label={`${b.documentees} domaines documentés sur ${b.total} pour l'épreuve ${BLOCS[bloc].code}`}
                className="mt-4 flex gap-1"
              >
                {Array.from({ length: b.total }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-sm ${
                      i < b.documentees
                        ? "bg-emerald-400"
                        : i < b.documentees + b.enCours
                          ? "bg-amber-bright"
                          : "bg-night-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-night-700/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-400">
          <span className="font-semibold text-ink-200">
            {synthese.documentees} domaines documentés
          </span>{" "}
          sur {synthese.total}, appuyés sur {synthese.preuvesTotales} preuves.
        </p>
        <Link
          href="/competences"
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.75rem] font-medium text-cyan-bright transition-colors hover:text-cyan-soft"
        >
          Voir le détail des compétences
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
