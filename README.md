# Portfolio BTS SIO — option SISR

Portfolio professionnel d'Anthony Guelpa, étudiant en BTS SIO option SISR en
alternance au service informatique de Goiran et Compagnie.

Site statique, sans base de données ni authentification. Construit avec
Next.js, React, TypeScript, Tailwind CSS et MDX. Déployable sur Vercel depuis
un dépôt GitHub, avec HTTPS automatique.

---

## Démarrer

```bash
npm install          # installer les dépendances
npm run dev          # serveur de développement — http://localhost:3000
npm run build        # build de production
npm start            # servir le build de production
npm run verifier     # contrôle de validation avant publication
```

Node.js 18.18 ou supérieur est requis.

---

## Ce qu'il reste à déposer

Trois fichiers sont attendus par les règles de la page d'accueil et ne sont
pas encore présents. Le site s'affiche correctement sans eux : un emplacement
explicite est montré à leur place plutôt qu'une image cassée.

| Fichier | Rôle |
|---|---|
| `public/img/photo.jpg` | Photo d'identité — obligatoire sur la page d'accueil |

Les trois logos (`logo-ufitech.png`, `logo-ufip.png`, `logo-entreprise.png`)
sont déjà en place dans `public/img/`.

Déposer la photo au chemin exact indiqué ci-dessus, puis relancer
`npm run verifier` pour confirmer.

---

## Organisation du projet

```
app/                      Pages et routes (App Router)
  page.tsx                  Accueil
  entreprise/               L'entreprise et la mission
  cv/                       CV intégré + téléchargement PDF
  competences/              Vue d'ensemble E4 / E5
    [bloc]/[slug]/            Page dédiée par compétence
  realisations/             Réalisations professionnelles (E5)
  situations/               Vue d'ensemble
    [slug]/                   Page dédiée par situation
  veille/                   Veille technologique
    [slug]/                   Page dédiée par exemple de veille

components/
  layout/                 En-tête et pied de page persistants
  ui/                     Composants génériques réutilisables
  portfolio/              Cartes, liens croisés, composants MDX

content/
  situations/             Déroulés techniques (.mdx)
  veille/                 Présentations des solutions (.mdx)

data/
  site.ts                 Identité, navigation, chemins des fichiers
  competences.ts          Les 9 compétences, reprises des grilles officielles
  situations.ts           Métadonnées + MAPPING compétences (source unique)
  veille.ts               Thèmes, planning, exemples

lib/
  relations.ts            Navigation bidirectionnelle dérivée
  mdx.ts                  Chargement des documents MDX
  assets.ts               Vérification de présence des fichiers publics

public/
  captures/               Preuves visuelles, caviardées
  documents/              Fichiers téléchargeables (CV)
  img/                    Photo, logos, CV en image

scripts/
  verifier.mjs            Contrôle de validation
```

---

## Navigation bidirectionnelle

C'est le mécanisme central du portfolio, et il n'y a **qu'un seul endroit à
modifier**.

Le tableau `situations` de `data/situations.ts` est la source unique : chaque
situation y déclare les compétences qu'elle valide. Les deux sens du lien —
compétence vers situations, situation vers compétences — sont dérivés
automatiquement par `lib/relations.ts`.

Conséquence pratique : il est impossible de créer un lien orphelin ou
d'oublier de mettre à jour le sens inverse.

Il en va de même pour les exemples de veille, qui déclarent eux aussi les
compétences qu'ils étayent — la règle de cohérence admet un exemple de veille
au même titre qu'une situation professionnelle.

---

## Enrichir le portfolio

### Ajouter une situation professionnelle

1. Ajouter une entrée dans le tableau `situations` de `data/situations.ts`, en
   renseignant notamment `slug`, `reference`, `contexte`, `conclusion` et la
   liste `competences`.
2. Créer le fichier `content/situations/<slug>.mdx` contenant le déroulé
   technique. Pas d'en-tête de métadonnées : tout est dans le fichier de
   données.
3. Déposer les captures dans `public/captures/<dossier>/`.
4. Lancer `npm run verifier`.

La page, les liens depuis les compétences concernées et l'entrée dans la vue
d'ensemble apparaissent automatiquement.

### Ajouter une réalisation de laboratoire

Même principe, avec une étape préalable au tout premier projet : renommer
`app/realisations/_modele-page-detail` en `[slug]`. L'export statique refuse
une route dynamique qui ne génèrerait aucune page, le gabarit est donc mis de
côté tant que `data/realisations.ts` est vide. Le détail figure dans le
LISEZ-MOI de ce dossier.

