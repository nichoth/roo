import { html } from 'htm/react'

function SpinningButton (props) {
    var { isSpinning } = props
    var _props = {...props}
    delete _props.isSpinning

    // var cl = isSpinning ?
    //     'spinning ' + (_props.class || _props.className) :
    //     (_props.class || _props.className)


        // <button ...${_props} className=${cl}>
        // </button>

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
}

module.exports = SpinningButton
