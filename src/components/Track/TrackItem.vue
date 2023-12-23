<script setup lang="ts">
import type { Track } from '@/stores/tracks/interfaces';
import { useTracksStore } from '@/stores/tracks/tracks';
import { computed } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

const deleteHandler = () => {
  console.log('deleteHandler', props.track.id);
};
</script>

<template>
  <tr>
    <th>{{ index }}</th>
    <td>
      {{ project?.title }}
    </td>
    <td>task</td>
    <td>
      {{ createdFormatted }}
    </td>
    <td>{{ duration }}</td>
    <td>
      <button class="button is-small" @click="deleteHandler">
        <font-awesome-icon icon="fa-solid fa-trash" class="has-text-danger" />
      </button>
    </td>
  </tr>
</template>

<style scoped></style>