### Ajouter un exemple de veille

Même principe avec `data/veille.ts` et `content/veille/<slug>.mdx`.

### Composants disponibles dans les fichiers MDX

| Composant | Usage |
|---|---|
| `<Capture src alt legende large />` | Capture d'écran légendée. `large` élargit l'image. |
| `<CaptureManquante etape="..." />` | Signale une étape sans preuve disponible. |
| `<Note type="info \| alerte \| caviardage" titre="...">` | Encart. |
| `<Comparatif>` + `<Option titre sousTitre retenue>` | Comparaison de deux solutions. |
| `<Chiffres>` + `<Chiffre valeur libelle />` | Mise en avant de chiffres clés. |

Le Markdown standard fonctionne, tableaux compris.

---

## Règle de caviardage

Les documents d'entreprise reproduits dans ce portfolio ont été caviardés au
niveau du calque texte des PDF sources : **le texte sensible est réellement
supprimé du fichier**, il n'est pas seulement masqué visuellement.

Sont remplacés par des équivalents génériques :

- les noms d'hôtes réels ;
- les adresses IP et plans d'adressage ;
- le nom du prestataire informatique ;
- l'adresse physique des sites ;
- le modèle des équipements de sécurité ;
- les opérateurs des liens d'accès ;
- les numéros de téléphone.

Sont conservés : les noms de produits et de services, nécessaires pour
démontrer la compétence, et les lettres de lecteurs Windows, génériques et
sans valeur pour un attaquant.

Le plan d'implantation réel des caméras de vidéosurveillance n'est pas publié
du tout.

> **Avant d'ajouter une nouvelle capture**, vérifier qu'elle ne contient ni
> nom de client, ni nom de collaborateur, ni élément d'infrastructure
> identifiable. Le script de caviardage utilisé pour la première série est
> documenté dans l'historique du projet et peut être réappliqué.

---

## Version page unique

Une commande produit une version du portfolio tenant dans un seul fichier HTML,
avec navigation par ancres, accompagnée de ses images :

```bash
npm start                      # dans un terminal
npm run export:page-unique     # dans un autre
```

Le résultat est écrit dans `export-artifact/` : `index.html` autonome
(environ 690 Ko, styles intégrés) et les 93 ressources réellement utilisées.
Ce dossier se dépose tel quel sur n'importe quel hébergeur statique, sans
Node ni build côté serveur.

Le site Next.js reste la source de référence : cet export est une projection
de son rendu réel, pas une seconde implémentation. Il se régénère après chaque
modification du contenu.

Prérequis : Playwright. S'il n'est pas installé globalement,
`npm i -D playwright && npx playwright install chromium`.

---

## Mise en ligne sur GitHub Pages

Le portfolio se publie automatiquement à chaque modification, gratuitement,
via le workflow `.github/workflows/deploy.yml`. Adresse visée :
**https://anthonyguelpa.github.io**

### Étape 1 — Créer le dépôt

Sur github.com, « New repository » :

| Champ | Valeur |
|---|---|
| Repository name | `anthonyguelpa.github.io` |
| Visibilité | Public (obligatoire pour GitHub Pages en offre gratuite) |
| Initialize with README | **décoché** |

Le nom doit être exactement `<compte>.github.io` : c'est lui qui donne
l'adresse courte, servie à la racine.

### Étape 2 — Envoyer le projet

Dans le dossier du projet, sous VS Code (terminal ▸ nouveau terminal) :

```bash
git init
git add .
git commit -m "Portfolio BTS SIO SISR"
git branch -M main
git remote add origin https://github.com/anthonyguelpa/anthonyguelpa.github.io.git
git push -u origin main
```

Si le dépôt a déjà été initialisé (dossier `.git` présent), les trois
premières lignes sont inutiles.

### Étape 3 — Activer la publication par Actions

Sur le dépôt : **Settings ▸ Pages ▸ Build and deployment ▸ Source** →
choisir **GitHub Actions**.

Le workflow se lance alors seul. Son avancement est visible dans l'onglet
**Actions** ; il dure environ deux minutes. Le site est ensuite en ligne.

### Mettre à jour le portfolio

```bash
git add .
git commit -m "Ajout de la situation SP-13"
git push
```

