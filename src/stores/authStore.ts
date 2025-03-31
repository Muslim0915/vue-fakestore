import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import LocalStoreManager from "@/libs/storeManager/LocalStoreManager.ts";
import type { IUserAuth } from '@/services/typing'
import {computed, reactive, toRaw} from "vue";

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
        localStoreManager.setUser<IUserAuth>(toRaw(state.user));
    }

    const logout = ()=> {
        state.user = null;
        localStoreManager.removeUser();
        useRouter().push('/login').then(() => {});
    }

    return {
        state,
        getUser,
        setUser,
        logout
    }
})