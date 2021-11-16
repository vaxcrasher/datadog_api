
function getTimestamp() {
    d = new Date()
    return d.toISOString()
}

function info(msg) {
    t = getTimestamp()
    s = t + ' :: ' + msg
    console.log(s)
}

function warn(msg) {
    t = getTimestamp()
    s = t + ' :: ' + msg
    console.warn(s)
}

function error(msg) {
    t = getTimestamp()
    s = t + ' :: ' + msg
    console.error(s)
}

module.exports = { info, warn, error }