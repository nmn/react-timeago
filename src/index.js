/* @flow */
import * as React from 'react'
import defaultFormatter from './defaultFormatter'
import dateParser from './dateParser'

const { Component } = React

export type Unit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
export type Suffix = 'ago' | 'from now'
export type Formatter = (
  value: number,
  unit: Unit,
  suffix: Suffix,
  epochMiliseconds: number,
  nextFormatter?: Formatter,
) => React.Node

export type Props = {
  /** If the component should update itself over time */
  +live: boolean,
  /** minimum amount of time in seceonds between re-renders */
  +minPeriod: number,
  /** Maximum time between re-renders in seconds. The component should update at least once every `x` seconds */
  +maxPeriod: number,
  /** The container to render the string into. You could use a string like `span` or a custom component */
  +component: string | React.ComponentType<mixed>,
  /**
   * A title used for setting the title attribute if a <time> HTML Element is used.
   */
  +title?: string,
  /** A function to decide how to format the date.
   * If you use this, react-timeago is basically acting like a glorified setInterval for you.
   */
  +formatter: Formatter,
  /** The Date to display. An actual Date object or something that can be fed to new Date */
  +date: string | number | Date,
  /** A function that returns what Date.now would return. Primarily for server
   * date: string | number | Date		 +   * rendering.
   */
  +now: () => number,
}

type DefaultProps = {
  +live: boolean,
  +minPeriod: number,
  +maxPeriod: number,
  +component: string | React.ComponentType<mixed>,
  +formatter: Formatter,
  +now: () => number,
}

// Just some simple constants for readability
const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 30
const YEAR = DAY * 365

export default class TimeAgo extends Component<Props> {
  static displayName = 'TimeAgo'
  static defaultProps: DefaultProps = {
    live: true,
    component: 'time',
    minPeriod: 0,
    maxPeriod: Infinity,
    formatter: defaultFormatter,
    now: () => Date.now(),
  }

  timeoutId: ?TimeoutID
  isStillMounted: boolean = false

  tick = (refresh: ?boolean): void => {
    if (!this.isStillMounted || !this.props.live) {
      return
    }

    const then = dateParser(this.props.date).valueOf()
    if (!then) {
      console.warn('[react-timeago] Invalid Date provided')
      return
    }

    const now = this.props.now()
    const seconds = Math.round(Math.abs(now - then) / 1000)

    const unboundPeriod =
      seconds < MINUTE
        ? 1000
        : seconds < HOUR
          ? 1000 * MINUTE
          : seconds < DAY
            ? 1000 * HOUR
            : 0
    const period = Math.min(
      Math.max(unboundPeriod, this.props.minPeriod * 1000),
      this.props.maxPeriod * 1000,
    )

    if (period) {
      this.timeoutId = setTimeout(this.tick, period)
    }

    if (!refresh) {
      this.forceUpdate()
    }
  }

  componentDidMount() {
    this.isStillMounted = true
    if (this.props.live) {
      this.tick(true)
    }
  }

  componentDidUpdate(lastProps: Props) {
    if (
      this.props.live !== lastProps.live ||
      this.props.date !== lastProps.date
    ) {
      if (!this.props.live && this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.tick()
    }
  }

  componentWillUnmount() {
    this.isStillMounted = false
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }

  render(): React.Node {
    /* eslint-disable no-unused-vars */
    const {
      date,
      formatter,
      component: Komponent,
      live,
      minPeriod,
      maxPeriod,
      title,
      now,
      ...passDownProps
    } = this.props
    /* eslint-enable no-unused-vars */
    const then = dateParser(date).valueOf()
    if (!then) {
      return null
    }
    const timeNow = now()
    const seconds = Math.round(Math.abs(timeNow - then) / 1000)
    const suffix = then < timeNow ? 'ago' : 'from now'

    const [value, unit] =
      seconds < MINUTE
        ? [Math.round(seconds), 'second']
        : seconds < HOUR
          ? [Math.round(seconds / MINUTE), 'minute']
          : seconds < DAY
            ? [Math.round(seconds / HOUR), 'hour']
            : seconds < WEEK
              ? [Math.round(seconds / DAY), 'day']
              : seconds < MONTH
                ? [Math.round(seconds / WEEK), 'week']
                : seconds < YEAR
                  ? [Math.round(seconds / MONTH), 'month']
                  : [Math.round(seconds / YEAR), 'year']

    const passDownTitle =
      typeof title === 'undefined'
        ? typeof date === 'string'
          ? date
          : dateParser(date)
              .toISOString()
              .substr(0, 16)
              .replace('T', ' ')
        : title

    const spreadProps =
      Komponent === 'time'
        ? Object.assign({}, passDownProps, {
            dateTime: dateParser(date).toISOString(),
          })
        : passDownProps

    const nextFormatter = defaultFormatter.bind(null, value, unit, suffix)

    return (
      <Komponent {...spreadProps} title={passDownTitle}>
        {this.props.formatter(value, unit, suffix, now, then, nextFormatter)}
      </Komponent>
    )
  }
}
