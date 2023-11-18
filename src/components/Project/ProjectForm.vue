<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const projectsStore = useProjectsStore();

const title = ref('');
const teamId = ref('');
const description = ref('');
const newTeamName = ref('');

const createTeamHandler = () => {
  console.log('createTeamHandler', newTeamName.value);
};

const submitHandler = () => {
  projectsStore.add({
    title: title.value,
    teamId: teamId.value,
    description: description.value
  });
};
</script>

<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <h2 class="subtitle">Add new project</h2>
    </div>
  </div>
  <form @submit.prevent="submitHandler">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Name</label>
      </div>
      <div class="field-body">
        <div class="control">
          <input v-model="title" class="input" type="text" placeholder="Project name" />
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Team</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="teamId">
                <option value="">Select Team</option>
                <option value="team1">Private</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field has-addons">
          <div class="control">
            <input
              v-model="newTeamName"
              class="input"
              type="text"
              placeholder="Or create new team"
            />
          </div>
          <div class="control">
            <button type="button" @click="createTeamHandler" class="button is-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Message</label>
      </div>
      <div class="field-body">
        <div class="control">
          <textarea v-model="description" class="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label"></div>
      <div class="field-body">
        <div class="control">
          <button type="submit" class="button is-link">Submit</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
