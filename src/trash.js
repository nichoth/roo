// eslint-disable-next-line
var React = require('react')
// var { useEffect } = require('react')

function Trash (props) {
    var cl = (props.class || props.className) + ' trash-btn emoji-btn'
    return <button {...props} className={cl}
        title={props.title}
    >
        🗑️
    </button>
}

module.exports = Trash
