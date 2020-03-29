<template>
<!--根据父组件中的stock_quantity 决定最大值 所以涉及到父组件向子组件传值 通过属性绑定的方法-->
<!-- 获取到库存值的操作是异步操作 不知道具体什么时候获取到真正的最大值，但是最终一定会获取到 所以采用属性监听的方法，一直监听max的变化 将更新之后的值传递给动态变化的setOption(options)更新选项,-->
    <div class="mui-numbox"  >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" ref="numberBox" value="1" @change="numberChange"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui";

    export default {
        name: "numberBox",
        data(){
            return {

            }
        },
        props: ['max'],
        methods: {
            numberChange(){
                this.$emit('valueChanged', parseInt(this.$refs.numberBox.value))
            }
        },
        mounted(){
            mui('.mui-numbox').numbox()
        },
        watch: {
            max: function (newVal){
                // 使用 JS API 设置 numbox 的最大值
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>