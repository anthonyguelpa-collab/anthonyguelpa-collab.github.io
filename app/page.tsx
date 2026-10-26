import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileUser,
  Layers,
  Radar,
  Workflow,
} from "lucide-react";

import { site } from "@/data/site";
import { competences, BLOCS } from "@/data/competences";
import { situations } from "@/data/situations";
import { exemples, themes } from "@/data/veille";
import { Section, LinkButton, BlocTag } from "@/components/ui";
import { Photo, Logos } from "@/components/portfolio/Identite";
import { SituationCard } from "@/components/portfolio/Cards";

const acces = [
  {
    href: "/competences",
    icone: Layers,
    titre: "Compétences",
    texte: "Les 9 compétences des blocs E4 et E5, et les preuves qui les étayent.",
  },
  {
    href: "/situations",
    icone: Workflow,
    titre: "Situations professionnelles",
    texte: "Les missions menées en alternance, documentées de bout en bout.",
  },
  {
    href: "/veille",
    icone: Radar,
    titre: "Veille technologique",
    texte: "Méthode, planning et bancs d'essai menés en conditions réelles.",
  },
  {
    href: "/entreprise",
    icone: Building2,
    titre: "Entreprise",
    texte: "Goiran et Compagnie et le périmètre de ma mission au service informatique.",
  },
];

export default function Accueil() {
  const nbE4 = competences.filter((c) => c.bloc === "e4").length;
  const nbE5 = competences.filter((c) => c.bloc === "e5").length;

  const chiffres = [
    { valeur: `${situations.length}`, libelle: "situations professionnelles" },
    { valeur: `${nbE4 + nbE5}`, libelle: "compétences étayées" },
    { valeur: `${exemples.length}`, libelle: "exemples de veille" },
    { valeur: `${themes.length}`, libelle: "thèmes de veille suivis" },
  ];

  const recentes = situations.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <Section className="pt-12 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-14">
          <div className="animate-rise">
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cyan-bright">
              Portfolio professionnel · BTS SIO option SISR
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl">
              {site.prenom}{" "}
              <span className="text-ink-300">{site.nom}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-300">
              Alternant au service informatique d&apos;une entreprise de BTP de
              Nice. J&apos;y administre un système d&apos;information complet —
              virtualisation, annuaire, sauvegardes, sécurité et logiciels
              métier — et je documente tout ce que je mets en place.
            </p>

            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-400">
              Ce portfolio rassemble les situations professionnelles qui
              valident mes compétences. Chaque compétence renvoie aux missions
              qui l&apos;ont mise en œuvre, et chaque mission renvoie aux
              compétences qu&apos;elle valide.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/competences">
                Parcourir les compétences
                <ArrowRight className="size-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/cv" variante="secondaire">
                <FileUser className="size-4" aria-hidden />
                Voir le CV
              </LinkButton>
            </div>

            <div className="mt-10">
              <Logos />
            </div>
          </div>

          <div className="animate-rise lg:pt-2">
            <Photo />
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {chiffres.map((c) => (
                <div key={c.libelle} className="surface px-4 py-3">
                  <dt className="sr-only">{c.libelle}</dt>
                  <dd>
                    <span className="block font-mono text-2xl font-semibold text-cyan-bright">
                      {c.valeur}
                    </span>
                    <span className="mt-0.5 block text-[0.72rem] leading-tight text-ink-400">
                      {c.libelle}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- Les blocs */}
      <Section className="mt-20 sm:mt-28">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Deux blocs de compétences
        </h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink-400">
          Le référentiel SISR distingue le support et la mise à disposition de
          services d&apos;une part, l&apos;administration des systèmes et des
          réseaux d&apos;autre part. Le portfolio les présente séparément, tout
          en conservant les liens vers les réalisations communes.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {(["e4", "e5"] as const).map((bloc) => (
            <Link
              key={bloc}
              href={`/competences#${bloc}`}
              data-bloc={bloc}
              className="surface rule-top group flex flex-col gap-3 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
            >
              <div className="flex items-center justify-between gap-3">
                <BlocTag bloc={bloc} />
                <span className="font-mono text-[0.7rem] text-ink-400">
                  {bloc === "e4" ? nbE4 : nbE5} compétences
                </span>
              </div>
              <h3 className="text-balance text-lg font-semibold leading-snug text-ink-100">
                {BLOCS[bloc].titre}
              </h3>
              <p className="text-sm leading-relaxed text-ink-400">
                {BLOCS[bloc].epreuve}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium text-[var(--bloc-accent)]">
                Voir le bloc
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------- Accès rapides */}
      <Section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Trouver rapidement
        </h2>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {acces.map((a) => {
            const Icone = a.icone;
            return (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="surface group flex h-full items-start gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-bright/50"
                >
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
                  >
                    <Icone className="size-5" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1.5 text-base font-semibold text-ink-100">
                      {a.titre}
                      <ArrowRight className="size-3.5 text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-cyan-bright" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-400">
                      {a.texte}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* ------------------------------------------------- Situations mises en avant */}
      <Section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
            Quelques situations professionnelles
          </h2>
          <Link
            href="/situations"
            className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-medium text-cyan-bright transition-colors hover:text-cyan-soft"
          >
            Les {situations.length} situations
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
        <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentes.map((s) => (
            <li key={s.slug} className="flex">
              <SituationCard situation={s} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
