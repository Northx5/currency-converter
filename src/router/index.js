import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/converter'
    },
    {
      path: '/converter',
      name: 'converter',
      component: () => import('../views/CurrencyConverter.vue')
    }
  ]
});

export default router;
