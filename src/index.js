// eslint-disable-next-line
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { html } from 'htm/react'
var struct = require('observ-struct')
var observ = require('observ')
var Bus = require('@nichoth/events')
var subscribe = require('./subscribe')
var connect = require('./connect')
var router = require('./routes')

var route = require('route-event')()

var bus = Bus({ memo: true })

var state = struct({
    applicants: observ([])
})

subscribe(bus, state)

route(function onRoute (path) {
    console.log('route', path)
    var match = router.match(path)
    var { view } = match.action(match)
    ReactDOM.render(html`<${connect(view, state, bus)} />`,
        document.getElementById('content'))
})
