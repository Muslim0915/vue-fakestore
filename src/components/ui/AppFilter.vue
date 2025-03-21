<script lang="ts" setup>
import { ref } from "vue";
import BurgerMenuButton from "@/components/ui/BurgerMenuButton.vue";

interface IProps {
  filters: { name: string, slug: string, url: string }[];
  filterValue: string;
}

defineProps<IProps>();
const emits = defineEmits(["applyFilters"]);

const selectedFilter = ref('All Products');
const isMenuOpen = ref(false);

const applyFilter = (filter: { slug: string, url: string }) => {
  selectedFilter.value = filter.slug;
  emits("applyFilters", filter);
  isMenuOpen.value = false;
};
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

</script>

<template>
  <div class="flex flex-col relative h-full">
    <div class="flex flex-col gap-4 max-md:overflow-y-scroll
      max-md:fixed max-md:top-0 max-md:bottom-0 max-md:w-full max-md:shadow-md max-md:z-50
      left-0 top-0 max-md:bg-gray-900 transition-all ease-in-out duration-300"
         :class="isMenuOpen ? 'max-md:left-0' : 'max-md:left-[-500%]'"
    >
      <BurgerMenuButton :isMenuOpen="isMenuOpen" class="absolute top-0 right-0" @toggleMenu="toggleMenu()" />
      <div v-for="(filter, index) in filters" :key="index"
           class="py-4 border-b border-gray-400 px-4 cursor-pointer max-md:text-white transition duration-200"
           role="button"
           @click="applyFilter(filter)"
           :class="selectedFilter === filter.slug ? 'bg-gray-100 text-gray-900' : ''"
      >
        <p class="text-xl max-sm:text-sm font-bold">{{ filter.name }}</p>
      </div>
    </div>
    <div class="md:hidden flex gap-5 items-center">
      <BurgerMenuButton :isMenuOpen="isMenuOpen" class="absolute top-0 right-0" @toggleMenu="toggleMenu()" />
      <p class="text-2xl capitalize font-bold">{{ selectedFilter || "All" }}</p>
    </div>
  </div>
</template>
