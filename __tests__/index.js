
import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react'

import React from 'react'

import TimeAgo from '../src'
import buildFormatter from '../src/formatters/buildFormatter'
import TWStrings from '../src/language-strings/zh-TW'

test('just now', () => {
  render(<TimeAgo date={new Date()} />)
  expect(screen.getByText('0 seconds ago')).toBeInTheDocument()
})

test('1 second ago', () => {
  render(<TimeAgo date={Date.now() - 1000} />)
  expect(screen.getByText('1 second ago')).toBeInTheDocument()
})

test('2 seconds ago', () => {
  render(<TimeAgo date={Date.now() - 2000} />)
  expect(screen.getByText('2 seconds ago')).toBeInTheDocument()
})

test('1 minute ago', () => {
  render(<TimeAgo date={Date.now() - 1000 * 60} />)
  expect(screen.getByText('1 minute ago')).toBeInTheDocument()
})

test('2 minutes ago', () => {
  render(<TimeAgo date={Date.now() - 2000 * 60} />)
  expect(screen.getByText('2 minutes ago')).toBeInTheDocument()
})

test('1 hour ago', () => {
  render(<TimeAgo date={Date.now() - 1000 * 60 * 60} />)
  expect(screen.getByText('1 hour ago')).toBeInTheDocument()
})

test('2 hours ago', () => {
  render(<TimeAgo date={Date.now() - 2000 * 60 * 60} />)
  expect(screen.getByText('2 hours ago')).toBeInTheDocument()
})

test('1 day ago', () => {
  render(<TimeAgo date={Date.now() - 1000 * 60 * 60 * 24} />)
  expect(screen.getByText('1 day ago')).toBeInTheDocument()
})

test('1 week ago', () => {
  render(
    <TimeAgo date={Date.now() - 1000 * 60 * 60 * 24 * 7} />,
  )
  expect(screen.getByText('1 week ago')).toBeInTheDocument()
})

test('21 days ago', () => {
  const timeAgoFormatConfig = {
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: 'ago',
    suffixFromNow: 'from now',
    seconds: '%d sec',
    minutes: '%d min',
    hour: '%d hr',
    hours: '%d hrs',
    day: '%d day',
    days: '%d days',
    wordSeparator: ' ',
  }

  const timeAgoFormatter = buildFormatter(timeAgoFormatConfig)

  render(
    <TimeAgo
      formatter={timeAgoFormatter}
      date={new Date('Tue Apr 03 2018 12:00:00 GMT-0700 (PDT)').getTime()}
      now={() => new Date('Tue Apr 24 2018 15:12:51 GMT-0400 (EDT)').getTime()}
    />,
  )
  expect(screen.getByText('21 days ago')).toBeInTheDocument()
})

/* zh-TW */
const formatter = buildFormatter(TWStrings)

/* 1 week ago in zh-TW */
it('1 week ago in zh-TW', () => {
  render(
    <TimeAgo
      date={Date.now() - 1000 * 60 * 60 * 24 * 7}
      formatter={formatter}
    />,
  )
  expect(screen.getByText('7天之前')).toBeInTheDocument()
})

test('allow custom wordSeparator', () => {
  const strings = Object.assign({}, TWStrings, { wordSeparator: 'x' })
  const formatter = buildFormatter(strings)
  render(
    <TimeAgo
      date={Date.now() - 1000 * 60 * 60 * 24 * 7}
      formatter={formatter}
    />,
  )
  expect(screen.getByText('7天x之前')).toBeInTheDocument()
})
