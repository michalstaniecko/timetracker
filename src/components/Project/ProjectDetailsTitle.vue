<script setup lang="ts">
defineProps<{
  title: string | undefined;
}>();
</script>

<template>
  <h2 class="subtitle">{{ title }}</h2>
</template>

<style scoped></style>
