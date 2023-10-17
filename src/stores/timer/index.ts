import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { db } from '@/js/firebase';

import {
  collection,
  CollectionReference,
  onSnapshot,
  DocumentReference,
  doc,
  setDoc
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { useTracksStore } from '@/stores/tracks/tracks';

let timerCollectionRef: CollectionReference;
let timerDocRef: DocumentReference;

let unsubscribeSnapshot: Unsubscribe;

export const useTimerStore = defineStore('timer', {
  state: () => ({
    startTime: 0,
    projectId: '',
    description: '',
    created: 0
  }),
  getters: {
    isRunning({ startTime }) {
      return startTime > 0;
    },
    getProjectId: ({ projectId }) => projectId
  },
  actions: {
    init(userId: string) {
      timerCollectionRef = collection(db, 'timer');
      timerDocRef = doc(timerCollectionRef, userId);
      this.get();
    },
    get() {
      unsubscribeSnapshot = onSnapshot(timerDocRef, (doc) => {
        console.log('unsubscribeTimer', doc.data());
        this.startTime = doc.data()!.start;
        this.projectId = doc.data()!.projectId;
        this.description = doc.data()!.description;
        this.created = doc.data()!.created;
      });
    },
    async set({ projectId, description = '' }: { projectId: string; description?: string }) {
      await this.stop();
      this.startTime = new Date().getTime();
      this.projectId = projectId;
      this.description = description;
      this.created = new Date().getTime();
      setDoc(timerDocRef, {
        start: this.startTime,
        projectId: this.projectId,
        description: this.description,
        created: this.created
      })
        .then(() => {})
        .catch((error) => {});
    },
    async stop() {
      if (this.startTime > 0) {
        await this.pushHistory();
        await this.clear();
      }
    },
    async clear() {
      return new Promise((resolve) => {
        this.startTime = 0;
        this.description = '';
        this.projectId = '';
        setDoc(timerDocRef, {
          start: 0,
          projectId: '',
          description: '',
          created: 0
        })
          .then(() => {
            resolve(true);
          })
          .catch((error) => {});
      });
    },
    async pushHistory() {
      const authStore = useAuthStore();
      const tracksStore = useTracksStore();
      const end = new Date().getTime();
      const timer = {
        endTime: end,
        description: this.description,
        projectId: this.projectId,
        startTime: this.startTime,
        userId: authStore.getUserId,
        created: this.created
      };
      return await tracksStore.save(timer);
    },
    unsubscribe() {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    }
  }
});
