const express = require('express')
const router = express.Router()

const healthcheckService = require('../services/healthcheck.service')

router.get('/', healthcheckService.getHealthCheck)

module.exports = router