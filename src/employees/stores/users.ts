import {
  createGlobalState,
  createSharedComposable,
  tryOnMounted,
} from '@vueuse/core';
import { readonly, shallowRef } from 'vue';
import type { User } from '~/employees/dto/user';
import { useUsersService } from '~/employees/services/users';
import type { UpdateUser } from '~/employees/dto/update-user';

const useUsersState = createGlobalState(() => ({
  users: shallowRef<User[]>([]),
}));

export const useUsers = createSharedComposable(() => {
  const { users } = useUsersState();

  const usersService = useUsersService();
  async function fetch() {
    users.value = await usersService.users();
  }
  tryOnMounted(() => fetch());

  async function update(userId: string, payload: UpdateUser) {
    await usersService.updateUser(userId, payload);
    users.value = users.value.map((user) =>
      user.id === userId ? { id: userId, ...payload } : user,
    );
  }

  return {
    users: readonly(users),

    fetch,
    update,
  };
});
