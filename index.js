const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

module.exports = app

// add the 'name' route
const name = require('./routes/name')
app.use('/name', name)

// add the 'word' route
const word = require('./routes/word')
app.use('/word', word)

// add the 'sentence' route
const sentence = require('./routes/sentence')
app.use('/sentence', sentence)

// add the 'pargraph' route
const paragraph = require('./routes/paragraph')
app.use('/paragraph', paragraph)

// add the 'healthcheck' route
const healthcheck = require('./routes/healthcheck')
app.use('/healthcheck', healthcheck)