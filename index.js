const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

module.exports = app

// add the 'name' route
const name = require('./routes/name')
app.use('/name', name)