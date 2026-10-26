import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, Radio } from "lucide-react";

import {
  canaux,
  definitionVeille,
  dureeHebdomadaire,
  exemplesPourTheme,
  planningVeille,
  themes,
  STATUTS,
} from "@/data/veille";
import { Breadcrumb, PageHeader, Section, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Veille technologique",
  description:
    "Méthode, planning et exemples de veille technologique : gestionnaires de mots de passe, virtualisation et standards émergents.",
};

export default function VeillePage() {
  return (
    <Section>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Veille technologique" }]}
      />

      <PageHeader
        surtitre="Organiser son développement professionnel"
        titre="Veille technologique"
        intro={definitionVeille}
      />

      {/* ----------------------------------------------------------- Planning */}
      <section className="mt-14">
        <div className="flex flex-wrap items-center gap-3">
          <CalendarClock className="size-5 text-cyan-bright" aria-hidden />
          <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
            Planning hebdomadaire
          </h2>
          <Badge variante="accent">{dureeHebdomadaire}</Badge>
        </div>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          La veille n&apos;est utile que si elle est régulière. Trois créneaux
          fixes sont réservés dans l&apos;agenda : sans plage horaire définie,
          le flux d&apos;information s&apos;accumule sans jamais être filtré.
        </p>

        <div className="surface mt-6 overflow-hidden">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Créneaux hebdomadaires consacrés à la veille technologique
            </caption>
            <thead>
              <tr className="border-b border-cyan-bright/60">
                <th scope="col" className="px-5 py-3 text-left font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                  Jour
                </th>
                <th scope="col" className="px-5 py-3 text-left font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                  Horaire
                </th>
                <th scope="col" className="px-5 py-3 text-left font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                  Durée
                </th>
                <th scope="col" className="px-5 py-3 text-left font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
                  Activité
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-night-700/50">
              {planningVeille.map((p) => (
                <tr key={p.jour}>
                  <td className="px-5 py-3.5 font-medium text-ink-200">{p.jour}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-cyan-bright">
                    {p.horaire}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-ink-400">
                    {p.duree}
                  </td>
                  <td className="px-5 py-3.5 text-ink-300">{p.activite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------ Canaux */}
      <section className="mt-14">
        <div className="flex items-center gap-3">
          <Radio className="size-5 text-cyan-bright" aria-hidden />
          <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
            Canaux de collecte
          </h2>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {canaux.map((c) => (
            <li key={c.nom} className="surface px-5 py-4">
              <p className="text-sm font-semibold text-ink-100">{c.nom}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ Thèmes */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Thèmes suivis
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Trois thèmes, choisis parce qu&apos;ils répondent chacun à un besoin
          réel de l&apos;entreprise. Une veille efficace est ciblée : élargir
          les sujets revient à ne plus rien suivre.
        </p>

        <div className="mt-8 space-y-10">
          {themes.map((theme) => {
            const exemplesTheme = exemplesPourTheme(theme.id);
            return (
              <article key={theme.id} className="surface rule-top p-6">
                <h3 className="text-xl font-semibold tracking-tight text-ink-100">
                  {theme.titre}
                </h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
                  {theme.justification}
                </p>

                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {exemplesTheme.map((e) => {
                    const statut = STATUTS[e.statut];
                    return (
                      <li key={e.slug}>
                        <Link
                          href={`/veille/${e.slug}`}
                          className="group flex h-full flex-col gap-2 rounded-xl border border-night-600/60 bg-night-850/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-bright/50"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Badge
                              variante={
                                statut.ton === "positif"
                                  ? "positif"
                                  : statut.ton === "negatif"
                                    ? "alerte"
                                    : "neutre"
                              }
                            >
                              {statut.libelle}
                            </Badge>
                            <span className="font-mono text-[0.68rem] text-ink-400">
                              {e.date}
                            </span>
                          </div>
                          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-100">
                            {e.titre}
                            <ArrowRight
                              className="size-3.5 shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-cyan-bright"
                              aria-hidden
                            />
                          </p>
                          <p className="text-xs leading-relaxed text-ink-400">
                            {e.resume}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
    </Section>
  );
}
