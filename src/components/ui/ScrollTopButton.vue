<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
<template>
  <button
    class="fixed right-10 max-md:right-0 -rotate-90 bottom-10 w-[48px] h-[48px] flex items-center justify-center border border-black bg-white rounded-full hover:scale-105 transition duration-300"
    @click="scrollToTop()"
>
<img alt="arrow-up-icon" height="24" src="@/assets/images/svg/arrow-up.svg" width="24">
</button>
</template>