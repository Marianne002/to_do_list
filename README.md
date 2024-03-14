# Base de Projet de Liste de Tâches (To-Do List)

Ce dépôt contient le code de base pour une application simple de liste de tâches construite avec Next.js. C'est un point de départ pour un travail pratique où vous devrez améliorer l'application, y intégrer une base de données MongoDB et déployer le tout sur Vercel.

## Objectifs de l'Amélioration

Votre mission consiste à enrichir cette application de base en y ajoutant des fonctionnalités supplémentaires et une persistance des données. Voici les étapes à suivre :

1. **Amélioration de l'Application :**
   - Implémentez la fonctionnalité pour ajouter de nouvelles tâches.
   - Ajoutez la possibilité de supprimer des tâches.
   - Permettez l'édition des tâches existantes.

2. **Intégration avec MongoDB :**
   - Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) pour héberger votre base de données.
   - Configurez un nouveau cluster et créez une base de données pour votre application.
   - Utilisez la bibliothèque Mongoose ou le client MongoDB natif de Node.js pour connecter votre application Next.js à votre base de données MongoDB.
   - Modifiez votre application pour qu'elle utilise la base de données pour la création, la lecture, la mise à jour et la suppression des tâches.

3. **Déploiement sur Vercel :**
   - Créez un compte sur [Vercel](https://vercel.com/) si vous n'en avez pas encore.
   - Connectez votre dépôt GitHub à Vercel pour le déploiement automatique.
   - Configurez les variables d'environnement nécessaires sur Vercel, notamment vos chaînes de connexion à la base de données.

## Structure du Projet

- `pages/` : Contient les fichiers de page de l'application Next.js, y compris le point d'entrée principal `index.js`.
- `styles/` : Contient les fichiers CSS globaux, y compris `globals.css` pour les styles de base.
- `public/` : Contient les ressources statiques comme le favicon.

## Instructions pour le Développement Local

Pour commencer le développement local :

1. Clonez le dépôt sur votre machine locale.
2. Installez les dépendances avec `npm install`.
3. Lancez le serveur de développement avec `npm run dev`.
4. Ouvrez `http://localhost:3000` dans votre navigateur pour voir l'application.

