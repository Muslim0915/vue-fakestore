<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProducts } from "@/composables/useProducts";
import { IProduct } from "@/services/typing";
import AppButton from "@/components/ui/AppButton.vue";
import {useCartStore} from "@/stores/cartStore.ts";
import config from '@/config.ts'
import ProductsLoader from "./ProductsLoader.vue";

const cartStore = useCartStore()
const route = useRoute();
const router = useRouter();
const { products, fetchProducts, isLoading } = useProducts();

const product = ref<IProduct | null>(null);

const goBack = () => {
  router.back();
};

const getSelectedProduct = (): IProduct | null => {
  const storedProduct = sessionStorage.getItem("selectedProduct");
  return storedProduct ? JSON.parse(storedProduct) : null;
};

onMounted(async () => {
  product.value = getSelectedProduct();

  if (!product.value) {
    await fetchProducts(`${config.API_URL}/products`);
    product.value = products.value.find((p: IProduct) => p.id === Number(route.params.id)) || null;
  }
});
</script>

  <template>
    <div v-if="isLoading" class="w-full h-full flex justify-center items-center">
    <ProductsLoader />
    </div>
    <div v-if="product" class="container mx-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="flex justify-center">
          <img
              :src="product.images[0]"
              alt="Product image"
              class="w-full max-w-md bg-gray-300 rounded-lg dark:bg-gray-400 "
              width="400"
              height="400"
          />
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
          <p class="text-lg mb-2">{{ product.description }}</p>
          <p class="font-bold text-2xl">Price: {{ product.price }}$</p>
          <ul class="mt-4 space-y-2">
            <li><strong>Category:</strong> {{ product.category }}</li>
            <li><strong>Brand:</strong> {{ product.brand }}</li>
            <li><strong>Stock:</strong> {{ product.stock }}</li>
            <li><strong>Rating:</strong> {{ product.rating }}/5</li>
          </ul>

          <div class="mt-6 flex gap-6 max-sm:flex-col">
            <AppButton
                @click="goBack"
                class="w-full p-2 bg-transparent border border-gray-800 text-gray-800 dark:text-white dark:border-white hover:bg-gray-800 hover:text-white dark:hover:text-gray-800 dark:hover:bg-white transition-colors duration-300"
            >
              &larr; Back
            </AppButton>

            <AppButton
                class="w-full p-2 bg-gray-800 text-white border border-gray-800
              dark:bg-white dark:text-gray-800 dark:border-white hover:bg-transparent
              hover:text-gray-800 dark:hover:text-white dark:hover:bg-transparent
              transition-colors duration-300"
                @click="cartStore.addItem(product)"
            >
              Buy Now
            </AppButton>
          </div>
        </div>
      </div>

      <div v-if="product.reviews.length" class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Reviews:</h2>
        <ul class="space-y-4">
          <li v-for="review in product.reviews" :key="review.reviewerEmail" class="border-b pb-4">
            <p class="text-xl font-bold ">{{ review.reviewerName }}</p>
            <p class="text-lg text-gray-500 dark:text-gray-400">{{ review.comment }}</p>
            <p class="text-md text-yellow-500 dark:text-yellow-400">Rating: {{ review.rating }}/5</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
