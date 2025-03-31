import { App } from 'vue';
import router from "@/router";
import { createPinia } from 'pinia'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { toastOptions } from "./toastOptions.ts";

const pinia = createPinia();

const usePlugins = (app: App) => {
    app
        .use(router)
        .use(pinia)
        .provide('router', router)
        .use(Toast, toastOptions());
}

export default usePlugins;
