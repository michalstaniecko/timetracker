<script setup lang="ts">
import { computed } from 'vue';
import type { Track } from '@/stores/tracks/interfaces';
import { useFormatTime } from '@/use/useFormatTime';

const { formatDate, formatElapsedTime } = useFormatTime();

const props = defineProps<{
  track: Track;
}>();

const trackName = computed(() => {
  if (props.track.taskId) {
    return props.track.taskId;
  }

  return 'No task';
});
</script>

<template>
  <tr>
    <td>
      {{ formatDate(track.created) }}
    </td>
    <td>
      {{ formatElapsedTime(track.endTime - track.startTime) }}
    </td>
    <td>
      {{ trackName }}
    </td>
    <td>
      {{ track.description }}
    </td>
  </tr>
</template>

<style scoped></style>
