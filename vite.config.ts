import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
    allowedHosts: ['home.cachetest.io'],
    headers: {
      'Accept-Ranges': 'bytes',
      'Content-Security-Policy': `default-src https: 'unsafe-inline' 'unsafe-eval' data: mediastream: blob: filesystem: wss://*.hotjar.com wss://*.userpilot.io wss://*.intercom.io; frame-ancestors 'self' *.cachetest.io;`,
      'Referrer-Policy': 'no-referrer-when-downgrade',
      'Strict-Transport-Security': 'max-age=31536000',
    },
  },
  clearScreen: false,
})
