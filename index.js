const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require('./contacts');

const argv = require("yargs").argv;


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.log("listContacts", list);
      break;

    case "get":
     const contact = await getContactById(id);
      console.log("getContactById", contact);
      break;

    case "add":
      const newContact = await addContact(name,email,phone);      
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log("removedContact", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);