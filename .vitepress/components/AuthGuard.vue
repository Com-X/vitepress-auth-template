<template>
  <div v-if="loading" class="auth-loading">
    <div class="loader"></div>
    <div>Loading authentication...</div>
  </div>
  <div v-else-if="requiresAuth && !isAuthenticated" class="auth-login">
    <div class="login-container">
      <h2>Authentication Required</h2>
      <p>This content is protected. Please log in to continue.</p>
      <button class="login-button" @click="handleLogin">Log In</button>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { useAuth } from '../auth/auth0Service';
import { useData } from 'vitepress';
import { onMounted, computed } from 'vue';

const { frontmatter } = useData();
const { initAuth, login, isAuthenticated, loading } = useAuth();

// Check if the current page requires authentication
const requiresAuth = computed(() => {
  return frontmatter.value.protected === true;
});

// Handle login
const handleLogin = () => {
  login();
};

// Initialize authentication on component mount
onMounted(async () => {
  await initAuth();
});
</script>

<style>
.auth-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 1.2rem;
  gap: 20px;
}

.loader {
  border: 5px solid var(--vp-c-bg-soft);
  border-top: 5px solid var(--vp-c-brand);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.auth-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.login-container {
  max-width: 400px;
  padding: 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--vp-c-brand-dark);
}
</style>