const express = require('express')
const router = express.Router()

const wordsService = require('../services/words.service')

router.get('/', wordsService.getWord)

module.exports = router