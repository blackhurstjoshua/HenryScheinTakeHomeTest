const express = require('express')
const app = express()

const handleErrors = require('./middleware/handleErrors')
const bodyparser = require('body-parser')

// Routes
const personRoute = require('./routes/person')

// Middleware
app.use(bodyparser.json())

app.use('/person', personRoute)
app.use(handleErrors)


// app.get('/', (req, res) => {
//   res.status(200).send('Listening on port: 3000')
// })


app.listen(3000)