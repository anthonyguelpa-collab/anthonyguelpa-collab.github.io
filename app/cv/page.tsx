import type { Metadata } from "next";
import Image from "next/image";
import { Download, Mail, MapPin } from "lucide-react";

import { site } from "@/data/site";
import { Breadcrumb, PageHeader, Section, Badge } from "@/components/ui";
import { fichierPublicExiste } from "@/lib/assets";
import { ressource } from "@/lib/chemin";

export const metadata: Metadata = {
  title: "Curriculum vitæ",
  description:
    "Curriculum vitæ d'Anthony Guelpa — BTS SIO option SISR, alternance au service informatique.",
};

export default function CvPage() {
  const imagePresente = fichierPublicExiste(site.cv.image);
  const pdfPresent = fichierPublicExiste(site.cv.pdf);

  return (
    <Section>
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "CV" }]}
      />

      <PageHeader
        surtitre="Parcours"
        titre="Curriculum vitæ"
        intro="Un parcours en reconversion : architecture d'intérieur, encadrement d'équipes, sécurité aéroportuaire, puis l'informatique. Ces expériences expliquent ma façon de travailler — documenter, former, et considérer l'utilisateur comme une partie du système."
      >
        <div className="flex flex-wrap items-center gap-3">
          {pdfPresent && (
            <a
              href={ressource(site.cv.pdf)}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-bright px-4 py-2.5 text-sm font-semibold text-night-950 transition-all duration-150 hover:brightness-110"
            >
              <Download className="size-4" aria-hidden />
              Télécharger le CV en PDF
            </a>
          )}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-night-600 bg-night-800/50 px-4 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:border-cyan-bright hover:text-ink-100"
          >
            <Mail className="size-4" aria-hidden />
            {site.email}
          </a>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          <Badge>
            <MapPin className="mr-1 inline size-3" aria-hidden />
            {site.ville}
          </Badge>
          <Badge>{site.permis}</Badge>
          <Badge>Français · Anglais · Espagnol</Badge>
        </ul>
      </PageHeader>

      {/* Le CV doit être visible immédiatement, intégré comme image (règle UFIP). */}
      <figure className="mt-10">
        {imagePresente ? (
          <div className="overflow-hidden rounded-2xl border border-night-600/70 bg-white">
            <Image
              src={ressource(site.cv.image)}
              alt="Curriculum vitæ d'Anthony Guelpa — version complète"
              width={1547}
              height={2189}
              priority
              className="h-auto w-full"
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-night-500 px-6 py-16 text-center">
            <p className="text-sm font-medium text-ink-200">CV à déposer</p>
            <p className="mt-1 font-mono text-xs text-ink-400">
              public/img/cv.png
            </p>
          </div>
        )}
        <figcaption className="mt-3 text-center text-xs text-ink-400">
          Curriculum vitæ — version à jour
          {pdfPresent && (
            <>
              {" · "}
              <a
                href={ressource(site.cv.pdf)}
                download
                className="text-cyan-bright underline underline-offset-2 hover:text-cyan-soft"
              >
                télécharger le PDF
              </a>
            </>
          )}
        </figcaption>
      </figure>
    </Section>
  );
}
