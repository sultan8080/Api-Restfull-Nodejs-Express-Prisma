Une API RESTful construite avec **Node.js**, **Express**, **Prisma** et **PostgreSQL**, permettant la gestion CRUD des produits ainsi que la gestion des utilisateurs.

---

## Fonctionnalités

### Produits (`/api/products`)
- `POST /api/products` → Créer un produit
- `GET /api/products` → Obtenir tous les produits
- `GET /api/products/:id` → Obtenir un produit par ID
- `PATCH /api/products/:id` → Mettre à jour un produit
- `DELETE /api/products/:id` → Supprimer un produit

### Utilisateurs (`/api/users`)
- `GET /api/users` → Obtenir tous les utilisateurs
- `GET /api/users/:id` → Obtenir un utilisateur par ID

> ✅ Toutes les routes ont été testées avec **Postman**.

---

## Technologies utilisées

- **Node.js** – Runtime JavaScript
- **Express** – Framework web minimaliste
- **Prisma** – ORM pour PostgreSQL
- **PostgreSQL** – Base de données relationnelle
- **bcryptjs** – Hachage des mots de passe
- **jsonwebtoken** – Authentification via JWT
- **CORS** – Autorise les requêtes cross-origin
- **dotenv** – Chargement des variables d’environnement
- **nodemon** – Redémarrage automatique du serveur en développement
- **Postman** – Outil de test des API
