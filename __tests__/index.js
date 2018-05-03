import React from 'react'
import { configure, shallow } from 'enzyme'

import TimeAgo from '../src'
import buildFormatter from '../src/formatters/buildFormatter'
import TWStrings from '../src/language-strings/zh-TW'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it('just now', () => {
  const wrapper = shallow(<TimeAgo date={new Date()} />)
  expect(wrapper.text()).toBe('0 seconds ago')
})

it('1 second ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000} />)
  expect(wrapper.text()).toBe('1 second ago')
})

it('2 seconds ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 2000} />)
  expect(wrapper.text()).toBe('2 seconds ago')
})

it('1 minute ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60} />)
  expect(wrapper.text()).toBe('1 minute ago')
})

it('2 minutes ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 2000 * 60} />)
  expect(wrapper.text()).toBe('2 minutes ago')
})

it('1 hour ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60 * 60} />)
  expect(wrapper.text()).toBe('1 hour ago')
})

it('2 hours ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 2000 * 60 * 60} />)
  expect(wrapper.text()).toBe('2 hours ago')
})

it('1 day ago', () => {
  const wrapper = shallow(<TimeAgo date={Date.now() - 1000 * 60 * 60 * 24} />)
  expect(wrapper.text()).toBe('1 day ago')
})

it('1 week ago', () => {
  const wrapper = shallow(
    <TimeAgo date={Date.now() - 1000 * 60 * 60 * 24 * 7} />,
  )
  expect(wrapper.text()).toBe('1 week ago')
})

it('21 days ago', () => {
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

  const wrapper = shallow(
    <TimeAgo
      formatter={timeAgoFormatter}
      date={new Date('Tue Apr 03 2018 12:00:00 GMT-0700 (PDT)').getTime()}
      now={() => new Date('Tue Apr 24 2018 15:12:51 GMT-0400 (EDT)').getTime()}
    />,
  )

  expect(wrapper.text()).toBe('21 days ago')
})

/* zh-TW */
const formatter = buildFormatter(TWStrings)

/* 1 week ago in zh-TW */
it('1 week ago in zh-TW', () => {
  const wrapper = shallow(
    <TimeAgo
      date={Date.now() - 1000 * 60 * 60 * 24 * 7}
      formatter={formatter}
    />,
  )
  expect(wrapper.text()).toBe('7天之前')
})

test('allow custom wordSeparator', () => {
  const strings = Object.assign({}, TWStrings, { wordSeparator: 'x' })
  const formatter = buildFormatter(strings)
  const wrapper = shallow(
    <TimeAgo
      date={Date.now() - 1000 * 60 * 60 * 24 * 7}
      formatter={formatter}
    />,
  )
  expect(wrapper.text()).toBe('7天x之前')
})
