<template>
    <div class="goods-Contsiner">
        <div class="goodsItem" v-for="item in goodsList" :key="item.id" @click="getGoodsInfo(item.id)">
            <img :src="item.img_url" alt="">
            <h3>{{item.title}}</h3>
            <div class="goodsInfo">
                <p class="goodsPrice">
                    <span class="new">￥{{item.sell_price}}</span><span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="goodsNumber">
                    <span class="sold">已售出：1000件</span><span class="sell">库存：{{item.stock_quantity}}件</span>
                </p>
            </div>

        </div>
<!--        点击加载更多商品-->
        <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "GoodsList",
        data(){
            return {
                pageIndex: 1,
                goodsList: []
            }
        },
        created(){
            this.getGoodsList()
        },
        methods: {
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex='+ this.pageIndex).then(result=>{
                    if(result.body.status === 0){
                        //如果是这样，那么加载更多的时候就会有问题
                        // this.goodsList = result.body.message;
                        this.goodsList = this.goodsList.concat(result.body.message)
                    }else{
                        Toast('获取商品列表失败!')
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getGoodsList();
            },
            getGoodsInfo(id) {
                // this.$router.push({path: '/home/goodsinfo/'+id })
                this.$router.push({name: 'goodsinfo',
                params: {id}})
            }
        },


    }
</script>

<style lang="scss" scoped>
    .goods-Contsiner{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 5px;
        margin: 0;
        .goodsItem{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 6px #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 5px;
            min-height: 250px;
            h3 {
                margin: 0;
                padding: 5px;
                font-size: 16px;

            }
            img {
                width: 100%;
            }
            .goodsInfo{
                background-color: #f3f3f3;
                .goodsPrice{
                    padding-top: 6px;
                    padding-left: 10px;
                    margin-bottom: 0;
                    .new {
                        color: red;
                        font-size: 16px;
                        font-weight: 700;
                        margin-right: 10px;
                    }
                    .old{
                        font-size: 13px;
                        text-decoration: line-through;
                    }
                }
                .goodsNumber{
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>