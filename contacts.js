const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');


const contactsPath = path.normalize('./db/contacts.json');


// TODO: задокументировать каждую функцию
async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    const data = JSON.parse(contacts);    
    return data;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === JSON.stringify(contactId));   
    return contact ? contact : null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === JSON.stringify(contactId));
    const removedContact = contacts[index];
    if(index !== -1) {
        contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
    }    
    return removedContact ? removedContact : null;
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    console.log(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}