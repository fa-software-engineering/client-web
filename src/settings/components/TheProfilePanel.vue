<script setup lang="ts">
import { useKeycloak } from '@baloise/vue-keycloak';
import { BASE_HTTP_URL } from '~/shared/constants/url';
import { useCurrentUser } from '~/settings/stores/current-user';

const { currentUser } = useCurrentUser();

const { keycloak } = useKeycloak();
function logout() {
  keycloak.logout({
    redirectUri: BASE_HTTP_URL,
  });
}
</script>

<template>
  <BasePanel icon="USER" title="Профиль" class="component">
    <div class="body">
      <div v-if="currentUser" class="info">
        <span class="username">{{ currentUser.preferred_username }}</span>

        <span class="name">{{ currentUser.name }}</span>

        <span class="email">{{ currentUser.email }}</span>
      </div>

      <div class="actions">
        <Button
          label="Выход"
          class="p-button-outlined p-button-danger"
          @click="logout"
        />
      </div>
    </div>
  </BasePanel>
</template>

<style scoped lang="scss">
@use '../../shared/styles/constants';

.component {
  .body {
    flex: auto;
    display: flex;

    .info {
      flex: auto;
      display: flex;
      flex-direction: column;

      .username {
        margin-bottom: 20px;
        font-size: constants.$fsz-h3;
        font-weight: bold;
      }

      .name {
        margin-bottom: 10px;
        font-size: constants.$fsz-h3;
      }

      .email {
        opacity: 0.7;
      }
    }

    .actions {
      margin-top: auto;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
