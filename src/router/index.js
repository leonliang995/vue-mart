import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import History from '@/utils/history'

Vue.use(Router);
Vue.use(History);
Router.prototype.isBack = false;
Router.prototype.goBack = function () {
  this.back();
  this.isBack = true;
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/about',
    name: 'about',
    meta: { auth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    //只要存在token就认为登录了
    const token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      //未登录
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    next();
  }
});
router.afterEach((to) => {
  if (router.isBack) {
    History.pop();
    router.isBack = false;
  } else {
    History.push(to.path);
  }
})

export default router
