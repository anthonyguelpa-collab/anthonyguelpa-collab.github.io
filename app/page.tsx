import { ArrowRight, Download, FileSpreadsheet, FileUser } from "lucide-react";

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
              {/* Le tableau de synthèse est la pièce attendue à l'examen :
                  on y accède sans avoir à faire défiler la page. */}
              <LinkButton href="#document-officiel" variante="secondaire">
                <FileSpreadsheet className="size-4" aria-hidden />
                Tableau de synthèse
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

      {/* ------------------------------------ Le document officiel, en évidence */}
      {/* Placé haut, avec son aperçu : c'est la pièce que le jury vient
          chercher, et elle doit se reconnaître sans avoir à la lire. */}
      <Section id="document-officiel" className="mt-20 scroll-mt-24">
        <div className="surface flex flex-col gap-7 border-l-[3px] border-l-cyan-bright px-6 py-7 sm:flex-row sm:items-center sm:gap-9 sm:px-8">
          <a
            href={ressource("/documents/Annexe-8-1-Tableau-de-synthese-GUELPA-Anthony.pdf")}
            className="group shrink-0 self-start overflow-hidden rounded-md border border-night-600 transition-colors hover:border-cyan-bright"
            aria-label="Ouvrir le tableau de synthèse officiel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ressource("/documents/annexe-8-1-apercu.webp")}
              alt="Première page de l'annexe 8-1 remplie : en-tête du candidat, six domaines de compétences en colonnes et huit réalisations en lignes"
              width={760}
              height={1075}
              loading="lazy"
              className="h-auto w-[9.5rem] transition-transform duration-200 group-hover:scale-[1.02] sm:w-[11rem]"
            />
          </a>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-bright">
              Document officiel · Annexe 8-1
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-100">
              Mon tableau de synthèse, rempli
            </h2>
            <p className="mt-2.5 max-w-2xl text-pretty leading-relaxed text-ink-300">
              Le formulaire de l&apos;épreuve E5 dans sa mise en page
              d&apos;origine : huit réalisations, leurs documents associés, et
              les domaines de compétences que chacune met en œuvre.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={ressource("/documents/Annexe-8-1-Tableau-de-synthese-GUELPA-Anthony.pdf")}
                download="Annexe-8-1-Tableau-de-synthese-GUELPA-Anthony.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-bright px-4 py-2.5 text-sm font-semibold text-night-950 transition-all duration-150 hover:brightness-110"
              >
                <Download className="size-4" aria-hidden />
                Télécharger le document officiel
              </a>
              <LinkButton href="#tableau-de-synthese" variante="secondaire">
                Le lire sur la page
                <ArrowRight className="size-4" aria-hidden />
              </LinkButton>
              <span className="font-mono text-[0.7rem] text-ink-400">
                PDF · 1 page · 77 Ko
              </span>
            </div>
          </div>
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
      {/* L'ancre rend la section citable : le document officiel s'atteint
          par un lien direct, sans faire défiler la page d'accueil. */}
      <Section id="tableau-de-synthese" className="mt-24 scroll-mt-24">
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

        <p className="mt-5 text-sm leading-relaxed text-ink-400">
          Le document officiel lui-même est{" "}
          <a
            href={ressource("/documents/Annexe-8-1-Tableau-de-synthese-GUELPA-Anthony.pdf")}
            download="Annexe-8-1-Tableau-de-synthese-GUELPA-Anthony.pdf"
            className="font-medium text-cyan-bright underline underline-offset-2 transition-colors hover:text-cyan-soft"
          >
            téléchargeable en PDF
          </a>{" "}
          en haut de cette page.
        </p>

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
