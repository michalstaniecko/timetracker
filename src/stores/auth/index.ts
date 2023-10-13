import { defineStore } from 'pinia';

import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from '@/js/firebase';

import type { formPayload } from '@/components/Auth/interfaces';
import type { UserCredential } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    credentials: {}
  }),
  getters: {},
  actions: {
    init() {},
    login({ email, password }: formPayload) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            this.credentials = userCredential;
            this.router.push('/projects');
            resolve(true);
          })
          .catch((error) => {
            console.error(error);
            reject(false);
          });
      });
    },
    signup({ email, password }: formPayload) {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            this.credentials = userCredential;
            this.router.push('/projects');
            resolve(true);
          })
          .catch((error) => {
            console.log('signup', error);
            reject(false);
          });
      });
    },
    logout() {}
  }
});
