import { defineStore } from 'pinia';

import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from '@/js/firebase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    credentials: {}
  }),
  getters: {},
  actions: {
    init() {},
    login() {},
    signup() {},
    logout() {}
  }
});
