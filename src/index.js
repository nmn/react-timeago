// @flow

import * as React from 'react'
import { useEffect, useState } from 'react'
import timeAgo from 'native-time-ago'

export type { Formatter, Suffix, Unit } from './types'

export type Props = $ReadOnly<{
  /** If the component should update itself over time */
  live?: boolean,
  /** minimum amount of time in seconds between re-renders */
  minPeriod?: number,
  /** Maximum time between re-renders in seconds. The component should update at least once every `x` seconds */
  maxPeriod?: number,
  /** The container to render the string into. You could use a string like `span` or a custom component */
  component?: string | React.ComponentType<{ ... }>,
  /**
   * A title used for setting the title attribute if a <time> HTML Element is used.
   */
  title?: string,
  /** A function to decide how to format the date.
   * If you use this, react-timeago is basically acting like a glorified setInterval for you.
   */
  formatter?: Formatter,
  /** The Date to display. An actual Date object or something that can be fed to new Date */
  date: string | number | Date,
  /** A function that returns what Date.now would return. Primarily for server
   * date: string | number | Date		 +   * rendering.
   */
  now?: () => number,
  locale?: string,
  ...
}>

const defaultNow = () => Date.now()

export default function TimeAgo({
  date,
  formatter,
  component = 'time',
  live = true,
  minPeriod = 0,
  maxPeriod = 60 * 60 * 24 * 7,
  title,
  now = defaultNow,
  locale = 'en',
  ...passDownProps
}: Props): null | React.MixedElement {
  const [timeNow, setTimeNow] = useState(now())

  useEffect(() => {
    if (!live) {
      return
    }
    
    const intervalId = setInterval(() => {
      setTimeNow(now())
    }, 60000)
    
    return () => clearInterval(intervalId)
  }, [live, now])

  useEffect(() => {
    setTimeNow(now())
  }, [date, now])

  const Komponent = component
  const dateObj = date instanceof Date ? date : new Date(date)
  const then = dateObj.getTime()
  
  if (!then || isNaN(then)) {
    return null
  }

  const passDownTitle =
    typeof title === 'undefined'
      ? typeof date === 'string'
        ? date
        : dateObj.toISOString().substring(0, 16).replace('T', ' ')
      : title

  const spreadProps =
    Komponent === 'time'
      ? { ...passDownProps, dateTime: dateObj.toISOString() }
      : passDownProps

  const content = timeAgo(date, locale)

  return (
    <Komponent {...spreadProps} title={passDownTitle}>
      {content}
    </Komponent>
  )
}
