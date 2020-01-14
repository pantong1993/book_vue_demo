import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import("../components/Home")
    },
  {
    path: '/book',
    name: 'book',
    component: () => import("../components/Book")
  },
  {
    path: '/author',
    name: 'author',
    component: () => import("../components/Author")
  },
  {
    path: '/publisher',
    name: 'publisher',
    component: () => import("../components/Publisher")
  }
]

const router = new VueRouter({
    routes
})

export default router
