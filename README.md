# Product API

Une API RESTful construite avec **Node.js**, **Express**, **Prisma** et **PostgreSQL**, permettant la gestion CRUD de produits. 

---

## Fonctionnalités

L'API prend en charge les opérations suivantes :

- **Créer** un produit (`POST /api/products`)
- **Lire tous les produits** (`GET /api/products`)
- **Lire un produit spécifique** (`GET /api/products/:id`)
- **Mettre à jour** un produit (`PATCH /api/products/:id`)
- **Supprimer** un produit (`DELETE /api/products/:id`)


## Technologies utilisées

- **Node.js** + **Express** (serveur backend)
- **Prisma ORM** (connexion à la base de données PostgreSQL)
- **PostgreSQL** (base de données relationnelle)
- **CORS** (pour les requêtes cross-origin, utile avec Angular ou autre frontend)

