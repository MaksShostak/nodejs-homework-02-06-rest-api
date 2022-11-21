const { Contact } = require("../models/contactsModel");

const listContacts = async (userId, { skip, limit, favorite }) => {
  const sortFav = favorite ? { favorite: -1 } : { favorite: 1 };
  return await Contact.find({ owner: userId })
    .skip(skip)
    .limit(limit)
    .sort(sortFav);
};

const getContactById = async (contactId, userId) => {
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
