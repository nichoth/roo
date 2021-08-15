import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()

function Add ({ applicants, emit }) {

    /* eslint-disable */
    // return html`<div className="add">
    //     add a person
    // </div>`
    function saveApplicant (ev) {
        ev.preventDefault()
        var vals = ['first-name', 'last-name', 'job', 'ssn']
            .reduce((acc, val) => {
                acc[val] = (ev.target.elements[val] &&
                    ev.target.elements[val].value)
                return acc
            }, {})

        console.log('save', vals)
        console.log('value', ev.target.elements['first-name'].value)
    }

    return html`<div className="new-applicant">

        <form onSubmit=${saveApplicant} className="add-app-form">
            <label htmlFor="first-name">First name</label>
            <input type="text" name="first-name" id="first-name" />
            <div className="add-controls">
                <button type="reset">Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>

    </div>`

    /* eslint-enable */
}

module.exports = Add