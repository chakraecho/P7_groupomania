# P7_groupomania
projet de création de réseau social d'entreprise dans le cadre du parcours dev web de OpenClassrooms

# Procédure à effectuer dans le dossier frontend et backend

## Installation
Une base de données au nom de groupomania doit être créé.   
un .env.example est fourni et doit être modifié en .env avec les valeurs des variables modifiées.

## Installation des modules 
lancer ``` npm i ```

# Frontend :
build :
```npm run build```   
Les fichiers à servir seront situé dans le dossier dist/

# Backend :
### à effectuer avant premier lancement
lancez ```npm run init--db``` pour initialiser certaines données dans la DB

### création d'utilisateur admin
lancez ```npm run init--user``` et entrez les données dans la console pour créer un utilisateur

### lancement du serveur :
```node server.js```  
Le module PM2 est fortement conseillé sur une instance de Prod.
Certificats SSL obligatoires ! -> cert.pem et key.pem
