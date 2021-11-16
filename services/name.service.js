const express = require('express')

module.exports = { 
    getName: (req, res) => {
        const name = {
            "First": "First Name",
            "Last": "Last Name",
            "Full": "First Name Last Name"
        }

        return res.status(200).json({name: name})
    }
}