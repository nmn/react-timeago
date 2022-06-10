/* @flow */
import type { L10nsStrings } from '../formatters/buildFormatter'

const hasIntl = typeof Intl !== 'undefined' && Intl.NumberFormat != null

// Persian
// Use DIR attribute for RTL text in Persian Language for ABBR tag .
// By MB.seifollahi@gmail.com
const strings: L10nsStrings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: 'پیش',
  suffixFromNow: 'از حال',
  seconds: 'کمتر از یک دقیقه',
  minute: 'حدود یک دقیقه',
  minutes: (value) => {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + ' دقیقه'
    }
    return '%d دقیقه'
  },
  hour: 'حدود یک ساعت',
  hours: (value) => {
    if (hasIntl) {
      return 'حدود %d ساعت'.replace(
        '%d',
        new Intl.NumberFormat('fa').format(value),
      )
    }
    return 'حدود %d ساعت'
  },
  day: 'یک روز',
  days: (value) => {
    if (hasIntl) {
      return '%d روز'.replace('%d', new Intl.NumberFormat('fa').format(value))
    }
    return '%d روز'
  },
  month: 'حدود یک ماه',
  months: (value) => {
    if (hasIntl) {
      return '%d ماه'.replace('%d', new Intl.NumberFormat('fa').format(value))
    }
    return '%d ماه'
  },
  year: 'حدود یک سال',
  years: (value) => {
    if (hasIntl) {
      return '%d سال'.replace('%d', new Intl.NumberFormat('fa').format(value))
    }
    return '%d سال'
  },
  wordSeparator: ' ',
}

export default strings
