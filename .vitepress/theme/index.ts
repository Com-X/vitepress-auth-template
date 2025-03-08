import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './styles.css'
import { useAuth } from '../auth/auth0Service'

// Export custom theme
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // Initialize auth service for client-side only
    if (typeof window !== 'undefined') {
      // We'll initialize the authentication when the AuthGuard component mounts
      // This ensures it runs in the browser context only
      console.log('Auth0 integration ready')
    }
  }
} satisfies Theme