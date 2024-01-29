import { defineStore } from 'pinia';
import type { State } from '@/stores/projects/interfaces';
import type { Project } from '@/stores/projects/interfaces';
import type { Filters } from '@/stores/projects/interfaces';

import { useAuthStore } from '@/stores/auth';
import { useTasksStore } from '@/stores/tasks';

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
  deleteDoc,
  doc
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { db } from '@/js/firebase';

let projectsCollectionRef: CollectionReference;
let projectsQuery: Query;

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
    async init() {
      return new Promise((resolve) => {
        const authStore = useAuthStore();
        projectsCollectionRef = collection(db, 'projects');

        projectsQuery = query(
          projectsCollectionRef,
          where('users', 'array-contains', authStore.getUserId),
          orderBy('created', 'desc')
        );

        this.fetch().then(() => resolve(true));
      });
    },
    fetch() {
      return new Promise((resolve, reject) => {
        const tasksStore = useTasksStore();
        unsubscribeSnapshot = onSnapshot(
          projectsQuery,
          (querySnapshot) => {
            this.projects = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data() as Project;
              this.projects.push({
                ...data,
                id: doc.id
              });
            });

            tasksStore.fetch();
            resolve(true);
          },
          (error) => {
            console.log('projectsQuery', error);
            reject(error);
          }
        );
      });
    },
    async add(payload: { title: string; description: string; teamId: string }) {
      const authStore = useAuthStore();
      const created = Timestamp.now();
      const newProject = {
        created: created,
        createdBy: authStore.getUserId,
        users: [authStore.getUserId],
        ...payload
      };
      try {
        await addDoc(projectsCollectionRef, newProject);
      } catch (e) {
        console.log(e);
      }
    },
    async remove(id: string) {
      await deleteDoc(doc(db, 'projects', id));
    },
    edit() {},
    clear() {
      this.projects = [];
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    }
  }
});
