import { EventEmitter } from 'events'

// CONSTANTS

const LOCALSTORAGE_KEY = 'mensa-ui.settings'

// HELPER METHODS

/**
 * Read the settings data from persistent storage.
 *
 * @returns The data.
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
 * @param data The data.
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
  private data: Record<string, any> = {}

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
   * @returns Success value.
   */
  private load (): boolean {
    const stored = readLocalStorage()
    if (stored != null) {
      this.data = stored
      this.emit('update')
      return true
    }
    return false
  }

  /**
   * Write settings data to persistent storage.
   */
  private save (): void {
    writeLocalStorage(this.data)
    this.emit('update')
  }

  /**
   * @returns The page theme ('light', 'dark' or 'auto').
   */
  get theme (): string {
    return this.data.theme ?? 'auto'
  }

  set theme (value: string) {
    this.data.theme = value
    this.save()
  }

  /**
   * @returns The canteens selected for display.
   */
  get canteens (): string[] {
    return this.data.canteens != null
      ? [...this.data.canteens]
      : ['adenauerring']
  }

  set canteens (value: string[]) {
    // remove duplicates
    this.data.canteens = Array.from(new Set(value))
    this.save()
  }

  /**
   * @returns Whether canteen lines with no meals should be hidden.
   */
  get hideEmptyLines (): boolean {
    return typeof this.data.hideEmptyLines === 'boolean'
      ? this.data.hideEmptyLines
      : true
  }

  set hideEmptyLines (value: boolean) {
    this.data.hideEmptyLines = value
    this.save()
  }

  /**
   * @returns The eating habits ('all' or 'vegetarian').
   */
  get eatingHabits (): string {
    return this.data.eatingHabits ?? 'all'
  }

  set eatingHabits (value) {
    this.data.eatingHabits = value
    this.save()
  }

  /**
   * @returns Whether to highlight vegetarian + vegan menus.
   */
  get enableHighlights (): boolean {
    return typeof this.data.enableHighlights === 'boolean'
      ? this.data.enableHighlights
      : true
  }

  set enableHighlights (value: boolean) {
    this.data.enableHighlights = value
    this.save()
  }
}

// EXPORT

export default new Settings()
