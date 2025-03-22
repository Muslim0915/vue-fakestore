import { ref } from "vue";
import { IProduct } from "@/services/typing";
import { useFetch } from "@vueuse/core";

export function useProducts() {
    const products = ref<IProduct[]>([]);
    const isLoading = ref(false);

    const fetchProducts = async (url: string) => {
        isLoading.value = true;
        try {
            const { data } = await useFetch(url).json();

            if (data.value) {
                products.value = data.value.products;
            }
        }
        catch (error) {
            console.error("Ошибка загрузки продуктов:", error);
        }
        isLoading.value = false;
    };

    return {
        products,
        fetchProducts,
        isLoading,
    };
}
