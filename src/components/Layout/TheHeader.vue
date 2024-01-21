<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();

const isLogged = computed(() => authStore.isLogged);

const handleLogout = () => authStore.logout();
</script>

<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <strong>TimeTracker</strong>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/projects" class="navbar-item">Projects</router-link>
        <router-link to="/tracks" class="navbar-item">Tracks</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button is-light" to="/auth" v-if="!isLogged"> Log in </router-link>
            <router-link class="button is-light" to="/auth" v-else @click="handleLogout">
              Log out
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
