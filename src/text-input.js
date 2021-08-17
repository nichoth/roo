// eslint-disable-next-line
var React = require('react')

function TextInput (props) {
    var { name, displayName, required, requirements } = props

    var cl = 'input-group' + (required ? ' required' : '')
    cl += ' ' + name

    var _props = {...props}
    delete _props.value
    delete _props.displayName
    delete _props.requirements

    return <div className="form-stuff">
        <div className={cl}>
            <input {..._props} defaultValue={props.value} name={name}
                type='text' placeholder=" "
                required={props.required} minLength={props.minlength ||
                    props.minLength}
                maxLength={props.maxlength || props.maxLength}
                id={name}
            />
            <label htmlFor={name}>{displayName}</label>
            {requirements ?
                <div className="requirements">{requirements}</div> :
                null
            }
        </div>
    </div>
}

module.exports = TextInput
