# 📍 Visualisation Cartographique - Données PeMSD7

Ce projet propose une architecture conteneurisée avec Docker pour ingérer, stocker et visualiser les données de trafic issues du dataset PeMSD7 (région de Los Angeles).

## 🏗️ Architecture du Projet

L'application est divisée en trois services distincts orchestrés via **Docker Compose** :

1.  **`mongodb` (Base de données) :** * Utilise l'image officielle MongoDB.
    * Stocke les données des stations de manière persistante grâce à un volume Docker.
2.  **`backend` (API Node.js / Express) :** * Se charge de lire le fichier source `station_info.csv` en flux continu (stream) au démarrage.
    * Insère automatiquement les données dans MongoDB si la base est vide.
    * Expose une API REST (`/api/stations`) pour servir les données.
3.  **`frontend` (Serveur Web Nginx) :** * Sert une application HTML/JavaScript statique.
    * Utilise la librairie **Leaflet.js** pour générer une carte interactive centrée sur Los Angeles et y placer les marqueurs des stations récupérés depuis l'API.

## ⚙️ Prérequis

Pour exécuter ce projet sur votre machine, vous devez avoir installé :
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Installation et Démarrage

1.  **Cloner le dépôt :**
    ```bash
    git clone [https://github.com/bi-aya/pemsd7-docker-map.git](https://github.com/VOTRE_NOM_UTILISATEUR/pemsd7-docker-map.git)
    cd pemsd7-docker-map
    ```

2.  **Ajouter les données sources :**
    Assurez-vous que le fichier `station_info.csv` est bien présent dans le répertoire `data/` à la racine du projet.

3.  **Lancer l'environnement Docker :**
    Exécutez la commande suivante à la racine du projet pour construire les images et démarrer les conteneurs en arrière-plan :
    ```bash
    docker-compose up -d --build
    ```

## 🗺️ Utilisation

Une fois les conteneurs démarrés, le script d'ingestion Node.js va automatiquement peupler la base de données. 

* **Interface Cartographique (Frontend) :** Ouvrez votre navigateur et accédez à [http://localhost:8080](http://localhost:8080).
* **API des données (Backend) :** Accessible via [http://localhost:5000/api/stations](http://localhost:5000/api/stations).

## 🛑 Arrêter le projet

Pour arrêter proprement tous les conteneurs associés au projet :
```bash
docker-compose down
