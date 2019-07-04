import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/screen',
      name: 'screen',
      component: () => import('./pages/screen/Screen.vue')
    }
  ]
})
