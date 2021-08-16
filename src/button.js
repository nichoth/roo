import { html } from 'htm/react'

function SpinningButton (props) {
    var { isSpinning } = props
    var _props = {...props}
    delete _props.isSpinning

    /* eslint-disable */
    return html`<span className="form-stuff">
        ${isSpinning ?
            html`<button ...${_props} className=${
                ((props.class || props.className) + ' spinning')}
                disabled=${true}
            >
                <span className="btn-content">${props.children}</span>
            </button>` :
            html`<button ...${_props}>
                <span className="btn-content">${props.children}</span>
            </button>`
        }
        </span>`
    /* eslint-enable */
}

module.exports = SpinningButton
