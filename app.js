const dotenv =  require('dotenv')
dotenv.config()

const prompt =  require('prompt-sync')()
const mongoose = require('mongoose')
const Customer = require('./models/Customer')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        mainMenu()
    })
    .catch(err => console.log(err))

function mainMenu() {
  console.log('Inside mainMenu')  
  process.stdout.write('What is your name? ')
  const username = prompt('')
  console.log(`Your name is ${username}`)
  console.log('\nWelcome to the CRM')
  console.log('\nWhat would you like to do?')
  console.log('\n  1. Create a customer')
  console.log('  2. View all customers')
  console.log('  3. Update a customer')
  console.log('  4. Delete a customer')
  console.log('  5. Quit\n')

  const choice = prompt('Number of action to run: ')
  switch (choice) {
    case '1':
        return createCustomer()
    case '2':
        return viewCustomer()
    case '3':
        return updateCustomer()
    case '4':
        return deleteCustomer()
    case '5':
        console.log('Exiting...')
        return mongoose.connection.close()
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
    customers.forEach(customer => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
    })
    mainMenu()
}