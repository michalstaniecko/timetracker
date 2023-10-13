import { ref, defineEmits } from 'vue';

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

export { handleSubmit, email, password };
