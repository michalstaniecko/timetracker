<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  column: {
    name: string;
    key: string;
    width: string;
  };
  total: number;
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
