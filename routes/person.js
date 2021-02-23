const router = require('express').Router()

router.get('/', (req, res) => {

  // return all persons
  res.status(200).send('return list of people')
})

router.get('/:id', (req, res) => {

  // return single person
  res.status(200).send(`return person with: ${req.params.id}`)
})

router.post('/', (req, res) => {

  // return the newly added person 
  res.status(201).send(`saved person: ${req.body.firstName}`)
})

router.put('/:id', (req, res) => {

  // return updated person
  res.status(200).send(`updated: ${req.params.id} to: ${req.body.firstName}`)
})

router.delete('/:id', (req, res) => {

  // return successful delete
  res.status(200).send(`deleted person at: ${req.params.id}`)
})

module.exports = router