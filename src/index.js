import React, { useState } from 'react';
import ReactDOM from 'react-dom'
// import { html } from 'htm/react'
// var Bus = require('@nichoth/events')
// var subscribe = require('./subscribe')
// var router = require('./routes')
// var route = require('route-event')()
// var state = require("./state")

// var bus = Bus({ memo: true })
// subscribe(bus, state)

// function Connector () {
//     var [_state, setState] = useState(state())
//     var { path } = _state

//     // connect our `state` object to the component state
//     state(function onChange (newState) {
//         setState(newState)
//     })

//     // find which view to use for this path
//     var match = router.match(path)
//     if (!match) return null
//     var { view } = match.action(match)
//     var emit = bus.emit.bind(bus)

//     return html`<${view} ...${_state} emit=${emit}
//         setRoute=${route.setRoute}
//     />`
// }

// route(function onRoute (path) {
//     // we keep the route path as a part of state
//     // when we set the state here it causes a re-render
//     state.path.set(path)
// })

function test () {
    return <p>test</p>;
}

ReactDOM.render(React.createElement(test, {}, []),
    document.getElementById('content'))
// ReactDOM.render(html`<${Connector} />`, document.getElementById('content'))
