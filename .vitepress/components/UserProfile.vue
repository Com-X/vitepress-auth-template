<template>
  <div v-if="isAuthenticated && userData" class="user-profile">
    <div class="user-avatar" :title="userData.name || userData.email">
      <img v-if="userData.picture" :src="userData.picture" alt="Profile" class="avatar" />
      <div v-else class="avatar-placeholder">{{ userInitials }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../auth/auth0Service';
import { computed } from 'vue';

const { user, isAuthenticated } = useAuth();

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
</script>

<style>
.user-profile {
  display: flex;
  align-items: center;
  padding: 0.25rem;
  margin: 0 0.75rem 0 0.5rem;
}

.user-avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-brand);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.avatar-placeholder {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid transparent;
  transition: transform 0.2s ease;
}

.user-avatar:hover .avatar,
.user-avatar:hover .avatar-placeholder {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dark .avatar {
  border-color: var(--vp-c-brand-lighter);
}

.dark .user-avatar:hover .avatar,
.dark .user-avatar:hover .avatar-placeholder {
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}
</style>