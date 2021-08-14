var namespace = require('@nichoth/events/namespace')

var evs = namespace({
    count: ['inc', 'dec'],
    applicants: ['got']
})

module.exports = evs
