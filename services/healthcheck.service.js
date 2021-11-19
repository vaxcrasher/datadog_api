const express = require('express')
const fs = require('fs')
const lib = require('./lib')
const log = require('./log')

// health entropy
const healthEntropy = 100

// entropy value used for randomly generating errors. This MUST be at least 5!
const errorEntropy = 100

// entropy value used for randomly generating delays. This MUST be at least 2!
const delayEntropy = 100
const delayMax = 30000

module.exports = { 
    //getHealthCheck
    getHealthCheck: (req, res) => {
        log.info('Getting Health Check') 

        // health status
        he = healthEntropy
        d = new Date()
        if (d.getMinutes() < 7) {
            he = he / 1
        }
        health = lib.between(1, he)
        if (health < 5) {
            healthStatus = "Unhealthy"
        } 
        else if (health >= 5 && health < 10) {
            healthStatus = "Slightly Icky"
        }
        else {
            healthStatus = "Healthy"
        }

        // add a random delay (times in ms)
        delayStatus = lib.between(1, delayEntropy)
        if (delayStatus == 1) {
            delayTime = lib.between(1000, delayMax)
            log.warn('Delaying for ' + delayTime + ' ms')
            lib.sleep(delayTime)
        }

        // randomly cause an error based on errorEntropy (400, 403, 500, 503) or send a normal response
        errorStatus = lib.between(1, errorEntropy)
        if (errorStatus < 5) { 
            log.warn('errorStatus is less than 5 at ' + errorStatus)
        }
        switch (errorStatus) {
            case 1:
                log.error('400 Bad Request triggered by random error ' + errorStatus)
                return res.status(400).send("400 Bad Request")
            case 2:
                log.error('403 Forbidden triggered by random error ' + errorStatus)
                return res.status(403).send("403 Forbidden")
            case 3:
                log.error('500 Server Error triggered by random error ' + errorStatus)
                return res.status(500).send("500 Server Error")
            case 4:
                log.error('503 Server Temporarily Unavailable triggered by random error ' + errorStatus)
                return res.status(503).send("503 Server temporarily unavailable")
            default:
                return res.status(200).json({status: healthStatus})
        }
    }
}