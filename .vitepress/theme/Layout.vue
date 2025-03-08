<template>
  <ClientOnly>
    <!-- Wrap the entire layout with the AuthGuard -->
    <AuthGuard>
      <DefaultTheme.Layout>
        <!-- Create a nav container for our auth components -->
        <template #nav-bar-content-before>
          <div class="auth-nav-container">
            <LoginButton />
            <LogoutButton />
            <UserProfile />
          </div>
        </template>
      </DefaultTheme.Layout>
    </AuthGuard>
  </ClientOnly>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import AuthGuard from '../components/AuthGuard.vue'

// Use defineAsyncComponent to load components only when needed
const UserProfile = defineAsyncComponent(() => 
  import('../components/UserProfile.vue')
)
const LoginButton = defineAsyncComponent(() => 
  import('../components/LoginButton.vue')
)
const LogoutButton = defineAsyncComponent(() => 
  import('../components/LogoutButton.vue')
)
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<style>
.auth-nav-container {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .auth-nav-container {
    margin-right: 0;
  }
}
</style>