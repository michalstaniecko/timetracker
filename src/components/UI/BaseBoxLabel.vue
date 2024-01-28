<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string | null;
  }>(),
  {
    label: null
  }
);
</script>

<template>
  <p class="mb-3 is-size-7 is-uppercase has-text-weight-semibold">{{ label }}</p>
</template>

<style scoped></style>
