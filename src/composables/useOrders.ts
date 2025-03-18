import { ref, get, set } from "firebase/database";
import { database } from "@/firebase";
import { useToast } from "vue-toastification";
import { IProduct } from "@/services/typing";

interface CartItem extends IProduct {
    quantity: number;
}

export function useOrders() {
    const toast = useToast();

    const placeOrder = async (userId: string, cartItems: CartItem[]) => {
        if (!userId || cartItems.length === 0) return;

        const ordersRef = ref(database, `users/${userId}/orders`);

        try {
            // Получаем текущие заказы пользователя
            const snapshot = await get(ordersRef);
            const existingOrders: CartItem[] = snapshot.exists() ? snapshot.val() : [];

            // Добавляем новые заказы к существующим
            const updatedOrders = [...existingOrders, ...cartItems];

            // Отправляем обновленный массив в Firebase
            await set(ordersRef, updatedOrders);

            toast.success("Order placed successfully!");
            cartItems.splice(0, cartItems.length); // Очищаем корзину
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order.");
        }
    };

    return { placeOrder };
}
