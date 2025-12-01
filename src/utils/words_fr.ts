/**
 * French word dictionary for typing practice
 * Sorted by frequency and difficulty
 */
export const words: string[] = [
    // Very common short words (2-4 letters)
    'le', 'la', 'les', 'un', 'une', 'de', 'du', 'des', 'et', 'ou',
    'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles',
    'ce', 'qui', 'que', 'où', 'pas', 'non', 'oui', 'bien', 'très',
    'tout', 'tous', 'pour', 'par', 'sur', 'avec', 'dans', 'sans',

    // Common 5-7 letter words
    'être', 'avoir', 'faire', 'dire', 'aller', 'voir', 'savoir', 'pouvoir',
    'vouloir', 'venir', 'devoir', 'prendre', 'donner', 'trouver', 'passer',
    'mettre', 'parler', 'aimer', 'croire', 'tenir', 'porter', 'laisser',
    'suivre', 'vivre', 'écrire', 'lire', 'entendre', 'rendre', 'attendre',

    // Common nouns
    'homme', 'femme', 'enfant', 'personne', 'gens', 'monde', 'vie', 'temps',
    'jour', 'année', 'mois', 'semaine', 'heure', 'minute', 'seconde',
    'main', 'tête', 'œil', 'yeux', 'cœur', 'corps', 'visage', 'voix',
    'chose', 'façon', 'fois', 'moment', 'point', 'place', 'partie',

    // Family
    'père', 'mère', 'frère', 'sœur', 'fils', 'fille', 'ami', 'amie',
    'famille', 'parent', 'enfant', 'bébé', 'grand-père', 'grand-mère',

    // Common adjectives
    'bon', 'bonne', 'grand', 'grande', 'petit', 'petite', 'jeune', 'vieux',
    'nouveau', 'nouvelle', 'premier', 'dernier', 'seul', 'même', 'autre',
    'beau', 'belle', 'joli', 'jolie', 'long', 'court', 'haut', 'bas',
    'fort', 'faible', 'rapide', 'lent', 'facile', 'difficile', 'important',

    // Numbers
    'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
    'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'vingt', 'trente',
    'quarante', 'cinquante', 'soixante', 'cent', 'mille', 'million',

    // Colors
    'rouge', 'bleu', 'vert', 'jaune', 'noir', 'blanc', 'gris', 'rose',
    'orange', 'violet', 'marron', 'beige',

    // Time and dates
    'aujourd\'hui', 'demain', 'hier', 'maintenant', 'toujours', 'jamais',
    'souvent', 'parfois', 'rarement', 'déjà', 'encore', 'bientôt',
    'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche',
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
    'septembre', 'octobre', 'novembre', 'décembre',

    // Common verbs (longer)
    'travailler', 'jouer', 'apprendre', 'enseigner', 'acheter', 'vendre',
    'manger', 'boire', 'dormir', 'écouter', 'regarder', 'comprendre',
    'expliquer', 'commencer', 'finir', 'ouvrir', 'fermer', 'entrer', 'sortir',

    // Places
    'maison', 'ville', 'pays', 'rue', 'route', 'chemin', 'place', 'porte',
    'fenêtre', 'chambre', 'cuisine', 'salle', 'école', 'église', 'magasin',

    // Technology
    'ordinateur', 'internet', 'téléphone', 'portable', 'email', 'site',
    'programme', 'logiciel', 'fichier', 'dossier', 'écran', 'clavier',

    // Nature
    'arbre', 'fleur', 'herbe', 'montagne', 'vallée', 'rivière', 'lac', 'mer',
    'soleil', 'lune', 'étoile', 'ciel', 'nuage', 'pluie', 'neige', 'vent',

    // Food and drink
    'pain', 'fromage', 'viande', 'poisson', 'légume', 'fruit', 'pomme', 'poire',
    'eau', 'lait', 'café', 'thé', 'vin', 'bière', 'jus',

    // Body parts
    'tête', 'cheveux', 'visage', 'nez', 'bouche', 'oreille', 'cou', 'bras',
    'jambe', 'pied', 'doigt', 'orteil', 'cœur', 'estomac', 'dos',

    // Longer/complex words
    'france', 'français', 'française', 'anglais', 'allemand', 'espagnol',
    'italien', 'portugais', 'russe', 'chinois', 'japonais',
    'université', 'bibliothèque', 'musée', 'hôpital', 'pharmacie',
    'restaurant', 'boulangerie', 'pâtisserie', 'boucherie', 'marché',
    'aéroport', 'gare', 'métro', 'autobus', 'avenue', 'boulevard',

    // Words with accents (important for French typing practice)
    'été', 'café', 'thé', 'passé', 'allé', 'donné', 'parlé', 'mangé',
    'être', 'fenêtre', 'fête', 'tête', 'même', 'extrême', 'problème',
    'père', 'mère', 'frère', 'première', 'dernière', 'lumière', 'matière',
    'à', 'là', 'déjà', 'voilà', 'où', 'dû', 'sûr', 'mûr',
    'français', 'anglais', 'après', 'très', 'près', 'succès', 'progrès',
    'ça', 'français', 'garçon', 'leçon', 'façon', 'reçu',
    'naïf', 'maïs', 'haïr', 'coïncidence',

    // Common expressions and phrases
    'bonjour', 'bonsoir', 'bonne nuit', 'au revoir', 'salut', 'merci',
    's\'il vous plaît', 'excusez-moi', 'pardon', 'comment', 'pourquoi',
    'quand', 'combien', 'beaucoup', 'peu', 'assez', 'trop', 'plus', 'moins',
];
