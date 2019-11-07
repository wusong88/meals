import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import countoff from '@/components/countoff'
import total from '@/components/total'



Vue.use(Router)

export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   }
  // ]

  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/countoff',
      name: 'countoff',
      component: countoff,
    },
    {
      path: '/total',
      name: 'total',
      component: total,
    }
  ],



})
