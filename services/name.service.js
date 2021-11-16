const express = require('express')
const fs = require('fs')
const lib = require('./lib')

module.exports = { 
    getName: (req, res) => {
        fileName = __dirname + '/data/names.txt'
        data = fs.readFileSync(fileName, 'utf8').toString().split('\n')
        
        fnPos = lib.between(0, data.length - 1)
        lnPos = lib.between(0, data.length - 1)

        firstName = data[fnPos]
        lastName = data[lnPos]
        const name = {
            "First": firstName,
            "Last": lastName,
            "Full": firstName + ' ' + lastName
        }

        return res.status(200).json({name: name})
    }
}