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
        fileName = __dirname + '/data/words.txt'
        data = fs.readFileSync(fileName, 'utf8').toString().split('\n')
        
        wordPos = lib.between(0, data.length - 1)
        word = data[wordPos]

        return word
}

function getSingleSentence() {
    wordCount = lib.between(2, 20)
    sentence = ""
    for (var i=1; i<= wordCount; i++) {
        sentence += (i == 1 ? "" : " ") + getSingleWord()
    }
    sentence += "."
    return sentence
}

function getSingleParagraph() {
    sentenceCount = lib.between(2, 10)
    paragraph = ""
    for (var i=1; i<= sentenceCount; i++) {
        paragraph += getSingleSentence()
        if (i > 1 && i < sentenceCount) {
            paragraph += " "
        }
    }
    return paragraph
}

function delayScript() {
    // add a random delay (times in ms)
    de = errorEntropy
    dm = delayMax
    d = new Date()
    if (d.getMinutes() < 7) {
        de = de / 3
        dm = dm * 3
    }
    delayStatus = lib.between(1, de)
    if (delayStatus == 1) {
        delayTime = lib.between(1000, dm)
        log.warn('Delaying for ' + delayTime + ' ms')
        lib.sleep(delayTime)
    }
}

function sendResponse(res, valueType, value) {
    // randomly cause an error based on errorEntropy (400, 403, 500, 503) or send a normal response
    // in the first 7 minutes of the hour this is 3x more likely to happen
    ee = errorEntropy
    d = new Date()
    if (d.getMinutes() < 7) {
        ee = ee / 3
    }
    errorStatus = lib.between(1, ee)
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
    },

    getSentence: (req, res) => {
        log.info('Getting sentence...')
        sentence = getSingleSentence()
        log.info(sentence)

        // delay the script
        delayScript()

        // send the response
        sendResponse(res, "sentence", sentence)
    },

    getParagraph: (req, res) => {
        log.info('Getting paragraph...')
        paragraph = getSingleParagraph()
        log.info(paragraph)

        // delay the script
        delayScript()

        // send the response
        sendResponse(res, "paragraph", paragraph)
    }
}