<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const emits = defineEmits<{
  (
    e: 'submit',
    value: {
      email: string;
      password: string;
    }
  ): void;
}>();

const handleSubmit = () =>
  emits('submit', {
    email: email.value,
    password: password.value
  });
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" v-model="email" type="email" placeholder="e.g. alex@example.com" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" v-model="password" type="password" placeholder="********" />
      </div>
    </div>

    <button type="submit" class="button is-primary">Login</button>
  </form>
</template>

<style scoped></style>
