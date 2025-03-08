<template>
  <button 
    v-if="!isAuthenticated && !loading" 
    class="login-btn" 
    @click="handleLogin"
  >
    Log In
  </button>
</template>

<script setup lang="ts">
import { useAuth } from '../auth/auth0Service';

const { isAuthenticated, loading, login } = useAuth();

const handleLogin = () => {
  login();
};
</script>

<style>
.login-btn {
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-right: 0.5rem;
}

.login-btn:hover {
  background-color: var(--vp-c-brand-dark);
}
</style>