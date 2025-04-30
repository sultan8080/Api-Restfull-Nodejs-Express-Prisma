const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

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

// POST /api/products
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

// GET /api/products
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération", details: error.message });
  }
});

// Fermer la connexion Prisma
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;
