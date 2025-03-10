/* @flow strict */
import * as React from 'react'
import ReactDom from 'react-dom/client'
import TimeAgo from '../../src/index'

const appElement = document.getElementById('app')

appElement && ReactDom.createRoot(appElement).render(
  <div>
    You opened this page <TimeAgo date={Date.now()} />
  </div>,
)

