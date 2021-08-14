import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useState } from 'react'

function connect (App, state, bus) {
    var emit = bus.emit.bind(bus)

    return function Connector () {
        var [_state, setState] = useState(state())

        state(function onChange (newState) {
            setState(newState)
        })

        return html`<div className="connector">
            <${App} ...${_state} emit=${emit} />
        </div>`
    }
}

module.exports = connect
