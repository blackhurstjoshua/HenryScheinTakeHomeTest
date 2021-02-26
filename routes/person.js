const router = require('express').Router()
const { BadRequest } = require('../utils/errors')




//  ! IMPORTANT: Review article on creating an error handling middleware!!!






// Todo: Consider catching an invalid leap day birthday.
// let dateObj = new Date()
// console.log(dateObj)

let persons = []
class Person {
  constructor(firstName, lastName, dateOfBirth, emailAddress, socialSecurityNumber) {
    this.firstName = firstName
    this.lastName = lastName
    this.dateOfBirth = dateOfBirth
    this.emailAddress = emailAddress
    this.socialSecurityNumber = socialSecurityNumber
  }
}

function findPerson(key) {
  let person = persons.find((per, index) => {
    if (per.socialSecurityNumber == key)
      return true
  })
  return person
}

function findIndex(key) {
  let index = persons.findIndex((per, index) => {
    if (per.socialSecurityNumber == key)
      return true
  })
  return index
}

// ROUTES ==============================

// ? Get (needs final check)
router.get('/', (req, res) => {
  try {
    if (!persons.length)
      throw('persons array is empty')
    res.status(200).json(persons)
  } catch(err) {
    res.status(500).send(`Unknown server side error: ${err}`)
  }
})

// ? Get one (needs final check)
router.get('/:id', (req, res) => {
  try {
    let person = findPerson(req.params.id)
    if (!person)
      throw(`Person at ${req.params.id} does not exist`)
    res.status(200).json(person)
  } catch(err) {
    res.status(400).json(err)
  }
})

// ? Add new (field error handling and strict class usage : don't allow for duplicate person)
router.post('/', async (req, res) => {
  try {
    let soc = req.body.socialSecurityNumber
    if (findIndex(soc) >= 0)
      throw new BadRequest('User already exists')

    let newPerson = await new Person(
      req.body.firstName,
      req.body.lastName,
      req.body.dateOfBirth,
      req.body.emailAddress,
      req.body.socialSecurityNumber
    )

    if (!newPerson.firstName)
      throw new BadRequest('Missing first name')
    persons.push(newPerson)
    return res.status(201).json(newPerson)
  } catch (err) {
    return res.status(400).send(err)
  }
})

// ? Put
router.put('/:id', async (req, res) => {
  try {
    /*
    Todo: 0. Make sure the social is not being changed, and that the fields are correct.
    *Todo: 1. Find the person and index. 
    *Todo: 2. Replace values (either individually or the whole thing). 
    *Todo: 3. Place the updated data where the old data was
    */
    let personToChange = findPerson(req.params.id)
    let index = findIndex(req.params.id)
    let newPerson = await new Person(
      req.body.firstName,
      req.body.lastName,
      req.body.dateOfBirth,
      req.body.emailAddress,
      personToChange.socialSecurityNumber
    )
    persons.splice(index,1, newPerson)
    
    res.status(200).json(newPerson)
  } catch(err) {

  }
  
})

// ? Delete (needs final check)
router.delete('/:id', (req, res) => {
  try {
    let index = findIndex(req.params.id)
    if(index < 0)
      throw(`Could not find person with ${req.params.id} social.`)
    persons.splice(index, 1)
    res.status(200).send(`Person with ${req.params.id} social, has been deleted.`)
  } catch(err) {
    res.status(400).send(err)
  }

})

module.exports = router



// Preload variables ========================
let testPerson1 = new Person('Alice', 'Wonderland', '07/26/1951', 'wonderland.alice@gmail.com', '072-61-1951')
let testPerson2 = new Person('Jack', 'Dexter', '11/03/2009', 'dexter.jack@gmail.com', '113-03-2009')
let testPerson3 = new Person('Rachet', 'Clank', '11/04/2002', 'clank.rachet@gmail.com', '114-04-2002')
let testPerson4 = new Person('Geralt', 'Rivia', '05/19/2015', 'rivia.geralt@gmail.com', '505-19-2015')
persons.push(testPerson1, testPerson2, testPerson3, testPerson4)
