/**
 * Deux modes de build :
 *
 *  · par défaut — build Next.js classique (npm run build && npm start),
 *    utilisé en développement et pour un hébergement Node ou Vercel ;
 *
 *  · EXPORT_STATIQUE=1 — export entièrement statique dans out/,
 *    déployable sur n'importe quel hébergeur de fichiers
 *    (GitHub Pages, OVH, Netlify, un simple dossier web).
 *
 * BASE_PATH sert aux hébergements qui servent le site dans un
 * sous-répertoire, comme GitHub Pages pour un dépôt de projet
 * (https://<compte>.github.io/<depot>).
 */

const statique = process.env.EXPORT_STATIQUE === "1";
const basePath = process.env.BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  ...(statique ? { output: "export" } : {}),
  // Génère competences/index.html plutôt que competences.html :
  // les hébergeurs statiques servent alors /competences sans configuration.
  trailingSlash: statique,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Exposé au code client : next/image servi sans optimisation et les liens
  // de téléchargement n'héritent pas de basePath (voir lib/chemin.ts).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
