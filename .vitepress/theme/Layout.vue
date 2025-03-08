<template>
  <ClientOnly>
    <!-- Wrap the entire layout with the AuthGuard -->
    <AuthGuard>
      <DefaultTheme.Layout>
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
import DefaultTheme from 'vitepress/theme'
import AuthGuard from '../components/AuthGuard.vue'
import UserProfile from '../components/UserProfile.vue'
import LoginButton from '../components/LoginButton.vue'
import LogoutButton from '../components/LogoutButton.vue'
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