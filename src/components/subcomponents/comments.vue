<template>
    <div class="comment-contaniner">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" cols="30" rows="10" placeholder="至少留下10个字的评论哦！" v-model="msg"></textarea>
        <mt-button size="large" type="primary" @click="postComments">发表评论</mt-button>
        <div class="cmt-list">
           <div class="cmt-item" v-for="(item, i) in commentList" :key="item.add_time">
               <div class="cmt-title">第{{i+1}}楼 用户：{{item.user_name}} 发表时间： {{item.add_time | dateFormat}}</div>
               <div class="cmt-content"> {{ item.content == ('undefined') ? '此用户很懒，什么话都没留下！': item.content }}</div>
           </div>
        </div>
        <mt-button size="large" type="danger" plain @click="getMoreComments">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {

        data(){
            return {
                pageIndex: 1,
                commentList: [],
                msg: ""
            }
        },
        props: ["id"],
        created(){
            this.getComments()
        },
        methods: {
            getComments(){
                this.$http.get('api/getcomments/'+ this.id +'?pageindex='+ this.pageIndex).then(result=>{
                    if(result.body.status ===0 ){
                        this.commentList = this.commentList.concat(result.body.message)
                    }else {
                        Toast('获取评论失败！')
                    }
                })
            },
            getMoreComments(){
                this.pageIndex ++;
                this.getComments()
            },
            postComments (){
                if(this.msg === (""|| " ")) {
                    return Toast('不可以发表空白评论哦！')
                }
                this.$http.post('api/postcomment/'+ this.id, {content: this.message}).then(result=>{
                    if(result.body.status === 0){
                        var cmt = {
                            user_name: '匿名用户',
                            add_time: Date.now(),
                            content: this.msg
                        }
                        this.commentList.unshift(cmt)

                        this.msg = ''
                    }else {
                        Toast('发表评论失败！')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-contaniner {
        h3 {
            font-size: 16px;
        }
        textarea {
            height: 60px;
            font-size: 14px;
            margin: 0;
        }
        .cmt-list {
            margin-top: 5px;
            .cmt-item {
                font-size: 12px;
                .cmt-title {
                    background-color: #ddd;
                    line-height: 30px;
                }
                .cmt-content {
                    text-indent: 2em;
                    line-height: 30px;
                }
            }
        }
    }
</style>