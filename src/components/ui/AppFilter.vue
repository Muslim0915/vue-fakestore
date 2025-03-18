<script lang="ts" setup>
import { ICategory } from "@/services/typing";
import { ref } from "vue";
import BurgerMenuButton from "@/components/ui/BurgerMenuButton.vue";

interface IProps {
  filters: ICategory[];
  filterValue: string;
}

const props = defineProps<IProps>();

const emits = defineEmits(["applyFilters", "toggleSidebar", "resetFilters"]);

const selectedFilter = ref(props.filterValue);
const isMenuOpen = ref(false);


const resetFilters = () => {
  emits("resetFilters");
};

const applyFilter = (value: string) => {
  selectedFilter.value = value;
  toggleMenu();
  emits("applyFilters", value);
  emits("toggleSidebar");
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <div class="flex flex-col relative h-full">
  <div class="flex flex-col gap-2 max-md:overflow-y-scroll
    max-md:fixed max-md:top-0 max-md:bottom-0 max-md:w-full max-md:shadow-md max-md:z-50
    left-0 top-0 max-md:bg-gray-900 transition-all ease-in-out duration-300
"
       :class="isMenuOpen ? 'max-md:left-0' : 'max-md:left-[-500%]'"
  >
    <BurgerMenuButton :isMenuOpen="isMenuOpen" class="absolute top-0 right-0" @toggleMenu="toggleMenu()" />
    <div
        class="py-2 px-4 cursor-pointer max-md:text-white transition duration-200"
        @click="resetFilters"
    >
      <p class="text-xl max-sm:text-sm font-bold">All</p>
    </div>
    <div
        v-for="(filter, index) in filters"
        :key="index"
        :class="[
        'py-2 px-4 cursor-pointer max-md:text-white transition duration-200',
      ]"
        role="button"
        tabindex="0"
        @click="applyFilter(filter.slug)"
    >
      <p class="text-xl max-sm:text-sm font-bold">{{ filter.name }}</p>
    </div>

  </div>
    <div class="md:hidden flex gap-5 items-center">
    <BurgerMenuButton
        :isMenuOpen="isMenuOpen"
        @toggleMenu="toggleMenu()"
    />
      <p class="text-2xl capitalize font-bold">{{ selectedFilter || "All" }}</p>
    </div>
  </div>
</template>
