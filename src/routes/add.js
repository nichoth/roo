import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()

function Add ({ applicants, emit }) {

    /* eslint-disable */
    return html`<div className="add">
        add a person
    </div>`
    /* eslint-enable */
}

module.exports = Add