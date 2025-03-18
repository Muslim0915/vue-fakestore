<script lang="ts" setup>
const brands = [
  {id: 1, url: '/images/png/versace.png'},
  {id: 2, url: '/images/png/zara.png'},
  {id: 2, url: '/images/png/gucci.png'},
  {id: 2, url: '/images/png/prada.png'},
  {id: 2, url: '/images/png/calvin-klein.png'},

]
</script>

<template>
  <div class="bg-black py-12">
    <div class="container flex justify-between items-center max-md:flex-col max-md:gap-6">
      <div v-for="brand in brands" :key="brand.id">
        <img :src="brand.url" alt="brand">
      </div>
    </div>

  </div>
</template>