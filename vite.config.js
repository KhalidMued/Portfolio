import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // The contact form posts to /api/contact, which is a Cloudflare Worker
      // route — Vite's dev server knows nothing about it. Run `npm run dev`
      // and `npm run dev:worker` side by side and the form works locally;
      // without the Worker running this just fails, which is the honest
      // outcome rather than a silent success.
      '/api': 'http://127.0.0.1:8787',
    },
  },
  build: {
    // three/react-three are intentionally split into their own deferred vendor
    // chunks above the default 500 kB threshold; initial paint only loads ~141 kB.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split heavy vendor libs into separate cacheable chunks so the main
        // bundle drops below the 500 kB warning and deferred 3D code (React.lazy)
        // does not drag three.js into the initial paint.
        manualChunks: {
          three: ['three'],
          'react-three': ['@react-three/drei', '@react-three/fiber'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
})
