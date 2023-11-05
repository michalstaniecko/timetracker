import { defineStore } from 'pinia';
import type { Track } from '@/stores/tracks/interfaces';
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

let tracksCollectionRef: CollectionReference;
let tracksQuery: Query;
let unsubscribeSnapshot: Unsubscribe;

export const useTracksStore = defineStore('tracks', {
  state: (): {
    history: Track[];
  } => ({
    history: []
  }),
  getters: {
    getFiltered:
      ({ history }) =>
      (filters = null) => {
        if (filters === null) return history;
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
      ({ history }): number =>
      (projectId: string) => {
        const tracks = history.filter((item) => item.projectId === projectId);
        return tracks.reduce((acc, cur) => {
          acc += cur.endTime - cur.startTime;
          return acc;
        }, 0);
      }
  },
  actions: {
    init(userId: string) {
      tracksCollectionRef = collection(db, 'tracks');
      tracksQuery = query(
        tracksCollectionRef,
        where('userId', '==', userId),
        orderBy('created', 'desc')
      );
      this.fetch();
    },
    fetch() {
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
            userId: doc.data().userId
          });
        });

        this.history = history;
      });
    },
    async save(track: Track) {
      const doc = await addDoc(tracksCollectionRef, track);
      if (doc) return true;
    },
    edit(id: string) {},
    delete(id: string) {},
    unsubscribe() {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        this.history = [];
      }
    }
  }
});
