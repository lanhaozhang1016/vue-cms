import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photo/PhotoList.vue'
import PhotoInfo from './components/photo/PhotoInfo.vue'
import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsDesc from "./components/goods/goodsDesc.vue";
import GoodsComments from "./components/goods/goodsComments.vue"
// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList},
    { path: '/home/newsinfo/:id', component: NewsInfo},
    { path: '/home/photolist', component: PhotoList},
    { path: '/home/photoinfo/:id', component: PhotoInfo},
    { path: '/home/goodslist', component: GoodsList},
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo'},
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
    { path: '/home/goodscomments/:id', component: GoodsComments, name: 'goodscomments'}

  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router