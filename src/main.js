import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import SvgIcon from "vue3-icon"
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);
app.component("svg-icon", SvgIcon);
app.use(pinia);
app.mount("#app");
