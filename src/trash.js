// eslint-disable-next-line
var React = require('react')

function Trash (props) {
    var cl = (props.class || props.className) + ' trash-btn emoji-btn'
    return (
        <button {...props} className={cl} title={props.title}
            type="button"
        >
            <span role="img" aria-label="delete">🗑️</span>
        </button>
    )
}

module.exports = Trash
