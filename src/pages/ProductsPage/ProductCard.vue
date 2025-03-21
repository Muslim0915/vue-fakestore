<script lang="ts" setup>
import {IProduct} from "@/services/typing";
import AppButton from "@/components/ui/AppButton.vue";
import {useCartStore} from "@/stores/cartStore.ts";

const cartStore = useCartStore();

interface IProps {
  product: IProduct;
}

defineProps<IProps>();
const saveSelectedProduct = (product: IProduct) => {
  sessionStorage.setItem("selectedProduct", JSON.stringify(product));
};
</script>

<template>
  <div
      class="flex flex-col gap-4 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-900 dark:shadow-gray-300
      shadow-gray-700 shadow cursor-pointer hover:shadow-current hover:shadow-xl  transition
      duration-300 p-4 "
      @click="saveSelectedProduct(product);
      $router.push(`/products/${product.id}`);"
  >
    <div class="h-full w-full flex flex-col items-center">
      <img
          :alt="product.category"
          :src="product.images[0]"
          class="rounded-lg object-cover w-3/5 h-full"
      />
    </div>
    <h3 class="text-xl font-bold ">
      {{ product.title }}
    </h3>
    <p class="font-bold text-2xl">
      Price {{ product.price }}$
    </p>
    <div class="flex items-center gap-6 flex-col">
      <AppButton
          class="w-full p-2 max-sm:p-1 bg-transparent border border-gray-800 text-gray-800 dark:text-white dark:border-white hover:bg-gray-800 hover:text-white dark:hover:text-gray-800 dark:hover:bg-white transition-colors duration-300"
          @click="saveSelectedProduct(product);
      $router.push(`/products/${product.id}`);"
      >
        Details
      </AppButton>
      <div class="w-full" @click.stop>
      <AppButton
          class="w-full p-2 max-sm:p-1 bg-gray-800 text-white border border-gray-800
        dark:bg-white dark:text-gray-800 dark:border-white hover:bg-transparent
        hover:text-gray-800 dark:hover:text-white dark:hover:bg-transparent
        transition-colors duration-300"
          @click="cartStore.addItem(product)"
      >
        Add to cart
      </AppButton>
      </div>
    </div>
  </div>
</template>
