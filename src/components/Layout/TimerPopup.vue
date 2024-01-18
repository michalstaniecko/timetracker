<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTimerStore } from '@/stores/timer';
import { storeToRefs } from 'pinia';
import { useFormatTime } from '@/use/useFormatTime';
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth';

const show = ref<boolean>();

const projectStore = useProjectsStore();

const authStore = useAuthStore();
const { isLoaded } = storeToRefs(authStore);

const timerStore = useTimerStore();
const { isRunning, elapsedTimeRef, getProjectId, description } = storeToRefs(timerStore);

const closeHandler = () => (show.value = false);
const handleChange = (e: Event) => {
  description.value = (e.target as HTMLInputElement).value;
  timerStore.set();
};

const title = ref<string>();

show.value = isRunning.value;

watch(isRunning, (newValue) => {
  return (show.value = newValue);
});

const stopHandler = () => {
  timerStore.stop();
};

const { formatElapsedTime } = useFormatTime();
const formattedTime = computed(() => formatElapsedTime(elapsedTimeRef.value));
const projectName = computed(() => projectStore.getById(getProjectId.value)?.title);
</script>

<template>
  <base-popup
    v-if="isLoaded"
    :show="show"
    @close="closeHandler"
    :disable-close="true"
    icon="fa-window-minimize"
  >
    <div class="is-size-6">
      Time: <span class="has-text-weight-semibold">{{ formattedTime }}</span>
    </div>
    <div class="is-size-6 mb-2">{{ projectName }}</div>
    <div class="mb-3">
      <p class="is-size-7 is-uppercase has-text-weight-semibold">Description:</p>
      <input
        class="input is-small"
        placeholder="Description"
        v-model="description"
        @change="handleChange"
      />
    </div>
    <button class="button is-small is-danger" @click.prevent="stopHandler">Stop timer</button>
  </base-popup>
</template>

<style scoped></style>
