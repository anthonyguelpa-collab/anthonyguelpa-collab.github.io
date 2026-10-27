/**
 * Contrôle de validation avant publication.
 *
 * Vérifie, sans démarrer le site :
 *   1. que chaque situation et chaque exemple de veille a bien son fichier MDX ;
 *   2. qu'aucun fichier MDX n'est orphelin ;
 *   3. que toutes les captures référencées existent réellement ;
 *   4. que chaque compétence est étayée par au moins une situation ;
 *   5. que chaque situation référence des compétences existantes ;
 *   6. que les fichiers obligatoires de la page d'accueil sont présents.
 *
 * Usage : node scripts/verifier.mjs
 */

import fs from "node:fs";
import path from "node:path";

const racine = process.cwd();
const erreurs = [];
const avertissements = [];

const lire = (p) => fs.readFileSync(path.join(racine, p), "utf8");
const existe = (p) => fs.existsSync(path.join(racine, p));

/* Extraction des identifiants depuis les fichiers de données, sans exécuter
   de TypeScript : une simple lecture des littéraux suffit et évite d'ajouter
   une étape de compilation au contrôle. */
const extraire = (source, champ) =>
  [...source.matchAll(new RegExp(`${champ}:\\s*"([^"]+)"`, "g"))].map(
    (m) => m[1],
  );

const srcSituations = lire("data/situations.ts");
const srcCompetences = lire("data/competences.ts");
const srcVeille = lire("data/veille.ts");
const srcRealisations = lire("data/realisations.ts");

const slugsSituations = extraire(srcSituations, "slug");
const idsCompetences = extraire(srcCompetences, "id");
const slugsVeille = extraire(srcVeille, "slug");
const slugsRealisations = extraire(srcRealisations, "slug");

/* ---------------------------------------------- 1 et 2 — fichiers MDX */

function verifierCollection(collection, slugs) {
  const dossier = path.join(racine, "content", collection);
  const presents = fs.existsSync(dossier)
    ? fs.readdirSync(dossier).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
    : [];

  for (const slug of slugs) {
    if (!presents.includes(slug)) {
      erreurs.push(`MDX manquant : content/${collection}/${slug}.mdx`);
    }
  }
  for (const fichier of presents) {
    if (!slugs.includes(fichier)) {
      avertissements.push(
        `MDX orphelin (aucune entrée correspondante) : content/${collection}/${fichier}.mdx`,
      );
    }
  }
  return presents;
}

verifierCollection("situations", slugsSituations);
verifierCollection("realisations", slugsRealisations);
verifierCollection("veille", slugsVeille);

/* --------------------------------------------------- 3 — captures */

let nbCaptures = 0;
for (const collection of ["situations", "realisations", "veille"]) {
  const dossier = path.join(racine, "content", collection);
  if (!fs.existsSync(dossier)) continue;

  for (const fichier of fs.readdirSync(dossier).filter((f) => f.endsWith(".mdx"))) {
    const contenu = fs.readFileSync(path.join(dossier, fichier), "utf8");
    for (const m of contenu.matchAll(/src="(\/captures\/[^"]+)"/g)) {
      nbCaptures++;
      if (!existe(path.join("public", m[1]))) {
        erreurs.push(`Capture introuvable : ${m[1]} (référencée dans ${collection}/${fichier})`);
      }
    }
    // Toute capture doit porter une légende (règle de forme du portfolio).
    const captures = contenu.match(/<Capture\b[\s\S]*?\/>/g) ?? [];
    for (const bloc of captures) {
      if (!bloc.includes("legende=")) {
        erreurs.push(`Capture sans légende dans ${collection}/${fichier}`);
      }
      if (!bloc.includes("alt=")) {
        erreurs.push(`Capture sans texte alternatif dans ${collection}/${fichier}`);
      }
    }
  }
}

/* ------------------------------------ 4 et 5 — cohérence des liens */

