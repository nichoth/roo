import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
var evs = require('../EVENTS')
var backend = require('../backend')
var Trash = require('../trash')
var Button = require('../button')
var api = backend()

function Dash ({ applicants, emit }) {
    useEffect(() => {
        api.getApplicants()
            .then(res => {
                emit(evs.applicants.got, res)
            })
    }, [])

    var [confirmDel, setConfirmDel] = useState([false])
    var [isDeleting, setIsDeleting] = useState(false)

    if (!applicants) {
        return html`<div className="dashboard waiting">
            <h1>Applicants</h1>
            <ul>
                <li className="placeholder"></li>
            </ul>
        </div>`
    }

    function del (i) {
        return function (ev) {
            ev.preventDefault()
            document.body.classList.toggle('modal-open')
            setConfirmDel([true, i])
        }
    }

    // ---------- close the modal ------------------------
    function cancelModalConfirm () {
        document.body.classList.toggle('modal-open')
        setConfirmDel([false])
    }

    function reallyDeleteApplicant (index) {
        return function (ev) {
            ev.preventDefault()
            setIsDeleting(true)
            api.remove(index)
                .then(res => {
                    emit(evs.applicants.got, res)
                    document.body.classList.toggle('modal-open')
                    setIsDeleting(false)
                    setConfirmDel([false])
                })
        }
    }
    // ---------- /close the modal ------------------------

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

        ${confirmDel[0] ?
            // confirmDel[1] is the index
            // confirmDel[0] is boolean -- are we showing the confirm modal?
            html`<${ConfirmDelModal}
                    applicant=${applicants[confirmDel[1]]}
                    onCancel=${cancelModalConfirm}
                    onDelete=${reallyDeleteApplicant(confirmDel[1])}
                    isDeleting=${isDeleting}
                />` :
                null
        }
        
        <ul>
            ${applicants.map((applicant, i) => {
                // this is for a weird bug where we remove applicant 3 from
                // memory, but react re-renders before it has been removed
                // from the application state... meaning you get an error
                // 'cannot read firstName of undefined'
                // I think it's unlikely this would happen in real life b/c
                // there is more latency between network requests & re-renders
                if (!applicant) return null

                return html`<li className="applicant" key=${i}>
                    <${Fields} applicant=${applicant} />

                    <div className="applicant-controls">
                        <a href="/update/${i}" className="edit-pencil"
                            title="edit"
                        >
                            ✏
                        </a>
                        <${Trash} className=${'trash-btn'}
                            onClick=${del(i)}
                            title=${'delete applicant'}
                            index=${i}
                        />
                    </div>
                </li>`
            })}
        </ul>

    </div>`
    /* eslint-enable */
}

function Fields ({ applicant }) {
    if (!applicant) return null
    return html`<div>
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
    </div>`
}

function ConfirmDelModal ({ applicant, onCancel, onDelete, isDeleting }) {
    function cancelDel (ev) {
        ev.preventDefault()
        onCancel(applicant)
    }

    return html`<div className="confirm-modal">
        <div>
            <h2>Delete applicant?</h2>

            <hr />

            <${Fields} applicant=${applicant} />

            <div className="modal-controls">
                <div>
                    <${Button} className="cancel-delete" onClick=${cancelDel}>
                        Cancel
                    <//>
                    <${Button} className="really-delete" onClick=${onDelete}
                        isSpinning=${isDeleting}
                    >
                        Delete
                    <//>
                </div>
            </div>
        </div>
    </div>`
}

module.exports = Dash
