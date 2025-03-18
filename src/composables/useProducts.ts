import { ref } from "vue";
import { useStore } from "@/stores/index.ts";
import { IProduct } from "@/services/typing";
import { useFetch } from "@vueuse/core";

export function useProducts() {
    const store = useStore();
    const products = ref<IProduct[]>([]);

    const fetchProducts = async (url: string) => {
        store.state.isLoading = true
        try {
            const { data } = await useFetch(url).json();

            if (data.value) {
                products.value = data.value.products;
            }
        }
        catch (error) {
            console.error("Ошибка загрузки продуктов:", error);
        }
        store.state.isLoading = false
    };

    return {
        products,
        fetchProducts,
    };
}
