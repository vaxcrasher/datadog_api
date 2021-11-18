const express = require('express')
const router = express.Router()

const wordsService = require('../services/words.service')

router.get('/', wordsService.getSentence)

module.exports = router