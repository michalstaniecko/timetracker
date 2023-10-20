<script setup lang="ts">
import ProjectItem from '@/components/Project/ProjectItem.vue';
import ProjectForm from '@/components/Project/ProjectForm.vue';

import { useProjectsStore } from '@/stores/projects';
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { Project } from '@/stores/projects/interfaces';

const projectsStore = useProjectsStore();

const projects: ComputedRef<Project[] | null> = computed(() => projectsStore.getProjects());
</script>

<template>
  <base-container>
    <base-box>
      <project-form />
    </base-box>
    <base-box class="grid" v-if="projects !== null && projects.length > 0">
      <project-item
        v-for="project in projects"
        :key="project.id"
        :title="project.title"
        :description="project.description"
        :created="project.created"
        :project-id="project.id"
      />
    </base-box>
  </base-container>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
}
</style>
