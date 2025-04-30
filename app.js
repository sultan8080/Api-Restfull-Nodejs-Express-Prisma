const express = require("express");
const { PrismaClient } = require("./generated/prisma");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:4200", // Autorise uniquement Angular
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


// créer un nouveau produit POST

app.post("/api/products", async (req, res) => {
    try {
      const { name, description, price, inStock } = req.body;
  
      const newProduct = await prisma.product.create({
        data: { name, description, price, inStock },
      });
  
      res.status(201).json({
        message: "Objet créé !",
        thing: newThing,
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création", details: error });
    }
  });

// Afficher tous les produits GET
app.get("/api/products", async (req, res) => {
    try {
      const product = await prisma.product.findMany();
      res.status(200).json(stuff);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération", details: error });
    }
  });

// Facultatif : fermer la connexion Prisma correctement
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

module.exports = app;
