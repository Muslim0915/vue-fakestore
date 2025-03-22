import { App } from 'vue';
import router from "@/router";
import { createPinia } from 'pinia'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const pinia = createPinia();

const usePlugins = (app: App) => {
    app
        .use(router)
        .use(pinia)
        .use(Toast)
}

export default usePlugins;
