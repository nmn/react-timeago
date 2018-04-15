/* @flow */
import type { L10nsStrings } from '../formatters/buildFormatter'

// Czech
function f(n: number, d: number, a: $ReadOnlyArray<string>) {
  return a[d >= 0 ? 0 : a.length === 2 || n < 5 ? 1 : 2]
}

const strings: L10nsStrings = {
  prefixAgo: 'před',
  prefixFromNow: 'za',
  suffixAgo: null,
  suffixFromNow: null,
  seconds: function(n: number, d: number) {
    return f(n, d, ['méně než minutou', 'méně než minutu'])
  },
  minute: function(n: number, d: number) {
    return f(n, d, ['minutou', 'minutu'])
  },
  minutes: function(n: number, d: number) {
    return f(n, d, ['%d minutami', '%d minuty', '%d minut'])
  },
  hour: function(n: number, d: number) {
    return f(n, d, ['hodinou', 'hodinu'])
  },
  hours: function(n: number, d: number) {
    return f(n, d, ['%d hodinami', '%d hodiny', '%d hodin'])
  },
  day: function(n: number, d: number) {
    return f(n, d, ['%d dnem', '%d den'])
  },
  days: function(n: number, d: number) {
    return f(n, d, ['%d dny', '%d dny', '%d dní'])
  },
  month: function(n: number, d: number) {
    return f(n, d, ['%d měsícem', '%d měsíc'])
  },
  months: function(n: number, d: number) {
    return f(n, d, ['%d měsíci', '%d měsíce', '%d měsíců'])
  },
  year: function(n: number, d: number) {
    return f(n, d, ['%d rokem', '%d rok'])
  },
  years: function(n: number, d: number) {
    return f(n, d, ['%d lety', '%d roky', '%d let'])
  },
}

export default strings
