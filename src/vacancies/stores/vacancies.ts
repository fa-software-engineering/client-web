// @ts-expect-error
import * as crypto from 'crypto';
import {
  createGlobalState,
  createSharedComposable,
  tryOnMounted,
} from '@vueuse/core';
import { readonly, shallowRef } from 'vue';
import type { Vacancy } from '~/vacancies/dto/vacancy';
import type { CreateVacancy } from '~/vacancies/dto/create-vacancy';
import type { UpdateVacancy } from '~/vacancies/dto/update-vacancy';

const useVacanciesState = createGlobalState(() => ({
  vacancies: shallowRef<Vacancy[]>([]),
}));

export const useVacancies = createSharedComposable(() => {
  const { vacancies } = useVacanciesState();

  let id = 0;
  function getId() {
    id += 1;
    return String(id);
  }

  async function fetch() {
    vacancies.value = [
      {
        id: getId(),
        position: 'Директор пляжа',
        createdAt: new Date(),
        resource: 'hh.ru',
        skill: 'Умеет плавать',
      },
      {
        id: getId(),
        position: 'Администратор пляжа',
        createdAt: new Date(),
        resource: 'hh.ru',
        skill: 'Талантливый руководитель',
      },
    ];
  }
  tryOnMounted(() => fetch());

  async function create(payload: CreateVacancy) {
    vacancies.value = [
      { id: getId(), createdAt: new Date(), ...payload },
      ...vacancies.value,
    ];
  }

  async function update(vacancyId: string, payload: UpdateVacancy) {
    vacancies.value = vacancies.value.map((vacancy) =>
      vacancy.id === vacancyId ? { ...vacancy, ...payload } : vacancy,
    );
  }

  async function remove(vacancyId: string) {
    vacancies.value = vacancies.value.filter(
      (vacancy) => vacancy.id !== vacancyId,
    );
  }

  return {
    vacancies: readonly(vacancies),

    fetch,
    create,
    update,
    remove,
  };
});
