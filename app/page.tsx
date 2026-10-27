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
import { tableauSuivi, syntheseSuivi } from "@/lib/suivi";
import { Section, LinkButton } from "@/components/ui";
import { Photo, Logos } from "@/components/portfolio/Identite";
import { ApercuCompetences } from "@/components/portfolio/ApercuCompetences";

/**
 * Page d'accueil — volontairement resserrée.
 *
 * Le visiteur doit comprendre en quelques secondes qui je suis, quelle
 * formation je prépare, et par où entrer. Le détail vit sur les pages
 * dédiées : pas de tableau complet ni d'extraits dupliqués ici.
 */

const acces = [
  {
    href: "/competences",
    icone: Layers,
    titre: "Compétences",
    texte: "Les 9 domaines E4 et E5, et les preuves qui les étayent.",
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
    texte: "Goiran et Compagnie et ma place au service informatique.",
  },
];

export default function Accueil() {
  const lignes = tableauSuivi();
  const synthese = syntheseSuivi(lignes);

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

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-300">
              Alternant au service informatique d&apos;une entreprise de BTP de
              Nice. J&apos;y administre un système d&apos;information complet —
              virtualisation, annuaire, sauvegardes, sécurité et logiciels
              métier — et je documente tout ce que je mets en place.
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
          </div>

          <div className="animate-rise lg:pt-2">
            <Photo />
          </div>
        </div>

        <div className="mt-12">
          <Logos />
        </div>
      </Section>

      {/* ------------------------------------------- Aperçu des compétences */}
      <Section className="mt-24 sm:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
            Où j&apos;en suis
          </h2>
          <p className="font-mono text-[0.7rem] text-ink-400">
            État de ma documentation, pas une validation de jury
          </p>
        </div>

        <div className="mt-6">
          <ApercuCompetences lignes={lignes} synthese={synthese} />
        </div>
      </Section>

      {/* ----------------------------------------------------- Accès rapides */}
      <Section className="mt-24">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Par où commencer
        </h2>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
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
    </>
  );
}
