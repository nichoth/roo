var struct = require('observ-struct')
var observ = require('observ')

var state = struct({
    applicants: observ(null),
    path: observ('')
})

module.exports = state
