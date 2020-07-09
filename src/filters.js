// 全局共享过滤器
import Vue from 'vue'
// 引入时间格式化插件
import moment from 'moment'
// 全局过滤器
Vue.filter('dateFormat', function (data, myformat) {
  return moment(data).format(myformat)
})