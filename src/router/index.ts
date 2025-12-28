import { createRouter, createWebHistory } from 'vue-router'
import CoachListComponent from "@/views/coach/CoachListComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      name: 'coach-list',
      path: '/coaches',
      component: CoachListComponent,
      meta: { isAuthRequired: true }
    },
    {
      name: 'coach-detail',
      path: '/coaches/:id',
      component: () => import('../views/coach/CoachDetailComponent.vue'),
      props: true,
      children: [
        { name: 'contact', path: 'contact', component: () => import('../views/coach/ContactComponent.vue'), props: true }
      ],
      meta: { isAuthRequired: true }
    },
    { path: '/:pathMatch(.*)*', redirect: '/coaches' },
    {
      name: 'register',
      path: '/register',
      component: () => import('../views/auth/TheRegisterComponent.vue'),
      meta: { isAuthRequired: false }
    },
    {
      name: 'request',
      path: '/request',
      component: () => import('../views/request/TheRequestComponent.vue'),
      meta: { isAuthRequired: true }
    },
    {
      name: 'content-not-found',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/TheContentNotFoundComponent.vue')
    }
  ],
})

export default router