const blocsCompetences = [
  ...srcSituations.matchAll(/competences:\s*\[([^\]]*)\]/g),
  ...srcVeille.matchAll(/competences:\s*\[([^\]]*)\]/g),
  ...srcRealisations.matchAll(/competences:\s*\[([^\]]*)\]/g),
].map((m) => m[1]);

const referencees = new Set();
for (const bloc of blocsCompetences) {
  for (const m of bloc.matchAll(/"([^"]+)"/g)) {
    referencees.add(m[1]);
    if (!idsCompetences.includes(m[1])) {
      erreurs.push(`Référence de compétence inconnue dans une situation : "${m[1]}"`);
    }
  }
}

for (const id of idsCompetences) {
  if (!referencees.has(id)) {
    erreurs.push(
      `Compétence affichée sans preuve — ni situation professionnelle, ni exemple de veille (règle de cohérence UFIP) : "${id}"`,
    );
  }
}

/* ------------------------------------- 6 — documentations PDF */

const pdfPresents = [];
const pdfManquants = [];
for (const slug of slugsSituations) {
  const chemin = `public/documents/situations/${slug}.pdf`;
  if (existe(chemin)) {
    pdfPresents.push(slug);
    // Un PDF vide ou tronqué serait pire qu'absent.
    const taille = fs.statSync(path.join(racine, chemin)).size;
    if (taille < 1024) {
      erreurs.push(`Documentation PDF vide ou tronquée : ${chemin}`);
    }
  } else {
    pdfManquants.push(slug);
  }
}
for (const slug of pdfManquants) {
  avertissements.push(
    `Pas de documentation PDF — aucun bouton ne sera affiché : public/documents/situations/${slug}.pdf`,
  );
}

/* ------------------------------------------- 7 — éléments obligatoires */

const obligatoires = [
  ["public/img/cv.png", "CV intégré comme image (page CV)"],
  ["public/documents/CV-Anthony-Guelpa.pdf", "CV téléchargeable en PDF"],
];
const recommandes = [
  ["public/img/photo.jpg", "Photo d'identité (page Accueil)"],
  ["public/img/logo-ufitech.png", "Logo de l'école (page Accueil)"],
  ["public/img/logo-ufip.png", "Logo du groupe (page Accueil)"],
  ["public/img/logo-entreprise.png", "Logo de l'entreprise (page Accueil)"],
];

for (const [chemin, libelle] of obligatoires) {
  if (!existe(chemin)) erreurs.push(`Fichier obligatoire manquant — ${libelle} : ${chemin}`);
}
for (const [chemin, libelle] of recommandes) {
  if (!existe(chemin)) avertissements.push(`À fournir — ${libelle} : ${chemin}`);
}

/* ------------------------------------------------------------ Rapport */

console.log("\nCONTRÔLE DE VALIDATION DU PORTFOLIO");
console.log("=".repeat(60));
console.log(`Situations professionnelles  : ${slugsSituations.length}`);
console.log(`Compétences                  : ${idsCompetences.length}`);
console.log(`Exemples de veille           : ${slugsVeille.length}`);
console.log(`Réalisations (laboratoire)   : ${slugsRealisations.length}`);
console.log(`Captures référencées         : ${nbCaptures}`);
console.log(
  `Documentations PDF           : ${pdfPresents.length} / ${slugsSituations.length} situations`,
);
console.log("=".repeat(60));

if (avertissements.length) {
  console.log(`\nÀ COMPLÉTER (${avertissements.length})`);
  avertissements.forEach((a) => console.log(`  · ${a}`));
}

if (erreurs.length) {
  console.log(`\nERREURS BLOQUANTES (${erreurs.length})`);
  erreurs.forEach((e) => console.log(`  ✗ ${e}`));
  console.log("");
  process.exit(1);
}

console.log("\n✓ Aucune erreur bloquante. Le portfolio est publiable.\n");
