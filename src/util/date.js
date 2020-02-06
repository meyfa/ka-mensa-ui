// HELPER METHODS

/**
 * Format an integer, left-padded with zeros to a specific minimum length.
 *
 * @param {number} num The integer to format.
 * @param {number} length The amount of digits wanted.
 * @returns {string} The formatted integer.
 */
function padZeros (num, length) {
  let str = '' + num
  while (str.length < length) {
    str = '0' + str
  }
  return str
}

// EXPORTS

/**
 * Get a date object for the current date.
 *
 * @returns {object} A date object containing year, month, day properties.
 */
export function getCurrentDate () {
  const d = new Date()
  return {
    day: d.getUTCDate(),
    month: d.getUTCMonth(),
    year: d.getFullYear()
  }
}

/**
 * Format the date object YYYY-MM-DD.
 *
 * @param {object} date The date.
 * @returns {string} The formatted string.
 */
export function formatDate (date) {
  return padZeros(date.year, 4) +
    '-' + padZeros(date.month + 1, 2) +
    '-' + padZeros(date.day, 2)
}
