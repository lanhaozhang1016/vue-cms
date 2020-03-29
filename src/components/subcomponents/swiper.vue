<template>
    <!-- 轮播图  -->
    <!-- 分析：为什么 商品评论中的 轮播图那么丑： -->
    <!-- 1. 首页中的图片，它的宽和高，都是 使用了 100% 的宽度 -->
    <!-- 2. 在商品详情页面中，轮播图的 图片，如果也使用 宽高 为 100%的话，页面不好看 -->
    <!-- 3. 商品详情页面中的轮播图，期望 高度是 100%， 但是 宽度为 自适应 -->
    <!-- 4. 经过分析，得到 问题的原因： 首页中的轮播图 和 详情中的轮播图，分歧点是 宽度到底是 100% 还是 自适应 -->
    <!-- 5. 使用轮播图组件时讨论    多次使用轮播图 所以轮播图既然这两个 轮播图，其它方面都是没有冲突的，只是 宽度有分歧， 那么，我们可以定义一个 属性，让 使用轮播图的 调用者，手动指定 是否为 100% 的宽度 -->
    <mt-swipe :show-indicators="false" class=" mint-swipe-item" >
        <mt-swipe-item v-for="item in lunbotuList" :key="item.src">
            <img :src="item.src" alt="" :class="{'isWidthFull': isfull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
 props: ['lunbotuList', 'isfull']

}
</script>

<style lang="scss"scoped>
    .mint-swipe-item {
        height: 200px;
        text-align: center;
        img {
            height: 100%;
        }
    }
    .isWidthFull{
        width: 100%;
    }
</style>