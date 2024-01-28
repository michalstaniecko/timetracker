<script setup lang="ts">
import type { modeType } from '@/components/Auth/interfaces';

defineProps<{
  mode: string;
}>();

const emits = defineEmits<{
  (e: 'update', value: modeType): void;
}>();
const handleSelectMode = (mode: modeType) => {
  emits('update', mode);
};
</script>

<template>
  <div class="field has-addons">
    <p class="control">
      <button
        class="button"
        :class="{ 'is-primary': mode === 'login' }"
        @click.prevent="handleSelectMode('login')"
      >
        <span>Log in</span>
      </button>
    </p>
    <p class="control">
      <button
        class="button"
        :class="{ 'is-primary': mode === 'signup' }"
        @click.prevent="handleSelectMode('signup')"
      >
        <span>Sign up</span>
      </button>
    </p>
  </div>
</template>

<style scoped></style>
