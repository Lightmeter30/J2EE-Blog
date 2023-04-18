import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../view/HomeView.vue"
import LoginView from "../view/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ]
})

router.beforeEach((to, from) => {

})

export default router