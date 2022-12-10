const router = require("express").Router();

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  avatarController,
  updateSubscriptionController,
} = require("../../controllers/authController");

const { controllerWrapper } = require("../../helpers");

const {
  validateBody,
  authMiddleware,
  avatarMiddleware,
} = require("../../middlewares");
const {
  schemaRegisterUser,
  schemaLoginUser,
} = require("../../schemas/usersSchema");

router.post(
  "/register",
  validateBody(schemaRegisterUser),
  controllerWrapper(registrationController)
);
router.post(
  "/login",
  validateBody(schemaLoginUser),
  controllerWrapper(loginController)
);
router.post("/logout", authMiddleware, controllerWrapper(logoutController));
router.get("/current", authMiddleware, controllerWrapper(currentController));
router.patch(
  "/",
  authMiddleware,
  controllerWrapper(updateSubscriptionController)
);

router.patch(
  "/avatars",
  authMiddleware,
  avatarMiddleware.single("avatar"),
  controllerWrapper(avatarController)
);

module.exports = { usersRouter: router };
