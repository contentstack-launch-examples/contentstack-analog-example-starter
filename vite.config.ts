/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { PrerenderRoute } from 'nitropack';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      ssr: true,
      prerender: {
        routes: ['/', '/about-us'],
        postRenderingHooks: [
          async (route: PrerenderRoute) => {
            // Log route information during prerendering
            console.log(`[Post-Rendering Hook] Processing route: ${route.route}`);
            console.log(`[Post-Rendering Hook] File name: ${route.fileName}`);
            
            // Modify content to add visible markers for testing
            if (route.contents) {
              const buildTime = new Date().toISOString();
              // Add a visible HTML comment at the top for easy verification
              const prerenderMarker = `<!-- 
  ✅ POST-RENDERING HOOK EXECUTED
  Route: ${route.route}
  File: ${route.fileName}
  Build Time: ${buildTime}
  This comment confirms the post-rendering hook ran successfully!
-->\n`;
              route.contents = prerenderMarker + route.contents;
              
              // Optional: Add a data attribute to body for programmatic testing
              if (route.contents.includes('<body')) {
                route.contents = route.contents.replace(
                  /<body([^>]*)>/,
                  `<body$1 data-prerendered="true" data-prerender-time="${buildTime}">`
                );
              }
              
              console.log(`[Post-Rendering Hook] ✅ Successfully processed: ${route.route}`);
            }
          },
        ],
      },
      nitro: {
        routeRules: {
          // SSR route should be server-rendered on each request (not prerendered)
          '/ssr': {
            ssr: true,
            headers: {
              'Cache-Control': 'no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          },
          // SSR API route with cache-control headers
          '/ssr-api': {
            ssr: true,
            headers: {
              'Cache-Control': 'no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          },
          // CSR route - client-side rendering only (no SSR)
          '/csr': {
            ssr: false,
          },
          // CSR Demo route - client-side rendering only (no SSR)
          '/csr-demo': {
            ssr: false,
          },
          // ISR route - Incremental Static Regeneration (regenerates every 40 seconds)
          '/isr': {
            ssr: true,
            headers: {
              'Cache-Control': 'public, s-maxage=40, stale-while-revalidate=60',
            },
          },
          // Cache Purge route - demonstrates cache purge using CacheTags
          '/cache-purge': {
            ssr: true,
            headers: {
              'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
              'Cache-Tag': 'cachetest',
            },
          },
          // Static assets - Vite built files with content hashes (safe to use immutable)
          '/assets/**': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000, immutable',
            },
          },
          // CSS files (only if they have content hashes, otherwise remove immutable)
          '/*.css': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          // JavaScript files (only if they have content hashes, otherwise remove immutable)
          '/*.js': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          // Image files (no immutable - files can be updated)
          '/*.jpg': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.jpeg': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.png': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.gif': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.svg': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.webp': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.ico': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          // Font files (no immutable - files can be updated)
          '/*.woff': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.woff2': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.ttf': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
          '/*.eot': {
            headers: {
              'Cache-Control': 'public, s-maxage=31536000',
            },
          },
        },
      },
    }),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
