/* @flow */
import type { L10nsStrings } from '../formatters/buildFormatter'

// Russian
function numpf(n: number, f: string, s: string, t: string): string {
  // f - 1, 21, 31, ...
  // s - 2-4, 22-24, 32-34 ...
  // t - 5-20, 25-30, ...
  const n10 = n % 10
  if (n10 === 1 && (n === 1 || n > 20)) {
    return f
  } else if (n10 > 1 && n10 < 5 && (n > 20 || n < 10)) {
    return s
  } else {
    return t
  }
}

const strings: L10nsStrings = {
  prefixAgo: null,
  prefixFromNow: 'через',
  suffixAgo: function suffixAgo(value) {
    if (value === 0) {
      return ''
    }
    return 'назад'
  },
  suffixFromNow: null,
  seconds: function seconds(value) {
    if (value === 0) {
      return 'только что'
    }
    return numpf(value, '%d секунду', '%d секунды', '%d секунд')
  },
  minute: 'минуту',
  minutes: function (value) {
    return numpf(value, '%d минуту', '%d минуты', '%d минут')
  },
  hour: 'час',
  hours: function (value) {
    return numpf(value, '%d час', '%d часа', '%d часов')
  },
  day: 'день',
  days: function (value) {
    return numpf(value, '%d день', '%d дня', '%d дней')
  },
  month: 'месяц',
  months: function (value) {
    return numpf(value, '%d месяц', '%d месяца', '%d месяцев')
  },
  year: 'год',
  years: function (value) {
    return numpf(value, '%d год', '%d года', '%d лет')
  },
}

export default strings
