// CONSTANTS

const LOCALSTORAGE_KEY = 'mensa-ui.settings-pulse'

const VERSION = 2

// CLASS DEFINITION

/**
 * This object manages the 'settings pulse'. When the settings dialog is changed
 * to offer significant new features to users, the above VERSION is incremented.
 * Additionally, the version last shown to the user is stored. This object then
 * compares the two and determines whether or not there have been updates.
 */
class SettingsPulse extends EventTarget {
  /**
   * @returns Whether the user has seen the most recent settings.
   */
  get isCurrent (): boolean {
    const value = localStorage.getItem(LOCALSTORAGE_KEY)
    return value != null && Number.parseInt(value, 10) === VERSION
  }

  /**
   * Mark the current settings version as having been seen by the user.
   */
  markCurrent (): void {
    localStorage.setItem(LOCALSTORAGE_KEY, VERSION.toString())
    this.dispatchEvent(new Event('mark'))
  }
}

// EXPORT

export default new SettingsPulse()
