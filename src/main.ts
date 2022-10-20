import { createRouter, createWebHistory } from 'vue-router';
import App from '~/App.vue';
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import { primeVueConfig } from '~/modules/core/constants/prime-vue-config'
import { createPinia } from 'pinia'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App);

// Router
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});
app.use(router);

// PrimeVue
app
  .use(PrimeVue, primeVueConfig)
  .use(ToastService)
  .use(ConfirmationService)
  .directive('tooltip', Tooltip);

// Pinia
const pinia = createPinia();
app.use(pinia);

// Mount
app.mount('#app');
