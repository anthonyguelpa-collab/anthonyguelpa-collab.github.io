/**
 * Les 9 compétences du référentiel BTS SIO option SISR.
 *
 * Les libellés, les critères et les indicateurs de performance sont repris
 * mot pour mot des grilles officielles :
 *   · E4 — ANNEXE 6-3  : Grille d'aide à l'évaluation
 *   · E5 — ANNEXE 7-5-A : Grille d'aide à l'évaluation (option SISR)
 *
 * Ne pas reformuler : la cohérence avec la grille est ce que l'examinateur
 * vérifie en premier.
 */

export type Bloc = "e4" | "e5";

export interface Competence {
  /** Identifiant stable, utilisé pour lier les situations professionnelles. */
  id: string;
  bloc: Bloc;
  slug: string;
  /** Libellé exact de la grille de notation. */
  titre: string;
  /** Libellé abrégé pour la navigation et les badges. */
  titreCourt: string;
  /** Mise en contexte personnelle — ce que la compétence recouvre chez moi. */
  description: string;
  /** Les critères listés sous la compétence dans la grille. */
  criteres: string[];
  /** Indicateurs de performance retenus comme les plus parlants. */
  indicateurs: string[];
}

export const BLOCS: Record<
  Bloc,
  { code: string; titre: string; sousTitre: string; epreuve: string }
> = {
  e4: {
    code: "E4",
    titre: "Support et mise à disposition de services informatiques",
    sousTitre:
      "Bloc 1 — Support, helpdesk et mise à disposition de services informatiques",
    epreuve: "Épreuve E4 · Unité U4 — Profil et parcours professionnel",
  },
  e5: {
    code: "E5",
    titre: "Administration des systèmes et des réseaux",
    sousTitre:
      "Bloc 2 — Administration des systèmes et des réseaux (parcours SISR)",
    epreuve: "Épreuve E5 · Unité U5 — Réalisations professionnelles",
  },
};

