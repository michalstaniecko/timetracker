<script setup lang="ts">
import type { Track } from '@/stores/tracks/interfaces';
import { useTracksStore } from '@/stores/tracks/tracks';
import { computed } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const props = defineProps<{
  track: Track;
  index: number;
}>();

const projectsStore = useProjectsStore();
const tracksStore = useTracksStore();

const { getById } = projectsStore;

const duration = tracksStore.duration(props.track.startTime, props.track.endTime);

const createdFormatted = computed(() => tracksStore.dateFormatted(props.track.created));

const project = computed(() => getById(props.track.projectId));
</script>

<template>
  <tr>
    <th>{{ index }}</th>
    <td>
      {{ project!.title }}
    </td>
    <td>
      {{ createdFormatted }}
    </td>
    <td>{{ duration }}</td>
  </tr>
</template>

<style scoped></style>
