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

// Routes API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Fermer proprement Prisma lors de l'arrêt de l'application
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;
