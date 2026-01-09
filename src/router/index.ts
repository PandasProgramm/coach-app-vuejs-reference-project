import { createRouter, createWebHistory } from 'vue-router'
import CoachListComponent from "@/views/coach/CoachListComponent.vue";
import {useAuthStore} from "@/stores/AuthStore.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      name: 'coach-list',
      path: '/coaches',
      component: CoachListComponent,
      children: [
        {
          name: 'contact',
          path: ':id/contact',
          component: () => import('../views/coach/ContactComponent.vue'),
          props: true,
        },
      ],
      meta: { isAuthRequired: true },
    },
    {
      name: 'coach-detail',
      path: '/coaches/:id',
      component: () => import('../views/coach/CoachDetailComponent.vue'),
      props: true,

      meta: { isAuthRequired: true },
    },
    { path: '/:pathMatch(.*)*', redirect: '/coaches' },
    {
      name: 'coach-register',
      path: '/register',
      component: () => import('../views/coach/CoachRegistrationComponent.vue'),
      meta: { isAuthRequired: true },
    },
    {
      name: 'request',
      path: '/request',
      component: () => import('../views/request/TheRequestComponent.vue'),
      meta: { isAuthRequired: true },
    },
    {
      name: 'content-not-found',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/TheContentNotFoundComponent.vue'),
      meta: { isAuthRequired: true },
    },
    {
      name: 'auth-login',
      path: '/auth/login',
      component: () => import('../views/auth/TheLoginComponent.vue'),
      meta: { isAuthRequired: false },
    },
    {
      name: 'auth-register',
      path: '/auth/register',
      component: () => import('../views/auth/TheRegisterComponent.vue'),
      meta: { isAuthRequired: false },
    },
  ],
})

router.beforeEach( (to) => {
  const authStore = useAuthStore();

  if(isAccessDenied()) {
    return { name: 'auth-login' }
  }

  function isAccessDenied() {
    return to.meta.isAuthRequired && !authStore.isAuthenticated;
  }
})

export default router
