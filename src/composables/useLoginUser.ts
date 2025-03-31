import { signInWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, get } from "firebase/database";
import { auth, database } from "@/firebase";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { ref } from 'vue';
import { IUserAuth } from '@/services/typing'

export function useLoginUser() {
    const toast = useToast();
    const router = useRouter();
    const authStore = useAuthStore();
    const isLoading = ref(false);

    const loginUser = async (email: string, password: string) => {
        isLoading.value = true;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user) throw new Error("Login failed");

            // Получаем данные из Realtime Database
            const userSnapshot = await get(dbRef(database, `users/${user.uid}`));

            if (!userSnapshot.exists()) {
                throw new Error("User data not found in database");
            }

            const userData: IUserAuth = userSnapshot.val();

            authStore.setUser(userData);
            toast.success("User logged in successfully");

            await router.push("/profile");
        } catch (error: any) {
            console.error(error);
            toast.error("Error while logging in");
            return { error: error.message };
        } finally {
            isLoading.value = false;
        }
    };

    return {
        loginUser,
        isLoading,
    };
}
