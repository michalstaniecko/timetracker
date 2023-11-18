import { defineStore } from 'pinia';
import type { State } from '@/stores/projects/interfaces';
import type { Project } from '@/stores/projects/interfaces';
import type { Filters } from '@/stores/projects/interfaces';

import { useAuthStore } from '@/stores/auth';

import {
  addDoc,
  collection,
  Timestamp,
  CollectionReference,
  Query,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { db } from '@/js/firebase';

let projectsCollectionRef: CollectionReference;
let junctionProjectUserRef: CollectionReference, junctionProjectUserQuery: Query;

let unsubscribeSnapshot: Unsubscribe;

export const useProjectsStore = defineStore('projects', {
  state: (): State => ({
    projects: []
  }),
  getters: {
    isNotEmpty(): boolean {
      return this.projects !== null && this.projects.length > 0;
    },
    getById({ projects }): (id: string) => Project | undefined {
      return (id: string): Project | undefined => {
        const project = projects.find((project) => project.id === id);
        if (project) return project;
        return undefined;
      };
    },
    getProjects: ({ projects }) => {
      return (filters?: Filters): Project[] | null => {
        if (!filters) {
          return projects;
        }
        return null;
      };
    }
  },
  actions: {
    init() {
      const authStore = useAuthStore();
      projectsCollectionRef = collection(db, 'projects');
      junctionProjectUserRef = collection(db, 'junctionProjectUser');

      junctionProjectUserQuery = query(
        junctionProjectUserRef,
        where('userId', '==', authStore.getUserId),
        orderBy('created', 'desc')
      );

      this.fetch();
    },
    fetch() {
      unsubscribeSnapshot = onSnapshot(
        junctionProjectUserQuery,
        async (querySnapshot) => {
          const projectsDoc = await Promise.all(
            querySnapshot.docs.map((docSnapshot) => {
              const projectId = docSnapshot.data().projectId;
              return getDoc(doc(db, 'projects', projectId));
            })
          );
          this.projects = projectsDoc.map((doc) => {
            const data = doc.data() as Project;
            return {
              ...data,
              id: doc.id
            };
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async add(payload: { title: string; description: string; teamId: string }) {
      const authStore = useAuthStore();
      const created = Timestamp.now();
      const newProject = {
        created: created,
        ...payload
      };
      try {
        const response = await addDoc(projectsCollectionRef, newProject);
        await addDoc(junctionProjectUserRef, {
          projectId: response.id,
          userId: authStore.getUserId,
          created: created
        });
      } catch (e) {
        console.log(e);
      }
    },
    remove() {},
    edit() {},
    clear() {
      this.projects = [];
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    }
  }
});
