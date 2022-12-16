<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import { PrimeIcons } from 'primevue/api';
import { useRouter } from 'vue-router';
import { RouteName } from '~/shared/constants/route-name';

const menuItems: MenuItem[] = [
  {
    label: 'Сотрудники',
    icon: PrimeIcons.USERS,
    to: { name: RouteName.EMPLOYEES },
  },
  {
    label: 'Проекты',
    icon: PrimeIcons.BRIEFCASE,
    to: { name: RouteName.PROJECTS },
  },
  {
    label: 'Вакансии',
    icon: PrimeIcons.COMPASS,
    to: { name: RouteName.VACANCIES },
  },
];

const router = useRouter();
function goHome() {
  router.push({ name: RouteName.HOME });
}
function goSettings() {
  router.push({ name: RouteName.SETTINGS });
}
</script>

<template>
  <div class="component">
    <header class="header">
      <Button
        class="home-btn p-button-text"
        :icon="PrimeIcons.CHECK_CIRCLE"
        @click="goHome"
      />

      <TabMenu class="tabs" :model="menuItems" />

      <Button
        class="settings-btn p-button-text"
        :icon="PrimeIcons.COG"
        @click="goSettings"
      />
    </header>

    <RouterView v-slot="{ Component }">
      <Transition mode="out-in">
        <Component :is="Component" class="page" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss" scoped>
@use 'shared/styles/transitions';
@use 'shared/styles/constants';
@use 'shared/styles/mixins';

.component {
  flex: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    border-bottom: 1px solid constants.$clr-border;

    .home-btn {
      width: auto;
      border-radius: 0;
      font-size: constants.$fsz-h2;

      ::v-deep(.p-button-icon) {
        font-size: constants.$fsz-h2;
      }
    }

    .tabs {
      margin: 0 auto;

      ::v-deep(.p-menuitem-link) {
        height: 50px;
      }
    }

    .settings-btn {
      margin: auto 20px;
    }
  }

  .page {
    @include transitions.fade();
    flex: auto;
    overflow: auto;
  }
}
</style>

<style lang="scss">
@use 'core/styles/common';
@use 'shared/styles/constants';
@use 'shared/styles/mixins';

@import '../node_modules/primevue/resources/primevue.min.css';
@import '../node_modules/primevue/resources/themes/mdc-light-deeppurple/theme.css';
@import '../node_modules/primeicons/primeicons.css';

@include common.common();

#app {
  @include mixins.size(fill);
  position: absolute;
  display: flex;
  font-size: constants.$fsz-text;
}
</style>
