<script setup lang="ts">
defineProps<{
  description: string | undefined;
}>();
</script>

<template>
  <div>
    <div v-if="description">
      {{ description }}
    </div>
    <div v-else>
      <p class="has-text-grey-light is-italic">Add description...</p>
    </div>
  </div>
</template>

<style scoped></style>
