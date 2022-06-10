/* @flow */
import type { L10nsStrings } from '../formatters/buildFormatter'

const hasIntl = typeof Intl !== 'undefined' && Intl.NumberFormat != null

// persion shortened
const strings: L10nsStrings = {
  prefixAgo: null,
  prefixFromNow: null,
  suffixAgo: '',
  suffixFromNow: '',
  seconds: '۱دقیقه',
  minute: '۱دقیقه',
  minutes: (value) => {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'دقیقه'
    }
    return '%dدقیقه'
  },
  hour: '۱ساعت',
  hours: (value) => {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'ساعت'
    }
    return '%dساعت'
  },
  day: '۱روز',
  days: (value) => {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'روز'
    }
    return '%dروز'
  },
  month: '۱ماه',
  months: (value) => {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'ماه'
    }
    return '%dماه'
  },
  year: '۱سال',
  years: (value) => {
    if (hasIntl) {
      return new Intl.NumberFormat('fa').format(value) + 'سال'
    }
    return '%dسال'
  },
  wordSeparator: ' ',
}

export default strings
