# 这是一个基于vue的项目 是一个包含新闻页面 、购物页面等等方面的应用程序
##其中的数据来源于数据库，是假数据，是为了用来渲染页面
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


## 用(传统方式)命令行把修改过后的代码上传到码云？？？
1. git add .
2. git commit -m "提交信息"
3. git push
## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据， 如何获取呢， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式