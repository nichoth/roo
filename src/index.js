import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { html } from 'htm/react'
var struct = require('observ-struct')
var observ = require('observ')
var Bus = require('@nichoth/events')
var subscribe = require('./subscribe')
var evs = require('./EVENTS')
var connect = require('./connect')
var backend = require('./backend')
var api = backend()

var bus = Bus({ memo: true })

var state = struct({
    applicants: observ([])
})

subscribe(bus, state)

ReactDOM.render(html`<${connect(Dash, state, bus)} />`,
    document.getElementById('content'))

function Dash ({ applicants, emit }) {
    console.log('applicants in here', applicants)

    useEffect(() => {
        api.getApplicants()
            .then(res => {
                emit(evs.applicants.got, res)
            })
    }, [])

    if (applicants.length === 0) {
        return html`<div className="dashboard waiting">
            <h1>Applicants</h1>
            <ul>
                <li className="placeholder">
                    waiting...
                </li>
            </ul>
        </div>`
    }

    // { firstName: 'one', lastName: 'one-last-name', occupation: 'bla',
    //     ssn: '123' }
    return html`<div className="dashboard">
        <h1>Applicants</h1>
        <ul>
            ${applicants.map((applicant, i) => {
                return html`<li className="applicant" key=${i}>
                    <div className="applicant-info name">
                        <div className="field">Name</div>
                        ${applicant.firstName + ' ' + applicant.lastName}
                    </div>
                    <div className="applicant-info occupation">
                        <div className="field">Occupation</div>
                        ${applicant.occupation}
                    </div>
                    <div className="applicant-info ssn">
                        <div className="field">Social Security Number</div>
                        ${applicant.ssn}
                    </div>
                </li>`
            })}
        </ul>
    </div>`
}
