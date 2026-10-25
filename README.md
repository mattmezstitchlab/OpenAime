# OpenAime

Une fenêtre personnelle vivante : un paysage, de la musique et des objets à explorer.

## Développement

Le site est statique, sans compilation. Le dossier racine du projet Vercel est `OPENAIME`.

```sh
python3 -m http.server 8000 --directory OPENAIME
node --test tests/guide.test.cjs
```

Ouvrir localhost:8000. Les musiques sont servies depuis `OPENAIME/music`. Les polices Google sont facultatives et disposent de polices de repli.

## Première étape : découverte

Le guide présente les interactions sans démarrer de son ni capturer le focus à l'arrivée. Sa fermeture est mémorisée uniquement dans ce navigateur ; le bouton permet de le rouvrir. Aucun compte, suivi ou partage de données n'est ajouté. Le mode de mouvements réduits et les commandes clavier du store existent dans la scène.

Vérification manuelle : première visite, fermeture, rechargement, réouverture, Échap depuis le guide, navigation Tab, flèches/Home/End sur la poignée, playlist et audio sur action explicite. Vérifier à 320 px, 390 px et sur ordinateur, ainsi qu'avec le stockage du navigateur désactivé.

## Direction produit — à construire

Chaque personne pourra avoir sa fenêtre publique. Les connexions seront acceptées par les deux personnes. Ce dépôt ne fournit pas encore cette fonctionnalité.

1. **Édition indépendante** : remplacer la dépendance à `window.claude` par une authentification et une sauvegarde serveur. Le bouton actuel reste réservé à l'environnement Artifacts ; ne pas simplement l'afficher publiquement.
2. **Fenêtres personnelles** : identifiant et adresse unique, brouillon privé distinct de la version publiée, configuration validée côté serveur, propriétaire seul autorisé à modifier sa fenêtre.
3. **Médias** : stockage durable des fichiers, limites de taille/type, contrôle des droits et suppression. Les URL temporaires locales ne sont pas une publication.
4. **Connexions** : invitations, acceptation, retrait et blocage avec règles d'accès côté serveur. Annuaire sur consentement, sans exposer les emails.
5. **Avant ouverture des inscriptions** : suppression de compte et de données, signalement/modération, anti-abus, tests d'isolation entre utilisateurs et information sur la confidentialité.

Le choix des services d'authentification et de stockage reste à faire avant leur intégration. Pas de faux comptes, de connexions simulées ou d'édition publique non protégée. Messagerie et fil d'actualité ne font pas partie de la première version.

## Post-it privé — premier raccord à AIMEStudio

Le post-it du store transforme la capsule en brouillon privé, sans sauvegarde locale ni envoi automatique. « Continuer » transmet le texte via le fragment d'un lien vers la page AIMEStudio `/contact/openaime/`, où le visiteur vérifie son message, renseigne ses coordonnées et consent avant l'envoi. Le brouillon accompagne le lien : ne pas partager cette URL. La destination est fixe, jamais fournie par le visiteur. La demande réutilise le système et le destinataire serveur AIME, sans clé dans OpenAime.

Dépendance de livraison : fusionner et déployer la PR AIMEStudio #151 avant OpenAime. Le domaine public utilise la destination publique ; seule l'adresse de preview de cette branche est reliée à la preview AIME correspondante pour les essais. Aucun vrai envoi ni destinataire confirmé dans ce lot. La configuration Preview ne dispose pas de CONTACT_TO/CONTACT_FROM lors de la préparation : ne pas envoyer de données personnelles pour tester. Les tests d'interface simulent la réponse de l'API. La buée/dessin, les post-its publics et l'ouverture de l'éditeur restent à implémenter.

## Capsule unique — premier socle

La capsule d'origine accueille `+` (lectures Temps/Musique) et `⋮` (outils). Aucun deuxième bandeau, ni bouton Message ou post-it flottant : le post-it du store ouvre directement le brouillon privé. Les lectures futures Médias, Personnes et Jour J sont seulement annoncées, pas simulées.

Temps/Musique réutilisent le lecteur et la ligne du temps d'origine ; changer de lecture ne lance pas la musique. Les menus se ferment au choix, au clic extérieur et avec Échap ; le focus revient à leur bouton avec Échap. Le menu ⋮ donne accès aux réglages locaux dans une feuille compacte, limitée en hauteur au-dessus de la capsule. La migration des contrôles détaillés en réglages directement dans la capsule reste à faire. Les essais disparaissent au rechargement ; seul le propriétaire historique dans Artifacts peut publier.

Vérifier : ouverture +/⋮, Temps/Musique, fermeture des menus, réglages, focus et activation du vrai post-it au clavier ou au toucher. Aucun calendrier futur, disponibilité officielle ni filtre multi-calques n'est ajouté dans ce lot.

## Catalogue de scènes

Capsule → + → Scènes : six ambiances manuelles appliquées à la scène existante, avec retour à l'ambiance précédente. Ce sont des simulations locales, pas des prévisions météo ni des événements programmés. Contrat, inventaire et étapes futures : [docs/SCENES.md](docs/SCENES.md).

## Signaux sensibles — démonstration volontaire

⋮ → « Essayer un signal · démonstration » affiche un timbre document sur une lamelle et colore la poignée-perle. Le timbre arrive avec une courte animation de décollement et la perle oscille deux fois, jamais en boucle. En mouvements réduits, les animations sont supprimées. Toucher le timbre explique qu'il ne correspond à aucun document réel, retire le signal et place le focus sur la fermeture du détail. On peut également effacer le signal depuis ⋮.

Aucun document, notification, rôle ou couleur AIME officielle n'est raccordé : la teinte de démo n'encode aucune permission. Le store reste pilotable ; aucun nœud ne bloque sa mécanique. Les futurs signaux devront être alimentés par des états serveur explicites et accompagnés d'un texte, avec permissions et possibilité de les retrouver dans la capsule.

## Fenêtre principale recentrée

La maquette SyncView et ses contrôles sont retirés. Le nom conserve un menu simple sans simulation de rôle. Date du jour et heure (ou titre/temps musical) sont centrés dans le bandeau supérieur, hors de la capsule. Le titre long est tronqué et reste disponible via son attribut title ; pas encore de défilement radio. Les heures explorées restent celles du jour, sans calendrier futur.

La perle multicolore de 32 px remplace en permanence l'ancienne poignée. Elle reste attachée au bout du cordon. Tirer conserve le geste du store ; un clic sans déplacement ou Entrée/Espace ouvre les outils ⋮ existants. Les flèches/Home/End conservent le réglage de hauteur. Aucun choix de rôles/couleurs officielles n'est simulé.

Restent à construire : polaroid/médias, menus de participations réelles AIME, frise calendrier et migration complète des réglages détaillés.

## Parcours message intégré

Le post-it ouvre la saisie directement à la place des commandes du bas. Retour/Échap conserve le brouillon dans la page, sans stockage durable ; rechargement ou fermeture peuvent le perdre après avertissement du navigateur. Date et lieu sont facultatifs. Effacer demande confirmation si le brouillon a changé. Le bouton « Vérifier dans AIMEStudio » est un passage explicite vers les coordonnées et le consentement, pas un envoi confirmé. L'accent sur la lamelle indique le contexte de saisie, pas un succès serveur.

État complet et raccords restant à réaliser : [docs/DELIVERY.md](docs/DELIVERY.md).
