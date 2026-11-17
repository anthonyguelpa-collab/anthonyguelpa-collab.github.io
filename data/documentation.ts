/**
 * La base documentaire constituée chez Goiran et Compagnie.
 *
 * ─────────────────────────────────────────────────────────────────────
 * RÈGLE DE CETTE PAGE
 *
 * Chaque document listé ici est un livrable réel, déjà déclaré dans la
 * situation professionnelle qui l'a produit (`data/situations.ts`). Rien
 * n'est ajouté pour étoffer la liste.
 *
 * Le « geste » attribué à chaque document n'est pas une appréciation : il
 * est repris de ce que la situation elle-même établit.
 *   · recense       — le document décrit un existant qui n'était écrit nulle part
 *   · faitEvoluer   — un fonctionnement existait ; il a été repris et modifié
 *   · cree          — le document n'avait pas d'équivalent
 *
 * Aucun taux de couverture n'est affiché : la seule mesure honnête dont je
 * dispose est le nombre de documents et de dossiers téléchargeables.
 *
 * SP-13 ne figure pas dans ces familles. Cette mission a été conduite pour
 * un cabinet extérieur, et non sur le fonctionnement de Goiran : elle est
 * citée à part, comme application de la même méthode.
 * ─────────────────────────────────────────────────────────────────────
 */

export type Geste = "recense" | "faitEvoluer" | "cree";

export const GESTES: Record<Geste, { libelle: string; court: string }> = {
  recense: {
    libelle: "Existant recensé",
    court: "Décrire un fonctionnement réel que personne n'avait écrit.",
  },
  faitEvoluer: {
    libelle: "Repris et fait évoluer",
    court: "Reprendre un fonctionnement existant, le corriger, le changer.",
  },
  cree: {
    libelle: "Créé",
    court: "Écrire ce qui n'avait aucun équivalent dans l'entreprise.",
  },
};

export interface DocumentProduit {
  titre: string;
  /** Référence courte de la situation qui l'a produit. */
  ref: string;
  /** Slug de la situation, pour le lien. */
  slug: string;
  geste: Geste;
  /** Précision factuelle, affichée seulement quand elle apporte quelque chose. */
  note?: string;
}

export interface FamilleDocumentaire {
  id: string;
  titre: string;
  intro: string;
  documents: DocumentProduit[];
}

