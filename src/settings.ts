import { EventEmitter } from 'events'

// CONSTANTS

const LOCALSTORAGE_KEY = 'mensa-ui.settings'

// HELPER METHODS

/**
 * Read the settings data from persistent storage.
 *
 * @returns {object} The data.
 */
function readLocalStorage (): Record<string, any> | undefined {
  const json = localStorage.getItem(LOCALSTORAGE_KEY)
  if (json != null) {
    try {
      return JSON.parse(json)
    } catch (e) {
    }
  }
  return undefined
}

/**
 * Write settings data to persistent storage.
 *
 * @param {object} data The data.
 * @returns {void}
 */
function writeLocalStorage (data: Record<string, any>): void {
  const json = JSON.stringify(data)
  localStorage.setItem(LOCALSTORAGE_KEY, json)
}

// CLASS DEFINITION

/**
 * Settings manager that persists user settings to local storage.
 */
class Settings extends EventEmitter {
  private _data: Record<string, any> = {}

  /**
   * Create a new settings manager. Data will be ready immediately.
   */
  constructor () {
    super()

    if (!this.load()) {
      this.save()
    }

    // past versions provided both 'vegan' and 'vegetarian' settings
    if (this.eatingHabits === 'vegan') {
      this.eatingHabits = 'vegetarian'
    }
  }

  /**
   * Re-load settings data from persistent storage.
   *
   * @access private
   * @returns {boolean} Success value.
   */
  load (): boolean {
    const stored = readLocalStorage()
    if (stored != null) {
      this._data = stored
      this.emit('update')
      return true
    }
    return false
  }

  /**
   * Write settings data to persistent storage.
   *
   * @access private
   * @returns {void}
   */
  save (): void {
    writeLocalStorage(this._data)
    this.emit('update')
  }

  /**
   * @returns {string} The page theme ('light', 'dark' or 'auto').
   */
  get theme (): string {
    return this._data.theme ?? 'auto'
  }

  set theme (value: string) {
    this._data.theme = value
    this.save()
  }

  /**
   * @returns {string[]} The canteens selected for display.
   */
  get canteens (): string[] {
    return this._data.canteens != null
      ? [...this._data.canteens]
      : ['adenauerring']
  }

  set canteens (value: string[]) {
    // remove duplicates
    this._data.canteens = Array.from(new Set(value))
    this.save()
  }

  /**
   * @returns {boolean} Whether canteen lines with no meals should be hidden.
   */
  get hideEmptyLines (): boolean {
    return typeof this._data.hideEmptyLines === 'boolean'
      ? this._data.hideEmptyLines
      : true
  }

  set hideEmptyLines (value: boolean) {
    this._data.hideEmptyLines = value
    this.save()
  }

  /**
   * @returns {string} The eating habits ('all' or 'vegetarian').
   */
  get eatingHabits (): string {
    return this._data.eatingHabits ?? 'all'
  }

  set eatingHabits (value) {
    this._data.eatingHabits = value
    this.save()
  }

  /**
   * @returns {boolean} Whether to highlight vegetarian + vegan menus.
   */
  get enableHighlights (): boolean {
    return typeof this._data.enableHighlights === 'boolean'
      ? this._data.enableHighlights
      : true
  }

  set enableHighlights (value: boolean) {
    this._data.enableHighlights = value
    this.save()
  }
}

// EXPORT

export default new Settings()
