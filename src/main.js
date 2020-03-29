// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// // 2.2 安装 vue-resource
Vue.use(VueResource)
//时间全局过滤器
Vue.filter('dateFormat',function(dateStr,pattern=""){
  var dt = new Date(dateStr);

  var year = dt.getFullYear();

  var month = (dt.getMonth() + 1).toString().padStart(2, '0');

  var day = (dt.getDate()).toString().padStart(2, '0');

  if(pattern.toLowerCase() === 'yyy-mm-dd'){

    return `${year}-${month}-${day}`

  }else{

    var hours = (dt.getHours()).toString().padStart(2, '0');

    var minutes = (dt.getMinutes()).toString().padStart(2, '0');

    var seconds = (dt.getSeconds()).toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  }

})
//设置请求数据库的根地址 以及post请求编码方式
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true;//post请求第三个参数
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// // 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件  固定在顶端的头部 以及轮播图
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
//懒加载组件导入
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
//导入vue-preview 缩略图组件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router // 1.4 挂载路由对象到 VM 实例上
})