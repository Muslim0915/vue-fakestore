<script lang="ts" setup>
import AppInput from "@/components/ui/AppInput.vue";
import { ref } from "vue";
import AppButton from "@/components/ui/AppButton.vue";
import { useValidation } from "@/composables/useValidation.ts";
import { useLoginUser } from "@/composables/useLoginUser.ts";
import {useToast} from "vue-toastification";
import LoadingButton from "@/components/ui/LoadingButton.vue";


const email = ref("");
const password = ref("");

const toast = useToast();
const { loginUser, isLoading } = useLoginUser();
const { validateForm, errors } = useValidation();
const submitUserLogin = async () => {

  if (!validateForm({ email: email.value, password: password.value })) {
    return toast.error("Please fill in all fields correctly");
  }
  else {
    await loginUser(email.value, password.value);
    email.value = "";
    password.value = "";
  }

}

</script>

  <template>
    <div class="flex items-center flex-1 justify-center p-6">
      <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h2>

        <form @submit.prevent class="space-y-4">
          <AppInput
              v-model="email"
              type="email"
              label="Email"
              placeholder="username@gmail.com"
              :error="errors.email"
              autocomplete="email"
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
          <div class="w-full text-center flex justify-center items-center text-xl">
            <LoadingButton class="w-full disabled:cursor-not-allowed" v-if="isLoading" />
          </div>
          <AppButton
              v-if="!isLoading"
              type="submit"
              @click="submitUserLogin()"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Sign in
          </AppButton>
        </form>

        <p class="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don't have an account yet?
          <router-link to="/signup" class="text-blue-600 hover:underline">Register for free</router-link>
        </p>
      </div>
    </div>
  </template>
