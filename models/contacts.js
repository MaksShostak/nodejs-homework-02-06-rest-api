const { Contact } = require("./contactsModel");

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId });
};

const addContact = async (body) => {
  const { name, email, phone, favorite = false } = body;
  return await Contact.create({ name, email, phone, favorite });
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  const { name, email, phone, favorite } = body;
  return await Contact.findByIdAndUpdate(
    { _id: contactId },
    { name, email, phone, favorite },
    { new: true }
  );
};

const replaceContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
};
