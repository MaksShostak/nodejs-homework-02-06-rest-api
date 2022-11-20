const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
} = require("../services/contactsService");

const getContacts = async (req, res, next) => {
  let { page = 0, limit = 10, favorite } = req.query;
  let skip = 0;
  limit = parseInt(limit);

  page === 0 ? (skip = 0) : (skip = parseInt(page) * limit - limit);
  skip = parseInt(skip);

  const { _id: userId } = req.user;
  try {
    const contacts = await listContacts(userId, { skip, limit, favorite });

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
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  try {
    const contact = await getContactById(contactId, userId);

    if (!contact) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, contact with id: ${contactId} not found!`,
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
  const { _id: userId } = req.user;
  try {
    const contact = await addContact(req.body, userId);
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
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  try {
    const contact = await removeContact(contactId, userId);

    // await removeContact(id);
    if (!contact) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, contact with id: ${contactId} not found!`,
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
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  try {
    const contact = await updateContact(contactId, req.body, userId);
    if (!contact) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, contact with id: ${contactId} not found!`,
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
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  try {
    const contact = await replaceContact(contactId, req.body, userId);
    if (!contact) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, contact with id: ${contactId} not found!`,
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
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const keys = Object.keys(req.body);

  try {
    if (!keys.includes("favorite")) {
      return res.status(400).json({
        status: "Not found",
        message: "missing field favorite",
        code: 400,
      });
    }
    const result = await updateContact(contactId, req.body, userId);
    if (!result) {
      return res.status(404).json({
        status: "Not found",
        message: `failure, contact with id: ${contactId} not found!`,
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
