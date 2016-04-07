/* @flow */
import React, {PropTypes, Component} from 'react'

type Unit = 'second'
          | 'minute'
          | 'hour'
          | 'day'
          | 'week'
          | 'month'
          | 'year'

type Suffix = 'ago' | 'from now'

type Props = {
  /** If the component should update itself over time */
  live: boolean,
  /** minimum amount of time in seceonds between re-renders */
  minPeriod: number,
  /** Maximum time between re-renders in seconds. The component should update at least once every `x` seconds */
  maxPeriod: number,
  /** The container to render the string into. You could use a string like `span` or a custom component */
  component: any,
  /** A function to decide how to format the date.
   * If you use this, react-timeago is basically acting like a glorified setInterval for you.
   */
  formatter: (value: number, unit: Unit, suffix: Suffix, date: number) => string | React$Element,
  /** The Date to display. An actual Date object or something that can be fed to new Date */
  date: string | number | Date
}

type DefaultProps = {
  live: boolean,
  minPeriod: number,
  maxPeriod: number,
  component: string | ReactClass | Function,
  formatter: (value: number, unit: Unit, suffix: Suffix, date: Date) => string | React$Element
}

type TickFn = (refresh: ?boolean) => void

/*
declare class TimeAgo extends Component<DefaultProps, Props, void> {
  static displayName: string;
  timeoutId: ?number;
  isMounted: boolean;
  tick: TickFn;
}
*/

export default class TimeAgo extends Component<DefaultProps, Props, void> {

  static displayName = 'TimeAgo';
  static propTypes = {
    /** If the component should update itself over time */
    live: PropTypes.bool.isRequired,
    /** minimum amount of time in seceonds between re-renders */
    minPeriod: PropTypes.number.isRequired,
    /** Maximum time between re-renders in seconds. The component should update at least once every `x` seconds */
    maxPeriod: PropTypes.number.isRequired,
    /** The container to render the string into. You could use a string like `span` or a custom component */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    /** A function to decide how to format the date.
     * If you use this, react-timeago is basically acting like a glorified setInterval for you.
     */
    formatter: PropTypes.func.isRequired,
    /** The Date to display. An actual Date object or something that can be fed to new Date */
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date)
    ]).isRequired
  };

  static defaultProps = {
    live: true,
    component: 'time',
    minPeriod: 0,
    maxPeriod: Infinity,
    formatter (value, unit, suffix) {
      if (value !== 1) {
        unit += 's'
      }
      return value + ' ' + unit + ' ' + suffix
    }
  };

  timeoutId: ?number;
  isMounted: boolean = false;

  tick: TickFn = (refresh) => {
    if (!this.isMounted || !this.props.live) {
      return
    }

    let period = 1000
    const then = (new Date(this.props.date)).valueOf()
    const now = Date.now()
    const seconds = Math.round(Math.abs(now - then) / 1000)

    if (seconds < 60) {
      period = 1000
    } else if (seconds < 60 * 60) {
      period = 1000 * 60
    } else if (seconds < 60 * 60 * 24) {
      period = 1000 * 60 * 60
    } else {
      period = 0
    }

    period = Math.min(Math.max(period, this.props.minPeriod * 1000), this.props.maxPeriod * 1000)

    if (period != null) {
      this.timeoutId = setTimeout(this.tick, period)
    }

    if (!refresh) {
      this.forceUpdate()
    }
  };

  componentDidMount () {
    this.isMounted = true
    if (this.props.live) {
      this.tick(true)
    }
  }

  componentDidUpdate (lastProps: Props) {
    if (this.props.live !== lastProps.live || this.props.date !== lastProps.date) {
      if (!this.props.live && this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.tick()
    }
  }

  componentWIllUnmount () {
    this.isMounted = false
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }

  render (): React$Element {
    const then = (new Date(this.props.date)).valueOf()
    const now = Date.now()
    const seconds = Math.round(Math.abs(now - then) / 1000)

    const suffix = then < now ? 'ago' : 'from now'

    let value, unit

    if (seconds < 60) {
      value = Math.round(seconds)
      unit = 'second'
    } else if (seconds < 60 * 60) {
      value = Math.round(seconds / 60)
      unit = 'minute'
    } else if (seconds < 60 * 60 * 24) {
      value = Math.round(seconds / (60 * 60))
      unit = 'hour'
    } else if (seconds < 60 * 60 * 24 * 7) {
      value = Math.round(seconds / (60 * 60 * 24))
      unit = 'day'
    } else if (seconds < 60 * 60 * 24 * 30) {
      value = Math.round(seconds / (60 * 60 * 24 * 7))
      unit = 'week'
    } else if (seconds < 60 * 60 * 24 * 365) {
      value = Math.round(seconds / (60 * 60 * 24 * 30))
      unit = 'month'
    } else {
      value = Math.round(seconds / (60 * 60 * 24 * 365))
      unit = 'year'
    }

    var props = Object.assign({}, this.props)

    props.title = props.title || typeof props.date === 'string'
      ? props.date
      : (new Date(props.date)).toISOString().substr(0, 16).replace('T', ' ')

    if (props.component === 'time') {
      props.dateTime = (new Date(props.date)).toISOString()
    }

    delete props.date
    delete props.formatter
    delete props.component

    const Komponent = this.props.component
    return (
      <Komponent {...props}>
        {this.props.formatter(value, unit, suffix, then)}
      </Komponent>
    )
  }
}
