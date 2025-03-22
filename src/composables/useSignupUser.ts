import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref as dbRef, set } from "firebase/database";
import { auth, database } from "@/firebase";
import { useToast } from "vue-toastification";

import {useRouter} from "vue-router";
import { useGlobalStore } from '@/stores/globalStore.ts'

export function useSignupUser() {
    const toast = useToast();
    const globalStore = useGlobalStore();
    const router = useRouter();

    const signupUser = async (email: string, password: string, username: string) => {
        globalStore.isLoading = true;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user) throw new Error("User creation failed");
            await set(dbRef(database, `users/${user.uid}`), {
                uid: user.uid,
                username,
                email
            });
            if (user) {
                toast.success("User created successfully");
                await router.push("/login");
            }
            return user;
        } catch (error: any) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                toast.error("Email already in use");
                return { error: "Email already in use" };
            }
            toast.error("Error while creating user");
            return { error: error.message };
        } finally {
            globalStore.isLoading = false;
        }
    };

    return { signupUser };
}
