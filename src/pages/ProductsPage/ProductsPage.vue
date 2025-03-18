<script setup lang="ts">
import ProductCard from "@/pages/ProductsPage/ProductCard.vue";
import {computed, ref} from "vue";
import AppButton from "@/components/ui/AppButton.vue";
import AppFilter from "@/components/ui/AppFilter.vue";
import { useFetch } from "@vueuse/core";
import { useStore } from "@/stores/index.ts";
import {ICategory, IProduct} from "@/services/typing";
import {useProducts} from "@/composables/useProducts.ts";
import AppSearch from "@/components/ui/AppSearch.vue";

const store = useStore();
const filterValue = ref("");
const selectedCategory = ref("");

const { data: categoriesData } = useFetch<ICategory[]>(`${store.state.API_URL}/products/categories`, {
  afterFetch(ctx) {
    ctx.data = typeof ctx.data === "string" ? JSON.parse(ctx.data) : ctx.data;
    return ctx;
  },
});

const { products, fetchProducts } = useProducts();
const allProducts = ref<IProduct[]>([]);
const searchQuery = ref("");


const loadProducts = async (url: string) => {
  await fetchProducts(url);
  allProducts.value = [...products.value];
};


loadProducts(`${store.state.API_URL}/products`);

const updateSearchQuery = (query: string) => {
  searchQuery.value = query;

  if (!query) {

    products.value = [...allProducts.value];
  } else {
    products.value = allProducts.value.filter((product: any) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
  }
};
const applyFilter = (category: string) => {
  selectedCategory.value = category;
  loadProducts(`${store.state.API_URL}/products/category/${category}`);
};

const categories = computed(() => categoriesData.value || []);
const resetFilters = () => {
  fetchProducts(`${store.state.API_URL}/products`)
  selectedCategory.value = "All Products";
}
const scrollToTop = () => {

  window.scrollTo({ top: 0, behavior: "smooth" });
};
fetchProducts(`${store.state.API_URL}/products`)
</script>

<template>
  <section class="flex w-full flex-col">
    <div class="container flex gap-5 max-md:flex-col">
      <AppFilter
            :filters="categories"
            :filterValue="filterValue"
            @applyFilters="applyFilter"
            @resetFilters="resetFilters"
        />
      <div class="flex flex-col gap-5 flex-1">
        <div class="flex justify-between w-full max-md:flex-col">
        <h1 class="text-3xl font-bold mb-4 capitalize">{{ selectedCategory ? selectedCategory : "All Products" }}</h1>
          <AppSearch
              @update:searchQuery="updateSearchQuery($event)"
              @resetQuery="updateSearchQuery('')"
              v-model:searchQuery="searchQuery"
              class="w-1/3 max-md:w-full"
          />
        </div>

      <div class="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>
    </div>
    <AppButton
        @click="scrollToTop"
        class="fixed right-10 max-md:right-0 -rotate-90 bottom-10 w-[48px] h-[48px] flex items-center justify-center border border-black bg-white rounded-full hover:scale-105 transition duration-300"
    >
      <img src="@/assets/images/svg/arrow-up.svg" width="24" height="24" alt="arrow-up-icon">
    </AppButton>
    </div>
  </section>
</template>
