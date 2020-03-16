<template>
    <div class="photoInfo-Container">
        <h3 class="photoTitle">{{photoInfo.title}}</h3>
        <p class="photoSubTitle">
            <span class="addTime">发表时间：{{photoInfo.add_time | dateFormat}}</span><span class="clickCount">点击：{{photoInfo.click}}次</span>
        </p>
        <hr>
    <!--        缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="photoSlidel" class="imgPreview" ></vue-preview>
        </div>

        <p class="photoContent" v-html="photoInfo.content"></p>
        <!--        评论区域-->
        <comment-box :id="this.imgId"></comment-box>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import comment from '../subcomponents/comments.vue';
    export default {
        data(){
            return {
                imgId: this.$route.params.id,
                photoInfo: {},
                photoSlidel: []
            }
        },
        created(){
            this.getPhotoInfo()
            this.getPhotoSlidel()
        },
        methods: {
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+ this.imgId).then(result=>{
                    if(result.body.status === 0){
                        this.photoInfo = result.body.message[0];
                    }else {
                        Toast('获取图片详情失败！')
                    }
                })
            },
            getPhotoSlidel(){
                this.$http.get('api/getthumimages/'+ this.imgId).then(result=>{
                    if(result.body.status === 0){
                        result.body.message.forEach(item=>{
                            item.w = 600
                            item.h = 400
                            item.msrc = item.src
                        })
                        this.photoSlidel = result.body.message
                    }else {
                        Toast('获取图片缩略图失败！')
                    }
                })
            }
        },
        components: {
            'comment-box': comment
        }
    }
</script>

<style lang="scss">
    .photoInfo-Container{
        .photoTitle{
            color: #26a2ff;
            font-size: 16px;
            text-align: center;
            margin: 20px auto;
        }
       .photoSubTitle{
           display: flex;
           justify-content: space-between;
           padding: 5px;
       }
        .photoContent{
            padding: 3px;
            text-align: left;
            color: #555;
        }
        .thumbs{
            .imgPreview{
                padding: 6px;
                .my-gallery{
                    display: flex;
                    flex-wrap: wrap;
                    figure{
                        margin: 4px;
                        img{
                            width: 100px;
                        }
                    }
                }
            }
        }
    }
</style>