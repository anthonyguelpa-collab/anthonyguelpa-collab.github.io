/**
 * Export du portfolio en page unique autonome.
 *
 * Produit, dans export-artifact/, une version du site tenant dans un seul
 * fichier HTML avec navigation par ancres, accompagnée de ses images.
 * Cette version sert à publier le portfolio sans hébergement Node :
 * elle se dépose telle quelle sur n'importe quel hébergeur statique.
 *
 * Le site Next.js reste la source de référence : cet export est une
 * projection de son rendu réel, pas une seconde implémentation.
 *
 * Prérequis : le site doit tourner (npm run build && npm start).
 * Usage : node scripts/exporter-page-unique.mjs [http://127.0.0.1:3000]
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

/**
 * Playwright peut être installé localement (npm i -D playwright) ou
 * globalement. On le résout dans les deux cas plutôt que d'imposer l'un.
 */
const require = createRequire(import.meta.url);
const { chromium } = require(
  require.resolve("playwright", {
    paths: [
      process.cwd(),
      "/usr/lib/node_modules",
      "/usr/local/lib/node_modules",
    ],
  }),
);

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const RACINE = process.cwd();
const SORTIE = path.join(RACINE, "export-artifact");

/* ------------------------------------------------------- Utilitaires */

/** Transforme les liens internes en ancres et les chemins absolus en relatifs. */
function relativiser(html) {
  return html
    // Liens de navigation interne → ancres du routeur
    .replace(/href="\/(?!\/)([^"]*)"/g, (m, chemin) => {
      if (/^(captures|img|documents)\//.test(chemin)) return `href="${chemin}"`;
      return `href="#/${chemin}"`;
    })
    .replace(/href="#\/"/g, 'href="#/"')
    // Ressources
    .replace(/src="\/(captures|img)\//g, 'src="$1/')
    .replace(/srcset="[^"]*"/g, "");
}

