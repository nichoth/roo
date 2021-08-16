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
                    console.log('done updating', res)
                    setResolving(false)
                    setRoute('/')
                })
                .catch(err => {
                    // TODO: show error
                    console.log('errrrr', err)
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
                    />
                </div>

                <div>
                    <${TextInput} required=${true} name="last-name"
                        displayName="last name" value=${applicant.lastName}
                    />
                </div>

                <div>
                    <${TextInput} required=${true} name="occupation"
                        displayName="occupation" value=${applicant.occupation}
                        title="Use letters only"
                    />
                </div>

                <div>
                    <${TextInput} required=${true} name="ssn"
                        displayName="social security number"
                        value=${applicant.ssn}
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
