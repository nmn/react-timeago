/* @flow */
import type { L10nsStrings } from '../formatters/buildFormatter'

// Croatian
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
  second: 'sekundu',
  seconds: function (value) {
    return numpf(value, '%d sekundu', '%d sekunde', '%d sekundi')
  },
  minute: 'oko minutu',
  minutes: function (value) {
    return numpf(value, '%d minutu', '%d minute', '%d minuta')
  },
  hour: 'oko jedan sat',
  hours: function (value) {
    return numpf(value, '%d sat', '%d sata', '%d sati')
  },
  day: 'jedan dan',
  days: function (value) {
    return numpf(value, '%d dan', '%d dana', '%d dana')
  },
  month: 'mjesec dana',
  months: function (value) {
    return numpf(value, '%d mjesec', '%d mjeseca', '%d mjeseci')
  },
  year: 'prije godinu dana',
  years: function (value) {
    return numpf(value, '%d godinu', '%d godine', '%d godina')
  },
  wordSeparator: ' ',
}

export default strings
