import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/proportionalChart',
      name: 'proportionalChart',
      component: () => import('../views/ProportionalMap.vue')
    },
    {
      path: '/PredictiveAnalysisCharts',
      name: 'PredictiveAnalysisCharts',
      component: () => import('../views/PredictiveAnalysis.vue')
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
