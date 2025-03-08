<template>
  <ClientOnly>
    <!-- Wrap the entire layout with the AuthGuard -->
    <AuthGuard>
      <DefaultTheme.Layout>
        <!-- Add user profile component to navbar -->
        <template #navbar-before>
          <LoginButton />
          <UserProfile />
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
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>