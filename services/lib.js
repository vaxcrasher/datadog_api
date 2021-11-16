
// return a random number between the min and max values
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

// sleep (note that this is a silly thing to do in JavaScript and is only here to artifically create slowdowns)
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// export functions
module.exports = { between, sleep }