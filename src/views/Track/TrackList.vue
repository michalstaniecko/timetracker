<script setup lang="ts">
import { useTracksStore } from '@/stores/tracks/tracks';
import TrackItem from '@/components/Track/TrackItem.vue';
import { computed } from 'vue';

const tracksStore = useTracksStore();

const tracksFiltered = computed(() => tracksStore.getFiltered());
</script>

<template>
  <base-container>
    <base-box>Filters</base-box>
    <base-box>
      <div v-if="!tracksFiltered">Tracking time history is empty!</div>
      <div v-else>
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Index</th>
              <th>Project</th>
              <th>Created</th>
              <th>Duration</th>
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
    </base-box>
  </base-container>
</template>

<style scoped></style>
