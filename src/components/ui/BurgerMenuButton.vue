<script lang="ts" setup>


interface IProps {
  isMenuOpen: boolean
}

defineProps<IProps>();

const emits = defineEmits(['toggleMenu']);

const toggleMenu = () => {
  emits('toggleMenu')
}
</script>

<template>
  <button class="px-4 py-2 outline-none md:hidden" @click="toggleMenu()">
    <img
        :src="!isMenuOpen ? '/images/svg/burger-menu.svg' : '/images/svg/close-x.svg'"
        alt="cart-icon"
        width="50"
        height="50"
        class="dark:invert"
    >
  </button>
</template>