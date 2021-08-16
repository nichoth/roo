import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
// var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()
var TextInput = require('../text-input')
var SpinningButton = require('../button')

function updateRoute (index) {

    return function Update ({ setRoute, applicants, emit }) {

        var [resolving, setResolving] = useState(false)
        var [applicant, setApplicant] = useState(null)

        // fetch the applicant here in case the applicants are not loaded
        // into application state
        useEffect(function () {
            api.getIndex(index)
                .then(res => {
                    setApplicant(res)
                })
                .catch(err => {
                    console.log('todo -- show errors in the UI', err)
                })
        }, [])

        function reset () {
            setRoute('/')
        }

        function updateApplicant (ev) {
            ev.preventDefault()
            var req = {
                firstName: ev.target.elements['first-name'].value,
                lastName: ev.target.elements['last-name'].value,
                occupation: ev.target.elements['occupation'].value,
                ssn: ev.target.elements['ssn'].value,
            }

            setResolving(true)

            api.update(index, req)
                .then(res => {
                    setResolving(false)
                    setRoute('/')
                })
                .catch(err => {
                    // TODO: show error
                    console.log('todo -- show errors', err)
                    setResolving(false)
                })
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
                        title="Use letters only" pattern="[a-zA-Z]+"
                    />
                </div>

                <div>
                    <${TextInput} required=${true} name="last-name"
                        displayName="last name" value=${applicant.lastName}
                        title="Use letters only" pattern="[a-zA-Z]+"
                    />
                </div>

                <div>
                    <${TextInput} required=${true} name="occupation"
                        displayName="occupation" value=${applicant.occupation}
                    />
                </div>

                <div>
                    <${TextInput} required=${true} name="ssn"
                        displayName="social security number"
                        value=${applicant.ssn} pattern="[0-9]+"
                        title="9 digit number"
                    />
                </div>

                <div className="item-controls update-controls">
                    <${SpinningButton} type="reset" isSpinning=${false}>
                        Cancel
                    </${SpinningButton}>

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
