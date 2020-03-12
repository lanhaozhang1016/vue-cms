# 这是一个基于vue的项目 是一个包含新闻页面 、购物页面等等方面的应用程序
## 其中的数据来源于数据库，是假数据，是为了用来渲染页面
### 希望通过此次项目能学到呢更多的知识
#### 接下来，我将介绍该项目的一些知识点和经验总结

## [主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

## 第一次把本地项目托管到github上
1. 首先需要注册一个github账号
2. 创建一个空的仓储 new repository 
3. 在本地项目中操作命令行 git add .    git commit -m "init my project" 将项目存储到本地仓库.git文件夹中
4. 然后按照github的提示操作两条命令行
5. note: 此时git报错-fatal: HttpRequestException encountered.
6. 原因： Github禁用了TLS v1.0 and v1.1，必须更新Windows的git凭证管理器才可以 
7. 解决方案：下载安装GCMW-1.20.0.exe （最新版即可）

## 用(传统方式)命令行把修改过后的代码上传到码云（github）
1. git add .
2. git commit -m "提交信息"
3. git push
## 入口文件代码编写
1. 导入各种文件 样式 模块
2. 创建vm实例
## 路由文件代码编写 

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html 
 + 首先导入mui样式文件
 + 这些小图标使用的是MUI的icons.html 和 icons-extra.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart` 
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link 并将 herf 属性改为 to 

## 设置路由高亮 也就是在路由对象中设置linkActiveClass属性为那个active类名

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
 ### 这里数据库出了问题 所以就没有用数据库的图片，而是预先准备的图片 属于假数据 不能跟后台交互 也不能修改
1. 获取数据， 如何获取呢， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式
 1. 这里使用的是MUI中的grid-default.html
 2. 只留下6个li
 3. 将图标icon改为图片 设置图片的高度和宽度
 4. 将大盒子的背景色改为白色
 5. 将各个盒子的边框清除
## 设置组件间的切换动画效果
### 出现了以下几个问题
1. 顶部跟着动画一起跑
2. 底部跟着动画一起跑 以上两个问题是因为页面出现了滚动条，因为做动画的时候，切换组件，另一个组件已经在一边等着了
3. 动画从同一个方向进入离开 将v-enter 和v-leave-to 的样式分开写
4. 动画先水平进入，然后垂直上升 在v-leave-to的样式里面加position： absolute
## 改造新闻资讯路由链接
### 由a标签改至router-link 并且将href属性改为to，且对应的值改为跳转的组件
## 制作新闻列表页面组件
1. 首先使用MUI中的media-list.html
2. 因为新闻内容都在数据库中，所以要从数据库中加载数据 要发送ajax异步请求 所以要使用vue-resource
3. 为了方便，设置请求的根路径 Vue.http.options.root = ''
4. 获取数据之后，要遍历 所以要使用v-for 为了表示唯一性 所以要绑定:key值
5. 由于值为一个变量 所以前面的src是需要绑定上去的，不能少了：    :src="item.img_url"
6. padStart()是ES6新增的字符串的方法，所以要使用的对象必须转换成字符串，多通过toString()方法进行转换
## 改造新闻列表跳转到新闻详情
1. 因为该跳转是根据用户点击的某一条新闻然后跳转到对应的新闻详情，所以要设置一个联系两边的标记，通常是id
2. 在改造新闻列表路由链接时，to的值也要变成/home/newsinfo/item.id 因为id是变量，所以to是需要绑定的 :to
3. 创建新闻资讯详情页面的组件
4. 在路由模块router.js中，将 新闻详情的 路由地址 和 组件页面匹配起来  /home/newsinfo/:id 是根据id跳转
5. 由于数据库是别人提供的 我没有资格修改 部分数据因为时间原因已经丢失 所以部分图片已经不能显示
## 1111
