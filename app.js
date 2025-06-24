// const dotenv =  require('dotenv')
// dotenv.config()

// const prompt =  require('prompt-sync')()
// const mongoose = require('mongoose')
// const Customer = require('./models/Customer')

// const choice = prompt('something')
// console.log(`here is ${choice}`)
// console.log('Starting app...')

// mongoose.connect(process.env.MONGODB_URI)

// function mainMenu() {
//   console.log('Inside mainMenu')  
//   console.log('\nWelcome to the CRM')
//   console.log('\nWhat would you like to do?')
//   console.log('\n  1. Create a customer')
//   console.log('  2. View all customers')
//   console.log('  3. Update a customer')
//   console.log('  4. Delete a customer')
//   console.log('  5. Quit\n')

//   const choice = prompt('Number of action to run: ')
//   console.log({choice}, 'from main')
//   doSomething(choice)
// }

// function doSomething (action) {
//   console.log({action})
//   switch (action) {
//     case '1':
//         createCustomer()
//     case '2':
//         viewCustomer()
//     case '3':
//         updateCustomer()
//     case '4':
//         deleteCustomer()
//     case '5':
//         console.log('Exiting...')
//         mongoose.connection.close()
//         return
//     default:
//         console.log('Invalid choice')
//         mainMenu()
//     }
// }

// async function createCustomer () {

//     const name = prompt("Enter customer's name: ")
//     const age = parseInt(prompt("Enter customer's age: "))
//     const newCustomer = new Customer({name, age})
//     await newCustomer.save()
//     console.log(`Added new customer: ${newCustomer.name}, Age: ${newCustomer.age}`)
//     mainMenu()
// }
// async function viewCustomer() {
//     const customers = await Customer.find()
//     console.log('\n Current customers:\n')
//     customers.forEach(customer => {
//         console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
//     })
//     mainMenu()
// }
// async function updateCustomer () {
//     await viewCustomer()
//     const id = prompt('\nPaste the id to update: ')
//     const name = prompt('New name: ')
//     const age = parseInt(prompt('New age: '))
//     await Customer.findByIdAndUpdate(id, {name, age})
//     console.log('\nCustomer updated!\n')
//     mainMenu()
// }

// async function deleteCustomer () {
//     await viewCustomer()
//     const id = prompt('\nPaste the id to delete: ')
//     await Customer.findByIdAndDelete(id)
//     console.log('\n Customer deleted.\n')
// mainMenu()
// }
// mainMenu()

const dotenv = require('dotenv')
dotenv.config()
const readline = require('readline')
const mongoose = require('mongoose')
const Customer = require('./models/Customer')


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


const prompt = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

console.log('Starting app...')
mongoose.connect(process.env.MONGODB_URI)

async function mainMenu() {
  console.log('Inside mainMenu')
  console.log('\nWelcome to the CRM')
  console.log('\nWhat would you like to do?')
  console.log('\n  1. Create a customer')
  console.log('  2. View all customers')
  console.log('  3. Update a customer')
  console.log('  4. Delete a customer')
  console.log('  5. Quit\n')
  
  const choice = await prompt('Number of action to run: ')
  console.log('You selected:', choice)
  await doSomething(choice)
}

async function doSomething(action) {
  switch (action) {
    case '1':
      await createCustomer()
      break
    case '2':
      await viewCustomer()
      break
    case '3':
      await updateCustomer()
      break
    case '4':
      await deleteCustomer()
      break
    case '5':
      console.log('Exiting...')
      await mongoose.connection.close()
      rl.close()
      return
    default:
      console.log('Invalid choice')
      await mainMenu()
  }
}

async function createCustomer() {
  const name = await prompt("Enter customer's name: ")
  const ageInput = await prompt("Enter customer's age: ")
  const age = parseInt(ageInput)
  
  const newCustomer = new Customer({name, age})
  await newCustomer.save()
  console.log(`Added new customer: ${newCustomer.name}, Age: ${newCustomer.age}`)
  await mainMenu()
}

async function viewCustomer() {
  const customers = await Customer.find()
  console.log('\n Current customers:\n')
  customers.forEach(customer => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })
  await mainMenu()
}

async function updateCustomer() {
  await viewCustomers()
  const id = await prompt('\nPaste the id to update: ')
  const name = await prompt('New name: ')
  const ageInput = await prompt('New age: ')
  const age = parseInt(ageInput)
  
  await Customer.findByIdAndUpdate(id, {name, age})
  console.log('\nCustomer updated!\n')
  await mainMenu()
}

async function deleteCustomer() {
  await viewCustomers()
  const id = await prompt('\nPaste the id to delete: ')
  await Customer.findByIdAndDelete(id)
  console.log('\n Customer deleted.\n')
  await mainMenu()
}


async function viewCustomers() {
  const customers = await Customer.find()
  console.log('\n Current customers:\n')
  customers.forEach(customer => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)
  })
}


mainMenu().catch(console.error)