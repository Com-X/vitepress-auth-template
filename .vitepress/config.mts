import { defineConfig } from 'vitepress'
import { loadEnv } from 'vite'

// Load environment variables
const env = loadEnv('', process.cwd(), '')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Auth0 Template",
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },

  // Define environment variables to expose to the client
  vite: {
    define: {
      'import.meta.env.AUTH0_DOMAIN': JSON.stringify(env.AUTH0_DOMAIN || ''),
      'import.meta.env.AUTH0_CLIENT_ID': JSON.stringify(env.AUTH0_CLIENT_ID || '')
    }
  }
})
