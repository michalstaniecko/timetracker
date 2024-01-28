<script setup lang="ts">
const props = defineProps<{
  column: {
    name: string;
    key: string;
    width?: string;
  };
  total: string;
}>();

const isDurationColumn = props.column.key === 'duration';
</script>

<template>
  <th :style="{ width: column.width }">
    <div>{{ column.name }}</div>
    <div v-if="isDurationColumn" class="is-size-7 is-uppercase">
      Total: <span class="has-text-weight-normal">{{ total }}</span>
    </div>
  </th>
</template>

<style scoped></style>
