import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
    const router = useRouter();
    const isAuthenticated = computed(() => !!user.value);

    const setUser = (newUser: any) => {
        user.value = newUser;
        localStorage.setItem("user", JSON.stringify(newUser));
    }

    const logout = () => {
        user.value = null;
        localStorage.removeItem("user");
        router.push("/login");
    }

    return { user, isAuthenticated, setUser, logout };
});
