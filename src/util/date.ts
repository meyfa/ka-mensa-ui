import moment, { Moment } from 'moment'

// CONSTANTS

const DATE_FORMAT = 'YYYY-MM-DD'

// HELPER METHODS

/**
 * @param {object} mnt The moment to convert to a date object.
 * @returns {object} The conversion result.
 */
function fromMoment (mnt: Moment): DateSpec {
  return { year: mnt.year(), month: mnt.month(), day: mnt.date() }
}

/**
 * @param {object} date The date object to convert to a moment.
 * @returns {object} The moment.
 */
function toMoment (date: DateSpec): Moment {
  // moment supports parse via object with compatible schema
  return moment(date)
}

// EXPORTS

export interface DateSpec {
  year: number
  month: number
  day: number
}

/**
 * Get a date object for the current date.
 *
 * @returns {object} A date object containing year, month, day properties.
 */
export function getCurrentDate (): DateSpec {
  return fromMoment(moment())
}

/**
 * Format the date object YYYY-MM-DD.
 *
 * @param {object} date The date.
 * @returns {string} The formatted string.
 */
export function formatDate (date: DateSpec): string {
  return toMoment(date).format(DATE_FORMAT)
}

/**
 * Check whether the given date is a weekday (Mo - Fr).
 *
 * @param {object} date The date.
 * @returns {boolean} Whether the date is a weekday.
 */
export function isWeekday (date: DateSpec): boolean {
  return toMoment(date).isoWeekday() <= 5
}

/**
 * Get the first weekday after the given date.
 *
 * @param {object} date The date.
 * @returns {object} The date of the next weekday.
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
 * @param {object} date The date.
 * @returns {object} The date of the previous weekday.
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
