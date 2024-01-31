<script setup lang="ts">
import LoginForm from '@/components/Auth/LoginForm.vue';
import SignupForm from '@/components/Auth/SignupForm.vue';
import SelectForm from '@/components/Auth/SelectForm.vue';
import { ref } from 'vue';
import type { modeType } from '@/components/Auth/interfaces';
import type { formPayload } from '@/components/Auth/interfaces';
import { useAuthStore } from '@/stores/auth';
import useErrorAuth from '@/js/auth/error';
import { type ErrorKeys } from '@/js/auth/error';

const authStore = useAuthStore();

const { errorMessage, setError, clearError } = useErrorAuth();

const component = {
  login: LoginForm,
  signup: SignupForm
};

const selectedMode = ref<modeType>('login');
const isPending = ref(false);

const handleModeUpdate = (mode: modeType) => {
  clearError();
  selectedMode.value = mode;
};

const handleChange = () => {
  console.log('handleChange');
  clearError();
};

const handleSubmit = async (payload: formPayload) => {
  isPending.value = true;
  try {
    if (selectedMode.value === 'signup') {
      await authStore.signup(payload);
    }
    if (selectedMode.value === 'login') {
      await authStore.login(payload);
    }
  } catch (e) {
    setError(e as ErrorKeys);
  } finally {
    isPending.value = false;
  }
};
</script>

<template>
  <base-container>
    <select-form :mode="selectedMode" @update="handleModeUpdate" />
    <base-box>
      <component
        @changeForm="handleChange"
        :is="component[selectedMode]"
        @submit="handleSubmit"
        :errorMessage="errorMessage"
        :isPending="isPending"
      />
    </base-box>
  </base-container>
</template>

<style scoped></style>
