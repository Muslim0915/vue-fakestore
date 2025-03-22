import { ref } from "vue";
import { IProduct } from "@/services/typing";
import { useFetch } from "@vueuse/core";
import { useGlobalStore } from '@/stores/globalStore.ts'

export function useProducts() {
    const globalStore = useGlobalStore();
    const products = ref<IProduct[]>([]);

    const fetchProducts = async (url: string) => {
        globalStore.isLoading = true;
        try {
            const { data } = await useFetch(url).json();

            if (data.value) {
                products.value = data.value.products;
            }
        }
        catch (error) {
            console.error("Ошибка загрузки продуктов:", error);
        }
        globalStore.isLoading = false;
    };

    return {
        products,
        fetchProducts,
    };
}
