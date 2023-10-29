<script setup lang="ts">
import type { Timestamp } from 'firebase/firestore';
import { useTimerStore } from '@/stores/timer';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import moment from 'moment';

const props = defineProps<{
  title: string;
  description?: string;
  created: Timestamp;
  projectId: string;
}>();

const timerStore = useTimerStore();
const { elapsedTimeRef, getFormattedElapsedTime } = storeToRefs(timerStore);

const startHandler = () => {
  timerStore.start({ projectId: props.projectId });
};

const stopHandler = () => {
  timerStore.stop();
};

const currentProjectTimerIsRunning = computed(
  () => timerStore.isRunning && props.projectId === timerStore.getProjectId
);
</script>

<template>
  <div class="card" :class="{ 'has-background-primary-light': currentProjectTimerIsRunning }">
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
      <span class="card-footer-item">
        <div>
          <div v-if="currentProjectTimerIsRunning">Running: {{ getFormattedElapsedTime }}</div>
          <div v-else>Summary:</div>
        </div>
      </span>
      <div class="card-footer-item">
        <button
          class="button is-primary"
          @click.prevent="startHandler"
          v-if="!currentProjectTimerIsRunning"
        >
          Start timer
        </button>
        <button class="button is-danger" @click.prevent="stopHandler" v-else>Stop timer</button>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