Chaque envoi reconstruit et republie le site. Le workflow exécute
`npm run verifier` avant de construire : une compétence sans preuve ou une
capture manquante **arrête le déploiement** au lieu de publier un portfolio
incomplet.

### Hébergement alternatif

Le projet fonctionne aussi sur Vercel (import du dépôt, aucun réglage à
changer) et sur n'importe quel hébergeur de fichiers via
`npm run build:statique`, qui écrit le site complet dans `out/`.

La variable `BASE_PATH` gère les hébergements servant le site dans un
sous-répertoire : le workflow la renseigne automatiquement, et toutes les
ressources de `public/` en tiennent compte (voir `lib/chemin.ts`).

---

## Checklist de validation avant publication

Lancer d'abord le contrôle automatique :

```bash
npm run verifier
```

Il vérifie que chaque situation et chaque exemple de veille a son fichier MDX,
qu'aucun fichier n'est orphelin, que toutes les captures référencées existent,
que chaque compétence est étayée par au moins une preuve, que chaque référence
de compétence est valide, que chaque capture porte une légende et un texte
alternatif, et que les fichiers obligatoires sont présents.

Puis vérifier manuellement :

- [ ] Photo, logo de l'établissement et logo de l'entreprise déposés et visibles sur l'accueil
- [ ] Le CV s'affiche immédiatement sur la page CV, sans action de l'utilisateur
- [ ] Le bouton de téléchargement du CV fonctionne et ouvre le bon fichier
- [ ] Le menu est accessible depuis toutes les pages, sur mobile comme sur ordinateur
- [ ] Depuis une compétence, on atteint les situations qui la valident
- [ ] Depuis une situation, on atteint les compétences qu'elle valide
- [ ] Chaque situation comporte un contexte, un déroulé, des preuves et une conclusion
- [ ] Aucune page n'est uniquement textuelle — toutes comportent des illustrations
- [ ] Les captures publiées ne révèlent aucun nom de client ni de collaborateur
- [ ] Aucun nom d'hôte, adresse IP ou nom de prestataire n'apparaît en clair
- [ ] Le site s'affiche correctement sur téléphone
- [ ] Les liens externes du pied de page fonctionnent

Contrôles déjà effectués et à rejouer après toute modification importante :

- 34 pages parcourues, aucun lien interne cassé
- Aucune image manquante, toutes les images disposent d'un texte alternatif
- Aucun débordement horizontal sur mobile (390 px)

---

## Conformité aux règles de l'établissement

| Règle | Mise en œuvre |
|---|---|
| Cohérence — toute compétence affichée est étayée | Vérifié automatiquement par `npm run verifier` |
| Terminologie unique pour la veille | « Veille technologique » employé partout |
| Illustrer au maximum | 88 captures légendées réparties sur les pages de contenu |
| Palette limitée à 2 ou 3 couleurs | Bleu nuit (base), cyan (E4), ambre (E5) |
| Accueil en premier dans le menu | Oui |
| Menu accessible depuis toutes les pages | En-tête persistant, version mobile incluse |
| Accueil — nom, photo, logos | Oui, emplacements explicites tant que les fichiers manquent |
| CV visible immédiatement + téléchargement PDF | Oui |
| Compétences formulées d'après la grille | Libellés, critères et indicateurs repris mot pour mot |
| Page dédiée par compétence, avec liens | Oui |
| Situations : titre, contexte, déroulé, preuves, conclusion, liens | Structure imposée par le gabarit de page |
| Veille : définition, planning, thèmes, exemples | Oui |
| Captures nommées clairement | Organisées par dossier source et numéro de page |

---

## Choix techniques

**Pourquoi un site statique.** Aucune donnée n'est saisie par un visiteur et
aucun contenu ne change sans intervention. Une base de données et une
authentification auraient ajouté de la surface d'attaque et de la maintenance
sans bénéfice.

**Pourquoi MDX plutôt qu'un éditeur en ligne.** Les déroulés techniques sont
du texte long et structuré, versionné avec le reste du projet. Un fichier MDX
se relit, se compare et se restaure comme du code.

**Pourquoi les métadonnées en TypeScript et non en en-tête MDX.** Elles sont
typées : une référence de compétence inexistante ou un champ oublié est
détecté à la compilation, pas à la lecture de la page.

**Pourquoi un accent couleur par bloc.** Un examinateur qui cherche une
compétence E5 suit l'ambre. La couleur porte une information, elle ne décore
pas.
