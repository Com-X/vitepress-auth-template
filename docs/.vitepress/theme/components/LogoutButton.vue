<template>
  <div>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script lang="ts" allowJs="true">
// @ts-nocheck
import auth from "../../auth";
export default {
  props: ["client"],
  methods: {
    async logout() {
      await auth.logout(this.client);
    },
  },
};
</script>