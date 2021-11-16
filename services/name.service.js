const express = require('express')
const fs = require('fs')
const lib = require('./lib')

// entropy value used for randomly generating errors. This MUST be at least 5!
const errorEntropy = 10

module.exports = { 
    // getName - reads a list of names and picks a first and last name from the list. Returns the data in JSON
    getName: (req, res) => {
        // read the file
        fileName = __dirname + '/data/names.txt'
        data = fs.readFileSync(fileName, 'utf8').toString().split('\n')
        
        // pick a first and last name from the array
        fnPos = lib.between(0, data.length - 1)
        lnPos = lib.between(0, data.length - 1)
        firstName = data[fnPos]
        lastName = data[lnPos]

        // build the return string
        const name = {
            "First": firstName,
            "Last": lastName,
            "Full": firstName + ' ' + lastName
        }

        // randomly cause an error based on errorEntropy (400, 403, 500, 503) or send a normal response
        errorStatus = lib.between(1, errorEntropy)
        switch (errorStatus) {
            case 1:
                return res.status(400).send("400 Bad Request")
            case 2:
                return res.status(403).send("403 Forbidden")
            case 3:
                return res.status(500).send("500 Server Error")
            case 4:
                return res.status(503).send("503 Server temporarily unavailable")
            default:
                return res.status(200).json({name: name})
        }
    }
}