import { formatDate, DateSpec } from './util/date'

// CLASS DEFINITION

/**
 * API client class.
 */
class API {
  private readonly endpoint: string

  /**
   * Create a new API client for the given endpoint URL.
   *
   * @param {string} endpoint The endpoint URL to use.
   */
  constructor (endpoint: string) {
    if (typeof endpoint !== 'string' || endpoint.length <= 0) {
      throw new TypeError('expected endpoint parameter')
    }
    if (endpoint.charAt(endpoint.length - 1) !== '/') {
      throw new Error('expected endpoint URL to end with slash character')
    }
    this.endpoint = endpoint
  }

  private async _fetchApi (path: string): Promise<any> {
    const response = await fetch(this.endpoint + path)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const body = await response.json()
    if (body.success !== true) {
      throw new Error(body.error)
    }
    return body.data
  }

  /**
   * Fetch the set of available canteens.
   *
   * @returns {Promise} Resolves to an array of canteen objects.
   */
  async getCanteens (): Promise<any> {
    return await this._fetchApi('canteens')
  }

  /**
   * Fetch the set of legend entries containing 'short' and 'label' strings.
   *
   * @returns {Promise} Resolves to an array of legend objects.
   */
  async getLegend (): Promise<any> {
    return await this._fetchApi('meta/legend')
  }

  /**
   * Fetch the set of plan summaries.
   *
   * @returns {Promise} Resolves to an array of plan summary objects.
   */
  async getPlans (): Promise<any> {
    return await this._fetchApi('plans')
  }

  /**
   * Fetch the set of plans for the given date.
   *
   * @param {object} date A date object.
   * @returns {Promise} Resolves to an array of plans.
   */
  async getPlan (date: DateSpec): Promise<any> {
    const dateStr = formatDate(date)
    return await this._fetchApi(`plans/${dateStr}`)
  }
}

// EXPORT

// API_ENDPOINT is configurable (config.api.endpoint) and defined via webpack
declare const API_ENDPOINT: string

export default new API(API_ENDPOINT)