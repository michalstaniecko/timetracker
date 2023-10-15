import { defineStore } from 'pinia';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import { db } from '@/js/firebase';

let userCollectionRef: CollectionReference;
let userDocRef: DocumentReference;

export const useUserStore = defineStore('user', {
  state: () => ({
    id: ''
  }),
  getters: {},
  actions: {}
});
