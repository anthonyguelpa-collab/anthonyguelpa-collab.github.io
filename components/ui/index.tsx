import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ Section */

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </section>
  );
}

/* --------------------------------------------------------------- PageHeader */

export function PageHeader({
  surtitre,
  titre,
  intro,
  children,
}: {
  surtitre?: string;
  titre: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-night-700/60 pb-8 pt-10 sm:pt-14">
      {surtitre && (
        <p className="mb-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
          {surtitre}
        </p>
      )}
      <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-100 sm:text-4xl">
        {titre}
      </h1>
      {intro && (
        <div className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-ink-300">
          {intro}
        </div>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}

/* --------------------------------------------------------------- Breadcrumb */

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Fil d'Ariane" className="pt-6">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="size-3 shrink-0 text-night-500" aria-hidden />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-ink-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------- Badge */

export function Badge({
  children,
  variante = "neutre",
}: {
  children: ReactNode;
  variante?: "neutre" | "accent" | "positif" | "alerte";
}) {
  const styles: Record<string, string> = {
    neutre:
      "border-night-600/70 bg-night-800/60 text-ink-300",
    accent:
      "border-[color-mix(in_oklab,var(--bloc-accent)_40%,transparent)] bg-[color-mix(in_oklab,var(--bloc-accent)_12%,transparent)] text-[var(--bloc-accent)]",
    positif:
      "border-emerald-500/35 bg-emerald-500/10 text-emerald-300",
    alerte:
      "border-rose-500/35 bg-rose-500/10 text-rose-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.68rem] font-medium tracking-wide ${styles[variante]}`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- TechBadges */

export function TechBadges({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t}>
          <Badge>{t}</Badge>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------------- BlocTag */

export function BlocTag({ bloc }: { bloc: "e4" | "e5" }) {
  return (
    <span
      data-bloc={bloc}
      className="inline-flex items-center gap-1.5 rounded-md border border-[color-mix(in_oklab,var(--bloc-accent)_45%,transparent)] bg-[color-mix(in_oklab,var(--bloc-accent)_10%,transparent)] px-2 py-0.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-[var(--bloc-accent)]"
    >
      <span
        aria-hidden
        className="size-1.5 rotate-45 rounded-[1px] bg-[var(--bloc-accent)]"
      />
      {bloc.toUpperCase()}
    </span>
  );
}

/* ------------------------------------------------------------------- Button */

export function LinkButton({
  href,
  children,
  variante = "primaire",
  externe = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variante?: "primaire" | "secondaire";
  externe?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150";
  const styles =
    variante === "primaire"
      ? "bg-[var(--bloc-accent)] text-night-950 hover:brightness-110 font-semibold"
      : "border border-night-600 bg-night-800/50 text-ink-200 hover:border-[var(--bloc-accent)] hover:text-ink-100";

  const props = externe
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : {};

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/* --------------------------------------------------------------- Callout */

export function Callout({
  titre,
  ton = "info",
  children,
}: {
  titre: string;
  ton?: "info" | "alerte" | "note";
  children: ReactNode;
}) {
  const tons: Record<string, string> = {
    info: "border-l-[var(--bloc-accent)]",
    alerte: "border-l-amber-bright",
    note: "border-l-night-500",
  };
  return (
    <aside
      className={`surface border-l-[3px] ${tons[ton]} px-5 py-4 text-sm leading-relaxed text-ink-300`}
    >
      <p className="mb-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-200">
        {titre}
      </p>
      {children}
    </aside>
  );
}
