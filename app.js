const dotenv =  require('dotenv')
dotenv.config()

const prompt =  require('prompt-sync')()
const mongoose = require('mongoose')
const Customer = require('./models/Customer')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        // mainMenu()
    })
    .catch(err => console.log(err))

function mainMenu() {
  console.log('Inside mainMenu')  
  console.log('\nWelcome to the CRM')
  console.log('\nWhat would you like to do?')
  console.log('\n  1. Create a customer')
  console.log('  2. View all customers')
  console.log('  3. Update a customer')
  console.log('  4. Delete a customer')
  console.log('  5. Quit\n')

  const choice = prompt('Number of action to run: ')
  doSomething(choice)
}

function doSomething (action) {
  
  switch (action) {
    case '1':
        createCustomer()
        return
    case '2':
        viewCustomer()
        return
    case '3':
        updateCustomer()
        return
    case '4':
        deleteCustomer()
        return
    case '5':
        console.log('Exiting...')
        mongoose.connection.close()
        return
    default:
        console.log('Invalid choice')
        return mainMenu()
    }
}

async function createCustomer () {

    const name = prompt("Enter customer's name: ")
    const age = parseInt(prompt("Enter customer's age: "))
    const newCustomer = new Customer({name, age})
    await newCustomer.save()
    console.log(`Added new customer: ${newCustomer.name}, Age: ${newCustomer.age}`)
    mainMenu()
}
async function viewCustomer() {
    const customers = await Customer.find()
    console.log('\n Current customers:\n')
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
    })
    mainMenu()
}
async function updateCustomer () {
    await viewCustomer()
    const id = prompt('\nPaste the id to update: ')
    const name = prompt('New name: ')
    const age = parseInt(prompt('New age: '))
    await Customer.findByIdAndUpdate(id, {name, age})
    console.log('\nCustomer updated!\n')
    mainMenu()
}

async function deleteCustomer () {
    await viewCustomer()
    const id = prompt('\nPaste the id to delete: ')
    await Customer.findByIdAndDelete(id)
    console.log('\n Customer deleted.\n')
mainMenu()
}

mainMenu()