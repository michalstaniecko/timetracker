import { defineStore } from 'pinia';

import { useProjectsStore } from '@/stores/projects';
import { useUserStore } from '@/stores/user';
import { useTimerStore } from '@/stores/timer';

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
  state: (): { credentials: { id?: string } } => ({
    credentials: {}
  }),
  getters: {
    isLogged(): boolean {
      return !!this.credentials.id;
    },
    getUserId(): string | undefined {
      return this.credentials.id;
    }
  },
  actions: {
    init() {
      const projectsStore = useProjectsStore();
      const timerStore = useTimerStore();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.credentials.id = user.uid;
          projectsStore.init();
          timerStore.init(user.uid);
        } else {
          this.credentials = {};
        }
      });
    },
    login({ email, password }: formPayload) {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential: UserCredential) => {
            this.credentials.id = userCredential.user.uid;
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
            this.credentials.id = userCredential.user.uid;
            this.router.push('/projects');
            resolve(true);
          })
          .catch((error) => {
            console.log('signup', error);
            reject(false);
          });
      });
    },
    async logout() {
      try {
        await signOut(auth);
        this.router.push('/');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
  }
});
