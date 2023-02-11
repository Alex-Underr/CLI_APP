const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contactsAll = await listContacts();
  const data = contactsAll.find((element) => element.id === id);
  return data || null;
};

const addContact = async (data) => {
  const contactsAll = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contactsAll.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contactsAll = await listContacts();
  const index = contactsAll.findIndex((e) => e.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contactsAll.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
