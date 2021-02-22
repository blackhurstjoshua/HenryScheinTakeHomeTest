const express = require('express')
const app = express()




app.get('/', (req, res) => {
  res.status(200).send("Listening on port: 3000")
})


app.listen(3000)