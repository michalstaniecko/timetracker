import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { db } from '@/js/firebase';

import {
  collection,
  addDoc,
  CollectionReference,
  updateDoc,
  DocumentReference,
  doc,
  setDoc
} from 'firebase/firestore';

let timerCollectionRef: CollectionReference;
let timerDocRef: DocumentReference;

export const useTimerStore = defineStore('timer', {
  state: () => ({
    id: '',
    startTime: 0,
    projectId: '',
    description: '',
    created: ''
  }),
  getters: {
    isRunning({ id }) {
      return id.length > 0;
    },
    getId: ({ id }) => id,
    getProjectId: ({ projectId }) => projectId
  },
  actions: {
    init(userId: string) {
      timerCollectionRef = collection(db, 'timer');
      timerDocRef = doc(timerCollectionRef, userId);
    },
    async set({ projectId, description = '' }: { projectId: string; description?: string }) {
      await this.stop();
      this.id = new Date().getTime().toString();
      this.startTime = new Date().getTime();
      this.projectId = projectId;
      this.description = description;
      this.created = new Date().getTime().toString();
      setDoc(timerDocRef, {
        id: this.id,
        start: this.startTime,
        projectId: this.projectId,
        description: this.description,
        created: this.created
      })
        .then(() => {})
        .catch((error) => {});
    },
    async stop() {
      if (this.id.length > 0) {
        await this.pushHistory();
        await this.clear();
      }
    },
    async clear() {
      return new Promise((resolve) => {
        this.id = '';
        this.startTime = 0;
        this.description = '';
        this.projectId = '';
        resolve(true);
      });
    },
    async pushHistory() {
      const authStore = useAuthStore();
      const end = new Date().getTime().toString();
      const timer = {
        endTime: end,
        id: this.id,
        description: this.description,
        projectId: this.projectId,
        startTime: this.startTime,
        userId: authStore.getUserId,
        created: this.created
      };
      // TODO: push to firestore, use tracking store
      console.log('push history', timer);
    }
  }
});
