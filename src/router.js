import VueRouter from 'vue-router'

import HomeContainer from './components/tabbars/HomeContainer.vue'
import ShopcarContainer from './components/tabbars/ShopcarContainer.vue'
import MemberContainer from './components/tabbars/MemberContainer.vue'
import SearchContainer from './components/tabbars/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

 
const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home' },
    {path: '/home', component: HomeContainer },
    {path: '/search', component: SearchContainer },
    {path: '/shopcar', component: ShopcarContainer },
    {path: '/member', component: MemberContainer },
    {path: '/home/news', component: NewsList },
    //设置id形参再通过通过props 获取传参 
    {path: '/home/news/:id', component: Newsinfo ,props:true},
    {path: '/home/photos', component: PhotoList},
    {path: '/home/photos/:id', component: PhotoInfo, props:true},
    {path: '/home/goods', component: GoodsList},
    {path: '/home/goods/:id', component: GoodsInfo, props:true},
    {path: '/home/goods/goodsdesc/:id', component: GoodsDesc, props: true },
    {path: '/home/goods/goodscomment/:id', component: GoodsComment, props: true, name:"goodscmt"}

  ],
  linkActiveClass: 'mui-active active'
})
export default(router)