import { defineStore } from 'pinia'
import LocalStoreManager from "@/libs/storeManager/LocalStoreManager.ts";
import type { IUserAuth } from '@/services/typing'
import { computed, reactive } from "vue";

interface IAuthStoreState {
    user: IUserAuth | null;
}

const localStoreManager = new LocalStoreManager();

export const useAuthStore = defineStore('auth', () => {
    const state = reactive<IAuthStoreState>({
        user: localStoreManager.getUser(),
    })

    const getUser = computed(() => state.user)

    const setUser = (newUser: IUserAuth) => {
        state.user = newUser;
        localStoreManager.setUser<IUserAuth>(state.user);
    }

    const logout = (router: any) => {
        state.user = null;
        localStoreManager.removeUser();
        router.push('/login');
    }

    return {
        state,
        getUser,
        setUser,
        logout
    }
})