export const familles: FamilleDocumentaire[] = [
  {
    id: "infrastructure",
    titre: "L'infrastructure et ses flux",
    intro:
      "Le point de départ. À mon arrivée, l'infrastructure fonctionnait mais n'existait sur aucun document : sa connaissance reposait sur la mémoire de l'équipe et du prestataire.",
    documents: [
      {
        titre: "Dossier « Architecture technique » — périmètre du système d'information",
        ref: "SP-01",
        slug: "cartographie-architecture-it",
        geste: "recense",
      },
      {
        titre: "Dossier « Architecture infrastructure IT » — cartographie serveur et stockage",
        ref: "SP-01",
        slug: "cartographie-architecture-it",
        geste: "recense",
        note: "Reconstitué par entretiens avec l'équipe et le prestataire, puis vérifié machine par machine.",
      },
      {
        titre: "Dossier « Schéma de flux » — portes d'accès et flux de données",
        ref: "SP-01",
        slug: "cartographie-architecture-it",
        geste: "recense",
      },
      {
        titre: "Schéma d'architecture de la redondance d'accès Internet",
        ref: "SP-12",
        slug: "redondance-acces-internet",
        geste: "faitEvoluer",
        note: "L'accès existait ; la documentation accompagne son passage en redondance.",
      },
      {
        titre: "Logique de bascule documentée",
        ref: "SP-12",
        slug: "redondance-acces-internet",
        geste: "cree",
      },
      {
        titre: "Procédure de test de bascule",
        ref: "SP-12",
        slug: "redondance-acces-internet",
        geste: "cree",
      },
    ],
  },
  {
    id: "continuite",
    titre: "La continuité : sauvegardes et reprise",
    intro:
      "Ce que l'entreprise doit pouvoir faire quand quelque chose s'arrête. C'est la famille où la documentation a le plus directement changé les pratiques.",
    documents: [
      {
        titre: "Dossier « Gestion des sauvegardes » — flux, fréquences, rétentions",
        ref: "SP-02",
        slug: "strategie-de-sauvegarde",
        geste: "recense",
        note: "Les sauvegardes tournaient déjà ; leur fonctionnement n'était décrit nulle part.",
      },
      {
        titre: "Procédure de rotation hebdomadaire des supports externes",
        ref: "SP-02",
        slug: "strategie-de-sauvegarde",
        geste: "faitEvoluer",
        note: "Le dispositif existant ne garantissait aucune copie hors site. La rotation a été mise en place après la description de l'existant.",
      },
      {
        titre: "Matrice de couverture par type de sinistre",
        ref: "SP-02",
        slug: "strategie-de-sauvegarde",
        geste: "cree",
      },
      {
        titre: "Plan de reprise d'activité complet",
        ref: "SP-03",
        slug: "plan-de-reprise-dactivite",
        geste: "cree",
        note: "Écrit pour être utilisable par un tiers — prestataire, remplaçant, direction — sans connaissance préalable de l'infrastructure.",
      },
      {
        titre: "Inventaire des actifs critiques et de leurs niveaux de criticité",
        ref: "SP-03",
        slug: "plan-de-reprise-dactivite",
        geste: "cree",
      },
      {
        titre: "Trois procédures de reprise pas à pas",
        ref: "SP-03",
        slug: "plan-de-reprise-dactivite",
        geste: "cree",
      },
      {
        titre: "Checklist technicien et calendrier de tests",
        ref: "SP-03",
        slug: "plan-de-reprise-dactivite",
        geste: "cree",
      },
    ],
  },
  {
    id: "securite",
    titre: "La sécurité et la conformité",
    intro:
      "Deux chantiers distincts, menés sur le même principe : analyser ce qui est en place, puis écrire ce qui manque pour que les règles soient opposables et tenables.",
    documents: [
      {
        titre: "Plan de sécurisation IT en quatre parties",
        ref: "SP-04",
        slug: "plan-de-securisation-it",
        geste: "faitEvoluer",
        note: "Construit à partir de l'analyse des mesures déjà en place, et non d'une page blanche.",
      },
      {
        titre: "Synthèse des mesures chiffrées",
        ref: "SP-04",
        slug: "plan-de-securisation-it",
        geste: "cree",
      },
      {
        titre: "Procédure de perte ou de vol d'un support chiffré",
        ref: "SP-04",
        slug: "plan-de-securisation-it",
        geste: "cree",
      },
      {
        titre: "Registre des traitements — cinq fiches et un modèle vierge",
        ref: "SP-09",
        slug: "mise-en-conformite-rgpd",
        geste: "cree",
        note: "Le modèle vierge permet à l'entreprise d'ajouter elle-même un traitement sans repartir de zéro.",
      },
      {
        titre: "Politique de confidentialité pour le site web",
        ref: "SP-09",
        slug: "mise-en-conformite-rgpd",
        geste: "cree",
      },
      {
        titre: "Formulaire de demande de modification ou de suppression",
        ref: "SP-09",
        slug: "mise-en-conformite-rgpd",
        geste: "cree",
      },
      {
        titre: "Procédure de gestion des violations et registres associés",
        ref: "SP-09",
        slug: "mise-en-conformite-rgpd",
        geste: "cree",
      },
      {
        titre: "Analyse d'impact — géolocalisation des véhicules",
        ref: "SP-09",
        slug: "mise-en-conformite-rgpd",
        geste: "cree",
      },
      {
        titre: "Charte informatique d'une page",
        ref: "SP-09",
        slug: "mise-en-conformite-rgpd",
        geste: "cree",
      },
    ],
  },
  {
    id: "logiciel-metier",
    titre: "Le logiciel métier, au centre de l'activité",
    intro:
      "Devis, clients, chantiers, interventions et facturation passent par le même outil, utilisé tous les jours. Aucun support n'existait pour les nouveaux arrivants, et chaque anomalie remontait au service informatique sans élément de diagnostic.",
    documents: [
      {
        titre: "Module 1 — fonctionnalités de base du logiciel de gestion",
        ref: "SP-11",
        slug: "documentation-fonctionnelle-ebp",
        geste: "cree",
        note: "En harmonisant les pratiques de saisie, le module a réduit le nombre de fiches clients mal renseignées — donc d'anomalies de synchronisation.",
      },
      {
        titre: "Procédures illustrées pas à pas",
        ref: "SP-11",
        slug: "documentation-fonctionnelle-ebp",
        geste: "cree",
      },
      {
        titre: "Procédure « Débloquer un utilisateur »",
        ref: "SP-06",
        slug: "procedures-de-support-ebp",
        geste: "cree",
      },
      {
        titre: "Procédure « Reconnecter Outlook »",
        ref: "SP-06",
        slug: "procedures-de-support-ebp",
        geste: "cree",
      },
      {
        titre: "Procédure « Modèle d'impression par défaut »",
        ref: "SP-06",
        slug: "procedures-de-support-ebp",
        geste: "cree",
        note: "Le paramètre étant global à l'entreprise, la procédure reste volontairement réservée au service informatique.",
      },
      {
        titre: "Guide de dépannage de la synchronisation, dans les deux sens",
        ref: "SP-07",
        slug: "depannage-synchronisation-ebp-praxedo",
        geste: "cree",
      },
      {
        titre: "Checklist de vérification avant escalade",
        ref: "SP-07",
        slug: "depannage-synchronisation-ebp-praxedo",
        geste: "cree",
        note: "Les demandes qui arrivent au service informatique sont désormais qualifiées : le diagnostic reprend là où l'utilisateur s'est arrêté.",
      },
      {
        titre: "Règle de back-office sur l'ordre facturation / validation",
        ref: "SP-07",
        slug: "depannage-synchronisation-ebp-praxedo",
        geste: "faitEvoluer",
        note: "Ici la documentation ne décrit pas le travail : elle en a changé l'ordre, pour éviter un blocage irréversible.",
      },
    ],
  },
  {
    id: "messagerie",
    titre: "La messagerie et les outils du quotidien",
    intro:
      "Les sujets qui occupaient le support sans jamais être résolus durablement, et ceux que personne n'aurait pu reprendre après moi.",
    documents: [
      {
        titre: "Guide complet Outlook — utilisation, configuration et cybersécurité",
        ref: "SP-05",
        slug: "formation-et-deploiement-outlook",
        geste: "cree",
        note: "Un seul document pour deux sujets qu'on sépare d'habitude : la bureautique et la sécurité.",
      },
      {
        titre: "Support de formation illustré pas à pas",
        ref: "SP-05",
        slug: "formation-et-deploiement-outlook",
        geste: "cree",
      },
      {
        titre: "Fiche « bons réflexes » à afficher au poste de travail",
        ref: "SP-05",
        slug: "formation-et-deploiement-outlook",
        geste: "cree",
      },
      {
        titre: "Documentation technique des flux automatisés — volets 1 et 2",
        ref: "SP-08",
        slug: "automatisation-outlook-planner",
        geste: "cree",
      },
      {
        titre: "Procédure de duplication vers les périmètres restants",
        ref: "SP-08",
        slug: "automatisation-outlook-planner",
        geste: "cree",
        note: "Écrite pour que l'extension aux autres périmètres ne dépende pas de moi.",
      },
      {
        titre: "Retour d'expérience — erreurs de construction à ne pas reproduire",
        ref: "SP-08",
        slug: "automatisation-outlook-planner",
        geste: "cree",
      },
    ],
  },
  {
    id: "decision",
    titre: "Les dossiers qui servent à décider",
    intro:
      "Documenter ne sert pas qu'à exploiter : une partie de ces dossiers existe pour que la direction puisse trancher sur des éléments écrits.",
    documents: [
      {
        titre: "Étude « Architecture IP » — PoE, VLAN dédié, NVR open source",
        ref: "SP-10",
        slug: "etude-videosurveillance-parking",
        geste: "cree",
      },
      {
        titre: "Étude « Solution cloud sans fil » — implantation et budget sur trois ans",
        ref: "SP-10",
        slug: "etude-videosurveillance-parking",
        geste: "cree",
      },
      {
        titre: "Note « Obligations légales » — préfecture, CSE, information des personnes",
        ref: "SP-10",
        slug: "etude-videosurveillance-parking",
        geste: "cree",
        note: "C'est cette note qui a identifié le chemin critique du projet : jusqu'à quatre mois d'instruction préfectorale.",
      },
      {
        titre: "Plan d'action de déploiement en six étapes",
        ref: "SP-10",
        slug: "etude-videosurveillance-parking",
        geste: "cree",
      },
    ],
  },
];

