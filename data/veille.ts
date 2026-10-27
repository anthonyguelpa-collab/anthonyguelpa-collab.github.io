/**
 * Veille technologique.
 *
 * Terminologie : le portfolio emploie « veille technologique » partout,
 * conformément à la règle UFIP (choisir un terme et s'y tenir).
 *
 * Le corps rédigé de chaque exemple vit dans content/veille/<slug>.mdx
 */

export interface ThemeVeille {
  id: string;
  titre: string;
  /** Pourquoi ce thème, du point de vue de l'entreprise. */
  justification: string;
  exemples: string[];
}

export interface ExempleVeille {
  slug: string;
  themeId: string;
  titre: string;
  resume: string;
  /** Contexte UFIP : thème de veille et manière dont la solution a été trouvée. */
  contexte: string;
  /** Conclusion UFIP : solution adoptée ou non, et pourquoi. */
  conclusion: string;
  date: string;
  /** Statut de la solution vis-à-vis de l'entreprise. */
  statut: "retenue" | "ecartee" | "en-evaluation" | "veille-passive";
  /**
   * Compétences validées par cet exemple de veille.
   * La règle de cohérence UFIP admet un exemple de veille au même titre
   * qu'une situation professionnelle pour étayer une compétence.
   */
  competences: string[];
  /**
   * Qualité des preuves apportées par cet exemple, même convention que les
   * situations professionnelles. Sert au calcul des statuts du tableau de
   * suivi : un banc d'essai illustré ne pèse pas comme une revue de marché.
   */
  preuves: "completes" | "partielles" | "absentes";
  sources: { libelle: string; url?: string }[];
}

export const definitionVeille = `Une veille technologique est la mise en œuvre d'un ensemble de stratégies utilisant des canaux de récolte automatisée d'informations, dans le but de rester au contact immédiat de l'actualité technologique sur des sujets choisis, pour être informé et alerté en y consacrant le moins de temps possible. La recherche ponctuelle d'informations à l'occasion d'un incident ou d'un projet ne relève pas de la veille : ce qui la caractérise, c'est la régularité et l'automatisation de la collecte.`;

export const planningVeille = [
  {
    jour: "Lundi",
    horaire: "9 h 00",
    duree: "30 min",
    activite: "Alertes e-mail de la semaine et sources francophones",
  },
  {
    jour: "Mercredi",
    horaire: "14 h 00",
    duree: "20 min",
    activite: "Sources techniques internationales et blogs officiels des éditeurs",
  },
  {
    jour: "Vendredi",
    horaire: "16 h 00",
    duree: "30 min",
    activite: "Synthèse hebdomadaire, mise à jour du tableau de suivi, archivage",
  },
];

export const dureeHebdomadaire = "1 h 20 par semaine";

export const canaux = [
  {
    nom: "Agrégateur de flux RSS",
    detail:
      "Centralisation des flux des sites spécialisés et des blogs éditeurs dans un tableau de bord unique.",
  },
  {
    nom: "Alertes par courriel",
    detail:
      "Alertes sur mots-clés ciblés : nom des solutions suivies, « vulnerability », « breach », normes émergentes.",
  },
  {
    nom: "Blogs officiels des éditeurs",
    detail:
      "Source primaire pour les évolutions produit, les changements tarifaires et les avis de sécurité.",
  },
  {
    nom: "Bancs d'essai personnels",
    detail:
      "Déploiement réel de la solution en environnement de test, puis bilan écrit. C'est le canal qui tranche.",
  },
  {
    nom: "Sources institutionnelles",
    detail:
      "ANSSI, CNIL et CERT-FR pour tout ce qui touche à la sécurité et à la conformité.",
  },
];

