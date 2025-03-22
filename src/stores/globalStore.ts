import { defineStore } from 'pinia';
import { IUser } from '@/services/typing'

interface IGlobalStore {
    user: IUser;
}

export const useGlobalStore = defineStore('globalStore', {
   state: (): IGlobalStore => ({
       user: {
           name: '',
           email: '',
           password: '',
       },
   }),
});
