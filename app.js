const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware CORS pour autoriser les requêtes depuis Angular (localhost:4200)
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content",
      "Accept",
      "Content-Type",
      "Authorization",
    ],
  })
);


// Créer un nouveau produit (POST /api/products)
app.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, inStock } = req.body;
    const newProduct = await prisma.product.create({
      data: { name, description, price, inStock },
    });
    res.status(201).json({
      message: "Objet créé !",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création", details: error.message });
  }
});

// Récupérer tous les produits (GET /api/products)
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération", details: error.message });
  }
});

// Récupérer un produit par ID (GET /api/products/:id)
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const product = await prisma.product.findUnique({
            where: {
              id: parseInt(id),
            },
          });
        res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération", details: error.message });
    }
  });
  

// Mettre à jour un produit par ID (PATCH /api/products/:id)
app.patch("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, description, price, inStock } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, inStock },
    });

    res.status(200).json({
      message: "Produit mis à jour avec succès !",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Erreur lors de la mise à jour du produit", 
      details: error.message 
    });
  }
});

// Supprimer un produit par ID (DELETE /api/products/:id)
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      message: "Produit supprimé avec succès !",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Erreur lors de la suppression du produit", 
      details: error.message 
    });
  }
});


// Fermer proprement Prisma lors de l'arrêt de l'application
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;