/* ------------------------------------------------- Articulation des dossiers */

export interface Articulation {
  de: string;
  vers: string;
  /** Ce que le second document doit au premier — établi par les situations. */
  lien: string;
}

export const articulations: Articulation[] = [
  {
    de: "Cartographie de l'architecture",
    vers: "Stratégie de sauvegarde",
    lien: "Impossible de décrire des flux de sauvegarde sans avoir d'abord recensé les disques, les partages et les machines virtuelles.",
  },
  {
    de: "Cartographie + stratégie de sauvegarde",
    vers: "Plan de reprise d'activité",
    lien: "Le plan reprend l'inventaire des actifs critiques issu de la cartographie, et s'appuie sur les sources de reprise décrites par la stratégie de sauvegarde.",
  },
  {
    de: "Cartographie de l'architecture",
    vers: "Plan de sécurisation IT",
    lien: "Le plan part de l'analyse des mesures en place, qui supposait de savoir ce qui existait et qui y accédait.",
  },
  {
    de: "Redondance de l'accès Internet",
    vers: "Plan de reprise d'activité",
    lien: "Le scénario de panne réseau du plan intègre la bascule automatique : une reprise qui n'exige aucune intervention.",
  },
  {
    de: "Module de formation au logiciel métier",
    vers: "Guide de dépannage de la synchronisation",
    lien: "En harmonisant la saisie, le module a réduit les fiches mal renseignées — l'une des causes d'anomalie traitées par le guide.",
  },
];

