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
} from 'vue';
import type { ColumnFilterModelType } from 'primevue/column';
import { FilterMatchMode, PrimeIcons } from 'primevue/api';
import type { DataTableRowEditSaveEvent } from 'primevue/datatable';
import { useVacancies } from '~/vacancies/stores/vacancies';
import type { Vacancy } from '~/vacancies/dto/vacancy';
import { omit } from '~/shared/utils/object';
import type { CreateVacancy } from '~/vacancies/dto/create-vacancy';

const { vacancies, fetch, create, update, remove } = useVacancies();
tryOnMounted(fetch);

const data = shallowRef<Vacancy[]>([]);
watch(
  vacancies,
  (vacancies) =>
    (data.value = unref(vacancies).map(({ createdAt, ...others }) => ({
      ...others,
      createdAt: createdAt.toLocaleDateString(),
    })) as any),
);

const search = ref<string>();
const filters = computed<Record<string, ColumnFilterModelType>>(() => ({
  global: { value: search.value, matchMode: FilterMatchMode.CONTAINS },
}));

const editingRows = shallowRef([]);
async function handleUpdate({ newData: item }: DataTableRowEditSaveEvent) {
  await update(item.id, omit(item as Vacancy, ['id', 'createdAt']));
}

const form = shallowReactive<CreateVacancy>({
  position: '',
  resource: '',
  skill: '',
});
function handleCreate() {
  create(unref({ ...form }));
  Object.assign(form, { position: '', resource: '', skill: '' });
}
</script>

<template>
  <div class="component">
    <DataTable
      v-model:editingRows="editingRows"
      :value="data"
      :filters="filters"
      :global-filter-fields="['position', 'resource', 'skill']"
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
            v-model="form.position"
            class="position-input"
            label="Позиция"
            icon="CHART_LINE"
            :is-simple="true"
          />

          <MultiInput
            v-model="form.resource"
            label="Задействованный ресурс"
            icon="DOLLAR"
            :is-simple="true"
          />

          <MultiInput
            v-model="form.skill"
            label="Ключевой навык"
            icon="THUMBS_UP"
            :is-simple="true"
          />

          <Button
            class="p-button-success"
            :icon="PrimeIcons.PLUS"
            @click="handleCreate"
          />
        </header>
      </template>

      <Column field="position" header="Позиция" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
        </template>
      </Column>

      <Column field="createdAt" header="Дата размещения" :sortable="true" />

      <Column field="resource" header="Задействованный ресурс" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
        </template>
      </Column>

      <Column field="skill" header="Ключевые навыки" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
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
  .table {
    .header {
      display: flex;
      gap: 10px;

      .search {
        margin-right: auto;
      }
    }
  }
}
</style>
