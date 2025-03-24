<template>
    <div class="login-page">
        <div class="login-container">
            <h1>Sign In</h1>

            <LoginForm buttonText="Sign In" redirectUrl="/" :showIcon="true" />

            <div class="home-link">
                <a :href="withBase('/')">Return to Home Page</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress';
import LoginForm from './LoginForm.vue';
</script>

<style>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--vp-c-bg);
    padding: 20px;
}

.login-container {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--vp-c-brand);
}

.home-link {
    margin-top: 1.5rem;
    text-align: center;
}

.home-link a {
    color: var(--vp-c-brand);
    text-decoration: none;
}

.home-link a:hover {
    text-decoration: underline;
}

/* Dark mode adjustments */
.dark .login-container {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>