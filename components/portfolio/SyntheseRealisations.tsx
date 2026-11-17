import Link from "next/link";
import { ExternalLink } from "lucide-react";

import {
  PERIODES,
  domainesSynthese,
  enTeteSynthese,
  lignesParPeriode,
  type LigneSynthese,
} from "@/data/synthese";

/**
 * Tableau de synthèse des réalisations professionnelles.
 *
 * L'annexe officielle est un tableau administratif large : six colonnes de
 * compétences, trois blocs de périodes. Reproduit tel quel, il est
 * illisible sur une page web et impossible à consulter sur téléphone.
 *
 * Il est donc rendu de deux façons, à partir des mêmes données :
 *   · en tableau à partir du grand écran, fidèle à la disposition de
 *     l'annexe — une ligne par réalisation, une colonne par domaine ;
 *   · en cartes en dessous, chaque réalisation portant les domaines
 *     qu'elle met en œuvre sous forme d'étiquettes.
 *
 * Les intitulés des réalisations mènent à leur page : le tableau sert
 * d'index, la preuve vit dans la situation.
 */

/* ------------------------------------------------------------- Marque */

/** Marque de mise en œuvre d'un domaine — losange, motif repris du site. */
function Marque() {
  return (
    <span
      role="img"
      aria-label="Domaine mis en œuvre"
      className="mx-auto block size-2 rotate-45 rounded-[1px] bg-cyan-bright"
    />
  );
}

/* ------------------------------------------------- Intitulé commun */

function Intitule({ ligne }: { ligne: LigneSynthese }) {
  return (
    <>
      <span
        className={`shrink-0 font-mono text-[0.68rem] font-bold tracking-wider ${
          ligne.type === "veille" ? "text-ink-400" : "text-cyan-bright"
        }`}
      >
        {ligne.reference}
      </span>
      <span className="text-sm leading-snug text-ink-300 group-hover:text-ink-100">
        {ligne.titre}
      </span>
    </>
  );
}

/** Date affichée, avec la mention du mois approché le cas échéant. */
function Date({ ligne }: { ligne: LigneSynthese }) {
  return (
    <span className="whitespace-nowrap font-mono text-[0.7rem] text-ink-400">
      {ligne.periodeCourte}
      {ligne.dateEstimee && (
        <abbr
          title="Mois approché d'après l'enchaînement des missions"
          className="ml-1 cursor-help text-ink-400 no-underline"
        >
          ~
        </abbr>
      )}
      {ligne.anterieure && (
        <abbr
          title="Réalisation antérieure à l'entrée en formation de septembre 2025"
          className="ml-1 cursor-help text-amber-soft no-underline"
        >
          *
        </abbr>
      )}
    </span>
  );
}

/* ------------------------------------------------------ Bloc d'une période */

