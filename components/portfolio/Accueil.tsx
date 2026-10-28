import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MapPin,
  Radar,
  Users,
} from "lucide-react";

import { site } from "@/data/site";
import type { Situation } from "@/data/situations";
import { themes, dureeHebdomadaire } from "@/data/veille";
import { ressource } from "@/lib/chemin";
import { formaterPeriode, isoPeriode } from "@/lib/dates";
import { TechBadges } from "@/components/ui";

/**
 * Sections de la page d'accueil.
 *
 * L'accueil présente le portfolio et invite à l'explorer : parcours,
 * entreprise, quelques situations représentatives, domaines techniques,
 * veille. Aucun compteur de progression, aucun statut documentaire —
 * ces éléments relèvent de la préparation, pas de l'accueil d'un visiteur.
 */

/* ------------------------------------------------------------- En-tête */

export function TitreSection({
  surtitre,
  titre,
  lien,
}: {
  surtitre: string;
  titre: string;
  lien?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-night-700/60 pb-4">
      <div>
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cyan-bright">
          {surtitre}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-100">
          {titre}
        </h2>
      </div>
      {lien && (
        <Link
          href={lien.href}
          className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.75rem] font-medium text-cyan-bright transition-colors hover:text-cyan-soft"
        >
          {lien.label}
          <ArrowRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ Parcours */

const jalons = [
  {
    periode: "Avant 2024",
    titre: "Un parcours venu d'ailleurs",
    texte:
      "Architecture, gestion de point de vente, sécurité, exploitation de cinéma : des métiers où il faut comprendre un ensemble, le représenter clairement et le faire tenir dans la durée. C'est exactement ce que je fais aujourd'hui avec un système d'information.",
  },
  {
    periode: "Depuis septembre 2025",
    titre: "BTS SIO option SISR",
    texte:
      "Formation en alternance chez UFITECH, à Nice : systèmes, réseaux, virtualisation, cybersécurité et support aux utilisateurs.",
  },
  {
    periode: "En entreprise",
    titre: "Alternant au service informatique",
    texte:
      "Contrat de professionnalisation chez Goiran et Compagnie, où j'interviens sur le support quotidien et je participe aux projets d'infrastructure.",
  },
];

export function Parcours() {
  return (
    <>
      <TitreSection
        surtitre="Mon parcours"
        titre="D'une reconversion à l'informatique"
        lien={{ href: "/cv", label: "Voir mon CV" }}
      />

      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {jalons.map((j) => (
          <li
            key={j.titre}
            className="surface rule-top flex flex-col gap-2.5 p-5"
          >
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {j.periode}
            </p>
            <h3 className="text-balance text-base font-semibold leading-snug text-ink-100">
              {j.titre}
            </h3>
            <p className="text-sm leading-relaxed text-ink-400">{j.texte}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ------------------------------------------------------- Environnement */

const reperes = [
  { icone: Building2, libelle: "Travaux publics et assainissement" },
  { icone: Users, libelle: "Une cinquantaine de collaborateurs" },
  { icone: MapPin, libelle: "Alpes-Maritimes" },
  { icone: GraduationCap, libelle: "Contrat de professionnalisation" },
];

export function Environnement() {
  return (
    <>
      <TitreSection
        surtitre="Mon environnement professionnel"
        titre="Goiran et Compagnie"
        lien={{ href: "/entreprise", label: "Découvrir l'entreprise" }}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-4 text-pretty leading-relaxed text-ink-300">
          <p>
            Une entreprise centenaire de travaux publics, où le service
            informatique tient en très peu de personnes pour un périmètre
            large : postes de travail et mobiles des équipes de terrain,
            serveur de virtualisation, annuaire, messagerie, sauvegardes, et
            les logiciels métier sur lesquels repose toute l&apos;activité.
          </p>
          <p>
            C&apos;est ce qui rend l&apos;alternance formatrice : en une même
            semaine, je peux déboguer une synchronisation applicative, rédiger
            une procédure pour les utilisateurs, et contribuer à un projet
            d&apos;infrastructure. Les missions rassemblées ici viennent toutes
            de ce quotidien.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {reperes.map((r) => {
            const Icone = r.icone;
            return (
              <li
                key={r.libelle}
                className="surface flex items-center gap-3 px-4 py-3"
              >
                <Icone
                  className="size-4 shrink-0 text-cyan-bright"
                  aria-hidden
                />
                <span className="text-sm text-ink-300">{r.libelle}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

/* --------------------------------------------- Situations en vedette */

/**
 * Carte illustrée, réservée à l'accueil.
 * L'illustration est TOUJOURS une capture déjà publiée dans la situation :
 * jamais une image d'ambiance, jamais une illustration générique.
 */
export function SituationVedetteCard({ situation }: { situation: Situation }) {
  return (
    <Link
      href={`/situations/${situation.slug}`}
      data-bloc={situation.blocPrincipal}
      className="surface group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-night-700/60 bg-night-950">
        <Image
          src={ressource(situation.illustration)}
          alt=""
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.72rem] font-bold tracking-wider text-[var(--bloc-accent)]">
            {situation.reference}
          </span>
          <span aria-hidden className="text-night-500">
            ·
          </span>
          <time
            dateTime={isoPeriode(situation.periode)}
            className="font-mono text-[0.7rem] text-ink-400"
          >
            {formaterPeriode(situation.periode)}
          </time>
        </div>

        <h3 className="text-balance text-base font-semibold leading-snug text-ink-100">
          {situation.titre}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-ink-400">
          {situation.resume}
        </p>

        <div className="mt-auto space-y-3 pt-1">
          <TechBadges items={situation.technologies.slice(0, 4)} />
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium text-[var(--bloc-accent)]">
            Lire la situation
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------ Compétences techniques */

const domainesTechniques = [
  {
    titre: "Systèmes et virtualisation",
    texte:
      "Hyper-V, Windows Server, Active Directory, DHCP et DNS : cartographier l'existant, comprendre comment les services s'appuient les uns sur les autres.",
    outils: ["Hyper-V", "Windows Server", "Active Directory", "DHCP", "DNS"],
  },
  {
    titre: "Réseau et sécurité",
    texte:
      "Segmentation, pare-feu, redondance d'accès et mesures de sécurisation réalistes pour une PME sans budget dédié à la cybersécurité.",
    outils: ["Pare-feu", "VLAN", "Multi-WAN", "VPN", "ANSSI"],
  },
  {
    titre: "Sauvegarde et continuité",
    texte:
      "Décrire les flux de sauvegarde, identifier ce qu'un sinistre détruirait réellement, et écrire les procédures de reprise correspondantes.",
    outils: ["Windows Server Backup", "NAS", "Sauvegarde cloud", "PRA"],
  },
  {
    titre: "Support et assistance",
    texte:
      "Traiter la demande, puis transformer la résolution en procédure écrite pour que l'utilisateur se débloque seul la fois suivante.",
    outils: ["Microsoft 365", "Outlook", "Exchange", "Postes de travail"],
  },
  {
    titre: "Logiciels métier",
    texte:
      "Le logiciel de gestion et l'outil de planification terrain : paramétrage, interopérabilité, diagnostic de synchronisation et formation des utilisateurs.",
    outils: ["EBP Bâtiment Elite", "Praxedo", "SQL Server"],
  },
  {
    titre: "Automatisation et conformité",
    texte:
      "Automatiser le suivi des demandes, et documenter ce que la réglementation impose en matière de données personnelles.",
    outils: ["Power Automate", "Microsoft Planner", "RGPD", "CNIL"],
  },
];

export function CompetencesTechniques() {
  return (
    <>
      <TitreSection
        surtitre="Mes compétences techniques"
        titre="Ce que j'ai appris à faire"
        lien={{ href: "/competences", label: "Voir le détail par compétence" }}
      />

      <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-ink-400">
        Les domaines sur lesquels j&apos;ai travaillé pendant mon alternance.
        Chacun s&apos;appuie sur des missions réelles, documentées dans les
        situations professionnelles.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domainesTechniques.map((d) => (
          <li key={d.titre} className="surface rule-top flex flex-col gap-3 p-5">
            <h3 className="text-base font-semibold leading-snug text-ink-100">
              {d.titre}
            </h3>
            <p className="text-sm leading-relaxed text-ink-400">{d.texte}</p>
            <div className="mt-auto pt-1">
              <TechBadges items={d.outils} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ---------------------------------------------------- Aperçu de la veille */

export function ApercuVeille() {
  return (
    <>
      <TitreSection
        surtitre="Ma veille technologique"
        titre="Rester au contact de l'actualité technique"
        lien={{ href: "/veille", label: "Voir ma veille" }}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-4 text-pretty leading-relaxed text-ink-300">
          <p>
            Je consacre <strong className="font-semibold text-ink-200">
              {dureeHebdomadaire}
            </strong>{" "}
            à ma veille, répartie sur trois séances : alertes par courriel,
            flux RSS d&apos;éditeurs et de sites spécialisés, puis une synthèse
            de fin de semaine. L&apos;automatisation de la collecte est ce qui
            distingue la veille d&apos;une recherche ponctuelle.
          </p>
          <p>
            Chaque thème suivi répond à une question posée par
            l&apos;entreprise, et plusieurs ont déjà débouché sur des bancs
            d&apos;essai menés en conditions réelles.
          </p>
        </div>

        <ul className="space-y-3">
          {themes.map((t) => (
            <li key={t.id} className="surface flex items-start gap-3 px-4 py-3">
              <Radar
                className="mt-0.5 size-4 shrink-0 text-cyan-bright"
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium text-ink-200">{t.titre}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-400">
                  {t.exemples.length} exemple
                  {t.exemples.length > 1 ? "s" : ""} documenté
                  {t.exemples.length > 1 ? "s" : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- Accroche */

export function Accroche() {
  return (
    <div className="space-y-5 text-pretty text-lg leading-relaxed text-ink-300">
      <p>
        Je prépare un <strong className="font-semibold text-ink-100">BTS SIO
        option SISR</strong> chez {site.ecole.nom}, en alternance au service
        informatique de {site.entreprise.nom}, une entreprise de travaux
        publics des Alpes-Maritimes.
      </p>
      <p className="text-base text-ink-400">
        Support quotidien, cartographie de l&apos;infrastructure, sauvegardes,
        sécurité, logiciels métier : ce portfolio rassemble les missions
        auxquelles j&apos;ai participé et ce qu&apos;elles m&apos;ont appris.
        Bonne visite.
      </p>
    </div>
  );
}
