<script lang="ts" setup>

import SocialIcons from "@/components/SocialIcons.vue";
</script>

<template>
  <footer class="h-[100px] max-md:py-2 w-full bg-gray-100 dark:bg-gray-900 border-t-2 border-gray-300">
    <div class="container h-full flex items-center gap-3 justify-between max-md:flex-col">
         <p>
           &copy; 2025 FakeStore All rights reserved
         </p>
        <div class="flex w-1/2 max-md:w-full justify-between items-center">
         <p>
           Developed by <span class="font-bold">Muslim</span>
         </p>
         <SocialIcons />
        </div>
       </div>
  </footer>
</template>
