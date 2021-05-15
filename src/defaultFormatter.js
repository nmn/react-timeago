// @flow

export default function defaultFormatter(
  value: number,
  _unit: string,
  suffix: string,
): string {
  const unit = value !== 1 ? _unit + 's' : _unit

  return value + ' ' + unit + ' ' + suffix
}
