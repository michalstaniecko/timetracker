import { ref } from 'vue';

export type ErrorKeys =
  | 'auth/missing-email'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/invalid-email'
  | 'auth/weak-password'
  | 'auth/invalid-login-credentials'
  | 'auth/missing-password';

type ErrorMessages = {
  [key in ErrorKeys]: string;
};

const availableErrors: ErrorMessages = {
  'auth/missing-email': 'Missing email address',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
  'auth/email-already-in-use': 'Email already in use',
  'auth/invalid-email': 'Invalid email address',
  'auth/weak-password': 'Weak password',
  'auth/invalid-login-credentials': 'Invalid login credentials',
  'auth/missing-password': 'Missing password'
};

function useErrorAuth() {
  const isError = ref(false);
  const errorMessage = ref('');

  function setError(type: ErrorKeys) {
    isError.value = true;
    errorMessage.value = availableErrors[type] || 'Unknown error';
  }

  function clearError() {
    isError.value = false;
    errorMessage.value = '';
  }

  return { errorMessage, setError, clearError };
}

export default useErrorAuth;
