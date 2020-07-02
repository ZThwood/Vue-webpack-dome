//全局配置文件
//与VM无关的导入都放这里、

import Vue from 'vue'
//mint-UI组件导入，基于vue组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//mui-UI组件导入，最接近原生，类似于boostrapt的使用
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'
// import '../lib/mui/js/webviewGroup.js'


//导入 axios
import axios from 'axios'
//获取数据的地址
Vue.prototype.$http = axios.create({
  baseURL:'http://api.cms.liulongbin.top/'
})

//引入过滤器文件
import './filters.js'