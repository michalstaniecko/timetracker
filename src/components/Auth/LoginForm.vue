<script setup lang="ts">
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');

const props = withDefaults(
  defineProps<{
    errorMessage: string;
    onChangeForm: () => void;
    isPending: boolean;
  }>(),
  {
    errorMessage: '',
    isPending: false
  }
);

const emits = defineEmits<{
  (
    e: 'submit',
    value: {
      email: string;
      password: string;
    }
  ): void;
  (
    e: 'resetPassword',
    value: {
      email: string;
    }
  ): void;
}>();

const handleSubmit = () =>
  emits('submit', {
    email: email.value,
    password: password.value
  });

const isError = computed(() => props.errorMessage !== '');

const handleInput = () => {
  props.onChangeForm();
};

const handleClickResetPassword = () => {
  emits('resetPassword', {
    email: email.value
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          @input="handleInput"
          v-model.lazy="email"
          type="email"
          placeholder="e.g. alex@example.com"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          class="input"
          @input="handleInput"
          v-model="password"
          type="password"
          placeholder="********"
        />
      </div>
    </div>

    <p v-if="isError" class="help is-danger mb-3">{{ errorMessage }}</p>

    <div class="buttons my-3">
      <button :disabled="isPending" type="submit" class="button is-primary">Login</button>
      <button class="button  is-info is-o" role="button" type="button" @click="handleClickResetPassword">Reset password</button>
    </div>
  </form>
</template>

<style scoped></style>
