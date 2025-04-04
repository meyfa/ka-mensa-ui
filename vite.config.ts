import { defineConfig, loadEnv, type PluginOption, type ServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Page information for the meta inject plugin.
 */
interface PageMeta {
  name: string
  lang: string
  favicon: string
  apple_touch_icon: string
  description: string
  theme_color: string
}

/**
 * Factory for a Vite plugin that injects PWA manifest options into the page as meta tags.
 *
 * @param manifest The page metadata.
 * @returns The plugin.
 */
function injectPageMeta (manifest: PageMeta): PluginOption {
  return {
    name: 'inject-manifest-meta',
    transformIndexHtml: (html) => ({
      html: html
        .replace(/<html>/, `<html lang="${manifest.lang}">`)
        .replace(/<title>(.*?)<\/title>/, `<title>${manifest.name}</title>`),
      tags: [
        {
          tag: 'link',
          attrs: { rel: 'icon', href: manifest.favicon },
          injectTo: 'head'
        },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: manifest.apple_touch_icon, sizes: '180x180' },
          injectTo: 'head'
        },
        {
          tag: 'meta',
          attrs: { name: 'description', content: manifest.description },
          injectTo: 'head'
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: manifest.theme_color },
          injectTo: 'head'
        }
      ]
    })
  }
}

const manifest = {
  name: 'KA Mensa',
  short_name: 'KA Mensa',
  description: 'Mensaplan für Karlsruhe',
  lang: 'de',
  scope: '/',
  start_url: '/?source=pwa',
  display: 'standalone' as const,
  orientation: 'portrait' as const,
  icons: [192, 512, 1024].map((size) => ({
    src: `icon-${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
    purpose: 'any maskable'
  })),
  background_color: '#dedddc',
  theme_color: '#5f9e40'
}

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vue(),
    VitePWA({
      manifestFilename: 'manifest.json',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest
    }),
    injectPageMeta({
      ...manifest,
      favicon: 'favicon.ico',
      apple_touch_icon: 'apple-touch-icon.png'
    }),
    // During development, inject an override for the API endpoint to proxy it via the dev server.
    {
      apply: 'serve', // only in dev mode
      name: 'inject-api-endpoint',
      transformIndexHtml: (html) => ({
        html,
        tags: [
          {
            tag: 'script',
            children: 'window.env = { API_ENDPOINT: new URL("/api/", location.href).toString() }'
          }
        ]
      })
    }
  ],
  server: command === 'serve' ? getServerOptions(mode) : undefined
}))

/**
 * Node.js process object.
 */
interface Process {
  cwd: () => string
}

// Avoid including @types/node in the dependencies, as this is foremost a frontend project.
declare const process: Process

const getServerOptions = (mode: string): ServerOptions => {
  const env = loadEnv(mode, process.cwd())

  const apiEndpoint = env.VITE_API_ENDPOINT
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (apiEndpoint == null || apiEndpoint === '') {
    throw new Error('Please set environment variable VITE_API_ENDPOINT')
  }

  return {
    // Proxy API requests to remove CORS headers that would interfere with development on localhost.
    proxy: {
      '/api': {
        target: apiEndpoint,
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['access-control-allow-origin'] = '*'
            proxyRes.headers['access-control-allow-methods'] = '*'
            proxyRes.headers['access-control-allow-headers'] = '*'
          })
        }
      }
    }
  }
}
