<script setup lang="ts">
const socialLinks = [
  {id: 1, src: '/images/svg/telegram.svg', href: 'https://t.me/qpaHaPuK'},
  {id: 2, src: '/images/svg/github.svg', href: 'https://github.com/Muslim0915'},
  {id: 3, src: '/images/svg/instagram.svg', href: 'https://www.instagram.com/muslim0915_/'},
]
</script>

<template>
  <div class="flex justify-center items-center gap-10">
    <a
        v-for="socialLink in socialLinks"
        :key="socialLink.id"
        :href="socialLink.href"
        target="_blank"
        class=" w-10 h-10 flex items-center justify-center border border-black bg-white rounded-full hover:scale-105 transition duration-300"
    >
      <img
          :src="socialLink.src"
          width="24"
          height="24"
          alt="socialLogo"
      >
    </a>
  </div>
</template>
