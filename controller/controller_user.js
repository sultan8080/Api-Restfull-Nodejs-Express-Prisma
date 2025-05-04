const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    res.status(201).json({ message: "Utilisateur créé !", user });
  } catch (error) {
    res.status(500).json({ error: "Erreur d'inscription", details: error.message });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Utilisateur non trouvé" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Erreur de connexion", details: error.message });
  }
};


exports.getAllUsers = async(req,res)  => {
  try {
    const users = await prisma.user.findMany({ include: { products: true } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération", details: error.message });
  }
}