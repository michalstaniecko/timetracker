<script setup lang="ts">
import type { Track } from '@/stores/tracks/interfaces';
import { useTracksStore } from '@/stores/tracks/tracks';
import { computed } from 'vue';

const props = defineProps<{
  track: Track;
  index: number;
}>();

const tracksStore = useTracksStore();

const duration = tracksStore.duration(props.track.startTime, props.track.endTime);

const createdFormatted = computed(() => tracksStore.dateFormatted(props.track.created));
</script>

<template>
  <tr>
    <th>{{ index }}</th>
    <td>
      {{ track.projectId }}
    </td>
    <td>
      {{ createdFormatted }}
    </td>
    <td>{{ duration }}</td>
  </tr>
</template>

<style scoped></style>
