/**
 * This file facilitates access to config options, which may be defined via the config.js during build time
 * but may also be overridden at run-time via Docker environment variables and injected by envsubst inside
 * the nginx config.
 */

/**
 * This interface contains all available options.
 */
export interface Env {
  API_ENDPOINT: string
  PRIVACY_POLICY_URL: string
}

// webpack definitions
declare const API_ENDPOINT: string
declare const PRIVACY_POLICY_URL: string

// environment variables on window object
declare global {
  /**
   * Extension of window to allow access to env.
   */
  interface Window {
    env?: Partial<Env>
  }
}

/**
 * Given a set of env values prioritized by order, get the first valid one.
 *
 * @param key The option key.
 * @param fallback The value injected via Webpack.
 * @returns The chosen option.
 */
function resolve<K extends keyof Env> (key: K, fallback: string): string {
  const valueOnWindow = window.env != null ? window.env[key] : undefined
  if (valueOnWindow != null && valueOnWindow !== '') {
    return valueOnWindow
  }
  return fallback
}

const computedEnv: Env = {
  API_ENDPOINT: resolve('API_ENDPOINT', API_ENDPOINT),
  PRIVACY_POLICY_URL: resolve('PRIVACY_POLICY_URL', PRIVACY_POLICY_URL)
}

/**
 * The fully resolved options for this build.
 */
export default computedEnv
