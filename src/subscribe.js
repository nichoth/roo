var evs = require('./EVENTS')

function subscribe (bus, state) {
    bus.on(evs.applicants.got, res => {
        state.applicants.set(res)
    })
}

module.exports = subscribe
