// @flow

export default function defaultFormatter (value: number, unit: string, suffix: string): string {
  if ((value % 10 !== 1) || (value % 100 === 11)) {
    unit += 's'
  }
  return value + ' ' + unit + ' ' + suffix
}
