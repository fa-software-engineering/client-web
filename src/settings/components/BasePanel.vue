<script setup lang="ts">
import { PrimeIcons } from 'primevue/api';

const props = defineProps<{
  title: string;
  icon: keyof typeof PrimeIcons;
}>();
</script>

<template>
  <Fieldset class="component" toggleable>
    <template #legend>
      <header class="header">
        <span class="text">{{ props.title }}</span>

        <i class="icon" :class="PrimeIcons[props.icon]" />
      </header>
    </template>

    <slot />
  </Fieldset>
</template>

<style scoped lang="scss">
@use '../../shared/styles/constants';
@use '../../shared/styles/transitions';

.component {
  .header {
    padding-left: 10px;
    display: flex;
    align-items: center;

    .text {
      margin-right: 15px;
      width: 100px;
      text-align: center;
    }

    .icon {
      font-size: constants.$fsz-h3;
    }
  }

  ::v-deep(.p-fieldset-content) {
    display: flex;
  }
}
</style>
