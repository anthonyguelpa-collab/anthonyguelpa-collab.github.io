/**
 * Les situations professionnelles.
 *
 * Ce fichier est la SOURCE UNIQUE des relations compétences ↔ situations.
 * La navigation bidirectionnelle du site en est entièrement dérivée
 * (voir lib/relations.ts) : il n'y a donc jamais de lien à maintenir
 * dans les deux sens, et pas de risque de lien mort.
 *
 * Le corps rédigé de chaque situation vit dans content/situations/<slug>.mdx
 *
 * ─────────────────────────────────────────────────────────────────────
 * CAVIARDAGE — règle appliquée à l'ensemble du portfolio
 * Les noms d'hôtes, plans d'adressage, arborescences de partages, noms de
 * prestataires et adresses de sites réels de l'entreprise sont remplacés
 * par des équivalents génériques (SRV-HV-01, 10.0.X.0/24, Prestataire IT…).
 * La substance technique est conservée ; les éléments qui faciliteraient
 * une attaque ne sont pas publiés.
 * ─────────────────────────────────────────────────────────────────────
 */

import type { Bloc } from "./competences";
import type { Periode } from "@/lib/dates";

export interface Situation {
  slug: string;
  /** Référence courte affichée sur les cartes : SP-01, SP-02… */
  reference: string;
  titre: string;
  /** Une phrase, affichée sur les cartes de la vue d'ensemble. */
  resume: string;
  /** Contexte UFIP : 2 à 4 lignes. Rôle, objectif, raison de l'attribution. */
  contexte: string;
  /** Conclusion UFIP : ~2 lignes. Objectif atteint ou non, et pourquoi. */
  conclusion: string;
  /**
   * Période de réalisation. Les dates marquées "document" sont relevées
   * dans le dossier d'origine ; celles marquées "a-confirmer" sont des
   * estimations d'après l'enchaînement des missions et attendent
   * confirmation — le contrôle de validation les liste.
   */
  periode: Periode;
  /** Bloc dominant — détermine l'accent couleur de la page. */
  blocPrincipal: Bloc;
  /** Identifiants des compétences validées par cette situation. */
  competences: string[];
  /** Badges technologiques — uniquement ce qui a réellement été mis en œuvre. */
  technologies: string[];
  /** Livrables produits. */
  livrables: string[];
  /**
   * État des preuves visuelles.
   *  · "completes"  : le déroulé est illustré de bout en bout
   *  · "partielles" : certaines étapes sont illustrées
   *  · "absentes"   : aucune capture disponible — signalé, jamais remplacé
   */
  preuves: "completes" | "partielles" | "absentes";
  /** Note affichée lorsque des preuves manquent. Jamais de preuve fictive. */
  notePreuves?: string;
  /**
   * Documentation PDF téléchargeable.
   *
   * Laisser vide dans la très grande majorité des cas : par convention, le
   * fichier est cherché à `/documents/situations/<slug>.pdf`. Déposer le PDF
   * à ce chemin suffit pour que le bouton de téléchargement apparaisse ;
   * l'enlever le fait disparaître. Aucun bouton n'est affiché pour un
   * document absent.
   *
   * Ne renseigner ce champ que pour pointer un fichier au nom différent.
   */
  documentation?: string;
}

