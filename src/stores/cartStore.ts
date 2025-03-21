import { defineStore } from "pinia";
import {  reactive } from "vue";
import { useToast } from "vue-toastification";
import {ICartItem, IProduct} from "@/services/typing";

const toast = useToast();

export const useCartStore = defineStore('cart', () => {
    const state = reactive({
        cartItems: JSON.parse(localStorage.getItem('cartItems') as string) || [] as ICartItem[],
    });

    const saveToLocalStorage = () => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    };

    const addItem = (product: IProduct) => {
        const existingItem = state.cartItems.find((item: ICartItem) => item.id === product.id);
        if (existingItem) {
            toast.success('More of this product added to cart');
            existingItem.quantity += 1;
        } else {
            state.cartItems.push({ ...product, quantity: 1 });
            toast.success('Product added to cart');
        }
        saveToLocalStorage();
    };

    const removeItem = (product: ICartItem) => {
        const existingItem = state.cartItems.find((item: ICartItem) => item.id === product.id);
        if (existingItem) {
            existingItem.quantity > 1 ? existingItem.quantity-- : state.cartItems.splice(state.cartItems.indexOf(existingItem), 1);
            toast.info('Product quantity updated');
        }
        saveToLocalStorage();
    };

    const clearCart = () => {
        state.cartItems = [];
        saveToLocalStorage();
    };
    return {
        state,
        addItem,
        removeItem,
        clearCart,
    };
});
