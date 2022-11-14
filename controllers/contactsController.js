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
    console.error(error);
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
        code: 404,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await removeContact(id);

    // await removeContact(id);
    if (!contact) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, contact with id: ${id} not found!`,
        code: 404,
      });
    }
    res.status(200).json({
      message: "contact deleted",

      // data: contact,
    });
  } catch (error) {
    console.error(error);
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
        code: 404,
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    console.error(error);
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
        code: 404,
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    // res.status(500).json({
    //   message: "Server error",
    // });
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);

  try {
    if (!keys.includes("favorite")) {
      return res.status(400).json({
        status: "Not found",
        message: "missing field favorite",
        code: 400,
      });
    }
    const result = await updateContact(id, req.body);
    if (!result) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, contact with id: ${id} not found!`,
        code: 404,
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { task: result },
    });
  } catch (error) {
    console.error(error);
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
  updateStatusContact,
};
