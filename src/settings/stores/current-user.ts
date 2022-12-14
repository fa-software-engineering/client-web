import {
  createGlobalState,
  createSharedComposable,
  whenever,
} from '@vueuse/core';
import { readonly, shallowRef } from 'vue';
import type { UserInfo } from '~/settings/dto/user';
import { useCurrentUserService } from '~/settings/services/current-user';

const useCurrentUserState = createGlobalState(() => ({
  currentUser: shallowRef<UserInfo>(),
}));

export const useCurrentUser = createSharedComposable(() => {
  const { currentUser } = useCurrentUserState();

  const currentUserService = useCurrentUserService();
  const { data } = currentUserService.me();
  whenever(data, (data) => (currentUser.value = data));

  return {
    currentUser: readonly(currentUser),
  };
});
