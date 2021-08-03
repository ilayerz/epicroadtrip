import { createRouter, createWebHistory } from 'vue-router';
// eslint-disable-next-line import/extensions
import Route from '@/view/Route';
// eslint-disable-next-line import/extensions
import Home from '@/view/Home';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/route/:id',
    name: 'Route',
    component: Route,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
