const path = require("path");

function getContactsPath() {
  const contactsPath = path.resolve("db/contacts.json");
  return contactsPath;
}

module.exports = getContactsPath;
