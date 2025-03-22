import { signInWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, get } from "firebase/database";
import { auth, database } from "@/firebase";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useGlobalStore } from '@/stores/globalStore.ts'

export function useLoginUser() {
    const toast = useToast();
    const router = useRouter();
    const globalStore = useGlobalStore();
    const authStore = useAuthStore();

    const loginUser = async (email: string, password: string) => {
        globalStore.isLoading = true;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user) throw new Error("Login failed");

            // Получаем данные из Realtime Database
            const userSnapshot = await get(dbRef(database, `users/${user.uid}`));

            if (!userSnapshot.exists()) {
                throw new Error("User data not found in database");
            }

            const userData = userSnapshot.val();

            authStore.setUser(userData);
            toast.success("User logged in successfully");

            await router.push("/");
        } catch (error: any) {
            console.error(error);
            toast.error("Error while logging in");
            return { error: error.message };
        } finally {
            globalStore.isLoading = false;
        }
    };

    return { loginUser };
}