async function main() {
  const navigateur = await chromium.launch();
  const page = await navigateur.newPage({ viewport: { width: 1440, height: 1000 } });

  /* --------------------------------------- 1. Recenser toutes les routes */

  const vues = new Set(["/"]);
  const file = ["/"];
  const routes = [];

  while (file.length) {
    const url = file.shift();
    const reponse = await page.goto(BASE + url, { waitUntil: "networkidle" });
    if (!reponse || reponse.status() !== 200) {
      console.error(`  ! route ignorée (${reponse?.status()}) : ${url}`);
      continue;
    }

    const donnees = await page.evaluate(() => {
      // Les scripts d'hydratation n'ont pas de sens dans une page statique.
      document.querySelectorAll("main script").forEach((s) => s.remove());
      return {
        titre: document.title,
        contenu: document.querySelector("main")?.innerHTML ?? "",
      };
    });

    routes.push({ chemin: url, ...donnees });

    const liens = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href^="/"]')).map((a) =>
        a.getAttribute("href"),
      ),
    );
    for (let lien of liens) {
      lien = lien.split("#")[0] || "/";
      if (/\.(pdf|png|jpe?g|webp)$/i.test(lien)) continue;
      if (!vues.has(lien)) {
        vues.add(lien);
        file.push(lien);
      }
    }
  }

  console.log(`Routes exportées : ${routes.length}`);

  /* ----------------------------------- 2. En-tête, pied de page et styles */

  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  const { entete, pied, feuilles, navItems } = await page.evaluate(() => ({
    entete: document.querySelector("header")?.outerHTML ?? "",
    pied: document.querySelector("footer")?.outerHTML ?? "",
    feuilles: Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((l) => l.getAttribute("href"))
      .filter((h) => h && h.startsWith("/_next")),
    // Les entrées du menu, relevées sur la navigation bureau : elles servent
    // à reconstruire le menu mobile, que React ne rend qu'une fois ouvert.
    navItems: Array.from(
      document.querySelectorAll('nav[aria-label="Navigation principale"] a'),
    ).map((a) => ({
      href: a.getAttribute("href"),
      label: a.textContent.trim(),
    })),
  }));

  let css = "";
  for (const href of feuilles) {
    const r = await page.request.get(BASE + href);
    css += await r.text();
  }
  console.log(`Styles intégrés  : ${(css.length / 1024).toFixed(0)} Ko`);

  /* ----------------------------- 3. Reconstruction du menu mobile */

  const menuMobile = `<nav id="menu-mobile" aria-label="Navigation principale mobile" class="border-t border-night-700/70 bg-night-900 lg:hidden" hidden><ul class="mx-auto max-w-6xl px-4 py-2 sm:px-6">${navItems
    .map(
      (i) =>
        `<li><a href="#${i.href}" class="lien-mobile flex items-center gap-3 border-l-2 border-transparent py-3 pl-4 text-sm text-ink-300 transition-colors hover:border-night-500 hover:text-ink-100">${i.label}</a></li>`,
    )
    .join("")}</ul></nav>`;

  const enteteComplet = entete.replace(/<\/header>$/, `${menuMobile}</header>`);

  /* ------------------------------------------- 4. Assemblage de la page */

  const sections = routes
    .map(
      (r) =>
        `<section class="vue" data-route="${r.chemin}" data-titre="${r.titre.replace(/"/g, "&quot;")}" hidden>${relativiser(r.contenu)}</section>`,
    )
    .join("\n");

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Portfolio BTS SIO</title>
<meta name="description" content="Portfolio professionnel d'Anthony Guelpa, étudiant en BTS SIO option SISR en alternance. Compétences E4 et E5, situations professionnelles documentées et veille technologique.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
${css}
.vue[hidden]{display:none}
</style>
</head>
<body>
<a href="#contenu" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-bright focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night-950">Aller au contenu principal</a>
${relativiser(enteteComplet)}
<main id="contenu">
${sections}
</main>
${relativiser(pied)}
<script>
(function () {
  var vues = Array.prototype.slice.call(document.querySelectorAll('.vue'));
  var menu = document.getElementById('menu-mobile');
  var bouton = document.querySelector('[aria-controls="menu-mobile"]');

  // Une ancre peut viser une section interne : #/competences#e4
  function routeCourante() {
    var h = location.hash.replace(/^#/, '').split('?')[0];
    if (!h || h === '/') return { route: '/', fragment: '' };
    var sep = h.indexOf('#');
    if (sep === -1) return { route: h, fragment: '' };
    return { route: h.slice(0, sep), fragment: h.slice(sep + 1) };
  }

  function afficher() {
    var courant = routeCourante();
    var route = courant.route;
    var cible = vues.filter(function (v) { return v.dataset.route === route; })[0]
             || vues.filter(function (v) { return v.dataset.route === '/'; })[0];

    vues.forEach(function (v) { v.hidden = v !== cible; });
    if (cible && cible.dataset.titre) document.title = cible.dataset.titre;

    // État actif du menu, dans les deux barres de navigation.
    document.querySelectorAll('header a[href^="#/"]').forEach(function (a) {
      var h = a.getAttribute('href').slice(1);
      var actif = h === '/' ? route === '/' : route.indexOf(h) === 0;
      if (actif) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
      var trait = a.querySelector('span[aria-hidden]');
      if (trait) trait.classList.toggle('scale-x-100', actif), trait.classList.toggle('scale-x-0', !actif);
    });

    document.querySelectorAll('#menu-mobile .lien-mobile').forEach(function (a) {
      var h = a.getAttribute('href').slice(1);
      var actif = h === '/' ? route === '/' : route.indexOf(h) === 0;
      a.classList.toggle('border-cyan-bright', actif);
      a.classList.toggle('border-transparent', !actif);
      a.classList.toggle('text-ink-100', actif);
      a.classList.toggle('text-ink-300', !actif);
      if (actif) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    if (menu) menu.hidden = true;
    if (bouton) bouton.setAttribute('aria-expanded', 'false');

    // Ancre interne : on se positionne dessus plutôt qu'en haut de page.
    if (courant.fragment && cible) {
      var ancre = cible.querySelector('#' + CSS.escape(courant.fragment));
      if (ancre) {
        ancre.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }

  // Menu mobile — réimplémenté en JS simple, sans framework.
  if (bouton && menu) {
    menu.hidden = true;
    bouton.addEventListener('click', function () {
      var ouvert = menu.hidden;
      menu.hidden = !ouvert;
      bouton.setAttribute('aria-expanded', String(ouvert));
    });
  }

  window.addEventListener('hashchange', afficher);
  afficher();
})();
</script>

<script>
/**
 * Téléchargement du CV.
 *
 * Sur un hébergeur statique classique (Vercel, OVH, GitHub Pages), l'attribut
 * « download » du lien suffit : ce script ne fait rien et laisse le navigateur
 * travailler. Dans une visionneuse qui n'autorise pas le téléchargement direct,
 * il passe par l'interface de sauvegarde mise à disposition par l'hôte.
 */
(function () {
  if (!window.claude || typeof window.claude.use !== 'function') return;

  var sauvegarde = null;
  window.claude.use('downloads').then(function (d) { sauvegarde = d; });

  document.addEventListener('click', function (e) {
    var lien = e.target.closest ? e.target.closest('a[href^="documents/"]') : null;
    if (!lien || !sauvegarde) return;        // pas de capacité : lien natif

    e.preventDefault();
    var chemin = lien.getAttribute('href');
    var nom = chemin.split('/').pop();

    fetch(chemin)
      .then(function (r) {
        if (!r.ok) throw new Error('fichier introuvable');
        return r.blob();
      })
      .then(function (blob) { return sauvegarde.save({ filename: nom, data: blob }); })
      .catch(function (err) {
        // « declined » = l'utilisateur a refusé : rien à signaler.
        if (err && err.code === 'declined') return;
        window.open(chemin, '_blank', 'noopener');
      });
  });
})();
</script>
</body>
</html>`;

  /* -------------------------------------- 5. Écriture et copie des images */

  fs.rmSync(SORTIE, { recursive: true, force: true });
  fs.mkdirSync(SORTIE, { recursive: true });
  fs.writeFileSync(path.join(SORTIE, "index.html"), html, "utf8");

  const references = new Set();
  for (const m of html.matchAll(/(?:src|href)="((?:captures|img|documents)\/[^"]+)"/g)) {
    references.add(m[1]);
  }

  let octets = 0;
  for (const ref of references) {
    const source = path.join(RACINE, "public", ref);
    if (!fs.existsSync(source)) {
      console.error(`  ! ressource manquante : ${ref}`);
      continue;
    }
    const cible = path.join(SORTIE, ref);
    fs.mkdirSync(path.dirname(cible), { recursive: true });
    fs.copyFileSync(source, cible);
    octets += fs.statSync(source).size;
  }

  console.log(`Page générée     : ${(html.length / 1024).toFixed(0)} Ko`);
  console.log(`Ressources       : ${references.size} fichiers, ${(octets / 1024 / 1024).toFixed(1)} Mo`);
  console.log(`Sortie           : ${SORTIE}`);

  await navigateur.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
