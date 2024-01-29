import { ref } from 'vue';

export const useStopwatch = () => {
  const startTime = ref();
  const stopwatchInterval = ref();
  const elapsedPausedTime = ref(0);
  const elapsedTimeRef = ref(0);

  const startStopwatch = (time: number) => {
    if (!stopwatchInterval.value) {
      startTime.value = time;
      stopwatchInterval.value = setInterval(updateStopwatch, 1000);
    }
  };

  const stopStopwatch = () => {
    clearInterval(stopwatchInterval.value);
    elapsedPausedTime.value = new Date().getTime() - startTime.value;
    stopwatchInterval.value = null;
    elapsedTimeRef.value = 0;
  };

  const updateStopwatch = () => {
    const currentTime = new Date().getTime();
    elapsedTimeRef.value = currentTime - startTime.value;
  };

  return { startStopwatch, elapsedTimeRef, stopStopwatch };
};
