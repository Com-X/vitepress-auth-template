---
outline: deep
protected: true
---

# VitePress Runtime API Tutorial

This page provides a comprehensive tutorial on the core Runtime APIs available in VitePress. These APIs allow you to access site data, manage navigation, and enhance your documentation with dynamic features.

<script setup lang="ts">
// Import only the necessary APIs
import { useData, useRoute, useRouter } from 'vitepress';

// Only execute client-side code when in browser context
const isBrowser = typeof window !== 'undefined';

// useData API
const { site, theme, page, frontmatter } = useData();

// useRoute API
const route = useRoute();

// useRouter API
const router = useRouter();
</script>

## The useData API

The core `useData()` API provides access to site, theme, page, and frontmatter data for the current page.

```vue
<script setup>
import { useData } from 'vitepress'
const { site, theme, page, frontmatter } = useData()
</script>

<template>
  <!-- Use the data in your template -->
  <p>Site title: {{ site.title }}</p>
  <p>Current page: {{ page.relativePath }}</p>
</template>
```

### Live Example

<div class="api-example-box">
  <h4>Site Data</h4>
  <pre>{{ site }}</pre>
  
  <h4>Theme Data</h4>
  <pre>{{ theme }}</pre>
  
  <h4>Page Data</h4>
  <pre>{{ page }}</pre>
  
  <h4>Page Frontmatter</h4>
  <pre>{{ frontmatter }}</pre>
</div>

## Navigation Helpers

VitePress provides several APIs for working with navigation.

### useRoute

The `useRoute` API gives you access to the current route information.

```vue
<script setup>
import { useRoute } from 'vitepress'
const route = useRoute()
</script>

<template>
  <p>Current path: {{ route.path }}</p>
  <p>Route data: {{ route.data }}</p>
</template>
```

#### Live Example

<div class="api-example-box">
  <p><strong>Current path:</strong> {{ route.path }}</p>
  <div><strong>Route data:</strong></div>
  <pre>{{ route.data }}</pre>
</div>

## Navigation Management

### useRouter

The `useRouter` API allows you to programmatically navigate between pages.

```vue
<script setup>
import { useRouter } from 'vitepress'
const router = useRouter()

function navigate(path) {
  router.go(path)
}
</script>

<template>
  <button @click="navigate('/')">Go Home</button>
</template>
```

#### Live Example

<div class="api-example-box">
  <button class="custom-button" @click="router.go('/')">Go Home</button>
  <button class="custom-button" @click="router.go('/markdown-examples')">Go to Markdown Examples</button>
</div>

<style>
.api-example-box {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  overflow: auto;
}

.custom-button {
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s;
}

.custom-button:hover {
  background-color: var(--vp-c-brand-dark);
}

pre {
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  padding: 12px;
  max-height: 200px;
  overflow: auto;
  font-size: 0.85em;
}
</style>
