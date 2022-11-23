import { createGlobalState } from '@vueuse/core';
import { KC_REALM, KC_URL } from '~/core/constants/keycloak-config';
import { axiosInstance } from '~/shared/utils/axios';
import type { User } from '~/employees/dto/user';
import type { UpdateUser } from '~/employees/dto/update-user';
import type { CreateUser } from '~/employees/dto/create-user';

export const useUsersService = createGlobalState(() => ({
  users: () =>
    axiosInstance
      .get<User[]>(`${KC_URL}/admin/realms/${KC_REALM}/users`)
      .then(({ data }) => data),

  createUser: (payload: CreateUser) =>
    axiosInstance
      .post<User>(`${KC_URL}/admin/realms/${KC_REALM}/users`, payload)
      .then(({ data }) => data),

  updateUser: (userId: string, payload: UpdateUser) =>
    axiosInstance
      .put<void>(`${KC_URL}/admin/realms/${KC_REALM}/users/${userId}`, payload)
      .then(({ data }) => data),
}));
