const express = require("express");
const router = express.Router();
const productController = require("../controller/controller_product");
const auth = require("../middleware/auth");

// Routes publiques
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Routes protégées (authentification requise)
router.post("/", auth, productController.createProduct);
router.patch("/:id", auth, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
