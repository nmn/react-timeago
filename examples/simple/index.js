/* @flow */
import React from 'react'
import ReactDom from 'react-dom'
import TimeAgo from '../../src/index'

const appElement = document.getElementById('app')

appElement &&
  ReactDom.render(
    <div>
      You opened this page <TimeAgo date={Date.now()} />
    </div>,
    appElement,
  )
