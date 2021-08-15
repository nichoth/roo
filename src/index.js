// eslint-disable-next-line
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { html } from 'htm/react'
var struct = require('observ-struct')
var observ = require('observ')
var Bus = require('@nichoth/events')
var subscribe = require('./subscribe')
var router = require('./routes')
var route = require('route-event')()

var bus = Bus({ memo: true })

var state = struct({
    applicants: observ([]),
    path: observ('/')
})

subscribe(bus, state)

function Connector () {
    var [_state, setState] = useState(state())
    var { path } = _state

    state(function onChange (newState) {
        setState(newState)
    })

    var match = router.match(path)
    var { view } = match.action(match)
    var emit = bus.emit.bind(bus)

    return html`<div className="connector">
        <${view} ...${_state} emit=${emit} setRoute=${route.setRoute} />
    </div>`
}

route(function onRoute (path) {
    console.log('route', path)
    state.path.set(path)
})

ReactDOM.render(html`<${Connector} />`, document.getElementById('content'))
