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
  formatter: (value: number, unit: Unit, suffix: Suffix, epochSeconds: number) => string | React$Element,
  /** The Date to display. An actual Date object or something that can be fed to new Date */
  date: string | number | Date
}

type DefaultProps = {
  live: boolean,
  minPeriod: number,
  maxPeriod: number,
  component: string | ReactClass | Function,
  formatter: (value: number, unit: Unit, suffix: Suffix, epochSeconds: number) => string | React$Element
}

type TickFn = (refresh: ?boolean) => void

// Just some simple constants for readability
const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 30
const YEAR = DAY * 365

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
     * If you use this, `react-timeago` is basically acting like a glorified `setInterval`.
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
  isStillMounted: boolean = false;

  tick: TickFn = (refresh) => {
    if (!this.isStillMounted || !this.props.live) {
      return
    }

    const then = (new Date(this.props.date)).valueOf()
    const now = Date.now()
    const seconds = Math.round(Math.abs(now - then) / 1000)

    const unboundPeriod
      = seconds < MINUTE
      ? 1000
      : seconds < HOUR
      ? 1000 * MINUTE
      : seconds < DAY
      ? 1000 * HOUR
      : 0
    const period = Math.min(
      Math.max(unboundPeriod, this.props.minPeriod * 1000),
      this.props.maxPeriod * 1000
    )

    if (period) {
      this.timeoutId = setTimeout(this.tick, period)
    }

    if (!refresh) {
      this.forceUpdate()
    }
  };

  componentDidMount () {
    this.isStillMounted = true
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

  componentWillUnmount () {
    this.isStillMounted = false
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

    const [value, unit]
      = seconds < MINUTE
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

    const props = Object.assign({}, this.props)
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
