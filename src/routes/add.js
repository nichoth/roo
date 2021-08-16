import { html } from 'htm/react'
var TextInput = require('../text-input')
// eslint-disable-next-line
import React, { useState } from 'react';
// var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()
var SpinningButton = require('../button')

function Add ({ setRoute }) {
    var [resolving, setResolving] = useState(false)

    /* eslint-disable */
    function saveApplicant (ev) {
        ev.preventDefault()
        var req = {
            firstName: ev.target.elements['first-name'].value,
            lastName: ev.target.elements['last-name'].value,
            occupation: ev.target.elements['occupation'].value,
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
                    displayName="first name" pattern="[a-zA-Z]+"
                    title="Use letters only"
                />
            </div>

            <div>
                <${TextInput} required=${true} name="last-name"
                    displayName="last name" pattern="[a-zA-Z]+"
                    title="Use letters only"
                />
            </div>

            <div>
                <${TextInput} required=${true} name="occupation"
                    displayName="occupation"
                />
            </div>

            <div>
                <${TextInput} required=${true} name="ssn" maxLength="9"
                    displayName="social security number" minLength="9"
                    pattern="[0-9]+"
                />
            </div>

            <div className="item-controls add-controls">
                <${SpinningButton} type="reset" isSpinning=${false}>
                    Cancel
                <//>

                <${SpinningButton} type="submit" isSpinning=${resolving}>
                    Save
                </${SpinningButton}>
            </div>
        </form>

    </div>`

    /* eslint-enable */
}

module.exports = Add