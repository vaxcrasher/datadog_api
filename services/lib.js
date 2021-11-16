
// return a random number between the min and max values
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

// export functions
module.exports = { between }