<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProjectsStore } from '@/stores/projects';
import { computed, ref, watch } from 'vue';

const route = useRoute();
const projectsStore = useProjectsStore();

const id = route.params.id as string;

const project = computed(() => projectsStore.getById(id));
const isLoading = ref(!project.value);

watch(project, (newVal) => {
  isLoading.value = !newVal;
});
</script>

<template>
  <base-container v-if="isLoading">
    <base-box> Loading</base-box>
  </base-container>
  <base-container v-else>
    <base-box>
      <h2 class="subtitle">{{ project?.title }}</h2>
    </base-box>
  </base-container>
</template>

<style scoped></style>
