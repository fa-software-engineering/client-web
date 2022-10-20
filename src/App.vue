<script setup lang="ts">
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <Component :is="Component" class="page" />
    </Transition>
  </RouterView>
</template>


<style lang="scss" scoped>
@use 'modules/shared/styles/transitions';
@use 'modules/shared/styles/constants';
@use 'modules/shared/styles/mixins';

.app-component {
  flex: auto;
  overflow: auto;
  display: flex;

}
</style>

<style lang="scss">
@use 'modules/core/styles/common';
@use 'modules/shared/styles/constants';
@use 'modules/shared/styles/mixins';

@import '../node_modules/primevue/resources/primevue.min.css';
@import '../node_modules/primevue/resources/themes/fluent-light/theme.css';
@import '../node_modules/primeicons/primeicons.css';

@include common.common();

#app {
  @include mixins.size(fill);
  position: absolute;
  display: flex;
  font-size: constants.$fsz-text;
}
</style>

