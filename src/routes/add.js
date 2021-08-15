import { html } from 'htm/react'
// var TextInput = require('@nichoth/forms/src/text-input')
var TextInput = require('../text-input')
// eslint-disable-next-line
import React, { useEffect } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()

function Add ({ emit, setRoute }) {

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

    function reset (ev) {
        // uncomment to go back to dashboard
        // setRoute('/')
    }

    return html`<div className="new-applicant">
        <form onSubmit=${saveApplicant} className="add-app-form"
            onReset=${reset}
        >
            <div>
                <${TextInput} required=${true} name="first-name"
                    displayName="first name"
                />
            </div>

            <div className="add-controls">
                <button type="reset">Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>

    </div>`

    /* eslint-enable */
}

module.exports = Add