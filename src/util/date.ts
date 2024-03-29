import moment from 'moment'
import type { Moment } from 'moment'
import type { DateSpec } from '../types/date-spec.js'

const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * @param mnt The moment to convert to a date object.
 * @returns The conversion result.
 */
export function fromMoment (mnt: Moment): DateSpec {
  return { year: mnt.year(), month: mnt.month(), day: mnt.date() }
}

/**
 * @param date The date object to convert to a moment.
 * @returns The moment.
 */
export function toMoment (date: DateSpec): Moment {
  // moment supports parse via object with compatible schema
  return moment(date)
}

/**
 * Get a date object for the current date.
 *
 * @returns A date object containing year, month, day properties.
 */
export function getCurrentDate (): DateSpec {
  return fromMoment(moment())
}

/**
 * Format the date object YYYY-MM-DD.
 *
 * @param date The date.
 * @returns The formatted string.
 */
export function formatDate (date: DateSpec): string {
  return toMoment(date).format(DATE_FORMAT)
}

/**
 * Check whether the given date is a weekday (Mo - Fr).
 *
 * @param date The date.
 * @returns Whether the date is a weekday.
 */
export function isWeekday (date: DateSpec): boolean {
  return toMoment(date).isoWeekday() <= 5
}

/**
 * Get the first weekday after the given date.
 *
 * @param date The date.
 * @returns The date of the next weekday.
 */
export function getNextWeekday (date: DateSpec): DateSpec {
  // get moment for next day
  const mnt = toMoment(date).add(1, 'd')
  // if next day is a weekday, we are done
  if (mnt.isoWeekday() <= 5) {
    return fromMoment(mnt)
  }
  // otherwise choose next monday
  return fromMoment(mnt.isoWeekday(8))
}

/**
 * Get the first weekday before the given date.
 *
 * @param date The date.
 * @returns The date of the previous weekday.
 */
export function getPreviousWeekday (date: DateSpec): DateSpec {
  // get moment for next day
  const mnt = toMoment(date).subtract(1, 'd')
  // if previous day is a weekday, we are done
  if (mnt.isoWeekday() <= 5) {
    return fromMoment(mnt)
  }
  // otherwise choose previous friday
  return fromMoment(mnt.isoWeekday(5))
}

/**
 * Checks whether two DateSpec objects are equal (same year, month, and day).
 *
 * @param a First DateSpec object.
 * @param b Second DateSpec object.
 * @returns True if the DateSpec objects are equal, false otherwise.
 */
export function isEqualDate (a: DateSpec, b: DateSpec): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day
}
