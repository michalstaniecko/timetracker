<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTracksStore } from '@/stores/tracks/tracks';
import moment from 'moment';

const tracksStore = useTracksStore();

const { updateFilter } = tracksStore;
const dateFrom = ref('');
const dateTo = ref('');

watch(dateFrom, (newValue) => {
  updateFilter({ dateFrom: moment(newValue).valueOf() });
});
watch(dateTo, (newValue) => {
  updateFilter({ dateTo: moment(newValue).add(1, 'day').valueOf() });
});
</script>

<template>
  <base-box>
    <div class="field">
      <label class="label">Filter by project</label>
      <div class="control">
        <input class="input" type="text" placeholder="Project name" />
      </div>
    </div>

    <div class="field">
      <label class="label">Filter by task</label>
      <div class="control">
        <input class="input" type="text" placeholder="Task name" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Filter by date from</label>
          <div class="control">
            <input class="input" type="date" v-model="dateFrom" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Filter by date to</label>
          <div class="control">
            <input class="input" type="date" v-model="dateTo" />
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Filter by duration</label>
      <div class="control">
        <input class="input" type="number" placeholder="Duration" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-primary">Apply filters</button>
      </div>
    </div>
  </base-box>
</template>

<style scoped></style>
