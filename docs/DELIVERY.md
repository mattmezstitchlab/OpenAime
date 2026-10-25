# État de livraison — fenêtre AIME

Ce document sépare les parcours utilisables des idées retenues. La branche n'est pas un réseau social fini.

## Parcours utilisables dans cette version

- Store, lumière, saisons et météo simulée ; orbe permanente avec geste de traction et accès aux outils.
- Capsule unique : temps, musique, six ambiances manuelles, réglages de vue temporaires.
- Heure/date du jour ou titre musical dans le bandeau supérieur.
- Post-it → saisie dans la capsule → date et lieu facultatifs → confirmation AIMEStudio. Brouillon conservé en mémoire en quittant le mode, avertissement avant navigation accidentelle, effacement confirmé.
- Accent causal court sur une lamelle à l'ouverture ou après un champ modifié. Ce signal exprime une interaction locale, jamais un envoi réussi. Pas de mouvement en mode réduit.
- Démonstration volontaire de timbre/notification, distincte des données réelles.

## Données et transmission

Aucune pièce jointe, OCR, IA ou création de rôle n'est simulée. Le message est transmis dans le fragment d'une destination AIMEStudio fixe. Cette approche n'est pas un chiffrement ; ne pas partager le lien. La confirmation existante efface le fragment, demande identité et consentement, puis utilise son API de contact. La PR AIMEStudio #151 a été fusionnée le 25 octobre 2026 à 21:41 UTC. Le raccord utilise désormais la page publique AIMEStudio. La réception réelle et le destinataire d'e-mail ne sont pas testés. Pas de copie des clés entre projets.

## Raccords obligatoires avant de parler de produit complet

1. Identifier les API et permissions réelles AIME, leurs contextes et couleurs ; exposer seulement les participations accordées dans +. Aucun rôle en dur accordé au navigateur.
2. Choisir et raccorder identité/connexion entre les projets, onboarding avec données de référence et écran d'impact avant propagation.
3. Formaliser calendrier/frise, fuseau, récurrences et disponibilité ; séparer simulation visuelle et état officiel. Absences/Plan B sans publication automatique.
4. Examiner le contrat TicketAime et réutiliser ses rendus ; chaque ticket référence une ressource métier, avec étapes manquantes validées côté serveur. Impression décorative distincte d'une émission réelle.
5. Import de médias/documents : accès protégé, limites, stockage, suppression, antivirus selon service, extraction avec provenance et validation humaine. Budget, coût et fournisseur à décider avant activation.
6. Assistant orbe : connexion réelle, suggestions explicables, aucune action sensible sans confirmation et journalisation appropriée.
7. Polaroid, galerie et voix off avec médias dont les droits sont connus. Pas d'images de profil ou de témoignages fictifs.
8. Tests multi-utilisateurs avec base de test isolée, permissions côté serveur, contrôles de suppression/confidentialité et test d'e-mail explicitement autorisé.

## Retiré

La grille SyncView schématique est retirée : elle ne comparait pas de vraies vues autorisées. Ne la réintroduire qu'avec une valeur vérifiable.

## Capsule compacte

Le formulaire utilise la même classe `.day` dans le même conteneur que la capsule habituelle. Un seul champ est affiché : Message, Date ou Lieu, via +. Retour conserve les réponses, × efface avec confirmation, → passe à la vérification. Les aides sont transitoires hors du flux ; aucune augmentation de hauteur.
