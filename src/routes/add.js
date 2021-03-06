// eslint-disable-next-line
var React = require('react')
var { useState } = require('react')
var backend = require('../backend')
var api = backend()
var ApplicantForm = require('../applicant-form')

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

    return <div className="new-applicant">
        <ApplicantForm resolving={resolving} applicant={null}
            onSubmit={saveApplicant} onReset={reset}
        />
    </div>
    /* eslint-enable */
}

module.exports = Add
