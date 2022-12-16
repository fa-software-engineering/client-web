import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from '~/shared/constants/route-name';

export const vacanciesRoute: RouteRecordRaw = {
  name: RouteName.VACANCIES,
  path: '/vacancies',
  component: () => import('../views/VacanciesView.vue'),
};
