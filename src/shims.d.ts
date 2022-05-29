/**
 * Augmentation to import.meta.env.
 */
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_PRIVACY_POLICY_URL: string
}

/**
 * Augmentation to import.meta.
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'virtual:pwa-register' {
  /**
   * from vite-plugin-pwa
   */
  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegisterError?: (error: any) => void
  }

  export function registerSW (options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}
