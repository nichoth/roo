import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
var backend = require('../backend')
var api = backend()
var ApplicantForm = require('../applicant-form')
// var TextInput = require('../text-input')
// var SpinningButton = require('../button')

function updateRoute (index) {

    return function Update ({ setRoute }) {
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
                .then(() => {
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
            <${ApplicantForm} resolving=${resolving} applicant=${applicant}
                onSubmit=${updateApplicant} onReset=${reset}
            />
        </div>`
        /* eslint-enable */
    }
}

module.exports = updateRoute
