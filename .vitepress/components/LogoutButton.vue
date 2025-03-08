<template>
  <button 
    v-if="isAuthenticated && !loading" 
    class="logout-btn"
    title="Log out" 
    @click="handleLogout"
    aria-label="Log out"
  >
    <span class="logout-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useAuth } from '../auth/auth0Service';

const { isAuthenticated, loading, logout } = useAuth();

const handleLogout = () => {
  logout();
};
</script>

<style>
.logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 1rem;
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

.logout-btn:hover {
  background-color: var(--vp-c-bg-soft-up);
  color: var(--vp-c-brand);
}

.logout-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .logout-text {
    display: none;
  }
  
  .logout-btn {
    padding: 0.5rem;
  }
}

.dark .logout-btn {
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.05);
}
</style>