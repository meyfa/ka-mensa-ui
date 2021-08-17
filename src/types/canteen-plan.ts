import { DateSpec } from './date-spec'

/**
 * An object containing data about a specific meal.
 */
export interface CanteenMeal {
  name: string
  price: string
  classifiers: string[]
  additives: string[]
}

/**
 * An object describing a line that is part of a canteen plan, and that contains a list of meals.
 */
export interface CanteenLine {
  id: string | null
  name: string
  meals: CanteenMeal[]
}

/**
 * An object as returned by HTTP route '/plans' in an array.
 */
export interface CanteenPlanSummary {
  date: DateSpec
}

/**
 * An object as returned by HTTP route '/plans/YYYY-MM-DD' in an array.
 */
export interface CanteenPlan extends CanteenPlanSummary {
  id: string | null
  canteen: {
    id: string
    name: string
  }
  lines: CanteenLine[]
}
