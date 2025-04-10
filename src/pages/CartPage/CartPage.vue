<script lang="ts" setup>
import { computed } from "vue";
import AppButton from "@/components/ui/AppButton.vue";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useOrders } from "@/composables/useOrders";
import { countTotalPrice } from "@/utils/countTotalPrice.ts";
import { ICartItem } from "@/services/typing";
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification";

const cartStore = useCartStore();
const authStore = useAuthStore();
const orders = useOrders();
const router = useRouter();

const cartItems = computed<ICartItem[]>(() => cartStore.state.cartItems);
const totalPrice = computed(() => countTotalPrice<ICartItem>(cartItems.value));

const checkout = async () => {
  try {
    const user = authStore.getUser;
    if (!user) {
      useToast().error('You must be logged in to place an order.');
      await router.push('/login');
    }
    if (user) {
      await orders.placeOrder(user.uid, cartItems.value);
    }
  } catch (error) {
    console.error("Checkout error:", error);
  }
};
</script>

<template>
  <div class="container h-full flex flex-col gap-5">
    <div class="flex items-center justify-between max-md:flex-col max-md:gap-5">
      <h1 class="text-3xl font-bold">Your Cart</h1>
      <AppButton class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-4 py-2"
                 @click="cartStore.clearCart()">
        Clear Cart
      </AppButton>
    </div>

    <div v-if="cartItems.length > 0" class="flex flex-col gap-4">
      <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between border-b py-4">
        <div class="flex items-center gap-4">
          <img
              :alt="item.title"
              :src="item.images[0]"
              class="w-20 h-20 object-cover rounded-lg"
              width="100"
              height="100"
          >
          <div>
            <h3 class="text-xl font-bold">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.price }}$ x {{ item.quantity }}</p>
          </div>
        </div>
        <div class="flex gap-3">
          <AppButton class="text-green-500 px-2 border border-green-500 hover:bg-green-500 hover:text-white"
                     @click="cartStore.addItem(item)">
            +
          </AppButton>
          <AppButton class="text-red-500 px-2 border border-red-500 hover:bg-red-500 hover:text-white"
                     @click="cartStore.removeItem(item)">
            -
          </AppButton>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <p class="text-2xl font-bold">Total: {{ totalPrice }}$</p>
        <AppButton class="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2" @click="checkout()">
          Checkout
        </AppButton>
      </div>
    </div>

    <div v-else class="h-full flex flex-col items-center">
      <p class="text-2xl font-bold my-5">Your cart is empty.</p>
      <AppButton class="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2"
                 @click="router.push('/products')">
        Shop Now
      </AppButton>
    </div>
  </div>
</template>
