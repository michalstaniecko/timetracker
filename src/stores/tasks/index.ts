import { defineStore } from 'pinia';
import { db } from '@/js/firebase';
import type { Track } from '@/stores/tracks/interfaces';

import { useAuthStore } from '@/stores/auth';
import { useProjectsStore } from '@/stores/projects';

import { collection, query, onSnapshot, where, Query } from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');
let tasksCollectionQuery: Query;
let unsubscribeSnapshot;

export const useTasksStore = defineStore('tasks', {
  state: (): {
    tasks: Track[];
  } => {
    return {
      tasks: []
    };
  },
  getters: {
    isNotEmpty: (state) => {
      return state.tasks !== null && state.tasks.length > 0;
    },
    getById: (state) => {
      return (id: string) => {
        const task = state.tasks.find((task: { id: string }) => task.id === id);
        if (task) return task;
        return undefined;
      };
    },
    getTasks: (state) => {
      return (filters: unknown) => {
        if (!filters) {
          return state.tasks;
        }
        return null;
      };
    }
  },
  actions: {
    init() {
      this.fetch();
    },

    fetch() {
      const projectStore = useProjectsStore();
      const projects = projectStore.getProjects();
      const projectsId = projects!.map((project) => project.id);
      tasksCollectionQuery = query(tasksCollectionRef, where('projectId', 'in', projectsId));
      unsubscribeSnapshot = onSnapshot(tasksCollectionQuery, (querySnapshot) => {
        this.tasks = querySnapshot.docs.map((doc) => {
          return doc.data() as Track;
        });
      });
    }
  }
});
