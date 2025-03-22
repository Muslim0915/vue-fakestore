import { defineStore } from 'pinia';
import { IUser } from '@/services/typing'

interface IGlobalStore {
    isLoading: boolean;
    user: IUser;
}

export const useGlobalStore = defineStore('globalStore', {
   state: (): IGlobalStore => ({
       isLoading: false,
       user: {
           name: '',
           email: '',
           password: ''
       }
   }),
});
