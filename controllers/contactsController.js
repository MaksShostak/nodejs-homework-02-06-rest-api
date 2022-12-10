const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
} = require("../services/contactsService");

const { RequestError } = require("../helpers");

const getContacts = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { page, limit, favorite } = req.query;

  const contacts = await listContacts(userId, { page, limit, favorite });

  res.status(200).json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

const getOneContactById = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await getContactById({ contactId, userId });

  if (!contact) {
    throw RequestError(
      404,
      `failure, contact with id: ${contactId} not found!`
    );
    // return res.status(404).json({
    //   status: "Not found",
    //   message: `failure, contact with id: ${contactId} not found!`,
    //   code: 404,
    // });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const postContact = async (req, res, next) => {
  const { _id: userId } = req.user;

  const contact = await addContact(req.body, userId);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "contact was successfully added",
    data: contact,
  });
};

const deleteContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await removeContact(contactId, userId);
  if (!contact) {
    throw RequestError(
      404,
      `failure, contact with id: ${contactId} not found!`
    );
  }
  res.status(200).json({
    message: "contact deleted",
    // data: contact,
  });
};

const putContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await updateContact(contactId, req.body, userId);
  if (!contact) {
    throw RequestError(
      404,
      `failure, contact with id: ${contactId} not found!`
    );
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const patchContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await replaceContact(contactId, req.body, userId);
  if (!contact) {
    throw RequestError(
      404,
      `failure, contact with id: ${contactId} not found!`
    );
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const updateStatusContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const keys = Object.keys(req.body);

  if (!keys.includes("favorite")) {
    return res.status(400).json({
      status: "Not found",
      message: "missing field favorite",
      code: 400,
    });
  }
  const result = await updateContact(contactId, req.body, userId);
  if (!result) {
    throw RequestError(
      404,
      `failure, contact with id: ${contactId} not found!`
    );
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  putContact,
  patchContact,
  updateStatusContact,
};
