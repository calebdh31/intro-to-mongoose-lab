const mongoose = require("mongoose");
require("dotenv").config();
const prompt = require("prompt-sync")();

const Customer = require("./models/Customer.js");

const create = async () => {
  const customerName = prompt("What is the customer's name? ");
  const customerAge = prompt("What is the customer's age? ");
  await Customer.create({
    name: customerName,
    age: customerAge,
  });
  getAction();
};

const read = async () => {
  const customers = await Customer.find({});
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} --  Name: ${customer.name}. Age: ${customer.age}`
    );
  });
  getAction();
};

const update = async () => {
  console.log("Below is a list of customers: ");
  const customers = await Customer.find({});
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} --  Name: ${customer.name}. Age: ${customer.age}`
    );
  });

  const id = prompt(
    "Copy and paste the id of the customer you would like to update here: "
  );
  const customerName = prompt("What is the customer's new name? ");
  const customerAge = prompt("What is the customer's new age? ");
  await Customer.findByIdAndUpdate(id, {
    name: customerName,
    age: customerAge,
  });

  getAction();
};

const destroy = async () => {
  console.log("Below is a list of customers: ");
  const customers = await Customer.find({});
  customers.forEach((customer) => {
    console.log(
      `id: ${customer._id} --  Name: ${customer.name}. Age: ${customer.age}`
    );
  });

  const id = prompt(
    "Copy and paste the id of the customer you would like to delete here: "
  );
  await Customer.findByIdAndDelete(id);
  getAction();
};

const quit = async () => {
  console.log("exiting...");
  mongoose.connection.close();
};

const performAction = (action) => {
  if (action === 1) {
    create();
  } else if (action === 2) {
    read();
  } else if (action === 3) {
    update();
  } else if (action === 4) {
    destroy();
  } else if (action === 5) {
    quit();
  }
};

const getAction = () => {
  console.log("What would you like to do?");
  console.log("  1. Create a customer");
  console.log("  2. View all customers");
  console.log("  3. Update a customer");
  console.log("  4. Delete a customer");
  console.log("  5. quit");
  const action = parseInt(prompt("Number of action to run: "));
  performAction(action);
};

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  console.log("Welcome to the CRM");
  getAction();
};

main();