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
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/view/EditView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/view/BlogView.vue')
    },
    {
      path: '/space',
      name: 'space',
      component: () => import('@/view/PersonalView.vue'),
      children: [
        {
          path: 'home',
          name: 'spaceHome',
          component: () => import('@/view/space/SpaceHome.vue')
        },
        {
          path: 'attention',
          name: 'spaceAttention',
          component: () => import('@/view/space/SpaceList.vue')
        },
        {
          path: 'fans',
          name: 'spaceFans',
          component: () => import('@/view/space/SpaceList.vue')
        },
        {
          path: 'info',
          name: 'spaceInfo',
          component: () => import('@/view/space/SpaceChangeInfo.vue')
        },
        {
          path: 'collect',
          name: 'spaceCollect',
          component: () => import('@/view/space/SpaceCollect.vue')
        },
        {
          path: 'draft',
          name: 'spaceDraft',
          component: () => import('@/view/space/SpaceDraft.vue')
        },
      ],
    },
  ]
})

router.beforeEach((to, from) => {

})

export default router