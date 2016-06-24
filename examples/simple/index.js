/* @flow */
import React from 'react'
import ReactDom from 'react-dom'
import TimeAgo from '../../lib/index'
import TimeAgoLocaleKR from '../../lib/localeKR'

ReactDom.render(
    <div>
        <p>
            You opened this page {' '}
            <TimeAgo date={Date.now()}/>
        </p>
        <p>
            이문서는 {' '}
            <TimeAgo date={Date.now()} unitStrings={TimeAgoLocaleKR}/>
            에 열었습니다.
        </p>
    </div>,
    document.getElementById('app')
)
