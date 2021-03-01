const router = require('express').Router()
const Person = require('../models/Person')
const { findPerson, findIndex, validSocial } = require('../utils/helpers')
const { BadRequest, GeneralError } = require('../utils/errors')

// Database
let persons = []

// Preload variables ========================
let testPerson1 = new Person('Alice', 'Wonderland', '07/26/1951', 'wonderland.alice@gmail.com', '072-61-1951')
let testPerson2 = new Person('Jack', 'Dexter', '11/03/2009', 'dexter.jack@gmail.com', '113-03-2009')
let testPerson3 = new Person('Rachet', 'Clank', '11/04/2002', 'clank.rachet@gmail.com', '114-04-2002')
let testPerson4 = new Person('Geralt', 'Rivia', '05/19/2015', 'rivia.geralt@gmail.com', '505-19-2015')
persons.push(testPerson1, testPerson2, testPerson3, testPerson4)


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
    let valid = validSocial(req.params.id, persons)
    if (!valid)
      throw new BadRequest('Invalid social security number')

    let person = findPerson(req.params.id, persons)
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
    if (findIndex(soc, persons) > -1)
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
    let validSoc = validSocial(req.params.id)
    if (!validSoc)
      throw new BadRequest('Invalid social security number')

    let personToChange = findPerson(req.params.id, persons)
    let index = findIndex(req.params.id, persons)
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

    let index = findIndex(req.params.id, persons)
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
