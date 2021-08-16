var test = require('tape')
var state = require('../src/state')
var Bus = require('@nichoth/events')
var subscribe = require('../src/subscribe')
var evs = require('../src/EVENTS')

var bus = Bus({ memo: true })
subscribe(bus, state)
// the application state is now connected to the event bus

test('example test', t => {
    t.equal(state.applicants(), null, 'should start with null applicants')
    var apps = { firstName: 'a', lastName: 'b', ssn: '123', occupation: 'c'}
    bus.emit(evs.applicants.got, [
        // list of applicants here
        apps
    ])
    t.equal(state.applicants().length, 1, 'should update the state')
    t.end()
})
