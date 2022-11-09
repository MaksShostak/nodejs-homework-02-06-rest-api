const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

const getOneContactById = async (req, res, next) => {
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
};

const postContact = async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "contact was successfully added",
    data: contact,
  });
};

const deleteContact = async (req, res, next) => {
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
};

const putContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await updateContact(id, req.body);

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const patchContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await replaceContact(id, req.body);
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  putContact,
  patchContact,
};
