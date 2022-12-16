import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from '~/shared/constants/route-name';

export const candidatesRoute: RouteRecordRaw = {
  name: RouteName.CANDIDATES,
  path: '/candidates',
  component: () => import('../views/CandidatesView.vue'),
};
