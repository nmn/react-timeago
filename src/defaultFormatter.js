// @flow

import type { Formatter, Suffix, Unit } from './types'

const defaultFormatter: Formatter = (
  value: number,
  _unit: Unit,
  suffix: string,
): string => {
  const unit = value !== 1 ? _unit + 's' : _unit
  return value + ' ' + unit + ' ' + suffix
}

export default defaultFormatter

export type IntlFormatterOptions = $ReadOnly<{
  locale?: void | string,
  localeMatcher?: 'lookup' | 'best fit',
  numberingSystem?: Intl$NumberingSystem,
  style?: 'long' | 'short' | 'narrow',
  numeric?: 'always' | 'auto',
}>

export const makeIntlFormatter: (IntlFormatterOptions) => Formatter =
  ({ locale, ...options }) =>
  (value, unit, suffix) => {
    const RelativeTimeFormat = Intl.RelativeTimeFormat
    if (!RelativeTimeFormat) {
      throw new Error('Intl.RelativeTimeFormat is not supported')
    }

    const rtf = new RelativeTimeFormat(locale ?? undefined, {
      style: 'long',
      numeric: 'auto',
      ...options,
    })

    return rtf.format(suffix === 'ago' ? -value : value, unit)
  }
