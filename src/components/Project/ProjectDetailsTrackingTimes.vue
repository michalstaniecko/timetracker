<script setup lang="ts">
import type { Track } from '@/stores/tracks/interfaces';
import { useFormatTime } from '@/use/useFormatTime';
import TrackingListRow from '@/components/TrackingList/TrackingListRow.vue';
import TrackingListHead from '@/components/TrackingList/TrackingListHead.vue';

const props = defineProps<{
  list: Track[] | undefined;
  total: string;
}>();

const { formatDate, formatElapsedTime } = useFormatTime();

const columns = [
  {
    name: 'Date',
    key: 'created',
    width: '150px'
  },
  {
    name: 'Duration',
    key: 'duration',
    width: '150px'
  },
  {
    name: 'Task',
    key: 'taskId',
    width: '150px'
  },
  {
    name: 'Description',
    key: 'description'
  }
];
</script>

<template>
  <div>
    <table v-if="!!list?.length" class="table is-fullwidth is-hoverable is-striped">
      <thead>
        <tr>
          <tracking-list-head
            v-for="column in columns"
            :key="column.key"
            :column="column"
            :total="total"
          />
        </tr>
      </thead>
      <tbody>
        <tracking-list-row v-for="track in list" :track="track" :key="track.id" />
      </tbody>
    </table>
    <p v-else class="has-text-grey-light is-italic">Empty list. Start track your progress...</p>
  </div>
</template>

<style scoped></style>