function BlocPeriode({
  titre,
  detail,
  lignes,
}: {
  titre: string;
  detail: string;
  lignes: LigneSynthese[];
}) {
  return (
    <section className="mt-8 first:mt-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold text-ink-100">{titre}</h3>
        <p className="font-mono text-[0.68rem] text-ink-400">{detail}</p>
      </div>

      {lignes.length === 0 ? (
        <p className="mt-3 rounded-xl border border-dashed border-night-500 bg-night-850/40 px-5 py-4 text-sm leading-relaxed text-ink-400">
          Aucune réalisation documentée à ce jour pour cette période. La ligne
          est laissée vide plutôt que remplie par une réalisation qui n&apos;y
          appartient pas.
        </p>
      ) : (
        <>
          {/* ------------------------------------------ Tableau (grand écran) */}
          <div className="surface mt-3 hidden overflow-hidden lg:block">
            <table className="w-full table-fixed">
              <caption className="sr-only">
                {titre} — réalisations et domaines de compétences mis en œuvre
              </caption>
              <colgroup>
                <col className="w-[38%]" />
                <col className="w-[9%]" />
                {domainesSynthese.map((d) => (
                  <col key={d.id} />
                ))}
              </colgroup>
              <thead>
                <tr className="border-b border-night-600">
                  <th
                    scope="col"
                    className="px-4 py-3 text-left font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-ink-400"
                  >
                    Réalisation professionnelle
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-ink-400"
                  >
                    Période
                  </th>
                  {domainesSynthese.map((d) => (
                    <th
                      key={d.id}
                      scope="col"
                      title={`${d.titre} — ${d.activites.join(" · ")}`}
                      className="px-2 py-3 text-center text-[0.68rem] font-semibold leading-tight text-ink-300"
                    >
                      {d.court}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-night-700/50">
                {lignes.map((l) => (
                  <tr key={l.cle} className="group transition-colors hover:bg-night-800/50">
                    <td className="px-4 py-2.5 align-middle">
                      <Link href={l.href} className="flex items-baseline gap-2.5">
                        <Intitule ligne={l} />
                      </Link>
                    </td>
                    <td className="px-2 py-2.5 align-middle">
                      <Date ligne={l} />
                    </td>
                    {domainesSynthese.map((d) => (
                      <td key={d.id} className="px-2 py-2.5 text-center align-middle">
                        {l.domaines.includes(d.id) ? (
                          <Marque />
                        ) : (
                          <span className="sr-only">Non concerné</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --------------------------------------------- Cartes (sous lg) */}
          <ul className="mt-3 space-y-2.5 lg:hidden">
            {lignes.map((l) => (
              <li key={l.cle}>
                <Link
                  href={l.href}
                  className="surface group flex flex-col gap-2.5 p-4 transition-colors hover:border-cyan-bright/40"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="flex min-w-0 flex-1 items-baseline gap-2.5">
                      <Intitule ligne={l} />
                    </span>
                    <Date ligne={l} />
                  </div>

                  {l.domaines.length > 0 ? (
                    <ul className="flex flex-wrap gap-1.5 border-t border-night-700/60 pt-2.5">
                      {l.domaines.map((id) => {
                        const d = domainesSynthese.find((x) => x.id === id);
                        if (!d) return null;
                        return (
                          <li
                            key={id}
                            className="inline-flex items-center gap-1.5 rounded-md border border-cyan-bright/30 bg-cyan-bright/10 px-2 py-0.5 font-mono text-[0.64rem] font-medium text-cyan-bright"
                          >
                            <span
                              aria-hidden
                              className="size-1.5 rotate-45 rounded-[1px] bg-cyan-bright"
                            />
                            {d.court}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="border-t border-night-700/60 pt-2.5 font-mono text-[0.64rem] text-ink-400">
                      Aucun des six domaines de ce tableau
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/* ------------------------------------------------------------ Composant */

export function SyntheseRealisations() {
  const groupes = lignesParPeriode();
  const aDesDatesEstimees = Object.values(groupes)
    .flat()
    .some((l) => l.dateEstimee);
  const aDesAnterieures = Object.values(groupes)
    .flat()
    .some((l) => l.anterieure);

  return (
    <div>
      {/* ------------------------------------------------ Les trois périodes */}
      <div>
        {/* Une période sans réalisation n'est pas affichée : une bande vide
            attire l'œil sur ce qui manque plutôt que sur ce qui est fait.
            Elle réapparaîtra d'elle-même dès qu'une réalisation s'y rattache. */}
        {PERIODES.filter((p) => groupes[p.cle].length > 0).map((p) => (
          <BlocPeriode
            key={p.cle}
            titre={p.titre}
            detail={p.detail}
            lignes={groupes[p.cle]}
          />
        ))}
      </div>

      {/* ----------------------------------------------------- Notes de lecture */}
      <div className="surface mt-8 px-5 py-4">
        <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
          Lecture du tableau
        </p>
        <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-ink-400">
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-[0.4rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-cyan-bright"
            />
            Un losange indique que la réalisation met en œuvre le domaine. Il
            ne signifie pas que la compétence est maîtrisée, mais qu&apos;elle
            a été exercée et qu&apos;une preuve est consultable.
          </li>
          {aDesDatesEstimees && (
            <li className="flex gap-2">
              <span className="mt-[0.1rem] shrink-0 font-mono text-ink-400">~</span>
              Mois approché d&apos;après l&apos;enchaînement des missions,
              lorsque le document d&apos;origine ne porte pas de date.
            </li>
          )}
          {aDesAnterieures && (
            <li className="flex gap-2">
              <span className="mt-[0.1rem] shrink-0 font-mono text-amber-soft">*</span>
              Réalisation en milieu professionnel antérieure à l&apos;entrée en
              formation de septembre 2025, rattachée à la première année et
              signalée comme telle.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
