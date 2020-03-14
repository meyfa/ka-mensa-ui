// CONSTANTS

const CLASSIFIER_VEGETARIAN = 'VEG'

const CLASSIFIER_VEGAN = 'VG'

// EXPORTS

/**
 * Determine whether the given meal is strictly vegetarian.
 *
 * This returns false for vegan meals.
 *
 * @param {object} meal The meal.
 * @returns {boolean} Whether the meal is vegetarian.
 */
export function isVegetarian (meal) {
  return meal.classifiers.includes(CLASSIFIER_VEGETARIAN)
}

/**
 * Determine whether the given meal is strictly vegan.
 *
 * @param {object} meal The meal.
 * @returns {boolean} Whether the meal is vegan.
 */
export function isVegan (meal) {
  return meal.classifiers.includes(CLASSIFIER_VEGAN)
}
