const router = require('express').Router()
const { BadRequest, GeneralError } = require('../utils/errors')

// ! IMPORTANT: Consider checking for if(index < 0) instead of if(index > -1)
// ! IMPORTANT: MAKE IT LOOK NICE. Double check spacing, quotes, and semicolons.
// Todo: Move person class and functions into seperate folders.
// Todo: Check over document and requirements one more time.

let persons = []
class Person {
  constructor(firstName, lastName, dateOfBirth, emailAddress, socialSecurityNumber) {
    this.firstName = firstName
    this.lastName = lastName
    this.dateOfBirth = new Date(dateOfBirth)
    this.emailAddress = emailAddress
    this.socialSecurityNumber = socialSecurityNumber
  }

  validate() {
    let letters = /^[a-zA-Z]+$/
    let socials = /^(\d{3}-\d{2}-\d{4})+$/
    console.log(socials.test(this.socialSecurityNumber))

    if (this.firstName && this.lastName && this.dateOfBirth && this.emailAddress && this.socialSecurityNumber) {
      if (letters.test(this.firstName) && letters.test(this.lastName)) {
        if (this.dateOfBirth != "Invalid Date") {
          if (this.emailAddress.indexOf('@') > -1) {
            if (socials.test(this.socialSecurityNumber))
              return true
          }
        }
      }
    }
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

function validSocial(key) {
  let socials = /^(\d{3}-\d{2}-\d{4})+$/
  return socials.test(key)
}

// ROUTES ==============================

// * Get
router.get('/', (req, res, next) => {
  try {
    if (!persons.length)
    throw new GeneralError('Persons array is empty.')
    res.status(200).json(persons)
  } catch(err) {
    next(err)
  }
})

// * Get One
router.get('/:id', (req, res, next) => {
  try {
    let valid = validSocial(req.params.id)
    console.log(valid)
    if (!valid)
      throw new BadRequest('Invalid social security number')

    let person = findPerson(req.params.id)
    if (!person)
      throw new BadRequest(`Person at ${req.params.id} does not exist`)

    res.status(200).json(person)
  } catch(err) {
    next(err)
  }
})

// * Add new
router.post('/', async (req, res, next) => {
  try {
    let soc = req.body.socialSecurityNumber
    if (findIndex(soc) > -1)
      throw new BadRequest('User already exists')
    
    let newPerson = await new Person(
      req.body.firstName,
      req.body.lastName,
      req.body.dateOfBirth,
      req.body.emailAddress,
      req.body.socialSecurityNumber
    )
      
    // ? Validate newPerson (consider return specific feedback)
    let valid = newPerson.validate()
    if (!valid)
      throw new BadRequest("Invalid person syntax")
      
    persons.push(newPerson)
    return res.status(201).json(newPerson)
  } catch (err) {
    next(err)
  }
})
  
// * Put
router.put('/:id', async (req, res, next) => {
  try {
    /*
    *Todo: 1. Find the person and index. 
    *Todo: 2. Replace values (either individually or the whole thing). 
    *Todo: 3. Place the updated data where the old data was
    */

    let validSoc = validSocial(req.params.id)
    if (!validSoc)
      throw new BadRequest('Invalid social security number')

    let personToChange = findPerson(req.params.id)
    let index = findIndex(req.params.id)
    let newPerson = await new Person(
      req.body.firstName,
      req.body.lastName,
      req.body.dateOfBirth,
      req.body.emailAddress,
      personToChange.socialSecurityNumber
    )

    let valid = newPerson.validate()
    if (!valid)
      throw new BadRequest("Invalid person syntax")

    persons.splice(index, 1, newPerson)
    res.status(200).json(newPerson)
  } catch(err) {
    next(err)
  }  
})
    
// ? Delete (error handling one more time)
router.delete('/:id', (req, res, next) => {
  try {
    let valid = validSocial(req.params.id)
    if (!valid)
      throw new BadRequest('Invalid social security number')

    let index = findIndex(req.params.id)
    if(index < 0)
      throw new BadRequest('User does not exist')
    
    persons.splice(index, 1)
    res.status(200).json({
      status: "200",
      message: `Person with ${req.params.id} social, has been deleted.`
    })
  } catch(err) {
    next(err)
  }
})
    
module.exports = router



// Preload variables ========================
let testPerson1 = new Person('Alice', 'Wonderland', '07/26/1951', 'wonderland.alice@gmail.com', '072-61-1951')
let testPerson2 = new Person('Jack', 'Dexter', '11/03/2009', 'dexter.jack@gmail.com', '113-03-2009')
let testPerson3 = new Person('Rachet', 'Clank', '11/04/2002', 'clank.rachet@gmail.com', '114-04-2002')
let testPerson4 = new Person('Geralt', 'Rivia', '05/19/2015', 'rivia.geralt@gmail.com', '505-19-2015')
persons.push(testPerson1, testPerson2, testPerson3, testPerson4)








// GRAVEYARD =========================================
/*
console.log(letters.test(this.firstName))
console.log(letters.test(this.lastName))
console.log(this.dateOfBirth)
console.log(this.emailAddress.indexOf('@'))
console.log(socials.test(this.socialSecurityNumber))
console.log('----')
*/