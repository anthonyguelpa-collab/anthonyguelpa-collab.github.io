import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Cpu,
  HardDrive,
  Headphones,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";

import { site } from "@/data/site";
import { situations } from "@/data/situations";
import { Breadcrumb, PageHeader, Section, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "L'entreprise",
  description:
    "Goiran et Compagnie, entreprise d'assainissement des Alpes-Maritimes, et mon alternance au service informatique : missions, environnement technique et apports de la formation.",
};

/* ------------------------------------------------------------------ Données */

const perimetre = [
  {
    icone: Cpu,
    titre: "Virtualisation",
    detail:
      "Un serveur physique porte l'hyperviseur et héberge deux machines virtuelles : celle du logiciel de gestion métier, et celle qui porte les rôles d'infrastructure.",
  },
  {
    icone: Network,
    titre: "Réseau et annuaire",
    detail:
      "Active Directory, DHCP et DNS, un réseau local filaire commuté, un pare-feu en point d'entrée unique et trois liens Internet hiérarchisés avec bascule automatique.",
  },
  {
    icone: HardDrive,
    titre: "Stockage et sauvegarde",
    detail:
      "Des partages réseau par service, un NAS pour les sauvegardes quotidiennes et mensuelles, deux disques externes chiffrés en rotation et une sauvegarde cloud des données.",
  },
  {
    icone: ShieldCheck,
    titre: "Sécurité",
    detail:
      "Antivirus centralisé sur les postes, filtrage de la messagerie, gestion de la flotte mobile par MDM, et la démarche de mise en conformité RGPD que j'ai menée.",
  },
];

const applicatifs = [
  { nom: "EBP Bâtiment Elite", role: "Devis, chantiers, facturation" },
  { nom: "Quadra", role: "Comptabilité, paie, gestion" },
  { nom: "Praxedo", role: "Planification des interventions terrain" },
  { nom: "Libeo", role: "Factures fournisseurs" },
  { nom: "Microsoft 365", role: "Messagerie, bureautique, collaboration" },
  { nom: "Téléphonie VoIP", role: "Postes IP et softphones" },
];

const missions = [
  {
    icone: Headphones,
    titre: "Le support au quotidien",
    detail:
      "Je reçois les demandes, je les qualifie et je les traite : postes, messagerie, impressions, logiciels métier. Quand un incident revient plusieurs fois, j'écris la procédure plutôt que de réintervenir — c'est comme ça que sont nées mes fiches sur le logiciel de gestion.",
  },
  {
    icone: Network,
    titre: "L'administration de l'infrastructure",
    detail:
      "Comptes et habilitations dans l'annuaire, suivi des sauvegardes, rotation des disques externes, surveillance des services. C'est la partie la moins visible du poste et celle où une erreur coûte le plus cher.",
  },
  {
    icone: Building2,
    titre: "Les projets confiés par la direction",
    detail:
      "Plan de reprise d'activité, plan de sécurisation, étude de vidéosurveillance, automatisation du suivi des tâches, mise en conformité RGPD. Ces dossiers m'ont appris à chiffrer une proposition et à la défendre devant des personnes qui ne sont pas informaticiennes.",
  },
  {
    icone: Users,
    titre: "La formation et la documentation",
    detail:
      "Je conçois les supports destinés aux collaborateurs. Dans une entreprise où presque personne n'est informaticien, un service n'est réellement déployé que lorsque les gens savent s'en servir.",
  },
];

const apports = [
  {
    titre: "Un périmètre complet, à petite échelle",
    detail:
      "Virtualisation, annuaire, sauvegardes, réseau, sécurité, logiciels métier : j'ai sous la main à peu près tous les sujets du référentiel SISR, sur une infrastructure que je peux embrasser entièrement. Dans une grande structure, je serais spécialisé sur une brique.",
  },
  {
    titre: "La responsabilité réelle des décisions",
    detail:
      "Quand je recommande une mesure de sécurité, elle est chiffrée et elle part en arbitrage. Ça oblige à formuler un besoin en termes de coût et de risque, pas seulement en termes techniques.",
  },
  {
    titre: "L'utilisateur comme partie du système",
    detail:
      "La moitié des incidents se règlent par une procédure écrite ou une formation. Mon parcours précédent en encadrement d'équipes me sert ici au moins autant que la technique.",
  },
  {
    titre: "La documentation comme réflexe",
    detail:
      "Rien de ce que j'ai mis en place n'existait sur le papier à mon arrivée. Documenter est devenu ma façon de travailler — et c'est ce qui rend ce portfolio possible.",
  },
];

/* -------------------------------------------------------------------- Page */

