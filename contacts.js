const fs = require("fs").promises;
const { updateId } = require("./contactsHandlers/updateId");
const updateContacts = require("./contactsHandlers/updateContacts");
const getContactsPath = require("./contactsHandlers/getContactsPath");

const contactsPath = getContactsPath();

async function listContacts() {
  const contacts = await fs
    .readFile(contactsPath)
    .then(JSON.parse)
    .catch(console.error);

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => Number(id) === Number(contactId));

  if (!result) {
    console.error(`Couldnt find contact with id: ${contactId}`);
    return null;
  }

  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((el) => Number(el.id) === Number(contactId));
  if (idx === -1) {
    console.error(`Couldnt find contact with id: ${contactId}`);
    return null;
  }
  const removedContact = contacts.splice(idx, 1)[0];

  updateId(contacts);

  updateContacts(contactsPath, contacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone }; //consider adding ID
  const updatedContacts = [...contacts, newContact];

  updateId(updatedContacts);
  updateContacts(contactsPath, updatedContacts);

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
