<template>
  <button 
    v-if="!isAuthenticated && !loading" 
    class="login-btn" 
    @click="handleLogin"
    title="Log in to access protected content"
  >
    <span class="login-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
    </span>
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
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.login-btn:hover {
  background-color: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.login-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .login-btn {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.dark .login-btn:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .login-btn {
    padding: 0.5rem 0.75rem;
  }
}
</style>