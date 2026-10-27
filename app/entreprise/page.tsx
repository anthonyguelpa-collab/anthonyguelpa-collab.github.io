import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Compass,
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
    "Goiran et Compagnie, entreprise d'assainissement des Alpes-Maritimes, et mon alternance au service informatique : missions, environnement technique et progression.",
};

/* ------------------------------------------------------------------ Données */

/**
 * Lien discret vers une situation professionnelle, posé dans le fil du texte.
 * La page raconte l'expérience ; la preuve technique vit dans la situation.
 */
function Preuve({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/situations/${slug}`}
      className="text-cyan-bright underline decoration-cyan-bright/40 underline-offset-2 transition-colors hover:decoration-cyan-bright"
    >
      {children}
    </Link>
  );
}

const perimetre = [
  {
    icone: Cpu,
    titre: "Virtualisation",
    detail:
      "Un serveur physique porte l'hyperviseur et héberge deux machines virtuelles. Je l'ai découvert en arrivant et c'est en le cartographiant que j'ai compris comment l'ensemble tenait debout.",
  },
  {
    icone: Network,
    titre: "Réseau et annuaire",
    detail:
      "Active Directory, DHCP et DNS, un réseau local commuté, un pare-feu en point d'entrée unique et trois liens Internet hiérarchisés. J'y interviens pour les comptes et les habilitations ; les modifications du pare-feu passent par le prestataire. J'ai participé à la mise en place des liens de secours, en réalisant le raccordement physique et la recette.",
  },
  {
    icone: HardDrive,
    titre: "Stockage et sauvegarde",
    detail:
      "Des partages par service, un NAS pour les sauvegardes quotidiennes et mensuelles, deux disques externes en rotation hebdomadaire et une sauvegarde cloud. Je suis leur bon déroulement et j'ai documenté l'ensemble des flux.",
  },
  {
    icone: ShieldCheck,
    titre: "Sécurité",
    detail:
      "Antivirus centralisé, filtrage de la messagerie, gestion de la flotte mobile. C'est le domaine où j'ai le plus proposé et le moins déployé seul : les mesures touchent à des budgets et à des habitudes de travail.",
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

const apports = [
  {
    titre: "Passer du symptôme à la cause",
    detail:
      "Au début, je traitais les demandes une par une. En documentant les incidents récurrents sur le logiciel métier, j'ai compris que la plupart venaient de fiches clients incomplètes — et qu'une procédure écrite réglait le problème mieux qu'une nouvelle intervention.",
  },
  {
    titre: "Formuler un besoin autrement qu'en termes techniques",
    detail:
      "Une recommandation de sécurité ne se défend pas avec des arguments techniques devant une direction. J'ai appris à la présenter en coût, en risque et en délai — et à accepter qu'elle soit arbitrée, parfois reportée.",
  },
  {
    titre: "Savoir où s'arrête mon périmètre",
    detail:
      "Une partie de mon apprentissage a consisté à reconnaître les situations où j'escalade vers le prestataire plutôt que d'intervenir. C'est moins spectaculaire que de tout faire soi-même, mais c'est ce qu'on attend d'un niveau 1 et 2.",
  },
  {
    titre: "Documenter comme méthode de travail",
    detail:
      "Rien de ce que j'ai décrit n'existait sur le papier à mon arrivée. Documenter est devenu ma façon d'apprendre l'infrastructure autant que de la transmettre.",
  },
];

const enCours = [
  "L'administration réseau au-delà de la couche utilisateur : la segmentation et le filtrage restent du ressort du prestataire, je les étudie plutôt que je ne les configure.",
  "Le déploiement d'infrastructure en conditions réelles, que je travaille cette année en laboratoire.",
  "La supervision et la journalisation, aujourd'hui limitées à ce que remontent les outils en place.",
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
        intro="Je suis alternant au service informatique d'une entreprise d'assainissement des Alpes-Maritimes. Voici ce qu'elle fait, comment j'y suis entré, et ce que j'y ai appris jusqu'ici."
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
            d&apos;urgence — une canalisation bouchée ne peut pas attendre — et
            des chantiers planifiés pour des professionnels et des
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
            dans l&apos;outil de planification terrain. J&apos;ai mis un certain
            temps à comprendre cette séparation, et elle explique une bonne
            partie des anomalies que je traite : une intervention saisie sur le
            mauvais pôle ne remonte pas.
          </p>
          <p>
            Le travail s&apos;articule entre les équipes commerciales qui
            établissent les devis, les techniciens qui interviennent sur le
            terrain, le back-office qui facture, et la direction. Le service
            informatique est transverse : il touche à tous ces métiers, ce qui
            oblige à comprendre un peu de chacun.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- Mon arrivée */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Mon arrivée et ma progression
        </h2>

        <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-ink-300">
          <p>
            Je suis arrivé en contrat de professionnalisation, en parallèle de
            mon BTS SIO option SISR. L&apos;entreprise n&apos;a pas de service
            informatique étoffé : elle s&apos;appuie sur un prestataire externe
            pour les niveaux 2 et 3, et sur le service interne pour le
            quotidien. Je suis donc rapidement devenu l&apos;interlocuteur de
            premier niveau pour les collaborateurs.
          </p>
          <p>
            Mes premières semaines ont surtout consisté à prendre les demandes
            courantes et à découvrir l&apos;environnement : les logiciels
            métier, la manière dont les équipes travaillent, et ce qui
            tombe en panne le plus souvent. C&apos;est en faisant ça que
            j&apos;ai constaté que l&apos;infrastructure, qui fonctionnait,
            n&apos;était décrite nulle part — elle reposait sur la mémoire de
            l&apos;équipe et du prestataire.
          </p>
          <p>
            Ma première mission d&apos;ampleur a donc été de la{" "}
            <Preuve slug="cartographie-architecture-it">cartographier</Preuve>.
            C&apos;était autant un travail de recensement qu&apos;un moyen
            d&apos;apprendre : j&apos;ai découvert l&apos;hyperviseur, les
            machines virtuelles, les partages et les flux en les décrivant. Ce
            document est ensuite devenu la base de tout ce qui a suivi.
          </p>
          <p>
            À partir de là, les sujets confiés se sont élargis. La direction
            m&apos;a demandé de formaliser le{" "}
            <Preuve slug="plan-de-reprise-dactivite">
              plan de reprise d&apos;activité
            </Preuve>
            , puis d&apos;étudier la{" "}
            <Preuve slug="etude-videosurveillance-parking">
              vidéosurveillance du parking
            </Preuve>{" "}
            et de proposer un{" "}
            <Preuve slug="plan-de-securisation-it">
              plan de sécurisation
            </Preuve>
            . Sur ces dossiers, mon rôle est d&apos;analyser, de chiffrer et de
            proposer ; la décision revient à la direction, et certaines mesures
            attendent encore son arbitrage.
          </p>
          <p>
            J&apos;ai aussi pris quelques initiatives de mon côté. La plus
            aboutie est l&apos;
            <Preuve slug="automatisation-outlook-planner">
              automatisation du suivi des tâches
            </Preuve>{" "}
            : je l&apos;ai construite et testée sur un périmètre pilote, en
            documentant les erreurs que j&apos;ai commises en chemin pour ne pas
            les reproduire lors de la duplication.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- Mes missions */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          Mes missions au quotidien
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Mon poste couvre quatre volets, et ils se répondent : le support
          nourrit la documentation, la documentation réduit le support, et les
          projets naissent presque toujours d&apos;un problème constaté au
          support.
        </p>

        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          <li className="surface rule-top flex flex-col gap-3 p-5">
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
            >
              <Headphones className="size-5" />
            </span>
            <h3 className="text-base font-semibold text-ink-100">
              Le support aux utilisateurs
            </h3>
            <p className="text-sm leading-relaxed text-ink-400">
              Je reçois les demandes, je les qualifie et je les traite : postes,
              messagerie, impressions, logiciels métier. Quand un incident
              revient, j&apos;écris la procédure plutôt que de réintervenir —
              c&apos;est ainsi que j&apos;ai rédigé les{" "}
              <Preuve slug="procedures-de-support-ebp">
                procédures sur le logiciel de gestion
              </Preuve>{" "}
              et le{" "}
              <Preuve slug="depannage-synchronisation-ebp-praxedo">
                guide de dépannage de la synchronisation
              </Preuve>
              .
            </p>
          </li>

          <li className="surface rule-top flex flex-col gap-3 p-5">
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
            >
              <Network className="size-5" />
            </span>
            <h3 className="text-base font-semibold text-ink-100">
              L&apos;administration courante
            </h3>
            <p className="text-sm leading-relaxed text-ink-400">
              Comptes et habilitations dans l&apos;annuaire, suivi des
              sauvegardes, vérification du bon fonctionnement des services. Je
              travaille sur une infrastructure que je n&apos;ai pas montée :
              j&apos;ai commencé par l&apos;observer et la{" "}
              <Preuve slug="strategie-de-sauvegarde">documenter</Preuve> avant
              d&apos;y intervenir.
            </p>
          </li>

          <li className="surface rule-top flex flex-col gap-3 p-5">
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
            >
              <Building2 className="size-5" />
            </span>
            <h3 className="text-base font-semibold text-ink-100">
              Les études confiées par la direction
            </h3>
            <p className="text-sm leading-relaxed text-ink-400">
              Plan de reprise d&apos;activité, plan de sécurisation, étude de
              vidéosurveillance,{" "}
              <Preuve slug="mise-en-conformite-rgpd">
                mise en conformité RGPD
              </Preuve>
              . J&apos;analyse l&apos;existant, je chiffre les options et je
              rédige le dossier ; la mise en œuvre dépend ensuite d&apos;un
              arbitrage qui ne m&apos;appartient pas.
            </p>
          </li>

          <li className="surface rule-top flex flex-col gap-3 p-5">
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
            >
              <Users className="size-5" />
            </span>
            <h3 className="text-base font-semibold text-ink-100">
              La formation et la documentation
            </h3>
            <p className="text-sm leading-relaxed text-ink-400">
              J&apos;ai conçu les supports destinés aux collaborateurs :{" "}
              <Preuve slug="formation-et-deploiement-outlook">
                formation à la messagerie
              </Preuve>{" "}
              et{" "}
              <Preuve slug="documentation-fonctionnelle-ebp">
                prise en main du logiciel métier
              </Preuve>
              . Dans une entreprise où presque personne n&apos;est
              informaticien, un outil n&apos;est réellement utilisable que
              lorsque les gens savent s&apos;en servir.
            </p>
          </li>
        </ul>
      </section>

      {/* --------------------------------------------- L'environnement technique */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
          L&apos;environnement technique
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
          Au fil de mon alternance, j&apos;ai eu l&apos;occasion d&apos;aborder
          des aspects variés de l&apos;environnement informatique de
          l&apos;entreprise — de l&apos;assistance aux utilisateurs à
          l&apos;administration de certains services. Mon degré
          d&apos;intervention n&apos;est pas le même partout, et je le précise
          ci-dessous.
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
          maintenir ces échanges en bon état occupe une part importante de mon
          temps.
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
          Je suis arrivé à l&apos;informatique après un parcours en architecture
          d&apos;intérieur, en encadrement d&apos;équipes et en sécurité. Ce
          poste est ce qui transforme une reconversion en métier — et quatre
          choses ont vraiment changé ma façon de travailler.
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
      </section>

      {/* --------------------------------- Ce que je continue d'apprendre */}
      <section className="mt-14">
        <div className="surface rule-top p-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan-bright/30 bg-cyan-bright/10 text-cyan-bright"
            >
              <Compass className="size-5" />
            </span>
            <h2 className="text-xl font-semibold tracking-tight text-ink-100">
              Ce que je continue d&apos;apprendre
            </h2>
          </div>

          <p className="mt-4 max-w-3xl leading-relaxed text-ink-300">
            Je ne couvre pas encore tout le périmètre d&apos;un administrateur
            systèmes et réseaux, et il me semble plus utile de dire où j&apos;en
            suis que de laisser croire le contraire.
          </p>

          <ul className="mt-4 space-y-2.5">
            {enCours.map((e) => (
              <li
                key={e}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink-400"
              >
                <span
                  aria-hidden
                  className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-cyan-bright"
                />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface mt-6 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed text-ink-300">
            Le détail de chaque mission, avec son déroulé technique et ses
            preuves, se trouve dans les {situations.length} situations
            professionnelles.
          </p>
          <Link
            href="/situations"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-bright px-4 py-2.5 text-sm font-semibold text-night-950 transition-all duration-150 hover:brightness-110"
          >
            Voir les situations
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
