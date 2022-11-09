const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
} = require("../../models/contacts");

const {
  validationSchemaAddContact,
  validationSchemaUpdateContact,
  validationReplaceUpdateContact,
} = require("../../models/validationContacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json({
    status: "success",
    code: 200,
    data: contacts,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact?.id) {
    return res.status(404).json({
      status: "Not found",
      message: `failure, contact with id: ${id} not found!`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
});

router.post("/", async (req, res, next) => {
  const validationResult = validationSchemaAddContact(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details[0].message,
      message: "Bad Request, missing required name field",
    });
  }
  const contact = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "contact was successfully added",
    data: contact,
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  // const contacts = await removeContact(id);
  const contact = await removeContact(id);

  // await removeContact(id);
  if (!contact?.id) {
    return res.status(404).json({
      status: "Not found",
      message: `failure, contact with id: ${id} not found!`,
    });
  }
  res.status(200).json({
    message: "contact deleted",
    // data: contacts,
    // data: contact,
  });
});

router.put("/:id", async (req, res, next) => {
  const validationResult = validationSchemaUpdateContact(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details[0].message,
      message: " Bad Request, missing fields",
    });
  }
  const { id } = req.params;

  const contact = await updateContact(id, req.body);

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
});

router.patch("/:id", async (req, res, next) => {
  const validationResult = validationReplaceUpdateContact(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      status: validationResult.error.details[0].message,
      message: "Bad Request, missing fields",
    });
  }
  const { id } = req.params;

  const contact = await replaceContact(id, req.body);
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
});

module.exports = { contactsRouter: router };
