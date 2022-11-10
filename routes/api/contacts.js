const express = require("express");
const router = express.Router();

const {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} = require("../../controllers/contactsController");

const {
  validationSchemaAddContact,
  validationSchemaUpdateContact,
  validationReplaceUpdateContact,
} = require("../../middlevares/validationContacts");

router.get("/", getContacts);

router.get("/:id", getOneContactById);

router.post("/", validationSchemaAddContact, postContact);

router.delete("/:id", deleteContact);

router.put("/:id", validationSchemaUpdateContact, putContact);

router.patch("/:id", validationReplaceUpdateContact, patchContact);

module.exports = { contactsRouter: router };
