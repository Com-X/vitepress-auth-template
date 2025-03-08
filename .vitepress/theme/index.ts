import { Theme, inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './styles.css'

// Export custom theme
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // Initialize auth service for client-side only
    if (inBrowser) {
      // Auth is initialized in the AuthGuard component when mounted
      // to ensure it only runs in the browser context
      console.log('VitePress Auth theme initialized')
    }
  }
} satisfies Theme