import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()

function updateRoute (index) {

    return function Update ({ applicants, emit }) {

        /* eslint-disable */
        return html`<div className="update">
            update ${index}
        </div>`
        /* eslint-enable */
    }
}

module.exports = updateRoute
