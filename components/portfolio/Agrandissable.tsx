"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

/**
 * Capture agrandissable.
 *
 * Les captures de documentation technique sont souvent denses : un schéma
 * de flux ou une fenêtre de configuration devient illisible à la largeur
 * d'une colonne, et plus encore sur téléphone. Un clic l'ouvre en plein
 * écran, Échap ou un clic en dehors la referme.
 *
 * Sans JavaScript, l'image reste affichée normalement : l'agrandissement
 * est un confort, jamais une condition de lecture.
 */
export function Agrandissable({
  src,
  alt,
  legende,
  className = "",
}: {
  src: string;
  alt: string;
  legende: string;
  className?: string;
}) {
  const [ouvert, setOuvert] = useState(false);

  const fermer = useCallback(() => setOuvert(false), []);

  useEffect(() => {
    if (!ouvert) return;

    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
    };

    document.addEventListener("keydown", auClavier);
    // Empêche l'arrière-plan de défiler pendant la consultation.
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", auClavier);
      document.body.style.overflow = overflow;
    };
  }, [ouvert, fermer]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-label={`Agrandir la capture : ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-night-600/70 bg-night-950 transition-colors hover:border-[color-mix(in_oklab,var(--bloc-accent)_55%,transparent)] ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-md border border-night-600/80 bg-night-950/80 text-ink-300 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="size-3.5" />
        </span>
      </button>

      {ouvert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={fermer}
          className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-night-950/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer l'aperçu"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-lg border border-night-600 bg-night-900/80 text-ink-200 transition-colors hover:border-[var(--bloc-accent)] hover:text-ink-100"
          >
            <X className="size-5" aria-hidden />
          </button>

          <Image
            src={src}
            alt={alt}
            width={2400}
            height={1350}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] w-auto max-w-full cursor-default rounded-lg object-contain"
          />

          <p className="max-w-3xl text-center text-sm leading-relaxed text-ink-300">
            {legende}
          </p>
        </div>
      )}
    </>
  );
}
