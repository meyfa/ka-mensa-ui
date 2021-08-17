/**
 * Description of a Canteen Line (not including plan data, just metadata),
 * included as part of the response to HTTP request to '/canteens'.
 */
export interface Line {
  id: string
  name: string
  alternativeNames?: string[]
}

/**
 * Description of a Canteen, including its lines (but not including any plan data),
 * as in the response to HTTP request to '/canteens'.
 */
export interface Canteen {
  id: string
  name: string
  lines: Line[]
}
