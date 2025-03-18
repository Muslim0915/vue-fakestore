<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useAuthStore } from "@/stores/authStore";
import AppButton from "@/components/ui/AppButton.vue";
import AppLogo from "@/components/AppLogo.vue";
import BurgerMenuButton from "@/components/ui/BurgerMenuButton.vue";
import { useCartStore } from "@/stores/cartStore.ts";

const cartStore = useCartStore();
const authStore = useAuthStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);
const isMenuOpen = ref(false);

const counterCard = computed(() => cartStore.state.cartItems.length);

const routes = computed(() => {
  if (authStore.user) {
    return [
      { id: 1, path: "/", title: "Home" },
      { id: 2, path: "/products", title: "Products" },
    ];
  }
  return [
    { id: 1, path: "/", title: "Home" },
    { id: 2, path: "/products", title: "Products" },
    { id: 3, path: "/signup", title: "Sign Up" },
    { id: 4, path: "/login", title: "Login" },
  ];
});

const themeImagePath = ref("");

watch(
    isDark,
    () => {
      themeImagePath.value = isDark.value
          ? "/images/svg/dark-mode.svg"
          : "/images/svg/light-mode.svg";
    },
    { immediate: true }
);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="w-full tracking-widest flex flex-col h-[100px] fixed z-10 top-0 left-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-300">
    <div class="container w-full h-full flex flex-1 items-center justify-between">
      <AppLogo class="max-md:w-1/3"/>
      <div class="flex items-center gap-10 max-md:flex-col max-md:absolute max-md:top-0 max-md:w-full max-md:flex-grow max-md:min-h-screen max-md:bg-white dark:bg-gray-900 max-md:shadow-md max-md:z-10 max-md:pt-10 transition-all ease-in-out duration-300"
           :class="isMenuOpen ? 'max-md:right-0' : 'max-md:right-[-200%]'"
      >
        <div v-for="route in routes" :key="route.id" @click="toggleMenu()">
          <router-link :to="route.path" class="xl:text-2xl font-bold mr-4 uppercase">
            {{ route.title }}
          </router-link>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <AppButton @click="$router.push('/cart')" class="w-full h-full flex justify-center relative items-center xl:px-4 xl:py-2">
          <div class="relative">
            <img
                src="@/assets/images/svg/shopping-bag.svg"
                alt="cart-icon"
                width="50"
                height="50"
                :class="isDark ? 'invert' : ''"
                class="max-sm:w-10 max-sm:h-10">
          </div>
          <span v-if="counterCard > 0"
                class="absolute -top-0 -right-0 text-sm font-karla font-bold text-white bg-red-500 rounded-full w-6 h-6 flex justify-center items-center">
            {{ counterCard }}
          </span>
        </AppButton>
        <AppButton @click="toggleDark()" class="w-full flex justify-center items-center h-full xl:px-4 xl:py-2">
          <img
              :src="themeImagePath"
              :class="isDark ? 'invert' : ''"
              alt="theme-icon"
              width="50"
              height="50"
              class="max-sm:w-10 max-sm:h-10"
          >
        </AppButton>
          <button
              v-if="authStore.user"
              @click="$router.push('/profile')" class="flex justify-center items-center border border-black dark:border-white w-full  rounded-full"
          >
            <img src="@/assets/images/svg/user-icon.svg" alt="user-icon" width="50" height="50" class=" dark:invert max-sm:w-10 max-sm:h-10">
          </button>

        <BurgerMenuButton :isMenuOpen="isMenuOpen" @toggleMenu="toggleMenu()" class="w-full h-full z-20"/>
      </div>
    </div>
  </div>
</template>