export const situations: Situation[] = [
  {
    slug: "cartographie-architecture-it",
    reference: "SP-01",
    titre: "Cartographier l'architecture IT de l'entreprise",
    resume:
      "Recensement complet de l'infrastructure serveur, des partages et des flux de données, jusque-là non documentée.",
    contexte:
      "À mon arrivée en alternance au service informatique, l'infrastructure fonctionnait mais n'existait sur aucun document : elle reposait sur la mémoire de l'équipe et du prestataire. La direction m'a confié le recensement du patrimoine, préalable indispensable au plan de sauvegarde et au plan de reprise d'activité qui devaient suivre.",
    conclusion:
      "Objectif atteint : trois dossiers d'architecture couvrent désormais l'hôte de virtualisation, les disques partagés et l'ensemble des flux entrants et sortants. Cette cartographie est devenue le document de référence sur lequel se sont appuyés tous les projets suivants.",
    periode: { debut: "2026-03", source: "document" },
    blocPrincipal: "e4",
    competences: ["e4-patrimoine", "e5-concevoir"],
    technologies: [
      "Hyper-V",
      "Windows Server",
      "Active Directory",
      "DHCP",
      "DNS",
      "SMB",
      "Microsoft 365",
      "EBP Bâtiment",
      "VoIP",
    ],
    livrables: [
      "Dossier « Architecture technique » — périmètre du SI",
      "Dossier « Architecture infrastructure IT » — cartographie serveur et stockage",
      "Dossier « Schéma de flux » — portes d'accès et flux de données",
    ],
    preuves: "completes",
  },
  {
    slug: "strategie-de-sauvegarde",
    reference: "SP-02",
    titre: "Formaliser et renforcer la stratégie de sauvegarde",
    resume:
      "Description de l'existant, puis mise en place d'une rotation hebdomadaire de supports externes pour garantir une copie hors site permanente.",
    contexte:
      "Les sauvegardes existaient mais n'étaient décrites nulle part, et toutes les copies se trouvaient dans le même local que le serveur. Chargé de vérifier les conditions de continuité du service, j'ai documenté les flux de sauvegarde existants puis identifié le point faible : un sinistre unique détruisait simultanément la production et sa sauvegarde.",
    conclusion:
      "Objectif atteint : la stratégie est documentée et complétée par une rotation hebdomadaire de deux disques externes, dont un conservé hors site. La perte maximale de données en cas de sinistre total passe de la totalité à une semaine. Le chiffrement des supports, préconisé dans le plan de sécurisation, n'est pas encore activé.",
    periode: { debut: "2026-03", source: "document" },
    blocPrincipal: "e4",
    competences: ["e4-patrimoine", "e5-exploiter"],
    technologies: [
      "Windows Server Backup",
      "Hyper-V",
      "NAS",
      "Sauvegarde cloud",
    ],
    livrables: [
      "Dossier « Gestion des sauvegardes » — flux, fréquences, rétentions",
      "Procédure de rotation hebdomadaire des supports externes",
      "Matrice de couverture par type de sinistre",
    ],
    preuves: "completes",
  },
  {
    slug: "plan-de-reprise-dactivite",
    reference: "SP-03",
    titre: "Élaborer le plan de reprise d'activité",
    resume:
      "Inventaire des actifs critiques, analyse d'impact, procédures de reprise pour trois familles de sinistres et calendrier de tests.",
    contexte:
      "L'entreprise ne disposait d'aucune procédure écrite en cas de sinistre majeur : en l'absence du technicien, personne n'aurait su par où commencer. La direction m'a confié la rédaction d'un plan de reprise d'activité exploitable par un tiers, en m'appuyant sur la cartographie et la stratégie de sauvegarde déjà produites.",
    conclusion:
      "Objectif partiellement atteint : le plan est rédigé, structuré et validé dans sa méthode, mais les valeurs de RTO et de RPO restent à arbitrer avec la direction et le prestataire, car elles engagent un budget. Le premier exercice de restauration reste à planifier.",
    periode: { debut: "2026-03", source: "document" },
    blocPrincipal: "e5",
    competences: ["e5-exploiter", "e5-concevoir", "e4-mode-projet", "e4-patrimoine"],
    technologies: [
      "Hyper-V",
      "Windows Server Backup",
      "Active Directory",
      "NAS",
      "Multi-WAN",
      "ANSSI",
    ],
    livrables: [
      "Plan de reprise d'activité complet",
      "Inventaire des actifs critiques avec niveaux de criticité",
      "Trois procédures de reprise pas à pas",
      "Checklist technicien et calendrier de tests",
    ],
    preuves: "completes",
  },
  {
    slug: "plan-de-securisation-it",
    reference: "SP-04",
    titre: "Construire le plan de sécurisation IT",
    resume:
      "Quatre axes chiffrés : séparation physique des sauvegardes, sécurité de la messagerie, gestion des mots de passe, comptes nominatifs.",
    contexte:
      "Plusieurs pratiques héritées fragilisaient le système d'information : comptes de session partagés entre collaborateurs, mots de passe notés sur papier, sauvegardes regroupées dans un seul local. J'ai été chargé de produire un plan de sécurisation réaliste pour une entreprise sans budget dédié à la cybersécurité.",
    conclusion:
      "Objectif atteint sur la conception : six mesures sont proposées, chiffrées et argumentées, pour un investissement matériel d'environ 500 €. La mise en œuvre est échelonnée ; les mesures sans coût ont été engagées en premier.",
    periode: { debut: "2026-03", fin: "2026-04", source: "a-confirmer" },
    blocPrincipal: "e5",
    competences: ["e5-concevoir", "e4-patrimoine"],
    technologies: [
      "Active Directory",
      "BitLocker",
      "KeePass",
      "Mailinblack",
      "VPN",
      "RDP",
      "ANSSI",
    ],
    livrables: [
      "Plan de sécurisation IT en quatre parties",
      "Synthèse des mesures chiffrées",
      "Procédure de perte ou de vol d'un support chiffré",
    ],
    preuves: "completes",
  },
  {
    slug: "formation-et-deploiement-outlook",
    reference: "SP-05",
    titre: "Former les collaborateurs à Outlook et à la sécurité de la messagerie",
    resume:
      "Conception d'un support de formation complet, de la configuration du client jusqu'aux réflexes face au phishing.",
    contexte:
      "Les collaborateurs utilisaient Outlook sans en maîtriser les fonctions utiles, et les demandes d'assistance répétitives sur la signature, les réponses automatiques ou le champ Cci occupaient une part importante du support. En parallèle, la messagerie restait le principal vecteur de risque. J'ai conçu un support unique traitant les deux sujets.",
    conclusion:
      "Objectif atteint : le support couvre la configuration, l'usage quotidien et la cybersécurité, et sert aujourd'hui de référence pour l'accueil des nouveaux arrivants. Les demandes d'assistance sur les sujets traités ont nettement diminué.",
    periode: { debut: "2025", source: "confirme" },
    blocPrincipal: "e4",
    competences: ["e4-service-utilisateurs", "e4-incidents"],
    technologies: [
      "Microsoft Outlook",
      "Microsoft 365",
      "Exchange",
      "Mailinblack",
      "IMAP / POP3",
    ],
    livrables: [
      "Guide complet Outlook — utilisation, configuration et cybersécurité",
      "Support de formation illustré pas à pas",
      "Fiche « bons réflexes » à afficher au poste de travail",
    ],
    preuves: "completes",
  },
  {
    slug: "procedures-de-support-ebp",
    reference: "SP-06",
    titre: "Industrialiser les procédures de support sur le logiciel métier",
    resume:
      "Transformation des incidents EBP récurrents en procédures illustrées, utilisables en autonomie par les collaborateurs.",
    contexte:
      "Trois incidents revenaient en boucle sur le logiciel de gestion : session utilisateur verrouillée, liaison Outlook rompue, modèle d'impression inadapté. Chaque occurrence mobilisait le service informatique pour une manipulation de quelques minutes. J'ai choisi de documenter plutôt que de réintervenir.",
    conclusion:
      "Objectif atteint : les trois procédures sont diffusées et permettent aux utilisateurs habilités de traiter eux-mêmes ces cas. Le paramétrage d'impression, global à tous les utilisateurs, reste volontairement réservé au service informatique.",
    periode: { debut: "2026-04", source: "a-confirmer" },
    blocPrincipal: "e4",
    competences: ["e4-incidents", "e4-service-utilisateurs"],
    technologies: ["EBP Bâtiment Elite", "SQL Server", "Microsoft Outlook"],
    livrables: [
      "Procédure « Débloquer un utilisateur »",
      "Procédure « Reconnecter Outlook »",
      "Procédure « Modèle d'impression par défaut »",
    ],
    preuves: "completes",
  },
  {
    slug: "depannage-synchronisation-ebp-praxedo",
    reference: "SP-07",
    titre: "Diagnostiquer la synchronisation entre le logiciel métier et l'outil terrain",
    resume:
      "Analyse des causes de non-synchronisation dans les deux sens et rédaction d'un guide de dépannage avec checklist de pré-escalade.",
    contexte:
      "Les interventions saisies dans l'outil de planification terrain ne remontaient pas systématiquement dans le logiciel de gestion, et inversement. Chaque anomalie était remontée au service informatique sans élément de diagnostic. J'ai analysé les causes réelles afin de rendre les équipes autonomes sur les cas les plus fréquents.",
    conclusion:
      "Objectif atteint : les causes sont identifiées et classées par sens de synchronisation, et une checklist permet aux équipes de vérifier huit points avant toute escalade. Une règle impérative de back-office a été formalisée pour éviter un blocage irréversible.",
    periode: { debut: "2026-05", source: "a-confirmer" },
    blocPrincipal: "e4",
    competences: ["e4-incidents", "e4-service-utilisateurs"],
    technologies: ["EBP Bâtiment Elite", "Praxedo", "Synchronisation applicative"],
    livrables: [
      "Guide de dépannage de la synchronisation, dans les deux sens",
      "Checklist de vérification avant escalade",
      "Règle de back-office sur l'ordre facturation / validation",
    ],
    preuves: "completes",
  },
  {
    slug: "automatisation-outlook-planner",
    reference: "SP-08",
    titre: "Automatiser l'affectation et le suivi des tâches",
    resume:
      "Cinq flux Power Automate : création de tâche depuis un e-mail, relance à 24 h, escalade manager à 48 h, récapitulatif hebdomadaire et repérage visuel.",
    contexte:
      "L'affectation du travail reposait sur un tri manuel d'e-mails dans des dossiers nominatifs d'une boîte partagée, sans suivi ni relance : une demande oubliée restait invisible. La direction souhaitait un suivi automatique sans changer les habitudes de tri. J'ai conçu, testé et documenté l'automatisation sur un périmètre pilote.",
    conclusion:
      "Objectif atteint : les flux sont validés de bout en bout sur le dossier pilote, avec mécanismes anti-doublon et anti-spam, et sont prêts à être dupliqués sur les autres périmètres. La documentation consigne les pièges rencontrés pour ne pas les reproduire.",
    periode: { debut: "2026-07", source: "document" },
    blocPrincipal: "e4",
    competences: ["e4-mode-projet", "e4-service-utilisateurs"],
    technologies: [
      "Power Automate",
      "Microsoft Planner",
      "Outlook 365",
      "Excel Online",
      "OneDrive",
      "Office 365 Users",
    ],
    livrables: [
      "Documentation technique Power Automate — volet 1 (2 flux)",
      "Documentation technique Power Automate — volet 2 (3 flux)",
      "Procédure de duplication vers les périmètres restants",
      "Retour d'expérience : erreurs de construction à ne pas reproduire",
    ],
    preuves: "completes",
  },
  {
    slug: "mise-en-conformite-rgpd",
    reference: "SP-09",
    titre: "Mettre l'entreprise en conformité RGPD",
    resume:
      "Registre des traitements, politique de confidentialité publiable, formulaire d'exercice des droits, procédure de violation et analyse d'impact.",
    contexte:
      "L'entreprise traitait des données personnelles de clients, de salariés et de prospects sans registre ni documentation, et un projet de géolocalisation des véhicules se profilait. Chargé du volet technique et documentaire de la mise en conformité, j'ai produit l'ensemble du socle réglementaire.",
    conclusion:
      "Objectif atteint sur le socle documentaire : registre, politique de confidentialité, formulaire de droits, procédure de violation et analyse d'impact sont livrés et prêts à l'emploi. La désignation formelle du responsable RGPD et la publication sur le site relèvent de la direction.",
    periode: { debut: "2026-06", fin: "2026-07", source: "a-confirmer" },
    blocPrincipal: "e4",
    competences: ["e4-presence-en-ligne", "e4-patrimoine", "e4-mode-projet"],
    technologies: [
      "RGPD",
      "CNIL",
      "Registre des traitements",
      "AIPD",
      "Charte informatique",
    ],
    livrables: [
      "Registre des traitements — 5 fiches et modèle vierge",
      "Politique de confidentialité pour le site web",
      "Formulaire de demande de modification ou de suppression",
      "Procédure de gestion des violations et registres associés",
      "Analyse d'impact — géolocalisation des véhicules",
      "Charte informatique d'une page",
    ],
    preuves: "partielles",
    notePreuves:
      "Les documents produits contiennent des données d'entreprise ; seules les structures de documents sont illustrées.",
  },
  {
    slug: "etude-videosurveillance-parking",
    reference: "SP-10",
    titre: "Étudier la vidéosurveillance du parking",
    resume:
      "Dossier de choix opposant une solution cloud sans fil à une architecture IP segmentée sur VLAN, avec le cadre juridique comme préalable.",
    contexte:
      "Le parking, exposé et accessible librement, subissait des vols et des dégradations. La direction souhaitait un dispositif de vidéosurveillance. J'ai été chargé de l'étude complète : solutions techniques, chiffrage, et surtout cadre réglementaire, le parking étant ouvert au public.",
    conclusion:
      "Objectif atteint sur l'étude : deux architectures sont décrites, chiffrées et confrontées aux obligations légales, et le chemin critique du projet est identifié — l'autorisation préfectorale, jusqu'à quatre mois d'instruction. La décision d'investissement appartient à la direction.",
    periode: { debut: "2026-07", source: "document" },
    blocPrincipal: "e5",
    competences: ["e5-concevoir", "e4-mode-projet", "e4-presence-en-ligne"],
    technologies: [
      "Caméras IP PoE",
      "802.3at",
      "VLAN 802.1q",
      "Pare-feu SNS",
      "Frigate",
      "Docker",
      "Ubuntu Server",
      "NAS NFS / SMB",
      "RTSP",
      "Arlo",
    ],
    livrables: [
      "Étude « Architecture IP » — PoE, VLAN dédié, NVR open source",
      "Étude « Solution cloud sans fil » — implantation et budget sur 3 ans",
      "Note « Obligations légales » — préfecture, CSE, information des personnes",
      "Plan d'action de déploiement en quatre étapes",
    ],
    preuves: "partielles",
    notePreuves:
      "Le plan d'implantation réel des caméras et l'adresse du site ne sont pas publiés : les schémas affichés sont des versions neutralisées.",
  },
  {
    slug: "documentation-fonctionnelle-ebp",
    reference: "SP-11",
    titre: "Rédiger la documentation fonctionnelle du logiciel métier",
    resume:
      "Module de formation couvrant la prise en main du logiciel de gestion, de la connexion à la transformation d'une demande en intervention.",
    contexte:
      "Le logiciel de gestion est l'outil central de l'entreprise, utilisé quotidiennement par les équipes commerciales et le back-office, mais aucun support n'existait pour les nouveaux arrivants. La formation se faisait de poste à poste, avec des pratiques divergentes selon les services.",
    conclusion:
      "Objectif atteint : le premier module est diffusé et couvre le socle commun à tous les utilisateurs. Il harmonise les pratiques et réduit la durée d'accompagnement d'un nouvel arrivant.",
    periode: { debut: "2026-05", fin: "2026-06", source: "a-confirmer" },
    blocPrincipal: "e4",
    competences: ["e4-service-utilisateurs", "e4-incidents"],
    technologies: ["EBP Bâtiment Elite", "Gestion de chantiers", "Devis et facturation"],
    livrables: [
      "Module 1 — Fonctionnalités de base du logiciel de gestion",
      "Procédures illustrées pas à pas",
    ],
    preuves: "completes",
  },
  {
    slug: "redondance-acces-internet",
    reference: "SP-12",
    titre: "Contribuer à la mise en place de la redondance de l'accès Internet",
    resume:
      "Architecture multi-WAN à trois niveaux de bascule automatique : analyse d'impact, raccordement physique des liens de secours et documentation, la configuration du pare-feu restant au prestataire.",
    contexte:
      "L'activité dépend de services en ligne — planification terrain, comptabilité, messagerie, téléphonie — qu'une coupure du lien fibre rendait totalement inaccessibles. La direction m'a demandé d'étudier et de documenter une solution de continuité d'accès à Internet.",
    conclusion:
      "Objectif atteint : trois liens d'accès sont hiérarchisés sur le pare-feu avec bascule automatique en moins de cinq minutes, sans intervention humaine. J'ai réalisé le raccordement physique des liens de secours, rédigé la documentation et la procédure de test ; la configuration du pare-feu a été assurée par le prestataire. La procédure de test est intégrée au calendrier du plan de reprise d'activité.",
    periode: { debut: "2026-03", source: "document" },
    blocPrincipal: "e5",
    competences: ["e5-concevoir", "e5-deployer", "e5-exploiter"],
    technologies: [
      "Multi-WAN",
      "Failover",
      "Pare-feu",
      "Fibre",
      "Satellite",
      "4G",
    ],
    livrables: [
      "Schéma d'architecture de la redondance d'accès",
      "Logique de bascule documentée",
      "Procédure de test de bascule",
    ],
    preuves: "completes",
  },
];

export function getSituation(slug: string): Situation | undefined {
  return situations.find((s) => s.slug === slug);
}

/** Situations validant une compétence donnée — base de la navigation inverse. */
export function situationsPourCompetence(competenceId: string): Situation[] {
  return situations.filter((s) => s.competences.includes(competenceId));
}
