// @ts-expect-error
import * as crypto from 'crypto';
import {
  createGlobalState,
  createSharedComposable,
  tryOnMounted,
} from '@vueuse/core';
import { readonly, shallowRef } from 'vue';
import type { Candidate } from '~/candidates/dto/candidate';
import type { CreateCandidate } from '~/candidates/dto/create-candidate';
import type { UpdateCandidate } from '~/candidates/dto/update-candidate';

const useCandidatesState = createGlobalState(() => ({
  candidates: shallowRef<Candidate[]>([]),
}));

export const useCandidates = createSharedComposable(() => {
  const { candidates } = useCandidatesState();

  let id = 0;
  function getId() {
    id += 1;
    return String(id);
  }

  async function fetch() {
    candidates.value = [
      {
        id: getId(),
        candidate: 'Иванов Иван Иванович',
        vacancyId: '1',
        respondAt: new Date(),
        status: 'Ожидает интервью',
        skill: 'Умеет плавать',
        education: 'МПГУ 2009-2015 Факультет лепки пельменей',
        userId: 'e3d5a195-8e4a-4b0c-985b-4ff994a8fca3',
      },
      {
        id: getId(),
        candidate: 'Николаев Николай Николаевич',
        vacancyId: '2',
        respondAt: new Date(),
        status: 'Вступил в должность',
        skill: 'Умеет руководить',
        education: 'МПГУ 2009-2015 Факультет администрирования пляжей',
        userId: 'e3d5a195-8e4a-4b0c-985b-4ff994a8fca3',
      },
    ];
  }
  tryOnMounted(() => fetch());

  async function create(payload: CreateCandidate) {
    candidates.value = [
      {
        id: getId(),
        respondAt: new Date(),
        status: 'Ожидает интервью',
        ...payload,
      },
      ...candidates.value,
    ];
  }

  async function update(candidateId: string, payload: UpdateCandidate) {
    candidates.value = candidates.value.map((candidate) =>
      candidate.id === candidateId ? { ...candidate, ...payload } : candidate,
    );
  }

  async function remove(candidateId: string) {
    candidates.value = candidates.value.filter(
      (candidate) => candidate.id !== candidateId,
    );
  }

  return {
    candidates: readonly(candidates),

    fetch,
    create,
    update,
    remove,
  };
});
