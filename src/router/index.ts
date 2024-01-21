import { createRouter, createWebHistory } from 'vue-router';
import TheHome from '../views/TheHome.vue';
import TheAuth from '@/views/TheAuth.vue';
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
      component: TheAuth,
      meta: {
        requireGuest: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: TheHome
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
