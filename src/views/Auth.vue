<script setup lang="ts">
import LoginForm from '@/components/Auth/LoginForm.vue';
import SignupForm from '@/components/Auth/SignupForm.vue';
import SelectForm from '@/components/Auth/SelectForm.vue';
import { ref } from 'vue';
import type { modeType } from '@/components/Auth/interfaces';

const component = {
  login: LoginForm,
  signup: SignupForm
};

const selectedMode = ref<modeType>('login');

const handleModeUpdate = (mode: modeType) => {
  selectedMode.value = mode;
};
</script>

<template>
  <base-container>
    <select-form :mode="selectedMode" @update="handleModeUpdate" />
    <base-box>
      <component :is="component[selectedMode]" />
    </base-box>
  </base-container>
</template>

<style scoped></style>
