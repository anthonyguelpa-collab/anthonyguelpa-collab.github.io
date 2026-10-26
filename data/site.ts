/**
 * Identité du portfolio et paramètres globaux.
 * Point unique à modifier pour les informations personnelles.
 */

export const site = {
  prenom: "Anthony",
  nom: "Guelpa",
  get nomComplet() {
    return `${this.prenom} ${this.nom}`;
  },
  titre: "Portfolio BTS SIO — option SISR",
  accroche:
    "Solutions d'Infrastructure, Systèmes et Réseaux — alternance en entreprise de BTP",
  description:
    "Portfolio professionnel d'Anthony Guelpa, étudiant en BTS SIO option SISR en alternance. Compétences E4 et E5, situations professionnelles documentées et veille technologique.",

  email: "anthonyguelpa@gmail.com",
  ville: "Levens (06)",
  permis: "Permis B",

  ecole: {
    nom: "UFITECH",
    ville: "Nice",
    formation: "BTS SIO — option SISR",
    periode: "Depuis septembre 2025",
    logo: "/img/logo-ufitech.png",
    site: "https://www.ufitech.eu",
  },

  /** Groupe auquel l'école est rattachée. */
  groupe: {
    nom: "UFIP Business School",
    sousTitre: "Groupe de l'établissement",
    logo: "/img/logo-ufip.png",
    site: "https://www.ufip.eu",
  },

  entreprise: {
    nom: "Goiran et Compagnie",
    secteur: "BTP — Assainissement et travaux publics",
    region: "Alpes-Maritimes (06)",
    poste: "Alternant au service informatique",
    contrat: "Contrat de professionnalisation",
    /** Déposer le fichier dans public/img/ pour remplacer le logo texte. */
    logo: "/img/logo-entreprise.png",
    site: "https://www.goiran-cie.com",
  },

  /** Photo d'identité — à déposer dans public/img/. */
  photo: "/img/photo.jpg",

  /** CV — version image affichée et version PDF téléchargeable. */
  cv: {
    image: "/img/cv.png",
    pdf: "/documents/CV-Anthony-Guelpa.pdf",
  },

  /** Laisser vide tant que le profil n'est pas publié. */
  linkedin: "",
} as const;

/** Navigation principale — « Accueil » doit rester en premier (règle UFIP). */
export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Entreprise", href: "/entreprise" },
  { label: "CV", href: "/cv" },
  { label: "Compétences", href: "/competences" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Situations", href: "/situations" },
  { label: "Veille", href: "/veille" },
] as const;
