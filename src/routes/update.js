import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()
var TextInput = require('../text-input')
var SpinningButton = require('../button')

function updateRoute (index) {

    function updateApplicant (ev) {
        ev.preventDefault()
    }

    return function Update ({ setRoute, applicants, emit }) {

        var [resolving, setResolving] = useState(false)
        var [applicant, setApplicant] = useState(null)

        console.log('state here', applicant)

        // fetch the applicant here in case the applicants are not loaded
        // into application state
        useEffect(function () {
            api.getIndex(index)
                .then(res => {
                    setApplicant(res)
                    console.log('res', res)
                })
                .catch(err => {
                    console.log('errrrr', err)
                })
        }, [])

        function reset () {
            setRoute('/')
        }

        if (!applicant) return null

        /* eslint-disable */
        return html`<div className="update-applicant">
            <form onSubmit=${updateApplicant} className="update-app-form"
                onReset=${reset}
            >
                <div>
                    <${TextInput} required=${true} name="first-name"
                        displayName="first name" value=${applicant.firstName}
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

                <div className="update-controls">
                    <button type="reset">Cancel</button>

                    <${SpinningButton} type="submit" isSpinning=${resolving}>
                        Save
                    </${SpinningButton}>
                </div>
            </form>

        </div>`
        /* eslint-enable */
    }
}

module.exports = updateRoute
