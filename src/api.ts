import { DateSpec } from './types/date-spec'
import { formatDate } from './util/date'
import { CanteenPlan } from './types/canteen-plan'
import { Canteen } from './types/canteen'
import { LegendItem } from './types/legend'

// CLASS DEFINITION

/**
 * API client class.
 */
class API {
  private readonly endpoint: string

  /**
   * Create a new API client for the given endpoint URL.
   *
   * @param endpoint The endpoint URL to use.
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

  private async fetchApi (path: string): Promise<any> {
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
   * @returns Resolves to an array of canteen objects.
   */
  async getCanteens (): Promise<Canteen[]> {
    return await this.fetchApi('canteens')
  }

  /**
   * Fetch the set of legend entries containing 'short' and 'label' strings.
   *
   * @returns Resolves to an array of legend objects.
   */
  async getLegend (): Promise<LegendItem[]> {
    return await this.fetchApi('meta/legend')
  }

  /**
   * Fetch the set of plan summaries.
   *
   * @returns Resolves to an array of plan summary objects.
   */
  async getPlans (): Promise<CanteenPlan[]> {
    return await this.fetchApi('plans')
  }

  /**
   * Fetch the set of plans for the given date.
   *
   * @param date A date object.
   * @returns Resolves to an array of plans.
   */
  async getPlan (date: DateSpec): Promise<CanteenPlan[]> {
    const dateStr = formatDate(date)
    return await this.fetchApi(`plans/${dateStr}`)
  }
}

// EXPORT

// API_ENDPOINT is configurable (config.api.endpoint) and defined via webpack
declare const API_ENDPOINT: string

export default new API(API_ENDPOINT)