export const competences: Competence[] = [
  /* ------------------------------------------------------------------ E4 */
  {
    id: "e4-patrimoine",
    bloc: "e4",
    slug: "gerer-le-patrimoine-informatique",
    titre: "Gérer le patrimoine informatique",
    titreCourt: "Gérer le patrimoine informatique",
    description:
      "Connaître ce que l'entreprise possède, savoir où cela se trouve, qui y a accès et comment on le remet en service. C'est la compétence qui m'a occupé le plus longtemps chez Goiran : à mon arrivée, l'infrastructure fonctionnait mais n'était décrite nulle part. J'ai cartographié l'hôte de virtualisation, les machines virtuelles, les partages réseau et les flux, puis formalisé la stratégie de sauvegarde et les habilitations.",
    criteres: [
      "Recenser et identifier les ressources numériques",
      "Exploiter des référentiels, normes et standards adoptés par le prestataire informatique",
      "Mettre en place et vérifier les niveaux d'habilitation associés à un service",
      "Vérifier les conditions de la continuité d'un service informatique",
      "Gérer des sauvegardes",
      "Vérifier le respect des règles d'utilisation des ressources numériques",
    ],
    indicateurs: [
      "Le recensement du patrimoine informatique est exhaustif et réalisé au moyen d'un outil de gestion des actifs informatiques.",
      "Les droits mis en place correspondent aux habilitations des acteurs.",
      "Les conditions de continuité et de reprise d'un service sont vérifiées et les manquements sont signalés.",
      "Les sauvegardes sont réalisées dans les conditions prévues conformément au plan de sauvegarde.",
      "Les écarts par rapport aux règles d'utilisation des ressources numériques sont détectés et signalés.",
    ],
  },
  {
    id: "e4-incidents",
    bloc: "e4",
    slug: "repondre-aux-incidents-et-aux-demandes",
    titre:
      "Répondre aux incidents et aux demandes d'assistance et d'évolution",
    titreCourt: "Répondre aux incidents et aux demandes",
    description:
      "Le cœur de mon quotidien : recevoir une demande, la qualifier, la résoudre, et surtout faire en sorte qu'elle ne revienne pas. Chez Goiran, la majorité des incidents récurrents touchaient le logiciel métier EBP et son interopérabilité avec Praxedo. J'ai systématiquement transformé chaque résolution en procédure écrite, pour que l'utilisateur puisse se débloquer seul la fois suivante.",
    criteres: [
      "Collecter, suivre et orienter des demandes",
      "Traiter des demandes concernant les services réseau et système, applicatifs",
      "Traiter des demandes concernant les applications",
    ],
    indicateurs: [
      "En utilisant les outils adaptés, les demandes d'assistance ont été prises en compte, correctement diagnostiquées et leur traitement correspond aux attentes.",
      "La méthode de diagnostic de résolution d'un incident est adéquate et efficiente.",
      "Une solution à l'incident est trouvée et mise en œuvre.",
      "Le compte rendu d'intervention est clair et explicite.",
      "La communication écrite et orale est adaptée à l'interlocuteur.",
    ],
  },
  {
    id: "e4-presence-en-ligne",
    bloc: "e4",
    slug: "developper-la-presence-en-ligne",
    titre: "Développer la présence en ligne de l'organisation",
    titreCourt: "Développer la présence en ligne",
    description:
      "Une présence en ligne n'est pas qu'une question de visibilité : elle engage juridiquement l'entreprise. Mon apport sur ce volet a été la mise en conformité réglementaire de la présence numérique de Goiran — politique de confidentialité publiable, information des personnes, et traitement des demandes d'exercice de droits reçues via le site.",
    criteres: [
      "Participer à la valorisation de l'image de l'organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques",
      "Référencer les services en ligne de l'organisation et mesurer leur visibilité",
      "Participer à l'évolution d'un site Web exploitant les données de l'organisation",
    ],
    indicateurs: [
      "Les enjeux économiques liés à l'image de l'organisation sont identifiés et les obligations juridiques sont respectées.",
      "Les mentions légales sont accessibles et conformes à la législation.",
      "L'image de l'organisation est conforme aux attentes et valorisée.",
      "Le site Web a évolué conformément au besoin exprimé.",
    ],
  },
  {
    id: "e4-mode-projet",
    bloc: "e4",
    slug: "travailler-en-mode-projet",
    titre: "Travailler en mode projet",
    titreCourt: "Travailler en mode projet",
    description:
      "Découper un besoin flou en tâches, estimer, documenter, tester, et rendre compte. J'ai mené en mode projet l'automatisation de l'affectation des tâches, l'étude de vidéosurveillance du parking et l'élaboration du plan de reprise d'activité — trois dossiers où le découpage et la traçabilité des décisions comptaient autant que la technique.",
    criteres: [
      "Analyser les objectifs et les modalités d'organisation d'un projet",
      "Planifier les activités",
      "Évaluer les indicateurs de suivi d'un projet et analyser les écarts",
    ],
    indicateurs: [
      "Les objectifs et les modalités d'organisation du projet sont explicités.",
      "L'analyse des besoins et de l'existant est pertinente.",
      "Le découpage en tâches est réaliste.",
      "Les livrables sont conformes.",
      "Le projet est documenté.",
      "Un compte rendu clair et concis est réalisé et les écarts sont justifiés.",
    ],
  },
  {
    id: "e4-service-utilisateurs",
    bloc: "e4",
    slug: "mettre-a-disposition-un-service-informatique",
    titre: "Mettre à disposition des utilisateurs un service informatique",
    titreCourt: "Mettre à disposition un service",
    description:
      "Un service n'est déployé que lorsque les utilisateurs savent s'en servir. Dans une entreprise de BTP où la majorité des collaborateurs ne sont pas des informaticiens, l'accompagnement représente la moitié du travail. J'ai conçu et animé les supports de formation Outlook et la documentation fonctionnelle du logiciel métier.",
    criteres: [
      "Réaliser les tests d'intégration et d'acceptation d'un service",
      "Déployer un service",
      "Accompagner les utilisateurs dans la mise en place d'un service",
    ],
    indicateurs: [
      "Des tests d'intégration et d'acceptation sont rédigés et effectués.",
      "Un rapport de test du service est produit.",
      "Un support d'information est disponible.",
      "Les modalités d'accompagnement sont définies.",
      "Le service déployé est opérationnel et donne satisfaction à l'utilisateur.",
    ],
  },
  {
    id: "e4-developpement-pro",
    bloc: "e4",
    slug: "organiser-son-developpement-professionnel",
    titre: "Organiser son développement professionnel",
    titreCourt: "Organiser son développement professionnel",
    description:
      "Je suis arrivé à l'informatique après un parcours en architecture, en gestion et en sécurité. Ma montée en compétences repose donc sur une méthode de veille explicite et sur des bancs d'essai réels plutôt que sur la seule lecture : quand une solution m'intéresse, je la déploie en test et j'en rends compte.",
    criteres: [
      "Mettre en place son environnement d'apprentissage personnel",
      "Mettre en œuvre des outils et stratégies de veille informationnelle",
      "Gérer son identité professionnelle",
      "Développer son projet professionnel",
    ],
    indicateurs: [
      "L'environnement d'apprentissage personnel est délimité et expliqué.",
      "La veille est régulière et vise à repérer les techniques et technologies émergentes du secteur informatique.",
      "Utiliser de manière approfondie des moyens de recherche d'information.",
      "L'identité professionnelle est pertinente et visible sur un réseau social professionnel.",
    ],
  },

  /* ------------------------------------------------------------------ E5 */
  {
    id: "e5-concevoir",
    bloc: "e5",
    slug: "concevoir-une-solution-dinfrastructure-reseau",
    titre: "Concevoir une solution d'infrastructure réseau",
    titreCourt: "Concevoir une solution d'infrastructure",
    description:
      "Partir d'un besoin exprimé par la direction, en mesurer le contexte juridique et l'impact sur l'existant, puis produire un dossier de choix argumenté. Le projet de vidéosurveillance du parking est l'illustration la plus complète : deux architectures opposées, chiffrées, confrontées aux contraintes réglementaires avant toute décision.",
    criteres: [
      "Analyser un besoin exprimé et son contexte juridique",
      "Étudier l'impact d'une évolution d'un élément d'infrastructure sur le système informatique",
      "Élaborer un dossier de choix d'une solution d'infrastructure et rédiger les spécifications techniques",
      "Choisir les éléments nécessaires pour assurer la qualité et la disponibilité d'un service",
      "Maquetter et prototyper une solution d'infrastructure permettant d'atteindre la qualité de service attendue",
      "Déterminer et préparer les tests nécessaires à la validation de la solution d'infrastructure retenue",
    ],
    indicateurs: [
      "Les contextes d'utilisation, les processus et les acteurs sur lesquels la solution d'infrastructure à produire aura un impact sont décrits.",
      "Les risques liés à une mauvaise utilisation ou à un dysfonctionnement de la solution d'infrastructure sont identifiés.",
      "Les choix de solutions répondant au besoin exprimé sont décrits et justifiés en termes de coût, de délai et de qualité.",
      "Le dossier de choix et l'argumentaire technique sont rédigés et prennent en compte les préoccupations éthiques et environnementales.",
      "Les éléments à sauvegarder et à journaliser pour assurer la continuité du service et la traçabilité des transactions sont identifiés.",
      "Les solutions de fonctionnement en mode dégradé et les procédures de reprise du service sont décrites.",
    ],
  },
  {
    id: "e5-deployer",
    bloc: "e5",
    slug: "installer-tester-et-deployer-une-solution",
    titre: "Installer, tester et déployer une solution d'infrastructure réseau",
    titreCourt: "Installer, tester et déployer",
    description:
      "Mettre réellement en œuvre, dans un environnement de test d'abord, puis en production. Mon chantier le plus abouti sur ce volet est l'automatisation des flux Outlook vers Planner : construite sur un dossier pilote, testée de bout en bout, documentée avec ses pièges, et préparée pour duplication sur les autres périmètres.",
    criteres: [
      "Installer et configurer des éléments d'infrastructure",
      "Installer et configurer des éléments nécessaires pour assurer la continuité des services",
      "Installer et configurer des éléments nécessaires pour assurer la qualité de service",
      "Rédiger ou mettre à jour la documentation technique et utilisateur d'une solution d'infrastructure",
      "Tester l'intégration et l'acceptation d'une solution d'infrastructure",
      "Déployer une solution d'infrastructure",
    ],
    indicateurs: [
      "La solution d'infrastructure est installée et configurée dans les règles de l'art : l'environnement de test est mis en place.",
      "Les tests pertinents d'intégration et d'acceptation sont effectués.",
      "Le rapport de tests est rédigé.",
      "La documentation est à jour et disponible.",
      "L'intégration de la solution ne génère pas de dysfonctionnement du réseau ou dans le réseau.",
      "Une procédure claire de déploiement de la solution est rédigée.",
    ],
  },
  {
    id: "e5-exploiter",
    bloc: "e5",
    slug: "exploiter-depanner-et-superviser-une-solution",
    titre: "Exploiter, dépanner et superviser une solution d'infrastructure réseau",
    titreCourt: "Exploiter, dépanner et superviser",
    description:
      "Maintenir en condition opérationnelle, détecter avant que l'utilisateur ne le signale, et savoir quoi faire quand tout tombe. Le plan de reprise d'activité, la stratégie de sauvegarde avec rotation de supports et la redondance des accès Internet forment un ensemble cohérent : chacun répond à un scénario de panne identifié.",
    criteres: [
      "Administrer sur site et à distance des éléments d'une infrastructure",
      "Automatiser des tâches d'administration",
      "Gérer des indicateurs et des fichiers d'activité des éléments d'une infrastructure",
      "Identifier, qualifier, évaluer et réagir face à un incident ou à un problème",
      "Évaluer, maintenir et améliorer la qualité d'un service",
    ],
    indicateurs: [
      "Un dispositif d'administration sur site et à distance est configuré et exploité.",
      "L'automatisation des tâches d'administration répond au besoin exprimé.",
      "Les dysfonctionnements récurrents dans une solution d'infrastructure sont repérés et leurs causes identifiées.",
      "Le degré d'urgence et le niveau d'intervention sont définis.",
      "L'incident est résolu ou escaladé de manière efficiente, en tenant compte des délais et procédures en vigueur.",
      "Le fonctionnement du service en mode dégradé et la disponibilité des éléments d'infrastructure permettant une reprise du service sont périodiquement vérifiés.",
    ],
  },
];

/** Critère transverse rappelé en tête de la grille E4. */
export const CRITERE_TRANSVERSE_E4 =
  "Capacité à rendre compte d'un travail réalisé au sein d'une équipe projet en mettant clairement en évidence sa contribution personnelle.";

export function getCompetence(id: string): Competence | undefined {
  return competences.find((c) => c.id === id);
}

export function getCompetenceBySlug(
  bloc: Bloc,
  slug: string,
): Competence | undefined {
  return competences.find((c) => c.bloc === bloc && c.slug === slug);
}

export function competencesByBloc(bloc: Bloc): Competence[] {
  return competences.filter((c) => c.bloc === bloc);
}
