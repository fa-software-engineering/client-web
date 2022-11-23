<script setup lang="ts"></script>

<template>
  <div class="component">
    <div class="main">
      <TheProfilePanel class="panel" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component {
  display: flex;

  .main {
    margin: 0 auto;
    padding: 20px 0;
    flex: auto;
    min-width: 500px;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow: auto;
  }
}
</style>
