const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

const getOneContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);

    if (!contact) {
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
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "contact was successfully added",
      data: contact,
    });
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    // const contacts = await removeContact(id);
    const contact = await removeContact(id);

    // await removeContact(id);
    if (!contact) {
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
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await updateContact(id, req.body);
    if (!contact) {
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
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

const patchContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await replaceContact(id, req.body);
    if (!contact) {
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
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

module.exports = {
  getContacts,
  getOneContactById,
  postContact,
  deleteContact,
  putContact,
  patchContact,
};
