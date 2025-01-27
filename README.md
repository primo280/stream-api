# stream_api

# API de Streaming Musical

Ce projet consiste en une **API de streaming musical** développée avec **Node.js**, **Sequelize**, **SQLite** et l'authentification via **JWT**. L'API permet de gérer les utilisateurs, les playlists, et les chansons, ainsi que de réaliser des opérations telles que la création, la lecture, et la gestion des playlists et des chansons.

## Fonctionnalités principales

- **Authentification des utilisateurs** : Inscription et connexion avec gestion des tokens JWT.
- **Gestion des playlists** : Création, récupération et modification des playlists d'un utilisateur.
- **Gestion des chansons** : Ajouter, modifier et lister les chansons.
- **Sécurisation des routes** : Accès aux routes protégées via JWT.

## Technologies utilisées

- **Node.js** : Environnement d'exécution pour le serveur.
- **Express** : Framework pour créer l'API REST.
- **Sequelize** : ORM pour interagir avec la base de données SQLite.
- **SQLite3** : Base de données légère pour stocker les données.
- **JWT (JSON Web Token)** : Authentification des utilisateurs via tokens.
- **Bcrypt** : Hachage des mots de passe pour les utilisateurs.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/)
- [SQLite3](https://www.sqlite.org/)

## Installation

1. Clonez ce repository :

```bash
git clone https://github.com/votre-utilisateur/streaming-api.git
cd streaming-api
```

2. Installez les dépendances du projet :

```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec la variable suivante (vous pouvez ajuster la clé secrète comme bon vous semble) :

```bash
JWT_SECRET=ma_clé_secrète_pour_le_jwt
```

4. Lancez le serveur en mode développement avec **nodemon** (ou utilisez `node` si vous préférez) :

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`.

## Routes API

### Authentification

- **POST** `/auth/register` : Inscription d'un nouvel utilisateur.
  
  **Corps de la requête :**
  ```json
  {
    "email": "utilisateur@example.com",
    "username": "utilisateur",
    "password": "motdepasse"
  }
  ```

- **POST** `/auth/login` : Connexion de l'utilisateur existant.
  
  **Corps de la requête :**
  ```json
  {
    "email": "utilisateur@example.com",
    "password": "motdepasse"
  }
  ```

  **Réponse :**
  ```json
  {
    "user": {
      "id": 1,
      "email": "utilisateur@example.com",
      "username": "utilisateur"
    },
    "token": "votre_jwt_token"
  }
  ```

### Playlists

- **POST** `/playlists` : Créer une nouvelle playlist.

  **Corps de la requête :**
  ```json
  {
    "name": "Ma playlist"
  }
  ```

- **GET** `/playlists` : Récupérer toutes les playlists de l'utilisateur connecté.

- **POST** `/playlists/add-song` : Ajouter une chanson à une playlist.
  
  **Corps de la requête :**
  ```json
  {
    "playlistId": 1,
    "songId": 2
  }
  ```

### Chansons

- **POST** `/songs` : Ajouter une nouvelle chanson.
  
  **Corps de la requête :**
  ```json
  {
    "title": "Titre de la chanson",
    "artist": "Nom de l'artiste",
    "url": "URL du fichier audio"
  }
  ```

- **GET** `/songs` : Récupérer toutes les chansons.

## Sécurisation des Routes

Certaines routes (comme la création de playlists ou l'ajout de chansons) nécessitent une authentification via JWT. Pour cela, incluez le token dans l'en-tête `Authorization` de la requête :

```
Authorization: Bearer <votre_token_jwt>
```

## Structure du projet

```
streaming-api/
├── controllers/
│   ├── authController.js      # Logique d'authentification
│   ├── playlistController.js  # Logique de gestion des playlists
│   └── songController.js      # Logique de gestion des chansons
├── middlewares/
│   └── authMiddleware.js      # Vérification du JWT
├── models/
│   ├── user.js                # Modèle User
│   ├── playlist.js            # Modèle Playlist
│   └── song.js                # Modèle Song
├── utils/
│   └── jwt.js                 # Utilitaires pour générer et vérifier les JWT
├── config/
│   └── database.js            # Configuration de la base de données
├── server.js                  # Point d'entrée de l'application
└── package.json               # Dépendances et scripts
```

## Scripts

- `npm run dev` : Lance le serveur en mode développement avec **nodemon**.
- `npm start` : Lance le serveur en mode production (utilise `node server.js`).

## Contribuer

Les contributions sont les bienvenues ! Si vous avez des suggestions ou des corrections, n'hésitez pas à ouvrir une issue ou à envoyer une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
