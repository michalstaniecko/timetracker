<script setup lang="ts">
import type { Track } from '@/stores/tracks/interfaces';
import { useFormatTime } from '@/use/useFormatTime';

const { formatDate, formatElapsedTime } = useFormatTime();

const props = defineProps<{
  track: Track;
}>();
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
      {{ track.description }}
    </td>
  </tr>
</template>

<style scoped></style>
