import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WhoWeHelp from '../views/WhoWeHelp.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import AirPlay from '../views/dashboard/AirPlay.vue'
import Reports from '../views/dashboard/Reports.vue'
import Tutorials from '../views/dashboard/Tutorials.vue'
import Settings from '../views/dashboard/Settings.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/who-we-help',
    name: 'whowehelp',
    component: WhoWeHelp
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        redirect: { name: 'airplay' }
      },
      {
        path: 'airplay',
        name: 'airplay',
        component: AirPlay
      },
      {
        path: 'reports',
        name: 'reports',
        component: Reports
      },
      {
        path: 'tutorials',
        name: 'tutorials',
        component: Tutorials
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  
  // Check for expired session
  if (to.query.session === 'expired') {
    store.dispatch('clearError')
    next('/login')
    return
  }

  // Handle routes that require authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
  // Handle guest routes (like login)
  else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next('/dashboard')
    } else {
      next()
    }
  }
  // Public routes
  else {
    next()
  }
})

export default router 