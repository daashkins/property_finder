import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/house/:id',
      name: 'house',
      component: () => import('../views/HouseDetailsView.vue')
    },
    {
      path: '/house/edit/:id',
      name: 'edit',
      component: () => import('../views/EditHouseView.vue')
    },
    {
      path: '/house/create',
      name: 'add_house',
      component: () => import('../views/CreateHouseView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ],
})

export default router
