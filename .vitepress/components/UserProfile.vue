<template>
  <div v-if="isAuthenticated && userData" class="user-profile">
    <div class="user-info">
      <img v-if="userData.picture" :src="userData.picture" alt="Profile" class="avatar" />
      <div v-else class="avatar-placeholder">{{ userInitials }}</div>
      <span class="user-name">{{ userData.name || userData.email }}</span>
    </div>
    <button class="logout-button" @click="handleLogout">Log Out</button>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../auth/auth0Service';
import { computed } from 'vue';

const { user, isAuthenticated, logout } = useAuth();

const userData = computed(() => user.value);

const userInitials = computed(() => {
  if (!userData.value) return '';
  
  const name = userData.value.name || userData.value.email || '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

const handleLogout = () => {
  logout();
};
</script>

<style>
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5rem;
  margin-right: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.user-name {
  font-size: 0.9rem;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-button {
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
  background-color: var(--vp-c-gray-light-3);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: var(--vp-c-gray-light-4);
}

@media (max-width: 768px) {
  .user-name {
    display: none;
  }
}
</style>