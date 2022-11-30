import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/d3multiline',
      name: 'd3multiline',
      component: () => import('../views/MultiLineChart.vue')
    },
    {
      path: '/ZoomableCirclePacking',
      name: 'ZoomableCirclePacking',
      component: () => import('../views/CirclePacking.vue')
    },
    {
      path: '/chloropethChart',
      name: 'chloropethChart',
      component: () => import('../views/ChloroplethMap.vue')
    },
    {
      path: '/Piechart',
      name: 'Piechart',
      component: () => import('../views/PieChart.vue')
    },
    {
      path: '/d3chartcomp',
      name: 'd3chartcomp',
      component: () => import('../views/D3ChartCompView.vue')
    },
    {
      path: '/smallmultiples',
      name: 'smallmultiples',
      component: () => import('../views/SmallMultiplesView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapboxMapView.vue')
    },
    {
      path: '/mapcomp',
      name: 'mapcomp',
      component: () => import('../views/MapboxMapCompView.vue')
    },
    {
      path: '/deckmapcomp',
      name: 'deckmapcomp',
      component: () => import('../views/MapboxDeckGLMapCompView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
