<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { get, ref as dbRef } from "firebase/database";
import { useAuthStore } from "@/stores/authStore";
import { database } from "@/firebase";
import {ICartItem} from "@/services/typing";
import AppButton from "@/components/ui/AppButton.vue";
import { countTotalPrice } from "@/utils/countTotalPrice.ts";

const authStore = useAuthStore();
const orders = ref<ICartItem[]>([]);

const fetchOrders = async () => {
  if (!authStore.user) return;
  try {
    const ordersSnapshot = await get(dbRef(database, `users/${authStore.user.uid}/orders`));
    if (ordersSnapshot.exists()) {
      orders.value = Object.values(ordersSnapshot.val());
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const uniqueOrders = computed(() => {
  const mergedMap = new Map<number, ICartItem>();

  orders.value.forEach((item) => {
    if (mergedMap.has(item.id)) {
      mergedMap.get(item.id)!.quantity += item.quantity;
    } else {
      mergedMap.set(item.id, {...item});
    }
  });

  return Array.from(mergedMap.values());
});

const totalPrice = computed(() => countTotalPrice<ICartItem>(uniqueOrders.value));

onMounted(fetchOrders);
</script>

<template>
  <div class="container mx-auto p-4 flex flex-col gap-5">
    <h1 class="text-3xl font-bold">Profile</h1>
    <div class="flex items-center max-md:flex-col gap-4">
      <img
          alt="userAvatar"
          class="dark:invert"
          height="50"
          src="@/assets/images/png/user-avatar.png"
          width="50"
      >
      <div class="flex flex-col gap-2">

        <p class="text-gray-500 dark:text-white text-xl">Username: <span
            class="text-red-500 text-2xl dark:text-red-500">{{ authStore.user?.username }}</span></p>
        <p class="text-gray-500 dark:text-white text-xl">Email: <span
            class="text-red-500 dark:text-red-500">{{ authStore.user?.email }}</span></p>
      </div>
    </div>
    <h2 class="text-2xl font-bold mt-6">Your Orders</h2>
    <div v-if="orders.length > 0" class="flex flex-col gap-5 w-full">
      <div
          v-for="order in uniqueOrders"
          :key="order.id"
          class="border border-gray-700 dark:border-gray-200 cursor-pointer
          w-full rounded-lg p-4 hover:bg-gray-400
           flex gap-2 my-2
          dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 hover:text-gray-100
"
          @click="$router.push(`/products/${order.id}`)">
        <div>
          <img
              :src="order.images[0]"
              alt="image"
              height="150"
              width="150">
        </div>
        <div class="ml-4">
          <h3 class="text-xl font-bold">{{ order.title }}</h3>
          <p class="text-gray-500 text-xl">{{ order.price }}$ x {{ order.quantity }}</p>
          <p class="text-gray-400 text-xl">Total: {{ order.price * order.quantity }}$</p>
        </div>
      </div>
    </div>
    <p v-else>No purchases yet.</p>
    <p class="text-2xl font-bold">Total: {{ totalPrice }}$</p>
    <div class="self-end">
      <AppButton class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white py-2 px-4"
                 @click="authStore.logout()">
        Logout
      </AppButton>
    </div>
  </div>
</template>
