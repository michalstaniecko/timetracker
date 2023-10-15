<script setup lang="ts">
import TheHeader from '@/components/Layout/TheHeader.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
});
</script>

<template>
  <div>
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
