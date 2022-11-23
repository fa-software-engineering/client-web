import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from '~/shared/constants/route-name';

export const homeRoute: RouteRecordRaw = {
  name: RouteName.HOME,
  path: '/',
  component: () => import('../views/HomeView.vue'),
};
