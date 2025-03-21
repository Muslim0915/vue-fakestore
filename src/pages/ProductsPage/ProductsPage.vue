<script lang="ts" setup>
import {computed, ref} from "vue";
import { useProducts } from "@/composables/useProducts.ts";
import { useFetch } from "@vueuse/core";
import { useStore } from "@/stores/index.ts";
import ProductCard from "@/pages/ProductsPage/ProductCard.vue";
import AppFilter from "@/components/ui/AppFilter.vue";
import AppSearch from "@/components/ui/AppSearch.vue";
import { ICategory } from "@/services/typing";
import ScrollTopButton from "@/components/ui/ScrollTopButton.vue";

const store = useStore();
const filterValue = ref("");
const searchQuery = ref("");
const selectedCategory = ref("");

const { products, fetchProducts } = useProducts();


// Загружаем категории
const { data: categoriesData } = useFetch<ICategory[]>(`${store.state.API_URL}/products/categories`, {
  afterFetch(ctx) {
    ctx.data = typeof ctx.data === "string" ? JSON.parse(ctx.data) : ctx.data;
    return ctx;
  },
});

const updateSearchQuery = (query: string) => {
  searchQuery.value = query;
};
const applyFilter = (filter: { slug: string, url: string }) => {
  filterValue.value = filter.slug;
  selectedCategory.value = filter.slug;
  fetchProducts(filter.url); // Теперь fetchProducts корректно получает URL
};
fetchProducts(`${store.state.API_URL}/products`);

const categories = computed(() => categoriesData.value || []);
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter(product =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});


</script>

<template>
  <section class="flex w-full flex-col">
    <div class="container flex gap-5 max-md:flex-col">
      <AppFilter
          :filterValue="filterValue"
          :filters="[...categories, { url: `${store.state.API_URL}/products`, name: 'All Products', slug: 'All Products' }]"
          @applyFilters="applyFilter"
      />
      <div class="flex flex-col gap-5 flex-1">
        <div class="flex justify-between w-full max-md:flex-col">
          <h1 class="text-3xl font-bold mb-4 capitalize">
            {{ selectedCategory || "All Products" }}
          </h1>
          <AppSearch
              v-model:searchQuery="searchQuery"
              class="w-1/3 max-md:w-full"
              @resetQuery="updateSearchQuery('')"
              @update:searchQuery="updateSearchQuery($event)"
          />
        </div>
        <div class="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
          />
        </div>
      </div>
      <ScrollTopButton />
    </div>
  </section>
</template>
