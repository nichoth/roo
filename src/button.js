import { html } from 'htm/react'

function SpinningButton (props) {
    var { isSpinning } = props
    var _props = {...props}
    delete _props.isSpinning

    return html`<span className="form-stuff">
        ${isSpinning ?
            html`<button ...${_props} className=${
                (props.class || props.className) || '' + ' spinning'}
                disabled=${true}
            >
                <span className="btn-content">${props.children}</span>
            </button>` :
            html`<button ...${_props}>
                ${props.children}
            </button>`
        }
        </span>`
}

module.exports = SpinningButton
