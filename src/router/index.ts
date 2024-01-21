import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '@/views/Auth.vue';
import ProjectList from '@/views/Project/ProjectList.vue';
import { getIsAuth } from '@/js/firebase';
import TrackList from '@/views/Track/TrackList.vue';
import ProjectDetails from '@/views/Project/ProjectDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        requireGuest: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/projects/:id',
      component: ProjectDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/tracks',
      name: 'tracks',
      component: TrackList,
      meta: {
        requireAuth: true
      }
    }
  ]
});

router.beforeEach(async (to) => {
  const isAuth = await getIsAuth();

  if (!isAuth && to.meta.requireAuth) return '/auth';

  if (isAuth && to.meta.requireGuest) return '/projects';

  return true;
});

export default router;
