<template>
    <div class="mui-content">
<!-- 小球加入购物车的动画-->
        <transition
           @before-enter="beforeEnter"
           @enter="enter"
           @after-enter="afterEnter">
            <div id="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!--  卡片式布局   -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                 <!-- 轮播图  -->
                    <my-swipe :lunbotuList="lunbotuList" :isfull="false"></my-swipe>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner" >
                    <p class="goodsPrice">
                        <del class="oldPrice">市场价：￥{{goodsInfo.market_price}}</del>销售价：<span class="nowPrice">￥{{goodsInfo.sell_price}}</span>
                    </p>

                <!-- 父组件要获取子组件numberBox的value 子组件向父组件传值  -->

                    <div class="numberBox">购买数量：
                        <number-box @valueChanged="getNumberBox" :max='goodsInfo.stock_quantity'></number-box>
                    </div>
                    <mt-button type="primary" size="small" @click="addToShopCar">加入购物车</mt-button>
                    <mt-button type="danger" size="small">立即购买</mt-button>
                </div>
            </div>

        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>剩余库存：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button size="large" type="primary" plain @click="getGoodsDesc(id)">图文介绍</mt-button>

                <mt-button size="large" type="danger" plain @click="getGoodsComments(id)">商品评价</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import mySwipe from '../subcomponents/swiper.vue';
    import numberBox  from "../subcomponents/numberBox.vue";
    import {Toast} from 'mint-ui'
    export default {
        name: "GoodsInfo",
        data(){
            return {
                id: this.$route.params.id,
                lunbotuList: [],
                goodsInfo: {},
                ballFlag: false,
                numberValue: 1
            }
        },
        created(){
            this.getLunbotu(),
            this.getGoodsInfo()
        },

        methods: {
            getLunbotu(){
                this.$http.get('api/getthumimages/' + this.id).then(result=>{
                    if(result.body.status === 0){
                        this.lunbotuList = result.body.message
                    }else {
                        Toast('获取轮播图失败')
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/' + this.id).then(result=>{
                    if(result.body.status === 0){
                        this.goodsInfo = result.body.message[0];
                    }else {
                        Toast('获取图文详情失败')
                    }
                })
            },
            getGoodsDesc(id){
                this.$router.push({
                    name: 'goodsdesc',
                    params: {id}
                })
            },
            getGoodsComments(id){
                this.$router.push({
                    name: 'goodscomments',
                    params: {id}
                })
            },
            addToShopCar(){
                this.ballFlag = !this.ballFlag;
            },
            beforeEnter(el){
                el.style.transform = 'translate(0, 0)';
            },
            enter(el, done){
                el.offsetWidth;
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePotion = document.getElementById('badge').getBoundingClientRect();
                const moveX = badgePotion.left - ballPosition.left;
                const moveY = badgePotion.top - ballPosition.top;
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)';
                done();
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
                // 即使在这里将获取到的numberBox里面的数量传递给小红点 也不能有那个效果
                // 他还没等小球到那里，仅仅是一点击就变化了，所以要么手动给它添加一个延时效应
                // document.getElementById('badge').innerText = this.$refs.numberBox.value;
                setTimeout(()=>{
                    document.getElementById('badge').innerText = this.numberValue;
                }, 500)
                //因为之后会多次利用到numberBox 所以应该将numberBox 抽离成一个组件
            },
            getNumberBox(value){
                this.numberValue = value;
                console.log(this.numberValue)
            }
        },
        components: {
            mySwipe,
            numberBox
        }
    }
</script>

<style lang="scss" scoped>
    .mui-content {
        /*padding: 0;*/
        background-color: #f3f3f3;
        overflow: hidden;
        .mui-card-header {
            font-size: 16px;
            font-weight: 700;
            color: #0062cc;
        }
        .mui-card-content-inner{
            padding: 8px;
            .goodsPrice{
                    .oldPrice {
                        margin-right: 8px;
                        font-size: 12px;
                    }
                    .nowPrice{
                        color: red;
                        font-weight: 700;
                    }
                }
            .numberBox{
                    margin-bottom: 10px;
                    .mui-numbox {
                        height: 30px;
                    }
                }
        }
        .mui-card-footer {
            display: block;
            button {
                margin: 15px 0;
            }

        }
        #ball {
            background-color: red;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            position: absolute;
            left: 142px;
            top: 366px;
            z-index: 99;
        }
    }
</style>