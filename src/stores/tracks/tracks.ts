import { defineStore } from 'pinia';
import type { Track, Filters } from '@/stores/tracks/interfaces';
import { useSettingsStore } from '@/stores/settings/settings';

import { db } from '@/js/firebase';
import {
  collection,
  CollectionReference,
  query,
  where,
  orderBy,
  addDoc,
  onSnapshot,
  Query
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';

import moment from 'moment';

type Timer = Omit<Track, 'id'>;

let tracksCollectionRef: CollectionReference;
let tracksQuery: Query;
let unsubscribeSnapshot: Unsubscribe;

export const useTracksStore = defineStore('tracks', {
  state: (): {
    history: Track[];
    filters: Filters | null;
  } => ({
    history: [],
    filters: null
  }),
  getters: {
    getFiltered: ({ history, filters }) => {
      if (!filters) {
        return history;
      }

      let filtered = [...history];

      if (filters.dateFrom) {
        filtered = filtered.filter((item) => item.created >= filters.dateFrom);
      }

      if (filtered.length > 0) {
        if (filters.dateTo) {
          filtered = filtered.filter((item) => item.created <= filters.dateTo);
        }
      }

      return filtered;
    },

    duration: () => (from: number, to: number) => {
      const dateFrom = moment(from);
      const dateTo = moment(to);
      const diff = dateTo.diff(dateFrom);
      const duration = moment.duration(diff);
      return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
    },
    dateFormatted: () => (timestamp: number) => {
      const settingsStore = useSettingsStore();

      return moment(timestamp).format(settingsStore.getDateTimeFormat);
    },
    getTotalByProjectId:
      ({ history }): ((projectId: string) => number) =>
      (projectId: string) => {
        const tracks = history.filter((item) => item.projectId === projectId);
        return tracks.reduce((acc, cur) => {
          acc += cur.endTime - cur.startTime;
          return acc;
        }, 0);
      },
    getListByProjectId:
      ({ history }): ((projectId: string) => Track[] | undefined) =>
      (projectId: string) => {
        return history.filter((item) => item.projectId === projectId);
      }
  },
  actions: {
    init(userId: string) {
      return new Promise((resolve) => {
        tracksCollectionRef = collection(db, 'tracks');
        tracksQuery = query(
          tracksCollectionRef,
          where('userId', '==', userId),
          orderBy('created', 'desc')
        );
        this.fetch().then(() => resolve(true));
      });
    },
    fetch() {
      return new Promise((resolve) => {
        unsubscribeSnapshot = onSnapshot(tracksQuery, (querySnapshot) => {
          const history: Track[] = [];
          querySnapshot.docs.forEach((doc) => {
            history.push({
              id: doc.id,
              description: doc.data().description,
              endTime: doc.data().endTime,
              startTime: doc.data().startTime,
              created: doc.data().created,
              projectId: doc.data().projectId,
              userId: doc.data().userId,
              taskId: doc.data().taskId
            });
          });

          this.history = history;

          resolve(true);
        });
      });
    },
    async save(track: Timer) {
      const doc = await addDoc(tracksCollectionRef, track);
      if (doc) return true;
    },
    edit(id: string) {
      console.log(`edit ${id}`);
    },
    delete(id: string) {
      console.log(`delete ${id}`);
    },
    unsubscribe() {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        this.history = [];
      }
    },
    updateFilter(filter) {
      this.filters = { ...this.filters, ...filter };
    }
  }
});
