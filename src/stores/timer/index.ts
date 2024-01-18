import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { db } from '@/js/firebase';
import { useStopwatch } from '@/use/useStopwatch';

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
import moment from 'moment';

let timerCollectionRef: CollectionReference;
let timerDocRef: DocumentReference;

let unsubscribeSnapshot: Unsubscribe;

// TODO: stopwatch doesn't run after page refresh
const { startStopwatch, stopStopwatch, elapsedTimeRef } = useStopwatch();

export const useTimerStore = defineStore('timer', {
  state: () => ({
    startTime: 0,
    projectId: '',
    description: '',
    created: 0,
    elapsedTimeRef: elapsedTimeRef
  }),
  getters: {
    isRunning({ startTime }) {
      return startTime > 0;
    },
    getProjectId: ({ projectId }) => projectId,
    getFormattedElapsedTime: ({ elapsedTimeRef }) => {
      const duration = moment.duration(elapsedTimeRef);
      const hours = duration.hours();
      const formatted = moment(elapsedTimeRef).format('mm:ss');
      return `${hours}:${formatted}`;
    }
  },
  actions: {
    init(userId: string) {
      return new Promise((resolve) => {
        timerCollectionRef = collection(db, 'timer');
        timerDocRef = doc(timerCollectionRef, userId);
        this.get().then(() => resolve(true));
      });
    },
    get() {
      return new Promise((resolve) => {
        unsubscribeSnapshot = onSnapshot(timerDocRef, (doc) => {
          if (!doc.data()) return;

          this.startTime = doc.data()!.start;
          this.projectId = doc.data()!.projectId;
          this.description = doc.data()!.description;
          this.created = doc.data()!.created;
          if (this.startTime > 0) startStopwatch(this.startTime);
          resolve(true);
        });
      });
    },
    async set() {
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
        stopStopwatch();
        await this.pushHistory();
        await this.clear();
      }
    },
    async start({ projectId, description = '' }: { projectId: string; description?: string }) {
      await this.stop();
      this.startTime = new Date().getTime();
      this.projectId = projectId;
      this.description = description;
      this.created = new Date().getTime();
      await this.set();
      startStopwatch(this.startTime);
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
      this.startTime = 0;
      this.projectId = '';
      this.description = '';
      this.created = 0;
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    }
  }
});
