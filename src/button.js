var React = require('react')

function SpinningButton (props) {
    var { isSpinning } = props
    var _props = {...props}
    delete _props.isSpinning

    var cl = (props.class || props.className)

    /* eslint-disable */
    return <span className="form-stuff">
        {isSpinning ?
            <button {..._props} className={cl + ' spinning'}
                disabled={true} type="button"
            >
                <span className="btn-content">{props.children}</span>
            </button> :
            <button {..._props} type="button">
                <span className="btn-content">{props.children}</span>
            </button>
        }
        </span>
    /* eslint-enable */
}

module.exports = SpinningButton
