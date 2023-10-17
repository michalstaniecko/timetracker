<script setup lang="ts">
import type { Timestamp } from 'firebase/firestore';
import { useTimerStore } from '@/stores/timer';
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  description?: string;
  created: Timestamp;
  projectId: string;
}>();

const timerStore = useTimerStore();

const startHandler = () => {
  timerStore.set({ projectId: props.projectId });
};

const stopHandler = () => {
  timerStore.stop();
};

const currentProjectTimerIsRunning = computed(
  () => timerStore.isRunning && props.projectId === timerStore.getProjectId
);
</script>

<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ title }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        {{ description }}
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Details</a>
      <span class="card-footer-item">Summary</span>
      <div class="card-footer-item">
        <button class="button" @click.prevent="startHandler" v-if="!currentProjectTimerIsRunning">
          Start timer
        </button>
        <button class="button" @click.prevent="stopHandler" v-else>Stop timer</button>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
