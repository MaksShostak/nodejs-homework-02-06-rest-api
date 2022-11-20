const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
} = require("../../controllers/auth.Controller");

const {
  validationSchemaUser,
} = require("../../middlevares/validationContacts");

const { authMiddleware } = require("../../middlevares/validationToken");

router.post("/register", validationSchemaUser, registrationController);
router.post("/login", validationSchemaUser, loginController);
router.post("/logout", authMiddleware, logoutController);
router.get("/current", authMiddleware, currentController);

router.patch("/", authMiddleware, updateSubscriptionController);

module.exports = { usersRouter: router };
