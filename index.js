const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const contacts = require("./contacts");
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const getList = await contacts.listContacts();
      console.table(getList);
      break;

    case "get":
      const bookId = await contacts.getContactById(id);
      console.table(bookId);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.table(deletedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
