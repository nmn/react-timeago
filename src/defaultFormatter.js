// @flow


import type { Formatter } from "./types";

const defaultFormatter: Formatter = (
  value: number,
  _unit: string,
  suffix: string,
): string => {
  const unit = value !== 1 ? _unit + 's' : _unit
  return value + ' ' + unit + ' ' + suffix
}

export default defaultFormatter