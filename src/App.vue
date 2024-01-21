<script setup lang="ts">
import TheHeader from '@/components/Layout/TheHeader.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import TimerPopup from '@/components/Layout/TimerPopup.vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
});
</script>

<template>
  <div>
    <TheHeader />
    <router-view></router-view>
    <timer-popup />
  </div>
</template>

<style scoped></style>
