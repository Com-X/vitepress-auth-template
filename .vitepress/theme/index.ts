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
      console.log('Auth0 integration ready')
    }
  }
} satisfies Theme