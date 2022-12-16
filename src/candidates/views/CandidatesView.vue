<script setup lang="ts">
import { reactify, tryOnMounted } from '@vueuse/core';
import {
  computed,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
  unref,
  watch,
  watchEffect,
} from 'vue';
import type { ColumnFilterModelType } from 'primevue/column';
import { FilterMatchMode, PrimeIcons } from 'primevue/api';
import type { DataTableRowEditSaveEvent } from 'primevue/datatable';
import { useCandidates } from '~/candidates/stores/candidates';
import type { Candidate } from '~/candidates/dto/candidate';
import { omit } from '~/shared/utils/object';
import type { CreateCandidate } from '~/candidates/dto/create-candidate';
import { useVacancies } from '~/vacancies/stores/vacancies';
import { useUsers } from '~/employees/stores/users';

const { candidates, fetch, create, update, remove } = useCandidates();
tryOnMounted(fetch);

const data = shallowRef<Candidate[]>([]);
watch(
  candidates,
  (candidates) =>
    (data.value = unref(candidates).map(({ respondAt, ...others }) => ({
      ...others,
      respondAt: respondAt.toLocaleDateString(),
    })) as any),
);

const search = ref<string>();
const filters = computed<Record<string, ColumnFilterModelType>>(() => ({
  global: { value: search.value, matchMode: FilterMatchMode.CONTAINS },
}));

const editingRows = shallowRef([]);
async function handleUpdate({ newData: item }: DataTableRowEditSaveEvent) {
  await update(item.id, omit(item as Candidate, ['id', 'respondAt']));
}

const form = shallowReactive<CreateCandidate>({
  candidate: '',
  vacancyId: '',
  skill: '',
  education: '',
  userId: '',
});
function handleCreate() {
  create(unref({ ...form }));
  Object.assign(form, {
    candidate: '',
    vacancyId: '',
    skill: '',
    education: '',
    userId: '',
  });
}

const { vacancies } = useVacancies();
function getVacancyById(vacancyId: string) {
  return vacancies.value.find(({ id }) => id === vacancyId);
}

const { users } = useUsers();
function getUserById(userId: string) {
  return users.value.find(({ id }) => id === userId);
}

const statuses = [
  'Ожидает интервью',
  'Прошел интервью',
  'Не прошел интервью',
  'Вступил в должность',
];
</script>

<template>
  <div class="component">
    <DataTable
      v-model:editingRows="editingRows"
      :value="data"
      :filters="filters"
      :global-filter-fields="['candidate', 'status', 'skill', 'education']"
      edit-mode="row"
      breakpoint="0"
      data-key="id"
      class="table"
      resizable-columns
      auto-layout
      row-hover
      @row-edit-save="handleUpdate"
    >
      <template #header>
        <header class="header">
          <MultiInput
            v-model="search"
            class="search"
            icon="SEARCH"
            placeholder="Поиск"
            is-simple
          />

          <MultiInput
            v-model="form.candidate"
            label="Кандидат"
            icon="ID_CARD"
            :is-simple="true"
          />

          <MultiInput
            v-model="form.vacancyId"
            class="position"
            type="select"
            icon="CHART_LINE"
            label="Позиция"
            :options="vacancies"
            options-label="position"
            options-key="id"
            is-clearable
            is-simple
          />

          <MultiInput
            v-model="form.skill"
            label="Ключевой навык"
            icon="THUMBS_UP"
            :is-simple="true"
          />

          <MultiInput
            v-model="form.education"
            label="Образование"
            icon="BUILDING"
            :is-simple="true"
          />

          <MultiInput
            v-model="form.userId"
            class="user"
            type="select"
            icon="USER"
            label="HR Сотрудник"
            :options="users"
            options-label="username"
            options-key="id"
            is-clearable
            is-simple
          />

          <Button
            class="p-button-success"
            :icon="PrimeIcons.PLUS"
            @click="handleCreate"
          />
        </header>
      </template>

      <Column field="candidate" header="Кандидат" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
        </template>
      </Column>

      <Column field="vacancyId" header="Позиция" :sortable="true">
        <template #body="slotProps">
          <span>
            {{ getVacancyById(slotProps.data.vacancyId)?.position }}
          </span>
        </template>

        <template #editor="slotProps">
          <MultiInput
            v-model="slotProps.data.vacancyId"
            type="select"
            icon="CHART_LINE"
            label="Позиция"
            :options="vacancies"
            options-label="position"
            options-key="id"
            is-clearable
            is-simple
          />
        </template>
      </Column>

      <Column field="respondAt" header="Дата отклика" :sortable="true" />

      <Column field="status" header="Статус" :sortable="true">
        <template #editor="slotProps">
          <MultiInput
            v-model="slotProps.data.status"
            class="position"
            type="select"
            label="Статус"
            :options="statuses"
            is-simple
          />
        </template>
      </Column>

      <Column field="skill" header="Ключевые навыки" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
        </template>
      </Column>

      <Column field="education" header="Образование" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
        </template>
      </Column>

      <Column field="userId" header="HR Сотрудник" :sortable="true">
        <template #body="slotProps">
          <span>
            {{ getUserById(slotProps.data.userId)?.username }}
          </span>
        </template>

        <template #editor="slotProps">
          <MultiInput
            v-model="slotProps.data.userId"
            class="user"
            type="select"
            icon="USER"
            label="HR Сотрудник"
            :options="users"
            options-label="username"
            options-key="id"
            is-clearable
            is-simple
          />
        </template>
      </Column>

      <Column
        :row-editor="true"
        header-style="width: 0"
        body-style="text-align:center"
      />

      <Column header-style="width: 0">
        <template #body="slotProps">
          <Button
            class="p-button-danger"
            :icon="PrimeIcons.TRASH"
            @click="remove(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
.component {
  display: flex;

  .table {
    flex: auto;

    .header {
      display: flex;
      gap: 10px;

      .position,
      .user {
        width: 250px;
      }

      .search {
        margin-right: auto;
      }
    }
  }
}
</style>
