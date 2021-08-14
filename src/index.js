// eslint-disable-next-line
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
                <li className="placeholder"></li>
            </ul>
        </div>`
    }

    // { firstName: 'one', lastName: 'one-last-name', occupation: 'bla',
    //     ssn: '123' }
    /* eslint-disable */
    return html`<div className="dashboard">
        <h1>Applicants</h1>
        <ul>
        ${applicants.map((applicant, i) => {
            return html`<li className="applicant" key=${i}>
                <div>
                    <div className="applicant-info-field name">
                        <div className="field">Name</div>
                        ${applicant.firstName + ' ' + applicant.lastName}
                    </div>
                    <div className="applicant-info-field occupation">
                        <div className="field">Occupation</div>
                        ${applicant.occupation}
                    </div>
                    <div className="applicant-info-field ssn">
                        <div className="field">Social Security Number</div>
                        <div className="value">
                            ${applicant.ssn}
                        </div>
                    </div>
                </div>

                <a href="/update/${i}" className="edit-pencil"
                    title="edit"
                >
                    ✏
                </a>
            </li>`
        })}
        </ul>
    </div>`
    /* eslint-enable */
}
