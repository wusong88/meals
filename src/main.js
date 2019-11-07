// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'



Vue.config.productionTip = false

Vue.prototype.$http = axios
// Vue.prototype.api = '/api'
// Vue.prototype.url = 'http://127.0.0.1:3000/api/meals'



// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to 及将要进入的目标的路由对象
  // from 当前导航即将离开的路由对象
  // next 调用该方法后，才能进入下一个钩子
  if(to.name=="login"){
    next()
  }
  console.log("to.name  "+to.name)
  console.log("from.name  "+from.name)
  //登录成功之后就可以进入页面
  if(localStorage.getItem("isLogin")){
    next();
  }else{
    next('/login')
  }

});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
