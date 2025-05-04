const express = require("express");
const router = express.Router();
const userController = require("../controller/controller_user");

// Routes d'inscription et de connexion
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

module.exports = router;
