const router = require("express").Router();

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  avatarController,
  updateSubscriptionController,
  verificationController,
  reverificationController,
  refreshController,
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
  schemaVerifyEmailUser,
  schemaSubscriptionUser,
  schemaRefreshToken,
} = require("../../schemas/usersSchema");

router.post(
  "/register",
  validateBody(schemaRegisterUser),
  controllerWrapper(registrationController)
);
router.get(
  "/verify/:verificationToken",
  controllerWrapper(verificationController)
);

router.post(
  "/verify",
  validateBody(schemaVerifyEmailUser),
  controllerWrapper(reverificationController)
);

router.post(
  "/login",
  validateBody(schemaLoginUser),
  controllerWrapper(loginController)
);
router.post(
  "/refresh",
  validateBody(schemaRefreshToken),
  controllerWrapper(refreshController)
);
router.post("/logout", authMiddleware, controllerWrapper(logoutController));
router.get("/current", authMiddleware, controllerWrapper(currentController));
router.patch(
  "/",
  authMiddleware,
  validateBody(schemaSubscriptionUser),
  controllerWrapper(updateSubscriptionController)
);

router.patch(
  "/avatars",
  authMiddleware,
  avatarMiddleware.single("avatar"),
  controllerWrapper(avatarController)
);

module.exports = { usersRouter: router };
