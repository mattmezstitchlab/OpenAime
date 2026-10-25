# Scènes — contrat v1

Le catalogue `OPENAIME/scenes.js` est une liste de presets immuables. Chaque entrée décrit : version, identifiant, titre, description, mode (`manual`), signification (`decorative`), audience (`local`), phase, saison, météo simulée et narration (`null`).

## Inventaire réutilisé

Le moteur actuel dessine déjà lumière jour/nuit, nuages, pluie, neige, brume, soleil/lune, étoiles et phrase en constellation, village et apparitions saisonnières. Six ambiances assemblent ces effets : matin embué, pluie au calme, nuit étoilée, neige, printemps et lumière dorée. Ce ne sont pas six moteurs distincts. La buée dépend des conditions du moteur existant ; aucune nouvelle reconnaissance d'écriture n'est ajoutée.

## Parcours

Capsule → + → Scènes. Choisir une vignette applique saison, météo et centre de phase au rendu courant. Le premier essai capture l'ambiance précédente ; les suivants ne l'écrasent pas. Rétablir restaure saison, météo et heure explorée, ou l'heure réelle si le mode direct était actif. Fermer le catalogue laisse l'aperçu affiché ; recharger abandonne les essais. Aucun changement de stockage météo/saison ni de configuration publiée. La musique existante n'est ni lancée ni arrêtée.

## Architecture future (non implémentée)

Séparer : sélection temporelle, données et permissions serveur, résolution des conditions, composition visuelle, narration et commandes. Le catalogue décoratif ne décide jamais d'une disponibilité, d'un paiement ou d'un droit.

Pour la programmation : date, fuseau, plage et récurrence explicites. Pour les règles : source, fraîcheur et priorité explicites. Les données réelles priment sur une interprétation visuelle ; une ambiance manuelle ne modifie aucune donnée métier. Ne pas installer d'automatisme météo/Plan B avant définition de ces règles.

À créer ensuite : scènes événementielles, avion d'absence, cadran lunaire et planètes, associations sauvegardées, voix off avec fichier audio autorisé et transcription, version calme. Aucun son de synthèse ni voix officielle n'est simulé. La mosaïque actuelle est un sélecteur d'ambiance, pas un éditeur de conditions.

## Vérification

`node --test tests/*.test.cjs`. Vérifier aussi les six choix, le retour à l'ambiance, le clavier, le petit écran et l'absence de son automatique. Les effets conservent la gestion des mouvements réduits du moteur existant.
