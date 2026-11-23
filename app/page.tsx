import { ArrowRight, Download, FileUser } from "lucide-react";

import { ressource } from "@/lib/chemin";
import { site } from "@/data/site";
import { situations } from "@/data/situations";
import { Section, LinkButton } from "@/components/ui";
import { Photo, Logos } from "@/components/portfolio/Identite";
import {
  Accroche,
  ApercuVeille,
  CompetencesTechniques,
  Environnement,
  Parcours,
  SituationVedetteCard,
  TitreSection,
} from "@/components/portfolio/Accueil";
import { SyntheseRealisations } from "@/components/portfolio/SyntheseRealisations";

/**
 * Page d'accueil.
 *
 * Elle présente le portfolio et invite à l'explorer : qui je suis, d'où je
 * viens, où je travaille, quelques missions représentatives, les domaines
 * techniques abordés et ma veille.
 *
 * Ce qu'elle ne contient délibérément PAS : compteurs E4/E5, statuts
 * documentaires, décompte de preuves. Ces éléments servent à ma préparation
 * et vivent en bas de la page Compétences, pas en page d'accueil.
 */

/** Situations mises en avant — diversité des blocs et des sujets. */
const EN_VEDETTE = [
  "solution-de-sauvegarde-automatisee",
  "plan-de-reprise-dactivite",
  "formation-et-deploiement-outlook",
  "etude-videosurveillance-parking",
] as const;

export default function Accueil() {
  // Résolues depuis la source unique : une situation retirée du portfolio
  // disparaît d'elle-même de l'accueil, sans lien mort possible.
  const vedettes = EN_VEDETTE.map((slug) =>
    situations.find((s) => s.slug === slug),
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <Section className="pt-14 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-16">
          <div className="animate-rise">
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cyan-bright">
              Portfolio professionnel · BTS SIO option SISR
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink-100 sm:text-5xl lg:text-6xl">
              {site.prenom} <span className="text-ink-300">{site.nom}</span>
            </h1>

            <div className="mt-6 max-w-2xl">
              <Accroche />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/situations">
                Découvrir mes situations
                <ArrowRight className="size-4" aria-hidden />
              </LinkButton>
              <LinkButton href="/cv" variante="secondaire">
                <FileUser className="size-4" aria-hidden />
                Voir le CV
              </LinkButton>
            </div>
          </div>

          <div className="animate-rise lg:pt-2">
            <Photo />
          </div>
        </div>

        <div className="mt-12">
          <Logos />
        </div>
      </Section>

      {/* -------------------------------------------------------- Parcours */}
      <Section className="mt-24 sm:mt-32">
        <Parcours />
      </Section>

      {/* --------------------------------------------------- Environnement */}
      <Section className="mt-24">
        <Environnement />
      </Section>

      {/* ------------------------------------------- Situations en vedette */}
      <Section className="mt-24">
        <TitreSection
          surtitre="Mes situations professionnelles"
          titre="Quelques missions de mon alternance"
          lien={{
            href: "/situations",
            label: `Voir les ${situations.length} situations`,
          }}
        />

        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-ink-400">
          Quatre missions choisies pour leur diversité : le déploiement
          d&apos;une solution de sauvegarde, une étude d&apos;infrastructure,
          un support de formation et un dossier de choix technique. Chacune est
          documentée de bout en bout, avec sa documentation complète en
          téléchargement.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vedettes.map((s) => (
            <li key={s.slug} className="flex">
              <SituationVedetteCard situation={s} />
            </li>
          ))}
        </ul>
      </Section>

      {/* --------------------------------- Tableau de synthèse (annexe 8-1) */}
      <Section className="mt-24">
        <TitreSection
          surtitre="Document officiel · Annexe 8-1"
          titre="Tableau de synthèse des réalisations"
        />

        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-ink-400">
          La synthèse attendue à l&apos;examen, reprise ici dans la mise en page
          du site : chaque réalisation documentée, sa période, et les domaines
          de compétences qu&apos;elle met en œuvre. Les intitulés mènent à la
          situation correspondante.
        </p>

        {/* Le document officiel lui-même, rempli, tel qu'il doit être rendu —
            la version ci-dessous n'en est que la mise en page du site. */}
        <div className="surface mt-8 flex flex-wrap items-center justify-between gap-5 px-6 py-5">
          <div>
            <p className="font-semibold text-ink-100">
              L&apos;annexe 8-1 officielle, remplie
            </p>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-400">
              Le formulaire de la session 2025, dans sa mise en page
              d&apos;origine, avec mes réalisations et les domaines qu&apos;elles
              mettent en œuvre. Le tableau ci-dessous en est la transposition
              pour l&apos;écran.
            </p>
            <p className="mt-2 font-mono text-[0.7rem] text-ink-400">
              Classeur Excel · 10 Ko
            </p>
          </div>

          <a
            href={ressource("/documents/Annexe-8-1-Tableau-de-synthese-GUELPA-Anthony.xlsx")}
            download="Annexe-8-1-Tableau-de-synthese-GUELPA-Anthony.xlsx"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-bright px-4 py-2.5 text-sm font-semibold text-night-950 transition-all duration-150 hover:brightness-110"
          >
            <Download className="size-4" aria-hidden />
            Télécharger le document officiel
          </a>
        </div>

        <div className="mt-6">
          <SyntheseRealisations />
        </div>
      </Section>

      {/* --------------------------------------------------- Compétences */}
      <Section className="mt-24">
        <CompetencesTechniques />
      </Section>

      {/* -------------------------------------------------------- Veille */}
      <Section className="mt-24">
        <ApercuVeille />
      </Section>
    </>
  );
}
