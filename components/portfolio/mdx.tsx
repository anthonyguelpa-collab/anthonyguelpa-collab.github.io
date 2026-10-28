import { AlertTriangle, ImageOff, Info, ShieldAlert, Wrench } from "lucide-react";
import type { ReactNode } from "react";

import { ressource } from "@/lib/chemin";
import { Agrandissable } from "@/components/portfolio/Agrandissable";

/**
 * Composants mis à disposition dans les fichiers MDX.
 *
 * Ils restent peu nombreux et explicites : la documentation doit pouvoir se
 * lire en texte brut dans l'éditeur. Chacun répond à un besoin de lecture
 * précis — illustrer une étape, comparer deux états, signaler une
 * difficulté — jamais à un besoin décoratif.
 */

/* ------------------------------------------------------------- Légende */

function Legende({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-ink-400">
      <span
        aria-hidden
        className="mt-[0.3rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-[var(--bloc-accent)]"
      />
      <span>{children}</span>
    </figcaption>
  );
}

/* ------------------------------------------------------------- Capture */

/** Capture d'écran servant de preuve. Toujours légendée, toujours agrandissable. */
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
      <Agrandissable src={ressource(src)} alt={alt} legende={legende} />
      <Legende>{legende}</Legende>
    </figure>
  );
}

/* --------------------------------------------------------- CaptureCote */

/**
 * Capture placée à côté de son explication.
 * Sur mobile, le texte passe au-dessus de l'image : l'ordre de lecture
 * reste celui du raisonnement, pas celui de la mise en page.
 */
export function CaptureCote({
  src,
  alt,
  legende,
  position = "droite",
  children,
}: {
  src: string;
  alt: string;
  legende: string;
  position?: "droite" | "gauche";
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-8 grid items-start gap-6 sm:grid-cols-2 sm:gap-8">
      <div
        className={`space-y-3 text-[0.95rem] leading-relaxed text-ink-300 [&_strong]:font-semibold [&_strong]:text-ink-100 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:list-disc ${
          position === "gauche" ? "sm:order-2" : ""
        }`}
      >
        {children}
      </div>

      <figure className={position === "gauche" ? "sm:order-1" : ""}>
        <Agrandissable src={ressource(src)} alt={alt} legende={legende} />
        <Legende>{legende}</Legende>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------ Captures */

/**
 * Deux captures côte à côte, pour une comparaison : avant/après, deux
 * options, deux états d'une même configuration.
 */
export function Captures({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-8 grid gap-5 sm:grid-cols-2">{children}</div>
  );
}

/** Élément d'une paire de captures. */
export function CaptureItem({
  src,
  alt,
  legende,
  titre,
}: {
  src: string;
  alt: string;
  legende: string;
  titre?: string;
}) {
  return (
    <figure>
      {titre && (
        <p className="mb-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--bloc-accent)]">
          {titre}
        </p>
      )}
      <Agrandissable src={ressource(src)} alt={alt} legende={legende} />
      <Legende>{legende}</Legende>
    </figure>
  );
}

/* --------------------------------------------------- CaptureManquante */

/**
 * Emplacement de capture non disponible.
 * On signale l'absence plutôt que de la combler : aucune preuve fictive
 * n'est générée.
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

/* ----------------------------------------------------------- Difficulte */

/**
 * Difficulté rencontrée et solution apportée.
 * Encadré discret, volontairement différent des notes : c'est le passage
 * que l'examinateur cherche quand il demande « qu'est-ce qui a coincé ? ».
 */
export function Difficulte({
  probleme,
  children,
}: {
  probleme: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-7 overflow-hidden rounded-xl border border-night-600/60 bg-night-850/50">
      <p className="flex items-start gap-2.5 border-b border-night-700/60 px-5 py-3 text-sm font-medium text-ink-100">
        <Wrench
          className="mt-0.5 size-4 shrink-0 text-amber-bright"
          aria-hidden
        />
        <span>
          <span className="mr-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">
            Difficulté
          </span>
          {probleme}
        </span>
      </p>
      <div className="space-y-2.5 px-5 py-4 text-sm leading-relaxed text-ink-300 [&_strong]:font-semibold [&_strong]:text-ink-100 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:list-disc">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Etapes */

/** Suite d'étapes numérotées, pour les procédures. */
export function Etapes({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-7 space-y-4">{children}</ol>;
}

export function Etape({
  numero,
  titre,
  children,
}: {
  numero: number;
  titre: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden
        className="grid size-8 shrink-0 place-items-center rounded-lg border border-[color-mix(in_oklab,var(--bloc-accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--bloc-accent)_10%,transparent)] font-mono text-sm font-semibold text-[var(--bloc-accent)]"
      >
        {numero}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-semibold text-ink-100">{titre}</p>
        <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-ink-300 [&_strong]:font-semibold [&_strong]:text-ink-100 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:list-disc">
          {children}
        </div>
      </div>
    </li>
  );
}

/* ---------------------------------------------------------------- Note */

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

/* ---------------------------------------------------------- Comparatif */

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

/* ------------------------------------------------------------- Chiffres */

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
  CaptureCote,
  Captures,
  CaptureItem,
  CaptureManquante,
  Difficulte,
  Etapes,
  Etape,
  Note,
  Comparatif,
  Option,
  Chiffre,
  Chiffres,
};
