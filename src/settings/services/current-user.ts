import { createGlobalState } from '@vueuse/core';
import { useAxios } from '@vueuse/integrations/useAxios';
import { KC_REALM, KC_URL } from '~/core/constants/keycloak-config';
import type { UserInfo } from '~/settings/dto/user';
import { axiosInstance } from '~/shared/utils/axios';

export const useCurrentUserService = createGlobalState(() => ({
  me: () =>
    useAxios<UserInfo>(
      `${KC_URL}/realms/${KC_REALM}/protocol/openid-connect/userinfo`,
      { method: 'GET' },
      axiosInstance,
      { immediate: true },
    ),
}));
