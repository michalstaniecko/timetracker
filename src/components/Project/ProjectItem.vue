<script setup lang="ts">
import type { Timestamp } from 'firebase/firestore';
import { useTimerStore } from '@/stores/timer';
import { useTracksStore } from '@/stores/tracks/tracks';
import { computed, defineEmits } from 'vue';
import { storeToRefs } from 'pinia';
import { useFormatTime } from '@/use/useFormatTime';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  title: string;
  description?: string;
  created: Timestamp;
  projectId: string;
}>();

const emit = defineEmits<{
  (event: 'remove', id: string): void;
}>();

const { formatElapsedTime } = useFormatTime();
const tracksStore = useTracksStore();
const timerStore = useTimerStore();
const { getFormattedElapsedTime } = storeToRefs(timerStore);
const { getTotalByProjectId } = storeToRefs(tracksStore);

const startHandler = () => {
  timerStore.start({ projectId: props.projectId });
};

const stopHandler = () => {
  timerStore.stop();
};

const currentProjectTimerIsRunning = computed(
  () => timerStore.isRunning && props.projectId === timerStore.getProjectId
);

const totalTimeFormatted = computed(() => {
  return formatElapsedTime(getTotalByProjectId.value(props.projectId));
});

const projectUrl = computed(() => `/projects/${props.projectId}`);

const removeHandler = () => {
  emit('remove', props.projectId);
};
</script>

<template>
  <div class="card" :class="{ 'has-background-primary-light': currentProjectTimerIsRunning }">
    <header class="card-header is-align-items-center pr-3">
      <p class="card-header-title">{{ title }}</p>
      <button @click="removeHandler" class="button is-small is-danger is-inverted">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </header>
    <div class="card-content">
      <div class="content">{{ description }}</div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <router-link :to="projectUrl" class="button is-info">Details</router-link>
      </div>
      <span class="card-footer-item">
        <div>
          <div v-if="currentProjectTimerIsRunning">Running: {{ getFormattedElapsedTime }}</div>
          <div v-else>Summary {{ totalTimeFormatted }}</div>
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
