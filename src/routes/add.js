import { html } from 'htm/react'
var TextInput = require('../text-input')
// eslint-disable-next-line
import React, { useState } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()
var SpinningButton = require('../button')

function Add ({ setRoute }) {
    var [resolving, setResolving] = useState(false)

    /* eslint-disable */
    // return html`<div className="add">
    //     add a person
    // </div>`
    function saveApplicant (ev) {
        ev.preventDefault()
        var req = {
            firstName: ev.target.elements['first-name'].value,
            lastName: ev.target.elements['last-name'].value,
            occupation: ev.target.elements['job'].value,
            ssn: ev.target.elements['ssn'].value,
        }

        setResolving(true)

        api.add(req)
            .then(res => {
                setResolving(false)
                setRoute('/')
            })
            .catch(err => {
                // TODO: show error
                console.log('errrrr', err)
                setResolving(false)
            })
    }

    function reset () {
        // clear the form and navigate back home
        setRoute('/')
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

            <div>
                <${TextInput} required=${true} name="last-name"
                    displayName="last name"
                />
            </div>

            <div>
                <${TextInput} required=${true} name="job"
                    displayName="job"
                />
            </div>

            <div>
                <${TextInput} required=${true} name="ssn"
                    displayName="social security number"
                />
            </div>

            <div className="item-controls add-controls">
                <button type="reset">Cancel</button>

                <${SpinningButton} type="submit" isSpinning=${resolving}>
                    Save
                </${SpinningButton}>
            </div>
        </form>

    </div>`

    /* eslint-enable */
}

module.exports = Add