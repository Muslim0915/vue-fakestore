import { defineStore } from "pinia";
import {  reactive } from "vue";
import { useToast } from "vue-toastification";
import type { ICartItem, IProduct } from "@/services/typing";

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
            existingItem.quantity += 1;
        } else {
            state.cartItems.push({ ...product, quantity: 1 });
        }
        saveToLocalStorage();
    };

    const removeItem = (product: ICartItem) => {
        const existingItem = state.cartItems.find((item: ICartItem) => item.id === product.id);
        if (existingItem) {
            existingItem.quantity > 1 ? existingItem.quantity-- : state.cartItems.splice(state.cartItems.indexOf(existingItem), 1);
        }
        saveToLocalStorage();
    };

    const clearCart = () => {
        if (state.cartItems.length === 0) return;
        state.cartItems = [];
        saveToLocalStorage();
        useToast().info('Cart cleared');
    };
    return {
        state,
        addItem,
        removeItem,
        clearCart,
    };
});
