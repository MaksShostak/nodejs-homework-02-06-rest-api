// const express = require("express");
// const router = express.Router();
const router = require("express").Router();

const {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  putContact,
  patchContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const {
  validateBody,
  isValidId,
  authMiddleware,
} = require("../../middlewares");
const {
  schemaAddContact,
  schemaUpdateContact,
  schemaReplaceContact,
  schemaUpdateStatusFavoriteContact,
} = require("../../schemas/contactsSchema");

const { controllerWrapper } = require("../../helpers");

router.use(authMiddleware);

router.get("/", controllerWrapper(getContacts));
router.get("/:id", isValidId, controllerWrapper(getOneContactById));

router.post(
  "/",
  validateBody(schemaAddContact),
  controllerWrapper(postContact)
);

router.delete("/:id", isValidId, controllerWrapper(deleteContact));

router.put(
  "/:id",
  isValidId,
  validateBody(schemaUpdateContact),
  controllerWrapper(putContact)
);

router.patch(
  "/:id",
  isValidId,
  validateBody(schemaReplaceContact),
  controllerWrapper(patchContact)
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemaUpdateStatusFavoriteContact),
  controllerWrapper(updateStatusContact)
);

module.exports = { contactsRouter: router };
