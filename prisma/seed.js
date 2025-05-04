const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs fictifs
  const user1 = await prisma.user.create({
    data: {
      email: 'test1@example.com',
      name: 'Utilisateur 1',
      password: '123456',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'test2@example.com',
      name: 'Utilisateur 2',
      password: '123456',
    },
  });

  // Créer des produits pour l'utilisateur 1
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
        userId: user1.id,
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
        userId: user1.id,
      },
    ],
  });
}




main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