export const themes: ThemeVeille[] = [
  {
    id: "gestionnaires-mdp",
    titre: "Gestionnaires de mots de passe",
    justification:
      "Les mots de passe partagés et notés sur papier étaient le point faible le plus concret du système d'information. Il fallait une solution utilisable par des collaborateurs non techniciens, conforme au RGPD et au coût maîtrisé pour une PME.",
    exemples: ["keepass", "bitwarden", "lockpass", "panorama-gestionnaires"],
  },
  {
    id: "virtualisation",
    titre: "Virtualisation et hyperviseurs",
    justification:
      "Toute la production repose sur un hyperviseur unique. Suivre l'évolution des solutions de virtualisation, et notamment les alternatives apparues après les bouleversements tarifaires du marché, conditionne les choix de renouvellement à venir.",
    exemples: ["hyperviseurs-alternatives"],
  },
  {
    id: "connectique",
    titre: "Normes et standards émergents",
    justification:
      "Les renouvellements de matériel engagent l'entreprise sur plusieurs années. Repérer tôt un standard émergent évite d'investir dans une technologie en fin de cycle.",
    exemples: ["gpmi"],
  },
];

export const exemples: ExempleVeille[] = [
  {
    slug: "panorama-gestionnaires",
    themeId: "gestionnaires-mdp",
    titre: "Panorama des gestionnaires de mots de passe pour PME",
    resume:
      "Premier tour d'horizon du marché : critères de sélection pour une structure sans utilisateur expert.",
    contexte:
      "Thème de veille : gestionnaires de mots de passe. Point de départ de la démarche, ce panorama a été construit à partir des sites spécialisés francophones et internationaux suivis en veille hebdomadaire, complétés par les blogs officiels des éditeurs.",
    conclusion:
      "Aucune solution adoptée à ce stade : le panorama a servi à définir la grille de critères — ergonomie, gestion centralisée, conformité RGPD, coût par utilisateur — appliquée ensuite aux bancs d'essai.",
    date: "Novembre 2025",
    statut: "en-evaluation",
    competences: ["e4-developpement-pro"],
    preuves: "absentes",
    sources: [
      { libelle: "ANSSI — recommandations relatives aux mots de passe", url: "https://cyber.gouv.fr" },
      { libelle: "CNIL — recommandation mots de passe", url: "https://www.cnil.fr" },
    ],
  },
  {
    slug: "keepass",
    themeId: "gestionnaires-mdp",
    titre: "KeePass — la piste initiale",
    resume:
      "Solution open source certifiée ANSSI, retenue au départ pour son coût nul, puis remise en question par la veille.",
    contexte:
      "Thème de veille : gestionnaires de mots de passe. KeePass est apparu en premier dans les recommandations institutionnelles, et a été intégré au plan de sécurisation comme solution cible, avant que la veille ne nuance ce choix.",
    conclusion:
      "Solution écartée pour un déploiement généralisé : le coût nul et la certification ANSSI ne compensent pas la charge de configuration manuelle pour des utilisateurs non techniciens. Conservée pour la base d'administration du service informatique.",
    date: "Novembre 2025",
    statut: "ecartee",
    competences: ["e4-developpement-pro", "e5-concevoir"],
    preuves: "absentes",
    sources: [
      { libelle: "ANSSI — visa de sécurité KeePass", url: "https://cyber.gouv.fr" },
    ],
  },
  {
    slug: "bitwarden",
    themeId: "gestionnaires-mdp",
    titre: "Bitwarden — banc d'essai",
    resume:
      "Test réel : organisation créée, collections à deux niveaux, permissions granulaires, estimation de coût sur l'effectif.",
    contexte:
      "Thème de veille : gestionnaires de mots de passe. Après le panorama, Bitwarden a été retenu pour un banc d'essai grandeur nature, repéré via les comparatifs de sites spécialisés et son positionnement open source.",
    conclusion:
      "Solution en évaluation avancée : l'auto-remplissage web et les permissions granulaires sont convaincants, la conformité RGPD est solide avec un hébergement européen. Point de vigilance retenu : aucun auto-remplissage natif sur les logiciels installés.",
    date: "Août 2026",
    statut: "en-evaluation",
    competences: ["e4-developpement-pro", "e5-concevoir"],
    preuves: "completes",
    sources: [{ libelle: "Documentation officielle Bitwarden", url: "https://bitwarden.com/help/" }],
  },
  {
    slug: "lockpass",
    themeId: "gestionnaires-mdp",
    titre: "LockPass — banc d'essai",
    resume:
      "Test de l'alternative française : cloisonnement administrateur, catégories d'accès, transferts chiffrés et boîtes de dépôt.",
    contexte:
      "Thème de veille : gestionnaires de mots de passe. Solution identifiée dans le panorama au titre de la souveraineté numérique, testée une semaine après Bitwarden sur la même grille de critères pour permettre une comparaison directe.",
    conclusion:
      "Solution en évaluation avancée : le cloisonnement de l'espace personnel vis-à-vis de l'administrateur et la gestion par catégories — qui permet de révoquer tous les accès d'un partant en une action — constituent un avantage net sur le concurrent testé.",
    date: "Août 2026",
    statut: "en-evaluation",
    competences: ["e4-developpement-pro", "e5-concevoir"],
    preuves: "completes",
    sources: [{ libelle: "Documentation officielle LockSelf", url: "https://www.lockself.com" }],
  },
  {
    slug: "hyperviseurs-alternatives",
    themeId: "virtualisation",
    titre: "Hyperviseurs — suivi des alternatives",
    resume:
      "Veille sur les solutions de virtualisation et leurs modèles de licence, dans un marché en recomposition.",
    contexte:
      "Thème de veille : virtualisation. Sujet suivi en continu depuis que la production de l'entreprise repose entièrement sur un hyperviseur unique, et que les évolutions tarifaires du marché rendent les alternatives pertinentes à moyen terme.",
    conclusion:
      "Aucun changement engagé : l'hyperviseur en place répond au besoin et le migrer représenterait un risque disproportionné. La veille reste active pour préparer la décision au prochain renouvellement de serveur.",
    date: "Suivi continu depuis 2025",
    statut: "veille-passive",
    competences: ["e4-developpement-pro"],
    preuves: "absentes",
    sources: [],
  },
  {
    slug: "gpmi",
    themeId: "connectique",
    titre: "GPMI — un standard de connectique émergent",
    resume:
      "Suivi d'un standard annoncé comme remplaçant unifié de plusieurs connectiques, et des incertitudes qui l'entourent.",
    contexte:
      "Thème de veille : normes et standards émergents. Sujet repéré via les sites techniques internationaux suivis en veille hebdomadaire, à l'occasion de l'annonce d'un nouveau standard de connectique visant à unifier vidéo, données, alimentation et réseau sur un seul câble.",
    conclusion:
      "Veille passive, aucune action : aucun impact à court terme sur l'entreprise. Le sujet est conservé en surveillance pour anticiper les renouvellements de matériel, l'adoption hors de son marché d'origine restant incertaine.",
    date: "Novembre 2025",
    statut: "veille-passive",
    competences: ["e4-developpement-pro"],
    preuves: "absentes",
    sources: [],
  },
];

export const STATUTS: Record<
  ExempleVeille["statut"],
  { libelle: string; ton: "positif" | "neutre" | "negatif" }
> = {
  retenue: { libelle: "Solution retenue", ton: "positif" },
  "en-evaluation": { libelle: "En évaluation", ton: "neutre" },
  "veille-passive": { libelle: "Veille passive", ton: "neutre" },
  ecartee: { libelle: "Solution écartée", ton: "negatif" },
};

export function getExemple(slug: string): ExempleVeille | undefined {
  return exemples.find((e) => e.slug === slug);
}

export function getTheme(id: string): ThemeVeille | undefined {
  return themes.find((t) => t.id === id);
}

export function exemplesPourTheme(themeId: string): ExempleVeille[] {
  return exemples.filter((e) => e.themeId === themeId);
}

/** Exemples de veille qui étayent une compétence donnée. */
export function exemplesPourCompetence(competenceId: string): ExempleVeille[] {
  return exemples.filter((e) => e.competences.includes(competenceId));
}
