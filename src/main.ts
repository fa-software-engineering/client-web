import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import type { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
import { isTokenReady, vueKeycloak } from '@baloise/vue-keycloak';
import { primeVueConfig } from '~/core/constants/prime-vue-config';
import App from '~/App.vue';
import {
  KC_CLIENT_ID,
  KC_REALM,
  KC_URL,
} from '~/core/constants/keycloak-config';
import { employeesRoute } from '~/employees/router';
import { projectsRoute } from '~/projects/router';
import { settingsRoute } from '~/settings/router';
import { homeRoute } from '~/home/router';
import { vacanciesRoute } from '~/vacancies/router';
import { candidatesRoute } from '~/candidates/router';

const app = createApp(App);

// Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    homeRoute,
    employeesRoute,
    vacanciesRoute,
    candidatesRoute,
    projectsRoute,
    settingsRoute,
  ],
});
app.use(router);

// PrimeVue
app
  .use(PrimeVue, primeVueConfig)
  .use(ToastService)
  .use(ConfirmationService)
  .directive('tooltip', Tooltip);

// Keycloak
const config: KeycloakConfig = {
  url: KC_URL,
  realm: KC_REALM,
  clientId: KC_CLIENT_ID,
};
const initOptions: KeycloakInitOptions = {
  enableLogging: true,
};
app.use(vueKeycloak, { config, initOptions });

// Mount
isTokenReady().then(() => app.mount('#app'));
// app.mount('#app');
