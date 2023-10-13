<script setup lang="ts">
import LoginForm from '@/components/Auth/LoginForm.vue';
import SignupForm from '@/components/Auth/SignupForm.vue';
import SelectForm from '@/components/Auth/SelectForm.vue';
import { ref } from 'vue';
import type { modeType } from '@/components/Auth/interfaces';
import type { formPayload } from '@/components/Auth/interfaces';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const component = {
  login: LoginForm,
  signup: SignupForm
};

const selectedMode = ref<modeType>('login');
const isLoading = ref(false);

const handleModeUpdate = (mode: modeType) => {
  selectedMode.value = mode;
};

const handleSubmit = async (payload: formPayload) => {
  isLoading.value = true;
  console.log(payload);
  try {
    if (selectedMode.value === 'signup') {
      await authStore.signup(payload);
    }
    if (selectedMode.value === 'login') {
      await authStore.login(payload);
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <base-container>
    <select-form :mode="selectedMode" @update="handleModeUpdate" />
    <base-box>
      <component :is="component[selectedMode]" @submit="handleSubmit" />
    </base-box>
  </base-container>
</template>

<style scoped></style>
