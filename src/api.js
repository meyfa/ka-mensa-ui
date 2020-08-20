import axios from 'axios'

import { formatDate } from '~/util/date'

// CLASS DEFINITION

/**
 * API client class.
 */
class API {
  /**
   * Create a new API client for the given endpoint URL.
   *
   * @param {string} endpoint The endpoint URL to use.
   */
  constructor (endpoint) {
    if (typeof endpoint !== 'string' || endpoint.length <= 0) {
      throw new TypeError('expected endpoint parameter')
    }
    if (endpoint.charAt(endpoint.length - 1) !== '/') {
      throw new Error('expected endpoint URL to end with slash character')
    }
    this.endpoint = endpoint
  }

  /**
   * Fetch the set of available canteens.
   *
   * @returns {Promise} Resolves to an array of canteen objects.
   */
  async getCanteens () {
    const { data } = await axios.get(this.endpoint + 'canteens')
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  }

  /**
   * Fetch the set of legend entries containing 'short' and 'label' strings.
   *
   * @returns {Promise} Resolves to an array of legend objects.
   */
  async getLegend () {
    const { data } = await axios.get(this.endpoint + 'meta/legend')
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  }

  /**
   * Fetch the set of plans for the given date.
   *
   * @param {object} date A date object.
   * @returns {Promise} Resolves to an array of plans.
   */
  async getPlan (date) {
    const dateStr = formatDate(date)
    const { data } = await axios.get(this.endpoint + 'plans/' + dateStr)
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  }
}

// EXPORT

// API_ENDPOINT is configurable (config.api.endpoint) and defined via webpack
export default new API(API_ENDPOINT)
