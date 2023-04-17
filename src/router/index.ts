import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../view/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
  ]
})

router.beforeEach((to, from) => {

})

export default router