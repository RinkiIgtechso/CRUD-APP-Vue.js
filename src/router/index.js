import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from "../components/Layout.vue";
import HomeView from '../views/HomeView.vue';
import AboutView from "@/views/AboutView.vue";
import Login from "../components/Login.vue";
import { useProductsStore } from '@/store';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Login },
      { path: 'home', component: HomeView, meta: { requiresAuth: true } },
      { path: 'about', component: AboutView, meta: { requiresAuth: true } },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  const { isAuthenticated } = useProductsStore();
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
})

export default router;