/* ------------------------------------------------------ Ce que cela permet */

export const apports: { titre: string; detail: string }[] = [
  {
    titre: "Une reprise possible sans moi",
    detail:
      "La contrainte posée au plan de reprise d'activité était qu'un tiers — prestataire, remplaçant, direction — puisse savoir quoi faire dans l'ordre, sans connaissance préalable de l'infrastructure.",
  },
  {
    titre: "Moins de dépendance à une seule mémoire",
    detail:
      "L'infrastructure, les flux et les sauvegardes reposaient sur ce que l'équipe et le prestataire avaient en tête. Ils sont aujourd'hui écrits, et vérifiables.",
  },
  {
    titre: "Des demandes qui arrivent qualifiées",
    detail:
      "La checklist de pré-escalade demande huit vérifications avant tout appel. Le diagnostic reprend là où l'utilisateur s'est arrêté, au lieu de tout refaire.",
  },
  {
    titre: "Une transmission aux nouveaux arrivants",
    detail:
      "Le module du logiciel métier et le guide Outlook servent aujourd'hui de support à l'accueil : ils ont été écrits pour quelqu'un qui ne connaît pas encore l'entreprise.",
  },
  {
    titre: "Une trace des méthodes et de leurs évolutions",
    detail:
      "Le retour d'expérience sur les flux automatisés conserve les erreurs de construction à ne pas reproduire — ce qu'aucun document d'exploitation ne garde d'ordinaire.",
  },
];

/* ----------------------------------------------------------------- Mesures */

/** Nombre de documents recensés. Compté, jamais estimé. */
export const nombreDeDocuments = familles.reduce(
  (n, f) => n + f.documents.length,
  0,
);

/** Situations professionnelles ayant produit au moins un de ces documents. */
export const nombreDeSituations = new Set(
  familles.flatMap((f) => f.documents.map((d) => d.slug)),
).size;

export function compterParGeste(geste: Geste): number {
  return familles.reduce(
    (n, f) => n + f.documents.filter((d) => d.geste === geste).length,
    0,
  );
}
