import "./bootstrap";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";

import App from "./App.vue";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
import "@/css/app.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(PrimeVue);
app.use(MotionPlugin);
// app.mount("#app");
