import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import store from './store'
import router from './router'
import interceptor from './interceptor'

import { createAPI } from 'cube-ui'
import CartAnim from '@/components/CartAnim'
import create from '@/utils/create'

//注册全局组件，cube-ui
createAPI(Vue, CartAnim, ["transitionend"])//transitionend是自定义属性

Vue.prototype.$create = create;
Vue.config.productionTip = false

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
console.log(Vue.$routerHistory);
interceptor(app)