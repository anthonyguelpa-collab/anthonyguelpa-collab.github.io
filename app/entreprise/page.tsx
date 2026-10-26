import type { Metadata } from "next";
import {
  Building2,
  Cpu,
  HardDrive,
  Headphones,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";

import { site } from "@/data/site";
import { Breadcrumb, PageHeader, Section, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "L'entreprise",
  description:
    "Goiran et Compagnie, entreprise de BTP des Alpes-Maritimes, et le périmètre de ma mission au service informatique.",
};

const perimetre = [
  {
    icone: Cpu,
    titre: "Virtualisation",
    detail:
      "Un hôte Hyper-V physique porte l'ensemble de la production : une machine virtuelle dédiée au logiciel de gestion métier, une machine virtuelle de production portant les rôles d'infrastructure.",
  },
  {
    icone: Network,
    titre: "Réseau et annuaire",
    detail:
      "Active Directory, DHCP et DNS, un réseau local filaire commuté, un pare-feu en point d'entrée unique et un accès Internet redondé sur trois liens.",
  },
  {
    icone: HardDrive,
    titre: "Stockage et sauvegarde",
    detail:
      "Des partages réseau par service, un NAS pour les sauvegardes quotidiennes et mensuelles, des disques externes en rotation et une sauvegarde cloud des données.",
  },
  {
    icone: ShieldCheck,
    titre: "Sécurité",
    detail:
      "Protection des postes par antivirus centralisé, filtrage de la messagerie, gestion des mobiles par MDM, et une démarche de mise en conformité RGPD.",
  },
];

const applicatifs = [
  { nom: "EBP Bâtiment Elite", role: "Devis, chantiers, facturation" },
  { nom: "Quadra", role: "Comptabilité, paie, gestion" },
  { nom: "Praxedo", role: "Planification des interventions terrain" },
  { nom: "Libeo", role: "Gestion des factures fournisseurs" },
  { nom: "Microsoft 365", role: "Messagerie, bureautique, collaboration" },
  { nom: "Téléphonie VoIP", role: "Postes IP et softphones" },
];

const missions = [
  {
    icone: Headphones,
    titre: "Support aux utilisateurs",
    detail:
      "Traitement des demandes d'assistance de niveau 1 et 2 sur les postes, la messagerie et les logiciels métier. Qualification des incidents, résolution, et escalade vers le prestataire lorsque le niveau d'intervention le justifie.",
  },
  {
    icone: Network,
    titre: "Administration de l'infrastructure",
    detail:
      "Gestion des comptes et des habilitations, suivi des sauvegardes, supervision des services d'infrastructure, et interventions sur le réseau local.",
  },
  {
    icone: Building2,
    titre: "Projets d'infrastructure et de sécurité",
    detail:
      "Conduite de projets confiés par la direction : plan de reprise d'activité, plan de sécurisation, étude de vidéosurveillance, automatisation des flux de travail, mise en conformité réglementaire.",
  },
  {
    icone: Users,
    titre: "Documentation et formation interne",
    detail:
      "Production des supports de formation et des procédures destinés aux collaborateurs, dans une entreprise où la majorité des utilisateurs ne sont pas des informaticiens.",
  },
];

export default function EntreprisePage() {
  return (
    <Section>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Entreprise" }]}
      />

      <PageHeader
        surtitre="Alternance"
        titre={site.entreprise.nom}
        intro={
          <>
            Entreprise de travaux publics des Alpes-Maritimes spécialisée dans
            l&apos;assainissement : vidange, débouchage, curage, nettoyage et
            dératisation. Elle intervient auprès de clients particuliers,
            professionnels et collectivités, avec des équipes réparties entre
            le siège et le terrain.
          </>
        }
      >
        <ul className="flex flex-wrap gap-2">
          <Badge>{site.entreprise.secteur}</Badge>
          <Badge>{site.entreprise.region}</Badge>
          <Badge>26 postes de travail</Badge>
          <Badge>{site.entreprise.contrat}</Badge>
        </ul>
      </PageHeader>

      {/* ------------------------------------------------ Le système d'information */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Le système d&apos;information
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Une infrastructure de taille modeste mais complète, qui réunit en un
          seul périmètre à peu près tous les sujets d&apos;un administrateur
          systèmes et réseaux. L&apos;entreprise n&apos;a pas de service
          informatique étoffé : elle s&apos;appuie sur un prestataire externe
          pour les niveaux 2 et 3, et sur le service interne pour le quotidien.
        </p>

        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {perimetre.map((p) => {
            const Icone = p.icone;
            return (
              <li key={p.titre} className="surface flex gap-4 p-5">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
                >
                  <Icone className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink-100">
                    {p.titre}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
                    {p.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ----------------------------------------------------- Applicatifs métier */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Les applications métier
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          L&apos;activité repose sur une chaîne applicative qui va du devis à
          la facturation, en passant par la planification des interventions.
          Ces outils dialoguent entre eux : une grande partie du support
          consiste à maintenir ces échanges en bon état.
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {applicatifs.map((a) => (
            <li key={a.nom} className="surface px-5 py-4">
              <p className="font-mono text-sm font-semibold text-cyan-bright">
                {a.nom}
              </p>
              <p className="mt-1 text-sm text-ink-400">{a.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ Ma mission */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Ma mission au sein de l&apos;entreprise
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Je suis alternant au service informatique. Le poste couvre le support
          quotidien, l&apos;administration de l&apos;infrastructure et la
          conduite de projets confiés par la direction. La taille de la
          structure fait que je ne suis spécialisé sur rien : je traite une
          demande d&apos;assistance le matin et je travaille sur le plan de
          reprise d&apos;activité l&apos;après-midi.
        </p>

        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {missions.map((m) => {
            const Icone = m.icone;
            return (
              <li key={m.titre} className="surface rule-top flex flex-col gap-3 p-5">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
                >
                  <Icone className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-ink-100">
                  {m.titre}
                </h3>
                <p className="text-sm leading-relaxed text-ink-400">
                  {m.detail}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------------------------------- Caviardage */}
      <aside className="surface mt-14 border-l-[3px] border-l-night-500 px-6 py-5">
        <p className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-200">
          Note sur la confidentialité
        </p>
        <p className="text-sm leading-relaxed text-ink-400">
          Les documents techniques reproduits dans ce portfolio ont été
          caviardés : les noms d&apos;hôtes, les plans d&apos;adressage, le nom
          du prestataire, le modèle des équipements de sécurité et
          l&apos;adresse des sites sont remplacés par des équivalents
          génériques. La démarche technique est intégralement conservée ; les
          éléments qui faciliteraient une attaque ne sont pas publiés.
        </p>
      </aside>
    </Section>
  );
}
