//项目js打包入口文件

//导入vue
import Vue from 'vue'

//导入全局配置文件
import './globalConfig'

// 导入根组件
import app from './components/app.vue'

// 路由导入
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

// 导入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入vuex状态管理对象
import store from './store.js'




// vue实例
const vm = new Vue({
  el: '#app',
  data: {},
  // 采用render渲染根组件
  render:h => h(app),
  //挂载路由，同名可简写
  router,
  store
})