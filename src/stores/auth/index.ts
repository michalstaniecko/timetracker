import { defineStore } from 'pinia';

import { useProjectsStore } from '@/stores/projects';
import { useTimerStore } from '@/stores/timer';
import { useTracksStore } from '@/stores/tracks/tracks';

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
  state: (): { credentials: { id?: string }; isLoaded: boolean } => ({
    credentials: {},
    isLoaded: false
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
    loadApp(userId: string) {
      const projectsStore = useProjectsStore();
      const timerStore = useTimerStore();
      const tracksStore = useTracksStore();
      return Promise.all([projectsStore.init(), timerStore.init(userId), tracksStore.init(userId)]);
    },
    async init() {
      const projectsStore = useProjectsStore();
      const timerStore = useTimerStore();
      const tracksStore = useTracksStore();

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.credentials.id = user.uid;
          await this.loadApp(user.uid);
        } else {
          this.credentials = {};
          projectsStore.clear();
          timerStore.unsubscribe();
          tracksStore.unsubscribe();
        }
        this.isLoaded = true;
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
            reject(error.code);
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
            reject(error.code);
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
