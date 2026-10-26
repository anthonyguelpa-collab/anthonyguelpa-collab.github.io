"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/data/site";

/**
 * En-tête persistant, identique sur toutes les pages (règle UFIP :
 * le menu doit être accessible depuis toutes les pages et donner accès
 * en un clic à chaque rubrique).
 */
export function Header() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  // Referme le menu mobile à chaque navigation.
  useEffect(() => {
    setOuvert(false);
  }, [pathname]);

  const estActif = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-night-700/70 bg-night-900/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Retour à l'accueil"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg border border-cyan-bright/40 bg-cyan-bright/10 font-mono text-xs font-bold text-cyan-bright transition-colors group-hover:bg-cyan-bright/20"
          >
            AG
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-semibold text-ink-100">
              {site.nomComplet}
            </span>
            <span className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-400">
              BTS SIO · SISR
            </span>
          </span>
        </Link>

        {/* Navigation bureau */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => {
              const actif = estActif(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={actif ? "page" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                      actif
                        ? "text-ink-100"
                        : "text-ink-300 hover:text-ink-100"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-cyan-bright transition-transform duration-200 ${
                        actif ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          className="grid size-10 place-items-center rounded-lg border border-night-600 text-ink-200 transition-colors hover:border-cyan-bright hover:text-cyan-bright lg:hidden"
        >
          <span className="sr-only">
            {ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          </span>
          {ouvert ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Navigation mobile */}
      {ouvert && (
        <nav
          id="menu-mobile"
          aria-label="Navigation principale mobile"
          className="border-t border-night-700/70 bg-night-900 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navigation.map((item) => {
              const actif = estActif(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={actif ? "page" : undefined}
                    className={`flex items-center gap-3 border-l-2 py-3 pl-4 text-sm transition-colors ${
                      actif
                        ? "border-cyan-bright text-ink-100"
                        : "border-transparent text-ink-300 hover:border-night-500 hover:text-ink-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
