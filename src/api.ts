import env from './env.js'
import type { DateSpec } from './types/date-spec.js'
import { formatDate } from './util/date.js'
import type { CanteenPlan } from './types/canteen-plan.js'
import type { Canteen } from './types/canteen.js'
import type { LegendItem } from './types/legend.js'

/**
 * API client class.
 */
class API {
  private readonly endpoint: URL

  /**
   * Create a new API client for the given endpoint URL.
   *
   * @param endpoint The endpoint URL to use.
   */
  constructor (endpoint: URL) {
    this.endpoint = endpoint
  }

  private async fetchApi (path: string): Promise<any> {
    const response = await fetch(new URL(path, this.endpoint))
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
    return await this.fetchApi(`plans/${encodeURIComponent(dateStr)}`)
  }
}

/**
 * Ensure the given parameter is a trimmed string ending with a slash.
 *
 * @param url The input URL.
 * @returns The fixed URL.
 */
function sanitizeUrl (url: any): URL {
  if (typeof url !== 'string') {
    throw new TypeError('expected the API endpoint to be a string')
  }
  const trimmed = url.trim()
  if (trimmed.length <= 0) {
    throw new TypeError('expected the API endpoint to not be empty')
  }
  // The trailing slash is important due to relative resolution behavior.
  // Example: new URL('foo/bar', 'https://example.com/abc').toString() === 'https://example.com/foo/bar'.
  // We want to resolve to 'https://example.com/abc/foo/bar' in that case, though.
  return new URL(trimmed.endsWith('/') ? trimmed : `${trimmed}/`)
}

export default new API(sanitizeUrl(env.API_ENDPOINT))
