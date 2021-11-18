const express = require('express')
const fs = require('fs')
const lib = require('./lib')
const log = require('./log')

// entropy value used for randomly generating errors. This MUST be at least 5!
const errorEntropy = 100

// entropy value used for randomly generating delays. This MUST be at least 2!
const delayEntropy = 100
const delayMax = 30000

function getSingleWord() {
        // read the file
        fileName = __dirname + '/data/words.txt'
        data = fs.readFileSync(fileName, 'utf8').toString().split('\n')
        
        // pick a first and last name from the array
        wordPos = lib.between(0, data.length - 1)
        word = data[wordPos]
        log.info('Word pos: ' + wordPos)

        // return the word
        return word
}

function getSingleSentence() {

}

function getSingleParagraph() {

}

function delayScript() {
    // add a random delay (times in ms)
    delayStatus = lib.between(1, delayEntropy)
    if (delayStatus == 1) {
        delayTime = lib.between(1000, delayMax)
        log.warn('Delaying for ' + delayTime + ' ms')
        lib.sleep(delayTime)
    }
}

function sendResponse(res, valueType, value) {
    // randomly cause an error based on errorEntropy (400, 403, 500, 503) or send a normal response
    errorStatus = lib.between(1, errorEntropy)
    if (errorStatus < 5) { 
        log.warn(valueType + ': errorStatus is less than 5 at ' + errorStatus)
    }
    switch (errorStatus) {
        case 1:
            log.error(valueType + ': 400 Bad Request triggered by random error ' + errorStatus)
            return res.status(400).send("400 Bad Request")
        case 2:
            log.error(valueType + ': 403 Forbidden triggered by random error ' + errorStatus)
            return res.status(403).send("403 Forbidden")
        case 3:
            log.error(valueType + ': 500 Server Error triggered by random error ' + errorStatus)
            return res.status(500).send("500 Server Error")
        case 4:
            log.error(valueType + ': 503 Server Temporarily Unavailable triggered by random error ' + errorStatus)
            return res.status(503).send("503 Server temporarily unavailable")
        default:
            return res.status(200).json({value: value})
    }
}

module.exports = { 
    // getWord - reads a list of names and picks a first and last name from the list. Returns the data in JSON
    getWord: (req, res) => {
        log.info('Getting word...') 
        word = getSingleWord()
        log.info(word)

        // delay script
        delayScript()

        // send the response
        sendResponse(res, "word", word)
    }


}