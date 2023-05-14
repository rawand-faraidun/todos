require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// routes
app.use(require('./routes/routes'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`running on http://localhost:${port}`))
