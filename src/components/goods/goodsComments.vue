<template>
    <commentBox :id="id"> </commentBox>
</template>

<script>
    import commentBox from '../subcomponents/comments.vue';
    export default {
        name: "goodsComments",
        data(){
            return {
               id: this.$route.params.id
            }
        },
        components: {
            commentBox
        }
    }
</script>

<style scoped>

</style>