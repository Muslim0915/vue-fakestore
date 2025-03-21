<script lang="ts" setup>
import AppButton from "@/components/ui/AppButton.vue";

defineProps({
  searchQuery: String,
});
const emits = defineEmits(["update:searchQuery", 'resetQuery']);
const updateSearchQuery = (query: string) => {
  emits("update:searchQuery", query);
}
const resetQuery = () => {
  emits('resetQuery');
}
</script>

<template>
  <div
      class="flex items-center border  border-gray-400 rounded-lg px-4 py-2 placeholder-white/50 dark:placeholder-gray-400">
    <input
        :value="searchQuery"
        class="flex-1 bg-transparent outline-none border-0"
        name="search"
        placeholder="Search"
        type="text"
        @input="updateSearchQuery(($event.target as HTMLInputElement).value)"
    />
    <AppButton @click="resetQuery">
      <img
          alt="close-icon"
          src="../../../public/images/svg/close-x.svg"
          width="24"
          height="24"
      >
    </AppButton>
  </div>
</template>
