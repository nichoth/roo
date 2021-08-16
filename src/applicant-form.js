// eslint-disable-next-line
var React = require('react')
var TextInput = require('./text-input')
var SpinningButton = require('./button')

function ApplicantForm (props) {
    var resolving = props.resolving
    var { applicant, onSubmit, onReset } = props
    applicant = applicant || {}

    /* eslint-disable */
    return <form onSubmit={onSubmit} className="update-app-form"
        onReset={onReset}
    >
        <div>
            <TextInput required={true} name="first-name"
                displayName="first name" value={applicant.firstName || ''}
                title="Use letters only" pattern="[a-zA-Z]+"
            />
        </div>

        <div>
            <TextInput required={true} name="last-name"
                displayName="last name" value={applicant.lastName || ''}
                title="Use letters only" pattern="[a-zA-Z]+"
            />
        </div>

        <div>
            <TextInput required={true} name="occupation"
                displayName="occupation" value={applicant.occupation || ''}
            />
        </div>

        <div>
            <TextInput required={true} name="ssn"
                displayName="social security number"
                value={applicant.ssn || ''} pattern="[0-9]+"
                title="9 digit number"
            />
        </div>

        <div className="item-controls update-controls">
            <SpinningButton type="reset" isSpinning={false} key={0}>
                Cancel
            </SpinningButton>

            <SpinningButton type="submit" isSpinning={resolving} key={1}>
                Save
            </SpinningButton>
        </div>
    </form>
    /* eslint-enable */
}

module.exports = ApplicantForm
