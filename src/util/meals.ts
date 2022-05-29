import type { CanteenMeal } from '../types/canteen-plan'

// CONSTANTS

const CLASSIFIER_VEGETARIAN = 'VEG'

const CLASSIFIER_VEGAN = 'VG'

// EXPORTS

/**
 * Determine whether the given meal is strictly vegetarian.
 *
 * This returns false for vegan meals.
 *
 * @param meal The meal.
 * @returns Whether the meal is vegetarian.
 */
export function isVegetarian (meal: CanteenMeal): boolean {
  return meal.classifiers.includes(CLASSIFIER_VEGETARIAN)
}

/**
 * Determine whether the given meal is strictly vegan.
 *
 * @param meal The meal.
 * @returns Whether the meal is vegan.
 */
export function isVegan (meal: CanteenMeal): boolean {
  return meal.classifiers.includes(CLASSIFIER_VEGAN)
}

/**
 * Determine whether the given meal is an informational entry, i.e. not a meal.
 *
 * @param meal The meal.
 * @returns Whether the meal is informational.
 */
export function isInfo (meal: CanteenMeal): boolean {
  return meal.classifiers.length === 0 && meal.additives.length === 0
}
