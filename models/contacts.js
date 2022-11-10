const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

// const contactsPath = path.resolve("models/contacts.json");
const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts.toString());
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    // const contact = await contacts.find((item) => item.id === contactId);
    // if (!contact) {
    //   return null;
    // }
    const [contact] = await contacts.filter((el) => el.id === contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  try {
    let contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts = [newContact, ...contacts];
    // contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    // let contacts = await listContacts();
    const contacts = await listContacts();
    // const remainingContacts = contacts.filter((el) => el.id !== contactId);
    // contacts = [...remainingContacts];
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const [result] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    // return contacts;
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
    const contacts = await listContacts();
    const [contact] = contacts.filter((el) => el.id === contactId);

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    // contact.id = contactId;

    await updateContacts(contacts);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const replaceContact = async (contactId, body) => {
  const { name, email, phone } = body;

  try {
    const contacts = await listContacts();
    const [contact] = contacts.filter((el) => el.id === contactId);
    // contact.id = contactId
    if (name) {
      contact.name = name;
    }
    if (email) {
      contact.email = email;
    }
    if (phone) {
      contact.phone = phone;
    }
    await updateContacts(contacts);
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  replaceContact,
};
