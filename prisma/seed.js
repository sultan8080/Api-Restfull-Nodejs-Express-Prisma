const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // Ajout de bcryptjs pour hacher les mots de passe
const prisma = new PrismaClient();

async function main() {

// Supprime les données existantes
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Hachage des mots de passe avant de les enregistrer
  const hashedPassword1 = await bcrypt.hash('123456', 10);
  const hashedPassword2 = await bcrypt.hash('567890', 10); 

  // Création des utilisateurs avec des mots de passe hachés
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'Utilisateur 1',
      password: hashedPassword1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'Utilisateur 2',
      password: hashedPassword2,
    },
  });

  // Création des produits pour l'utilisateur 1
  await prisma.product.createMany({
    data: [
      {
        name: 'Produit A',
        description: 'Description du produit A',
        price: 100,
        inStock: true,
        userId: user1.id,
      },
      {
        name: 'Produit B',
        description: 'Description du produit B',
        price: 200,
        inStock: false,
        userId: user1.id,
      },
      {
        name: 'Produit C',
        description: 'Description du produit C',
        price: 300,
        inStock: false,
        userId: user2.id,
      },
      {
        name: 'Produit D',
        description: 'Description du produit D',
        price: 400,
        inStock: false,
        userId: user1.id,
      },
      {
        name: 'Produit E',
        description: 'Description du produit E',
        price: 600,
        inStock: false,
        userId: user2.id,
      },
    ],
  });
}

// Exécution de la fonction principale avec gestion des erreurs
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); 
  });
