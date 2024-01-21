<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>

<template>
  <div class="box">
    <base-box-label v-if="label" :label="label" />
    <slot />
  </div>
</template>

<style scoped></style>
