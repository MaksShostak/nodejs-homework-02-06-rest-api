const { Contact } = require("../models/contactModel");

const listContacts = async (userId, { page = 0, limit = 10, favorite }) => {
  // const skip = (page - 1) * limit;
  let skip = 0;
  page === 0 ? (skip = 0) : (skip = page * limit - limit);
  if (favorite === undefined) {
    return await Contact.find({ owner: userId }).skip(skip).limit(limit);
  }
  return await Contact.find({ owner: userId, favorite })
    .skip(skip)
    .limit(limit);
  // return await Contact.find(
  //   { owner: userId, favorite },
  //   "-createdAt -updatedAt",
  //   {
  //     skip,
  //     limit,
  //   }
  // ).populate("owner", "name email");
};

const getContactById = async ({ contactId, userId }) => {
  return await Contact.findOne({ owner: userId, _id: contactId });
};

const addContact = async (body, userId) => {
  const { name, email, phone, favorite = false } = body;
  return await Contact.create({ name, email, phone, favorite, owner: userId });
};

const removeContact = async (contactId, userId) => {
  return await Contact.findOneAndRemove({ owner: userId, _id: contactId });
};

const updateContact = async (contactId, body, userId) => {
  const { name, email, phone, favorite } = body;
  return await Contact.findOneAndUpdate(
    { owner: userId, _id: contactId },
    { name, email, phone, favorite },
    { new: true }
  );
};

const replaceContact = async (contactId, body, userId) => {
  return await Contact.findOneAndReplace(
    { owner: userId, _id: contactId },
    body,
    {
      new: true,
    }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
};