export default function EntreprisePage() {
  return (
    <Section>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Entreprise" }]}
      />

      <PageHeader
        surtitre="Mon alternance"
        titre={site.entreprise.nom}
        intro="Je suis alternant au service informatique d'une entreprise d'assainissement des Alpes-Maritimes. Voici ce qu'elle fait, où je me situe dedans, et ce que ce poste m'apporte dans ma formation."
      >
        <ul className="flex flex-wrap gap-2">
          <Badge>{site.entreprise.secteur}</Badge>
          <Badge>{site.entreprise.region}</Badge>
          <Badge>26 postes de travail</Badge>
          <Badge>{site.entreprise.contrat}</Badge>
        </ul>
      </PageHeader>

      {/* ------------------------------------------------------ L'entreprise */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          L&apos;entreprise
        </h2>

        <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-ink-300">
          <p>
            Goiran et Compagnie intervient dans l&apos;assainissement et les
            travaux publics : vidange, débouchage, curage, nettoyage et
            dératisation. L&apos;activité se partage entre des interventions
            d&apos;urgence — une canalisation bouchée ne peut pas attendre —
            et des chantiers planifiés pour des professionnels et des
            collectivités.
          </p>
          <p>
            Les clients vont du particulier à la collectivité, en passant par
            les syndics et les entreprises. Cette diversité se retrouve dans le
            système d&apos;information : il faut à la fois un devis rapide pour
            un particulier et un suivi de chantier complet pour un marché
            public.
          </p>
          <p>
            L&apos;activité est organisée en deux pôles, qui disposent chacun de
            leur propre dossier dans le logiciel de gestion et de leur agence
            dans l&apos;outil de planification terrain. Cette séparation
            explique une bonne partie des réglages que je documente : une
            intervention saisie sur le mauvais pôle ne remonte pas.
          </p>
          <p>
            Côté organisation, le travail s&apos;articule entre les équipes
            commerciales qui établissent les devis, les techniciens qui
            interviennent sur le terrain, le back-office qui facture, et la
            direction. Le service informatique est transverse : il touche à
            tous ces métiers.
          </p>
        </div>
      </section>

      {/* ------------------------------------------- Mon arrivée et ma place */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Mon arrivée et ma place dans l&apos;équipe
        </h2>

        <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-ink-300">
          <p>
            Je suis arrivé en contrat de professionnalisation, en parallèle de
            mon BTS SIO option SISR. L&apos;entreprise n&apos;a pas de service
            informatique étoffé : elle s&apos;appuie sur un prestataire externe
            pour les niveaux 2 et 3, et sur le service interne pour tout le
            quotidien. Je suis donc rapidement devenu l&apos;interlocuteur de
            premier niveau pour l&apos;ensemble des collaborateurs.
          </p>
          <p>
            Ce que j&apos;ai découvert en arrivant a orienté une grande partie
            de mon travail : l&apos;infrastructure fonctionnait, mais elle
            n&apos;était décrite nulle part. Elle reposait sur la mémoire de
            l&apos;équipe et du prestataire. Ma première mission d&apos;ampleur
            a donc été de la cartographier — et c&apos;est ce recensement qui a
            rendu possibles tous les projets qui ont suivi.
          </p>
          <p>
            Ma position est un peu particulière : je suis le seul en interne sur
            le sujet, ce qui veut dire beaucoup d&apos;autonomie, mais aussi
            l&apos;obligation de savoir quand escalader. Une partie de mon
            apprentissage a consisté à apprendre où s&apos;arrête mon périmètre
            et où commence celui du prestataire.
          </p>
          <p>
            Le fait de ne pas être spécialisé m&apos;a plutôt servi : je traite
            une demande d&apos;assistance le matin et je travaille sur le plan
            de reprise d&apos;activité l&apos;après-midi. C&apos;est exigeant,
            mais c&apos;est exactement ce qu&apos;on attend d&apos;un
            administrateur systèmes et réseaux dans une structure de cette
            taille.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- Mes missions */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Mes missions au quotidien
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Mon poste couvre quatre volets. Ils se répondent : le support nourrit
          la documentation, la documentation réduit le support, et les projets
          naissent le plus souvent d&apos;un problème constaté au support.
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

        <p className="mt-6 max-w-3xl leading-relaxed text-ink-400">
          Chacun de ces volets est documenté en détail dans les{" "}
          <Link
            href="/situations"
            className="text-cyan-bright underline underline-offset-2 hover:text-cyan-soft"
          >
            {situations.length} situations professionnelles
          </Link>{" "}
          de ce portfolio.
        </p>
      </section>

      {/* --------------------------------------------- L'environnement technique */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          L&apos;environnement technique
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Une infrastructure de taille modeste, mais qui réunit en un seul
          périmètre à peu près tous les sujets d&apos;un administrateur
          systèmes et réseaux. Voici ce sur quoi je travaille réellement.
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

        <h3 className="mt-10 text-lg font-semibold text-ink-100">
          Les applications métier
        </h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          La chaîne applicative va du devis à la facturation, en passant par la
          planification des interventions. Ces outils dialoguent entre eux, et
          maintenir ces échanges en bon état représente une part importante de
          mon travail.
        </p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* ---------------------------------------- Ce que l'alternance m'apporte */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Ce que cette alternance m&apos;apporte
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Je suis arrivé à l&apos;informatique après un parcours en
          architecture d&apos;intérieur, en encadrement d&apos;équipes et en
          sécurité. Cette alternance est ce qui a transformé une reconversion en
          métier.
        </p>

        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {apports.map((a) => (
            <li key={a.titre} className="surface rule-top flex flex-col gap-2 p-5">
              <h3 className="text-base font-semibold text-ink-100">
                {a.titre}
              </h3>
              <p className="text-sm leading-relaxed text-ink-400">{a.detail}</p>
            </li>
          ))}
        </ul>

        <div className="surface mt-6 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed text-ink-300">
            Pour voir concrètement ce que ce poste m&apos;a permis de produire,
            le plus simple est de parcourir les compétences et les preuves qui
            les étayent.
          </p>
          <Link
            href="/competences"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-bright px-4 py-2.5 text-sm font-semibold text-night-950 transition-all duration-150 hover:brightness-110"
          >
            Voir les compétences
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- Caviardage */}
      <aside className="surface mt-14 border-l-[3px] border-l-night-500 px-6 py-5">
        <p className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-200">
          Note sur la confidentialité
        </p>
        <p className="text-sm leading-relaxed text-ink-400">
          Les documents techniques reproduits dans ce portfolio ont été
          caviardés : noms d&apos;hôtes, plans d&apos;adressage, nom du
          prestataire, modèle des équipements de sécurité et adresses de sites
          sont remplacés par des équivalents génériques. La démarche technique
          est intégralement conservée ; les éléments qui faciliteraient une
          attaque ne sont pas publiés.
        </p>
      </aside>
    </Section>
  );
}
