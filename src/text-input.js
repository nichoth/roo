import { html } from 'htm/react'

function TextInput (props) {
    var { name, displayName, required } = props

    var cl = 'input-group' + (required ? ' required' : '')
    cl += ' ' + name

    return html`<div className="form-stuff">
        <div className="${cl}">
            <input name="${name}" type="text" placeholder=" "
                required=${props.required} minLength=${props.minlength ||
                    props.minLength}
                maxLength=${props.maxlength || props.maxLength}
                id="${name}"
            />
            <label htmlFor=${name}>${displayName}</label>
        </div>
    </div>`
}

module.exports = TextInput
