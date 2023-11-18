<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProjectsStore } from '@/stores/projects';
import { computed, ref, watch } from 'vue';
import ProjectDetailsTitle from '@/components/Project/ProjectDetailsTitle.vue';
import ProjectDetailsDescription from '@/components/Project/ProjectDetailsDescription.vue';
import ProjectDetailsTrackingTimes from '@/components/Project/ProjectDetailsTrackingTimes.vue';
import { useTracksStore } from '@/stores/tracks/tracks';
import { useFormatTime } from '@/use/useFormatTime';

const route = useRoute();
const projectsStore = useProjectsStore();
const tracksStore = useTracksStore();
const { formatElapsedTime } = useFormatTime();

const id = route.params.id as string;

const project = computed(() => projectsStore.getById(id));
const tracks = computed(() => tracksStore.getListByProjectId(id));
const tracksTotal = computed(() => formatElapsedTime(tracksStore.getTotalByProjectId(id)));
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
      <project-details-title :title="project?.title" />
    </base-box>
    <base-box label="Description:">
      <ProjectDetailsDescription :description="project?.description" />
    </base-box>
    <base-box label="Tracking times:">
      <ProjectDetailsTrackingTimes :list="tracks" :total="tracksTotal" />
    </base-box>
  </base-container>
</template>

<style scoped></style>
