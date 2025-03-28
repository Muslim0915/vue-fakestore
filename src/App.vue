<script lang="ts" setup>
import AppFooter from "@/components/AppFooter.vue";
import AppNavbar from "@/components/AppNavbar.vue";
</script>

<template>
  <div class="app">
    <AppNavbar />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  @apply font-karla min-h-screen w-full h-full flex flex-col bg-light-bg-color dark:bg-dark-bg-color dark:text-white transition-all ease-in-out duration-500;
}
main {
  @apply w-full mt-24 h-full flex flex-col flex-1 py-10;
}
</style>
