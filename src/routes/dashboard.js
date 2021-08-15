import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var api = backend()

function Dash ({ applicants, emit }) {
    useEffect(() => {
        api.getApplicants()
            .then(res => {
                emit(evs.applicants.got, res)
            })
    }, [])

    if (!applicants) {
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
        <header>
            <h1>Applicants</h1>

            <div className="controls">
                <a href="/add" className="add-btn"
                    title="add applicant"
                >
                    +
                </a>
            </div>
        </header>
        
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

                    <div className="applicant-controls">
                        <a href="/update/${i}" className="edit-pencil"
                            title="edit"
                        >
                            ✏
                        </a>
                    </div>
                </li>`
            })}
        </ul>

    </div>`
    /* eslint-enable */
}

module.exports = Dash
