import { createRouter, createWebHistory } from 'vue-router';
// @ts-ignore
import Home from '@/views/HomeView';
// @ts-ignore
import WeatherForecast from '@/views/WeatherForecastView';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: WeatherForecast,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

