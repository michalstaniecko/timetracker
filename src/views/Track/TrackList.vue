<script setup lang="ts">
import { useTracksStore } from '@/stores/tracks/tracks';
import TrackItem from '@/components/Track/TrackItem.vue';
import { computed } from 'vue';
import TheFilters from '@/components/Filters/TheFilters.vue';
import { storeToRefs } from 'pinia';

const tracksStore = useTracksStore();
const { getFiltered } = storeToRefs(tracksStore);

const tracksFiltered = computed(() => getFiltered.value);
</script>

<template>
  <base-container>
    <TheFilters />
    <base-box>
      <div v-if="tracksFiltered && tracksFiltered.length > 0">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Index</th>
              <th>Project</th>
              <th>Task</th>
              <th>Created</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <track-item
              v-for="(track, index) in tracksFiltered"
              :index="index + 1"
              :key="track.id"
              :track="track"
            />
          </tbody>
        </table>
      </div>

      <div v-else>Tracking time history is empty!</div>
    </base-box>
  </base-container>
</template>

<style scoped></style>
