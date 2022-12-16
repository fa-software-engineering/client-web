<script setup lang="ts">
import { syncRefs, tryOnMounted } from '@vueuse/core';
import { computed, ref, shallowRef, unref, watch, watchEffect } from 'vue';
import type { ColumnFilterModelType } from 'primevue/column';
import { FilterMatchMode, PrimeIcons } from 'primevue/api';
import type { DataTableRowEditSaveEvent } from 'primevue/datatable';
import { useUsers } from '~/employees/stores/users';
import type { User } from '~/employees/dto/user';

const { users, fetch, update } = useUsers();
tryOnMounted(fetch);

const data = shallowRef<User[]>([]);
watch(users, (users) => (data.value = unref(users as any)));

const search = ref<string>();
const filters = computed<Record<string, ColumnFilterModelType>>(() => ({
  global: { value: search.value, matchMode: FilterMatchMode.CONTAINS },
}));

const editingRows = shallowRef([]);
async function handleUpdate({
  newData: { id, ...payload },
}: DataTableRowEditSaveEvent) {
  await update(id, payload);
}
</script>

<template>
  <div class="component">
    <DataTable
      v-model:editingRows="editingRows"
      :value="data"
      :filters="filters"
      :global-filter-fields="['username', 'firstName', 'lastName', 'email']"
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
        </header>
      </template>

      <Column field="username" header="Логин" :sortable="true" />

      <Column field="email" header="Почта" :sortable="true" />

      <Column field="firstName" header="Имя" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
        </template>
      </Column>

      <Column field="lastName" header="Фамилия" :sortable="true">
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.field]" />
        </template>
      </Column>

      <Column
        :row-editor="true"
        header-style="width: 0"
        body-style="text-align:center"
      />
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
.component {
  .table {
    .header {
      display: flex;

      .search {
        width: 300px;
      }
    }
  }
}
</style>
