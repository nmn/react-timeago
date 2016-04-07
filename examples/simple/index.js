/* @flow */
import React from 'react'
import ReactDom from 'react-dom'
import TimeAgo from '../../src/index'

ReactDom.render(
  <div>
    You opened this page {' '}
    <TimeAgo date={Date.now()}/>
  </div>,
  document.getElementById('app')
)
