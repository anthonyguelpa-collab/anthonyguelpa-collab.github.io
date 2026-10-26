import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { navigation, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-night-700/70 bg-night-950/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-ink-100">
              {site.nomComplet}
            </p>
            <p className="mt-1 text-sm text-ink-400">{site.accroche}</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-ink-400" aria-hidden />
                {site.ville}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-ink-400" aria-hidden />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-cyan-bright"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Navigation de pied de page">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Navigation
            </p>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-300 transition-colors hover:text-cyan-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Formation et alternance
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.ecole.site}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink-300 transition-colors hover:text-cyan-bright"
                >
                  {site.ecole.nom}
                </a>
                <p className="mt-0.5 text-xs text-ink-400">
                  {site.ecole.formation}
                </p>
              </li>
              <li>
                <a
                  href={site.groupe.site}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink-300 transition-colors hover:text-cyan-bright"
                >
                  {site.groupe.nom}
                </a>
                <p className="mt-0.5 text-xs text-ink-400">
                  {site.groupe.sousTitre}
                </p>
              </li>
              <li>
                <a
                  href={site.entreprise.site}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-ink-300 transition-colors hover:text-cyan-bright"
                >
                  {site.entreprise.nom}
                </a>
                <p className="mt-0.5 text-xs text-ink-400">
                  {site.entreprise.secteur}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-night-700/70 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nomComplet} — Portfolio réalisé
            dans le cadre du BTS SIO option SISR.
          </p>
          <p className="font-mono">
            Les documents d&apos;entreprise publiés sont caviardés.
          </p>
        </div>
      </div>
    </footer>
  );
}
