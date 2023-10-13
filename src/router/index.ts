import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '@/views/Auth.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
});

router.beforeEach((to, form, next) => {
  return next();
});

export default router;
