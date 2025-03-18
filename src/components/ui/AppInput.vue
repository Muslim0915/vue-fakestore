<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  modelValue: string;
  type?: string;
  label: string;
  placeholder: string;
  error?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  error: "",
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<template>
  <div>
    <label :for="id" class="block text-gray-900 dark:text-white text-sm mb-2">{{ label }}</label>
    <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        class="w-full px-4 py-3 rounded-lg border transition duration-200
            bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            border-gray-300 dark:border-gray-600"
        :class="{ 'border-red-500 dark:border-red-400': error }"
        :id="id"
    />
    <p v-if="error" class="text-red-500 dark:text-red-400 text-sm mt-1">{{ error }}</p>
  </div>
</template>
