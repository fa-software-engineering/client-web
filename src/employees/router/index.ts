import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from '~/shared/constants/route-name';

export const employeesRoute: RouteRecordRaw = {
  name: RouteName.EMPLOYEES,
  path: '/employees',
  component: () => import('../views/EmployeesView.vue'),
};
