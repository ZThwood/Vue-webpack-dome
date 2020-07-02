import VueRouter from 'vue-router'

import HomeContainer from './components/tabbars/HomeContainer.vue'
import ShopcarContainer from './components/tabbars/ShopcarContainer.vue'
import MemberContainer from './components/tabbars/MemberContainer.vue'
import SearchContainer from './components/tabbars/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photos/PhotoList.vue'

 
const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home' },
    {path: '/home', component: HomeContainer },
    {path: '/search', component: SearchContainer },
    {path: '/shopcar', component: ShopcarContainer },
    {path: '/member', component: MemberContainer },
    {path: '/home/news', component: NewsList },
    //设置id形参再通过通过$route.params.id 获取传参 
    {path: '/home/news/:id', component: Newsinfo ,props:true},
    {path: '/home/photos', component: PhotoList}
  ],
  linkActiveClass: 'mui-active active'
})
export default(router)