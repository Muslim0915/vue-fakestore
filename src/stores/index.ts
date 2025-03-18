import { defineStore } from 'pinia';
import {  reactive } from 'vue';
import { IUser} from '@/services/typing';


export const useStore = defineStore('store', () => {
    const state = reactive({
        API_URL: import.meta.env.VITE_API_URL,
        isLoading: false,
        user: {
            name: '',
            email: '',
            password: '',
        } as IUser,
    });
    return {
        state,
    };
});
