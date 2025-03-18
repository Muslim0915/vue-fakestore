<script setup lang="ts">
import AppInput from "@/components/ui/AppInput.vue";
import { ref } from "vue";
import AppButton from "@/components/ui/AppButton.vue";
import { useSignupUser } from "@/composables/useSignupUser";
import { useValidation } from "@/composables/useValidation";
import {useToast} from "vue-toastification";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const { signupUser } = useSignupUser();
const { errors, validateForm } = useValidation();

const resetForm = () => {
  username.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
}
const toast = useToast();

const handleSignup = async () => {
  if (!validateForm({ username: username.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value })) {
    return toast.error("Please fill in all fields correctly");
  }
  else {
  await signupUser(email.value, password.value, username.value);
  resetForm();
  }
};
</script>

<template>
  <div class="flex items-center justify-center flex-1 p-6">
    <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign Up</h2>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <AppInput
            v-model="username"
            label="First Name"
            placeholder="John"
            :error="errors.name"
            autocomplete="name"
        />
        <AppInput
            v-model="email"
            type="email"
            label="Email"
            placeholder="username@gmail.com"
            autocomplete="email"
            :error="errors.email"
            id="email"
        />
        <AppInput
            v-model="password"
            type="password"
            label="Password"
            placeholder="Password"
            :error="errors.password"
            autocomplete="password"
            id="password"
        />
        <AppInput
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            :error="errors.confirmPassword"
            id="confirmPassword"
        />
        <AppButton type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
          Create Account
        </AppButton>
      </form>
      <p class="mt-4 text-center text-gray-600 dark:text-gray-300">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">Sign in</router-link>
      </p>
    </div>
  </div>
</template>
