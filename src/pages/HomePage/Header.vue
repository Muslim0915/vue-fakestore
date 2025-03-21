<script lang="ts" setup>
import AppButton from "@/components/ui/AppButton.vue";

const qualities = [
  {id: 1, title: '200+', text: 'International Brands'},
  {id: 2, title: '2,000+', text: 'High-Quality Products'},
  {id: 3, title: '30,000+', text: 'Happy Customers'},
];
</script>

<template>
  <header class="w-full flex flex-col dark:bg-dark-bg-color">
    <div class="container h-full flex justify-between max-md:flex-col">
      <div class="flex flex-col items-start justify-center gap-8 max-md:py-6 h-full w-1/2 max-md:w-full py-28">
        <h1 class="text-6xl max-md:text-4xl leading-tight font-bold dark:text-white">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p class="text-gray-500 dark:text-white text-xl">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality
          and cater to your sense of style.
        </p>
        <AppButton
            @click="$router.push('/products')"
            class="bg-dark-bg-color border  dark:bg-white text-white
            font-bold font-karla text-2xl
            dark:text-black
            dark:hover:bg-transparent max-md:w-full
            dark:hover:text-white dark:hover:border-white
            hover:text-gray-900
            border-gray-900
            py-4 px-16">
          Shop Now
        </AppButton>
        <div class="flex justify-between items-center gap-10 max-md:flex-col max-md:items-start">
          <div v-for="quality in qualities" :key="quality.id">
            <h2 class="text-4xl font-bold">
              {{ quality.title }}
            </h2>
            <p class="text-gray-500 text-lg">
              {{ quality.text }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src="@/assets/images/png/homepage-herobg.png" alt="hero">
      </div>
    </div>
  </header>
</template>