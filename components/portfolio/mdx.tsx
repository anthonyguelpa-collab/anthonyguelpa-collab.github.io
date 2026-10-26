import Image from "next/image";
import { AlertTriangle, ImageOff, Info, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { ressource } from "@/lib/chemin";

/**
 * Composants mis à disposition dans les fichiers MDX.
 * Ils sont volontairement peu nombreux : la documentation doit rester
 * lisible en texte brut dans l'éditeur.
 */

/** Capture d'écran servant de preuve. Toujours légendée. */
export function Capture({
  src,
  alt,
  legende,
  large = false,
}: {
  src: string;
  alt: string;
  legende: string;
  large?: boolean;
}) {
  return (
    <figure className={`not-prose my-7 ${large ? "" : "mx-auto max-w-3xl"}`}>
      <div className="overflow-hidden rounded-xl border border-night-600/70 bg-night-950">
        <Image
          src={ressource(src)}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
        <span
          aria-hidden
          className="mt-[0.3rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-[var(--bloc-accent)]"
        />
        {legende}
      </figcaption>
    </figure>
  );
}

/**
 * Emplacement de capture non disponible.
 * La règle UFIP impose de signaler l'absence plutôt que de la combler :
 * aucune preuve fictive n'est générée.
 */
export function CaptureManquante({ etape }: { etape: string }) {
  return (
    <div className="not-prose my-7 flex items-start gap-3 rounded-xl border border-dashed border-night-500 bg-night-850/50 px-5 py-4">
      <ImageOff className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden />
      <div className="text-sm">
        <p className="font-medium text-ink-200">Capture à fournir</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-400">
          {etape} — aucune capture disponible pour cette étape. Cet
          emplacement est signalé plutôt que comblé par une illustration
          générique.
        </p>
      </div>
    </div>
  );
}

/** Encart d'information, d'alerte ou de note de caviardage. */
export function Note({
  type = "info",
  titre,
  children,
}: {
  type?: "info" | "alerte" | "caviardage";
  titre?: string;
  children: ReactNode;
}) {
  const config = {
    info: {
      icone: Info,
      couleur: "border-l-[var(--bloc-accent)]",
      iconeCouleur: "text-[var(--bloc-accent)]",
      titreDefaut: "À noter",
    },
    alerte: {
      icone: AlertTriangle,
      couleur: "border-l-amber-bright",
      iconeCouleur: "text-amber-bright",
      titreDefaut: "Point de vigilance",
    },
    caviardage: {
      icone: ShieldAlert,
      couleur: "border-l-night-500",
      iconeCouleur: "text-ink-400",
      titreDefaut: "Information caviardée",
    },
  }[type];

  const Icone = config.icone;

  return (
    <aside
      className={`not-prose my-6 flex gap-3 rounded-r-xl border border-night-600/60 border-l-[3px] bg-night-850/60 px-5 py-4 ${config.couleur}`}
    >
      <Icone className={`mt-0.5 size-4 shrink-0 ${config.iconeCouleur}`} aria-hidden />
      <div className="text-sm leading-relaxed text-ink-300">
        <p className="mb-1 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-200">
          {titre ?? config.titreDefaut}
        </p>
        {children}
      </div>
    </aside>
  );
}

/** Grille de deux colonnes pour comparer deux solutions. */
export function Comparatif({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-7 grid gap-4 md:grid-cols-2">{children}</div>
  );
}

export function Option({
  titre,
  sousTitre,
  retenue = false,
  children,
}: {
  titre: string;
  sousTitre?: string;
  retenue?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`surface flex flex-col p-5 ${
        retenue
          ? "border-[color-mix(in_oklab,var(--bloc-accent)_50%,transparent)]"
          : ""
      }`}
    >
      <p className="text-sm font-semibold text-ink-100">{titre}</p>
      {sousTitre && (
        <p className="mt-0.5 font-mono text-[0.7rem] text-ink-400">{sousTitre}</p>
      )}
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-ink-300 [&_ul]:space-y-1.5 [&_li]:flex [&_li]:gap-2">
        {children}
      </div>
    </div>
  );
}

/** Mise en évidence d'un chiffre clé issu d'un document réel. */
export function Chiffre({
  valeur,
  libelle,
}: {
  valeur: string;
  libelle: string;
}) {
  return (
    <div className="surface px-5 py-4">
      <p className="font-mono text-2xl font-semibold text-[var(--bloc-accent)]">
        {valeur}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-ink-400">{libelle}</p>
    </div>
  );
}

export function Chiffres({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

/** Composants injectés dans tous les documents MDX. */
export const composantsMDX = {
  Capture,
  CaptureManquante,
  Note,
  Comparatif,
  Option,
  Chiffre,
  Chiffres,
};
