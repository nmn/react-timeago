// @flow

export default function dateParser (date: string | number | Date): Date {
  let parsed = new Date(date)
  if (!Number.isNaN(parsed.valueOf())) {
    return parsed
  }

  let parts = date.match(/\d+/g)
  if (parts === null || parts.length <= 2) {
    return null
  } else {
    parts[1] = --parts[1]
    let isoDate = new Date(Date.UTC(...parts))
    return isoDate;
  }
}