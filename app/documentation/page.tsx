import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  FolderTree,
  PenLine,
  RefreshCw,
  Search,
} from "lucide-react";

import {
  apports,
  articulations,
  compterParGeste,
  familles,
  GESTES,
  nombreDeDocuments,
  nombreDeSituations,
  type Geste,
} from "@/data/documentation";
import { situations } from "@/data/situations";
import { documentationDeSituation } from "@/lib/documents";
import { Badge, Breadcrumb, Callout, LinkButton, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Documentation du fonctionnement de l'entreprise",
  description:
    "La base documentaire constituée chez Goiran et Compagnie : fonctionnements recensés, procédures reprises et faites évoluer, documents créés, et la manière dont ils s'articulent.",
};

const ICONES: Record<Geste, typeof Search> = {
  recense: Search,
  faitEvoluer: RefreshCw,
  cree: PenLine,
};

/** Teinte par geste : l'ambre signale ce qui existait et a été modifié. */
const TEINTES: Record<Geste, string> = {
  recense: "text-cyan-bright border-cyan-bright/35 bg-cyan-bright/10",
  faitEvoluer: "text-amber-bright border-amber-bright/40 bg-amber-bright/10",
  cree: "text-ink-200 border-night-600 bg-night-800/70",
};

function EtiquetteGeste({ geste }: { geste: Geste }) {
  const Icone = ICONES[geste];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[0.64rem] font-medium tracking-wide ${TEINTES[geste]}`}
    >
      <Icone className="size-3" aria-hidden />
      {GESTES[geste].libelle}
    </span>
  );
}

export default function DocumentationPage() {
  const gestes: Geste[] = ["recense", "faitEvoluer", "cree"];

  // Compté sur les fichiers réellement présents, jamais annoncé de mémoire.
  const slugsCites = new Set(
    familles.flatMap((f) => f.documents.map((d) => d.slug)),
  );
  const dossiers = situations.filter(
    (s) => slugsCites.has(s.slug) && documentationDeSituation(s),
  ).length;

  return (
    <div data-bloc="e4">
      <Section>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Documentation des processus" },
          ]}
        />

        <PageHeader
          surtitre="Gérer le patrimoine informatique"
          titre="La documentation du fonctionnement de l'entreprise"
          intro={
            <>
              <p>
                Gérer un patrimoine informatique ne se limite pas au matériel,
                aux logiciels et aux équipements réseau. Ce qui se perd le plus
                vite, dans une petite structure, c&apos;est la connaissance de
                son propre fonctionnement : elle tient dans la mémoire de
                quelques personnes, et disparaît avec elles.
              </p>
              <p className="mt-3">
                Ce travail s&apos;est construit mission après mission, et il a
                surtout consisté à créer. La documentation n&apos;existait pas :
                je suis allé chercher les données là où elles se trouvaient —
                dans les machines, les journaux, la mémoire de l&apos;équipe et
                du prestataire —, je les ai analysées, puis j&apos;ai écrit. À
                quoi s&apos;ajoute ce que chaque mission a produit de neuf. Là
                où une façon de faire existait déjà, je l&apos;ai reprise pour
                la corriger.
              </p>
            </>
          }
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variante="accent">{nombreDeDocuments} documents recensés</Badge>
            <Badge>{nombreDeSituations} situations professionnelles</Badge>
            <Badge>{dossiers} dossiers téléchargeables</Badge>
          </div>
        </PageHeader>

        {/* ------------------------------------------------------ Trois gestes */}

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
            Trois gestes, pas un seul
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
            Rédiger une procédure n&apos;est qu&apos;une partie du travail. Sur
            l&apos;ensemble des missions, trois gestes différents reviennent — et
            c&apos;est leur combinaison qui finit par constituer une base.
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {gestes.map((g) => {
              const Icone = ICONES[g];
              return (
                <li key={g} className="surface p-5">
                  <div className="flex items-center gap-2.5">
                    <Icone
                      className={
                        g === "faitEvoluer"
                          ? "size-4 text-amber-bright"
                          : "size-4 text-cyan-bright"
                      }
                      aria-hidden
                    />
                    <h3 className="font-semibold text-ink-100">
                      {GESTES[g].libelle}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {GESTES[g].court}
                  </p>
                  <p className="mt-3 font-mono text-[0.7rem] text-ink-400">
                    {compterParGeste(g)} documents
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <Callout titre="Ce que ces chiffres disent — et ne disent pas">
              Ils comptent les documents produits, pas une couverture. Je
              n&apos;affiche aucun pourcentage : il n&apos;existe pas
              d&apos;inventaire exhaustif des processus de l&apos;entreprise
              auquel je pourrais comparer ce travail. Chaque document listé plus
              bas renvoie à la situation professionnelle qui l&apos;a produit.
            </Callout>
          </div>
        </section>

        {/* ------------------------------------------------ La base documentaire */}

        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <FolderTree className="size-5 text-cyan-bright" aria-hidden />
            <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
              La base documentaire
            </h2>
          </div>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
            Six familles, qui suivent le fonctionnement de l&apos;entreprise
            plutôt que le calendrier des missions.
          </p>

          <div className="mt-8 space-y-10">
            {familles.map((famille) => (
              <article key={famille.id} id={famille.id}>
                <h3 className="text-lg font-semibold text-ink-100">
                  {famille.titre}
                </h3>
                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ink-400">
                  {famille.intro}
                </p>

                <ul className="mt-4 space-y-px overflow-hidden rounded-lg border border-night-700/70">
                  {famille.documents.map((doc, i) => (
                    <li
                      key={i}
                      className="bg-night-900/50 px-4 py-3.5 transition-colors hover:bg-night-800/50"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                        <div className="flex min-w-0 flex-1 items-start gap-2.5">
                          <FileText
                            className="mt-0.5 size-4 shrink-0 text-night-500"
                            aria-hidden
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium leading-snug text-ink-200">
                              {doc.titre}
                            </p>
                            {doc.note && (
                              <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-400">
                                {doc.note}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2.5">
                          <EtiquetteGeste geste={doc.geste} />
                          <Link
                            href={`/situations/${doc.slug}`}
                            className="font-mono text-[0.7rem] text-cyan-bright transition-colors hover:text-cyan-soft"
                          >
                            {doc.ref}
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- Articulation */}

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
            Comment ces documents s&apos;articulent
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
            Aucun de ces dossiers n&apos;a été écrit isolément. Chacun s&apos;est
            appuyé sur ce que le précédent avait établi — et c&apos;est ce qui
            fait la différence entre une pile de procédures et une base
            documentaire.
          </p>

          <ol className="mt-6 space-y-3">
            {articulations.map((a, i) => (
              <li
                key={i}
                className="surface border-l-[3px] border-l-cyan-bright/60 px-5 py-4"
              >
                <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink-100">
                  <span>{a.de}</span>
                  <ArrowRight className="size-3.5 shrink-0 text-cyan-bright" aria-hidden />
                  <span>{a.vers}</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-400">
                  {a.lien}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ Ce que ça permet */}

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-ink-100">
            Ce que cette base permet
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
            Chacun de ces effets est attaché à un document précis, et non à une
            intention générale.
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {apports.map((a, i) => (
              <li key={i} className="surface p-5">
                <h3 className="font-semibold text-ink-100">{a.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {a.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------------ Ailleurs */}

        <section className="mt-16">
          <Callout titre="La même méthode, hors de l'entreprise" ton="note">
            <p>
              La solution de sauvegarde automatisée (SP-13) ne figure pas dans
              ces familles : elle a été conduite pour un cabinet extérieur, et
              ne documente donc pas le fonctionnement de Goiran. Elle applique
              pourtant la même méthode — cahier des charges, comparatif,
              compte rendu de mise en œuvre et annexe technique commentée —
              cette fois du premier au dernier document.
            </p>
            <p className="mt-3">
              <Link
                href="/situations/solution-de-sauvegarde-automatisee"
                className="font-medium text-cyan-bright transition-colors hover:text-cyan-soft"
              >
                Voir la situation SP-13
              </Link>
            </p>
          </Callout>
        </section>

        <div className="mb-20 mt-12 flex flex-wrap gap-3">
          <LinkButton href="/situations">Voir toutes les situations</LinkButton>
          <LinkButton href="/competences" variante="secondaire">
            Les compétences associées
          </LinkButton>
        </div>
      </Section>
    </div>
  );
}
