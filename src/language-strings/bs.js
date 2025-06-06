/* @flow */
import type { L10nsStrings } from '../formatters/buildFormatter'

// Bosnian
function numpf(n: number, f: string, s: string, t: string): string {
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
  prefixAgo: 'prije',
  prefixFromNow: 'za',
  suffixAgo: null,
  suffixFromNow: null,
  second: 'sekund',
  seconds: function (value) {
    return numpf(value, '%d sekund', '%d sekunde', '%d sekundi')
  },
  minute: 'oko minut',
  minutes: function (value) {
    return numpf(value, '%d minut', '%d minute', '%d minuta')
  },
  hour: 'oko sat',
  hours: function (value) {
    return numpf(value, '%d sat', '%d sata', '%d sati')
  },
  day: 'oko jednog dana',
  days: function (value) {
    return numpf(value, '%d dan', '%d dana', '%d dana')
  },
  month: 'mjesec dana',
  months: function (value) {
    return numpf(value, '%d mjesec', '%d mjeseca', '%d mjeseci')
  },
  year: 'prije godinu dana ',
  years: function (value) {
    return numpf(value, '%d godinu', '%d godine', '%d godina')
  },
  wordSeparator: ' ',
}

export default strings
