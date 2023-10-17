import { defineStore } from 'pinia';
import type { Track } from '@/stores/tracks/interfaces';

import { db } from '@/js/firebase';
import {
  collection,
  CollectionReference,
  updateDoc,
  DocumentReference,
  doc,
  setDoc,
  addDoc
} from 'firebase/firestore';

let tracksCollectionRef: CollectionReference;

export const useTracksStore = defineStore('tracking', {
  state: () => ({
    history: []
  }),
  getters: {},
  actions: {
    init() {
      tracksCollectionRef = collection(db, 'tracks');
    },
    async save(track: Track) {
      const doc = await addDoc(tracksCollectionRef, track);
      if (doc) return true;
    },
    edit(id: string) {},
    delete(id: string) {}
  }
});
