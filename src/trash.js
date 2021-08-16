import { html } from 'htm/react'
// eslint-disable-next-line
import React, { useEffect } from 'react';

function Trash (props) {
    var cl = (props.class || props.className) + ' trash-btn emoji-btn'
    return html`<button ...${props} className=${cl}
        title=${props.title}
    >
        🗑️
    </button>`
}

module.exports = Trash
