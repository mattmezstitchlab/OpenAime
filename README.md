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
