/* @flow */
import type { L10nsStrings } from '../formatters/buildFormatter'

// Polish
function numpf(n: number, s: string, t: string): string {
  // s - 2-4, 22-24, 32-34 ...
  // t - 5-21, 25-31, ...
  const n10 = n % 10
  if (n10 > 1 && n10 < 5 && (n > 20 || n < 10)) {
    return s
  } else {
    return t
  }
}

const strings: L10nsStrings = {
  prefixAgo: null,
  prefixFromNow: 'za',
  suffixAgo: 'temu',
  suffixFromNow: null,
  seconds: 'mniej niż minutę',
  minute: 'minutę',
  minutes: function (value) {
    return numpf(value, '%d minuty', '%d minut')
  },
  hour: 'godzinę',
  hours: function (value) {
    return numpf(value, '%d godziny', '%d godzin')
  },
  day: 'dzień',
  days: '%d dni',
  month: 'miesiąc',
  months: function (value) {
    return numpf(value, '%d miesiące', '%d miesięcy')
  },
  year: 'rok',
  years: function (value) {
    return numpf(value, '%d lata', '%d lat')
  },
}

export default strings
