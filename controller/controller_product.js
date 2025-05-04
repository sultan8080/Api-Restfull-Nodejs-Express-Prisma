const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Créer un nouveau produit (identifiant utilisateur : jeton requis)

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, inStock } = req.body;
    const userId = req.user.id;

    const newProduct = await prisma.product.create({
      data: { name, description, price, inStock, userId },
    });

    res.status(201).json({ message: "Produit créé !", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création", details: error.message });
  }
};

// Récupérer tous les produits (accessible publiquement)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({ include: { user: true } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération", details: error.message });
  }
};

// Récupérer un produit par ID (accessible publiquement)
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { user: true }, 
    });

    if (!product) return res.status(404).json({ error: "Produit non trouvé." });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération", details: error.message });
  }
};

// Mettre à jour un produit (identifiant utilisateur : jeton requis)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, inStock } = req.body;

    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

    if (product.userId !== req.user.id)
      return res.status(403).json({ error: "Action non autorisée." });

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, inStock },
    });

    res.status(200).json({ message: "Produit mis à jour avec succès !", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour", details: error.message });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

    if (product.userId !== req.user.id)
      return res.status(403).json({ error: "Action non autorisée." });

    const deletedProduct = await prisma.product.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Produit supprimé avec succès !", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression", details: error.message });
  }
};
