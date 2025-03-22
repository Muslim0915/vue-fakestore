import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import LocalStoreManager from '@/libs/storeManager/LocalStoreManager.ts'
import type { IUserAuth } from '@/services/typing'

interface IAuthStoreState {
    user: IUserAuth | null;
}

const localStoreManager = new LocalStoreManager();

export const useAuthStore = defineStore('auth', {
    state: (): IAuthStoreState => ({
        user: localStoreManager.getUser(),
    }),
    getters: {
        getUser: (state): IUserAuth | null => state.user,
    },
    actions: {
        setUser(newUser: IUserAuth) {
            this.user = newUser;
            localStoreManager.setUser<IUserAuth>(this.user);
        },
        logout() {
            this.user = null;
            localStoreManager.removeUser();

            const router = useRouter();
            router.push('/login');
        }
    }
})
