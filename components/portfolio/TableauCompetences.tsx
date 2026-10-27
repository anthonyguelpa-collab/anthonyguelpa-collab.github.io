"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Info } from "lucide-react";

import { BLOCS, type Bloc } from "@/data/competences";
import { STATUTS, type LigneSuivi, type Statut, type SyntheseSuivi } from "@/lib/suivi";

/* ------------------------------------------------------------ Statuts */

// Le libellé vient de lib/suivi.ts — une seule écriture, pas de dérive
// possible entre le tableau et le reste du site.
const APPARENCE: Record<
  Statut,
  { pastille: string; texte: string; bordure: string }
> = {
  documentee: {
    pastille: "bg-emerald-400",
    texte: "text-emerald-300",
    bordure: "border-emerald-500/35 bg-emerald-500/10",
  },
  "en-cours": {
    pastille: "bg-amber-bright",
    texte: "text-amber-soft",
    bordure: "border-amber-bright/35 bg-amber-bright/10",
  },
  "non-documentee": {
    pastille: "bg-night-500",
    texte: "text-ink-400",
    bordure: "border-night-600 bg-night-800/60",
  },
};

function Pastille({ statut }: { statut: Statut }) {
  const a = APPARENCE[statut];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 font-mono text-[0.68rem] font-medium ${a.bordure} ${a.texte}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${a.pastille}`} />
      {STATUTS[statut].libelle}
    </span>
  );
}

/** Détail des preuves : « 4 situations · 2 veilles ». */
function DetailPreuves({ ligne }: { ligne: LigneSuivi }) {
  const morceaux: string[] = [];
  if (ligne.situations)
    morceaux.push(
      `${ligne.situations} situation${ligne.situations > 1 ? "s" : ""}`,
    );
  if (ligne.realisations)
    morceaux.push(
      `${ligne.realisations} réalisation${ligne.realisations > 1 ? "s" : ""}`,
    );
  if (ligne.veille)
    morceaux.push(`${ligne.veille} veille${ligne.veille > 1 ? "s" : ""}`);

  return (
    <span className="font-mono text-[0.7rem] text-ink-400">
      {morceaux.length ? morceaux.join(" · ") : "aucune preuve"}
    </span>
  );
}

/* --------------------------------------------------------- Synthèse */

function Synthese({ synthese }: { synthese: SyntheseSuivi }) {
  const cartes = [
    { valeur: synthese.total, libelle: "domaines suivis", ton: "text-ink-100" },
    {
      valeur: synthese.documentees,
      libelle: "documentés",
      ton: "text-emerald-300",
    },
    {
      valeur: synthese.enCours,
      libelle: "partiellement documentés",
      ton: "text-amber-soft",
    },
    {
      valeur: synthese.nonDocumentees,
      libelle: "non documentés",
      ton: "text-ink-400",
    },
  ];

  return (
    <div className="surface p-5 sm:p-6">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cartes.map((c) => (
          <div key={c.libelle}>
            <dd className={`font-mono text-3xl font-semibold ${c.ton}`}>
              {c.valeur}
            </dd>
            <dt className="mt-1 text-xs leading-tight text-ink-400">
              {c.libelle}
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Couverture documentaire
          </p>
          <p className="font-mono text-sm font-semibold text-ink-200">
            {synthese.documentees}&nbsp;/&nbsp;{synthese.total}
          </p>
        </div>

        {/* Barre segmentée : une case par domaine, lisible sans lire le chiffre. */}
        <div
          role="img"
          aria-label={`${synthese.documentees} domaines documentés et ${synthese.enCours} en cours, sur ${synthese.total} domaines au total`}
          className="mt-2.5 flex gap-1"
        >
          {Array.from({ length: synthese.total }).map((_, i) => {
            const couleur =
              i < synthese.documentees
                ? "bg-emerald-400"
                : i < synthese.documentees + synthese.enCours
                  ? "bg-amber-bright"
                  : "bg-night-600";
            return (
              <span
                key={i}
                className={`h-2 flex-1 rounded-sm ${couleur}`}
              />
            );
          })}
        </div>

        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          Ces statuts décrivent l&apos;état de ma documentation, calculé à
          partir des preuves présentes dans ce portfolio. Ils ne constituent
          ni une auto-évaluation de maîtrise, ni une validation par un jury.
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- Tableau */

export function TableauCompetences({
  lignes,
  synthese,
}: {
  lignes: LigneSuivi[];
  synthese: SyntheseSuivi;
}) {
  const [filtre, setFiltre] = useState<"tous" | Bloc>("tous");

  const visibles = useMemo(
    () => (filtre === "tous" ? lignes : lignes.filter((l) => l.bloc === filtre)),
    [lignes, filtre],
  );

  const filtres: { cle: "tous" | Bloc; label: string }[] = [
    { cle: "tous", label: `Tous (${lignes.length})` },
    {
      cle: "e4",
      label: `E4 (${lignes.filter((l) => l.bloc === "e4").length})`,
    },
    {
      cle: "e5",
      label: `E5 (${lignes.filter((l) => l.bloc === "e5").length})`,
    },
  ];

  return (
    <div>
      <Synthese synthese={synthese} />

      {/* ------------------------------------------------------ Filtres */}
      <div
        role="group"
        aria-label="Filtrer par épreuve"
        className="mt-6 flex flex-wrap gap-2"
      >
        {filtres.map((f) => {
          const actif = filtre === f.cle;
          return (
            <button
              key={f.cle}
              type="button"
              onClick={() => setFiltre(f.cle)}
              aria-pressed={actif}
              className={`rounded-lg border px-3.5 py-2 font-mono text-[0.72rem] font-medium transition-colors ${
                actif
                  ? "border-cyan-bright bg-cyan-bright/10 text-cyan-bright"
                  : "border-night-600 bg-night-800/50 text-ink-300 hover:border-night-500 hover:text-ink-100"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* -------------------------------------------- Tableau (bureau) */}
      <div className="surface mt-4 hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Suivi documentaire des compétences du BTS SIO option SISR
          </caption>
          <thead>
            <tr className="border-b border-night-600">
              <th scope="col" className="px-5 py-3 text-left font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Épreuve
              </th>
              <th scope="col" className="px-5 py-3 text-left font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Domaine de compétences
              </th>
              <th scope="col" className="px-5 py-3 text-left font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                Preuves
              </th>
              <th scope="col" className="px-5 py-3 text-left font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                État
              </th>
              <th scope="col" className="px-5 py-3 text-right font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                <span className="sr-only">Accès</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-night-700/50">
            {visibles.map((l) => (
              <tr
                key={l.competence.id}
                data-bloc={l.bloc}
                className="group transition-colors hover:bg-night-800/50"
              >
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[color-mix(in_oklab,var(--bloc-accent)_45%,transparent)] bg-[color-mix(in_oklab,var(--bloc-accent)_10%,transparent)] px-2 py-0.5 font-mono text-[0.68rem] font-semibold text-[var(--bloc-accent)]">
                    {BLOCS[l.bloc].code}
                  </span>
                </td>
                <td className="px-5 py-4 align-top">
                  <Link
                    href={l.href}
                    className="font-medium text-ink-200 transition-colors group-hover:text-ink-100"
                  >
                    {l.competence.titre}
                  </Link>
                  <p className="mt-1 text-xs text-ink-400">
                    {l.competence.criteres.length} activités au référentiel
                  </p>
                </td>
                <td className="px-5 py-4 align-top">
                  <span className="font-mono text-base font-semibold text-ink-200">
                    {l.preuves}
                  </span>
                  <br />
                  <DetailPreuves ligne={l} />
                </td>
                <td className="px-5 py-4 align-top">
                  <Pastille statut={l.statut} />
                </td>
                <td className="px-5 py-4 text-right align-top">
                  <Link
                    href={l.href}
                    aria-label={`Consulter la compétence ${l.competence.titre}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium text-[var(--bloc-accent)]"
                  >
                    Voir
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------------------------------------- Cartes (mobile) */}
      <ul className="mt-4 space-y-3 md:hidden">
        {visibles.map((l) => (
          <li key={l.competence.id} data-bloc={l.bloc}>
            <Link
              href={l.href}
              className="surface group flex flex-col gap-3 p-4 transition-colors hover:border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-md border border-[color-mix(in_oklab,var(--bloc-accent)_45%,transparent)] bg-[color-mix(in_oklab,var(--bloc-accent)_10%,transparent)] px-2 py-0.5 font-mono text-[0.68rem] font-semibold text-[var(--bloc-accent)]">
                  {BLOCS[l.bloc].code}
                </span>
                <Pastille statut={l.statut} />
              </div>

              <p className="text-balance text-sm font-medium leading-snug text-ink-100">
                {l.competence.titre}
              </p>

              <div className="flex items-center justify-between gap-3 border-t border-night-700/60 pt-2.5">
                <span>
                  <span className="font-mono text-sm font-semibold text-ink-200">
                    {l.preuves}
                  </span>{" "}
                  <DetailPreuves ligne={l} />
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-[var(--bloc-accent)]"
                  aria-hidden
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
