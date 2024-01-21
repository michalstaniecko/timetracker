<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTimerStore } from '@/stores/timer';
import { storeToRefs } from 'pinia';

const show = ref<boolean>();

const closeHandler = () => (show.value = false);

const timerStore = useTimerStore();

const { isRunning } = storeToRefs(timerStore);

watch(isRunning, (newValue) => (show.value = newValue));
</script>

<template>
  <base-popup :show="show" @close="closeHandler">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.
    <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum
    rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
    <a>felis venenatis</a> efficitur.
  </base-popup>
</template>

<style scoped></style>
