<template>
   <div class="photoContainer">
     <!--顶部滑动条部分-->
       <div id="slider" class="mui-slider">
           <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
               <div class="mui-scroll">
     <!--Vue里面处理类-->
                   <a :class="['mui-control-item', item.id=== 0 ? ' mui-active':'' ]"  href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in photoCate" :key="item.id" @click="getPhotoList(item.id)">
                       {{item.title}}
                   </a>
               </div>
           </div>

       </div>
        <!--图片列表放置区域-->
       <ul class="photo-Container">
           <router-link v-for="item in photoList" :key="item.id" class="photo-item" :to="'/home/photoInfo/'+ item.id" tag="li">
               <img v-lazy="item.img_url" alt="">
               <div class="photo-info">
                   <h3 class="info-title">{{item.title}}</h3>
                   <p class="info-content">{{item.zhaiyao}}</p>
               </div>
           </router-link>
       </ul>
   </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import mui from '../../lib/mui/js/mui.js'

    export default {
        name: "PhotoList",
        data(){
            return {
                photoCate: [],
                photoList: []
            }
        },
        created(){
            this.getPhotoCate();
            this.getPhotoList(0)
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getPhotoCate(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if(result.body.status === 0){
                        this.photoCate = result.body.message;
                        // 注意：从后台接口中返回的分类数据，不包含“全部”分类，
                        // 需要前端程序员向 message 数组中，使用 unshift 方法手动添加对象： { title:”全部”, id:0 }
                        this.photoCate.unshift({title:'全部', id:0})
                    }else {
                        Toast('图片分类获取失败！')
                    }
                })
            },
            getPhotoList(cateId){
                this.$http.get('api/getimages/'+cateId).then(result=>{
                    if(result.body.status === 0){
                        this.photoList = result.body.message;
                    }else {
                        Toast('图片列表获取失败！')
                    }
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    /*  touch-action 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的划动、缩放等）。*/
    * {
        touch-action: pan-y;
    }
    .photo-Container {
        margin: 0;
        list-style: none;
        padding: 10px;
        padding-bottom: 0;
        .photo-item {
            background-color: #ccc;
            text-align: center;
            box-shadow: 0 0 8px #999;
            position: relative;
            margin-bottom: 10px;
            img {
                width: 100%;
                vertical-align: middle;
            }
            //懒加载
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .photo-info {
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,0.2);
                max-height: 90px;
                .info-title{
                    font-size: 14px;
                    color: #fff;
                }
                .info-content{
                    font-size: 13px;
                    color: #fff;
                }
            }
        }

    }
</style>