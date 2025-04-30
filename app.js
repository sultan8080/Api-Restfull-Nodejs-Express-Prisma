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



// Facultatif : fermer la connexion Prisma correctement
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

module.exports = app;
