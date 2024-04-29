import "./bootstrap";
import { createApp } from "vue";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
import "@/css/app.css";

const app = createApp(App);

app.use(PrimeVue);
app.mount("#app");
