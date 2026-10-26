import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { site } from "@/data/site";
import { fichierPublicExiste } from "@/lib/assets";
import { ressource } from "@/lib/chemin";

/**
 * Photo d'identité (obligatoire sur la page d'accueil — règle UFIP).
 * Si le fichier n'a pas encore été déposé dans public/img/, un emplacement
 * explicite est affiché plutôt qu'une image cassée.
 */
export function Photo() {
  const presente = fichierPublicExiste(site.photo);

  if (presente) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-night-600/70">
        <Image
          src={ressource(site.photo)}
          alt={`Photographie de ${site.nomComplet}`}
          fill
          priority
          sizes="(min-width: 1024px) 20rem, 60vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-night-500 bg-night-850/60 px-6 text-center">
      <span
        aria-hidden
        className="grid size-16 place-items-center rounded-xl border border-cyan-bright/35 bg-cyan-bright/10 font-mono text-xl font-bold text-cyan-bright"
      >
        AG
      </span>
      <p className="text-sm font-medium text-ink-200">Photo à déposer</p>
      <p className="font-mono text-[0.68rem] leading-relaxed text-ink-400">
        public/img/photo.jpg
      </p>
    </div>
  );
}

/**
 * Logos de l'établissement et de l'entreprise (obligatoires sur l'accueil).
 * Tant qu'un fichier image n'est pas fourni, on affiche le nom en toutes
 * lettres : on n'invente pas de logo.
 */
export function Logos() {
  const entites = [
    {
      nom: site.ecole.nom,
      sousTitre: site.ecole.formation,
      logo: site.ecole.logo,
      href: site.ecole.site,
    },
    {
      nom: site.groupe.nom,
      sousTitre: site.groupe.sousTitre,
      logo: site.groupe.logo,
      href: site.groupe.site,
    },
    {
      nom: site.entreprise.nom,
      sousTitre: site.entreprise.secteur,
      logo: site.entreprise.logo,
      href: site.entreprise.site,
    },
  ];

  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {entites.map((e) => {
        const presente = fichierPublicExiste(e.logo);
        return (
          <li key={e.nom}>
            <a
              href={e.href}
              target="_blank"
              rel="noreferrer noopener"
              className="surface flex h-full flex-col gap-3 px-4 py-4 transition-colors hover:border-cyan-bright/50"
            >
              {presente ? (
                // Fond clair : les logos officiels sont conçus pour le blanc.
                <span className="flex h-16 items-center justify-center rounded-lg bg-white px-3 py-2">
                  <Image
                    src={ressource(e.logo)}
                    alt={`Logo ${e.nom}`}
                    width={240}
                    height={90}
                    className="max-h-12 w-auto object-contain"
                  />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="grid h-16 place-items-center rounded-lg border border-dashed border-night-500 text-ink-400"
                >
                  <ImagePlus className="size-5" />
                </span>
              )}
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink-100">
                  {e.nom}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-ink-400">
                  {e.sousTitre}
                </span>
                {!presente && (
                  <span className="mt-1 block font-mono text-[0.62rem] text-ink-400">
                    logo à déposer — {e.logo}
                  </span>
                )}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
