import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import usePlugins from './plugins';

const app = createApp(App);

// Подключаем плагины
usePlugins(app);

// Монитруем приложение
app.mount('#app')
