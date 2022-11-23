import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from '~/shared/constants/route-name';

export const projectsRoute: RouteRecordRaw = {
  name: RouteName.PROJECTS,
  path: '/projects',
  component: () => import('../views/ProjectsView.vue'),
};
