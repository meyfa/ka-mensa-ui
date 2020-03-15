// STATE

let enabled = true

// EXPORTS

/**
 * Disable the global scroll bar.
 */
export function disableScrolling () {
  if (!enabled) {
    return
  }
  const previousBodyWidth = document.body.offsetWidth
  document.documentElement.classList.add('noscroll')
  // adjust body padding to remove 'jumping' because of hidden scrollbar
  const scrollbarWidth = document.body.offsetWidth - previousBodyWidth
  document.body.style.paddingRight = scrollbarWidth + 'px'
  enabled = false
}

/**
 * Enable the global scroll bar.
 */
export function enableScrolling () {
  if (enabled) {
    return
  }
  document.documentElement.classList.remove('noscroll')
  document.body.style.paddingRight = ''
  enabled = true
}
