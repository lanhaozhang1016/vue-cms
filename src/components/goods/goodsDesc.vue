<template>
    <div class="goods-Container">
        <h3>{{goodsDesc.title}}</h3>
        <div v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "goodsDesc",
        data(){
            return {
                id: this.$route.params.id,
                goodsDesc: {}
            }
        },
        created(){
          this.getGoodsDesc()
        },
        methods: {
            getGoodsDesc(){
                this.$http.get('api/goods/getdesc/' + this.id).then(result=>{
                    if(result.body.status === 0){
                        this.goodsDesc = result.body.message[0]
                    }else {
                        Toast('获取图文介绍失败！')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" >
    .goods-Container{
        padding: 4px;
        text-align: center;
        img{
            width: 100%;
        }
    }
</style>