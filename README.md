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

Le bouton « Déposer un post-it » ouvre un brouillon dans un dialogue natif, sans sauvegarde locale ni envoi automatique. « Continuer » transmet le texte via le fragment d'un lien vers la page AIMEStudio `/contact/openaime/`, où le visiteur vérifie son message, renseigne ses coordonnées et consent avant l'envoi. Le brouillon accompagne le lien : ne pas partager cette URL. La destination est fixe, jamais fournie par le visiteur. La demande réutilise le système et le destinataire serveur AIME, sans clé dans OpenAime.

Dépendance de livraison : fusionner et déployer la PR AIMEStudio #151 avant OpenAime. Le domaine public utilise la destination publique ; seule l'adresse de preview de cette branche est reliée à la preview AIME correspondante pour les essais. Aucun vrai envoi ni destinataire confirmé dans ce lot. La configuration Preview ne dispose pas de CONTACT_TO/CONTACT_FROM lors de la préparation : ne pas envoyer de données personnelles pour tester. Les tests d'interface simulent la réponse de l'API. La buée/dessin, les post-its publics et l'ouverture de l'éditeur restent à implémenter.

## Barre universelle — premier socle

Les outils Temps, Musique, Personnaliser et Message donnent accès aux commandes existantes. Temps/Musique partagent le lecteur d'origine et indiquent le mode actif. Personnaliser ouvre maintenant une feuille de réglages au-dessus de la barre, et non un panneau à droite ; elle est accessible à tous. Les changements sont des essais dans la page, perdus au rechargement, sans publication ni sauvegarde locale. Le bouton de publication reste masqué hors du contexte propriétaire historique Artifacts. Les réglages détaillés sont conservés pour éviter de perdre les fonctions existantes ; leur transformation en commandes contextuelles plus compactes sera progressive.

Vérifier : ouvrir/fermer Personnaliser, retour du focus, changement Temps/Musique, ouverture du brouillon Message, navigation clavier et petits écrans. La barre n'ajoute pas encore de date future, d'absence avion, de connexion AIME ou de disponibilité officielle. Elle ne déclenche aucun son automatiquement.
