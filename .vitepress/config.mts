import { defineConfig } from 'vitepress'
import { loadEnv } from 'vite'

const env = loadEnv('', process.cwd(), '')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-auth-template/',
  title: "Auth0 Vitepress Template",
  description: "Auth0 Vitepress Template",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Protected', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Protected Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Com-X/vitepress-auth-template' }
    ],

    // Explicitly disable Algolia search
    search: {
      provider: 'local'
    }
  },

  // Define environment variables to expose to the client
  vite: {
    define: {
      'import.meta.env.AUTH0_DOMAIN': JSON.stringify(env.AUTH0_DOMAIN || ''),
      'import.meta.env.AUTH0_CLIENT_ID': JSON.stringify(env.AUTH0_CLIENT_ID || ''),
      'import.meta.env.AUTH0_REDIRECT_URI': JSON.stringify(env.AUTH0_REDIRECT_URI || '')
    },
    optimizeDeps: {
      include: ['vue', '@auth0/auth0-spa-js']
    },
    server: {
      fs: {
        allow: ['..']
      }
    }
  }
})
