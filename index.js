const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('welcome')
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

