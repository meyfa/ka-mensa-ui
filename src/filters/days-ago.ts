import moment from 'moment'
import { getCurrentDate } from '../util/date.js'
import type { DateSpec } from '../types/date-spec.js'

/**
 * Given a date specification, this returns a string representing that date relative
 * to the current date.
 *
 * @param value The date value.
 * @returns The formatted relative date.
 */
export function filterDaysAgo (value: DateSpec): string {
  if (value != null) {
    const mnt = moment(value)
    const calStr = mnt.calendar({
      sameDay: '[heute] (dddd)',
      nextDay: '[morgen] (dddd)',
      nextWeek: '[nächster] dddd',
      lastDay: '[gestern] (dddd)',
      lastWeek: '[letzter] dddd',
      sameElse: '[magic_replace_ago] (dddd)'
    }).toLowerCase()
    if (calStr.includes('magic_replace_ago')) {
      const diffDays = mnt.diff(moment(getCurrentDate()), 'd')
      const diffStr = diffDays < 0
        ? `vor ${-diffDays} Tagen`
        : `in ${diffDays} Tagen`
      return calStr.replace('magic_replace_ago', diffStr)
    }
    return calStr
  }
  return ''
}
