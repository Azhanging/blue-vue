<template>
	<div>
		<button @click.stop="submitForm" style="position:fixed;z-index:200000;top:0">点击发布</button>
		<!--<form action="" @submit.prevent="submitForm">-->
		<div class="comments-reply-input bc-ps-f bc-w-100 bc-v-m" style="" v-if="commentsReplyInputShow">
			<div class="bc-flex bc-pd-7rp bc-bg-white">
				<label class="bc-flex-2 bc-bg-e5e bc-pd-lr-15rp">
					<i class='iconfont icondianping bc-f-20rp '></i>
					<input class="bc-input bc-bd-none bc-bg-e5e bc-w-80" type="text" placeholder="写评论..." v-model="editComment">
				</label>
				<div class="bc-flex-2 ">
							<span class="bc-inline-block bc-ps-r">
								<i class='iconfont iconpinglun bc-f-20rp bc-mg-lr-10rp'></i>
								<span class="info-num bc-f-10rp bc-pd-lr-3rp" v-if="comment.count>0">{{comment.count}}</span>
							</span>
					<i class='iconfont iconxingxing bc-f-20rp bc-mg-lr-10rp' v-if="!comment.article_collection" @click="toCollect(isCollect)"></i>
					<i class='iconfont iconiconfontxingxing bc-f-20rp bc-mg-lr-10rp bc-t-base' v-else @click="toCollect(false)"></i>
					<i class='iconfont iconzan1 bc-f-20rp bc-mg-lr-10rp bc-t-base' v-if="comment.article_fabulous" @click="clickThumb(isAdd, comment)"></i>
					<i class='iconfont iconzan bc-f-20rp bc-mg-lr-10rp' v-else @click="clickThumb(isAdd, comment)"></i>
					<i class='iconfont icon- bc-f-20rp bc-mg-lr-10rp' @click="$share"></i>
				</div>
			</div>
		</div>
		<!--</form>-->
	</div>

</template>

<script>
export default {
  name: "w-comment-reply",
  props: {
    config: {
      type: Object,
      default: {// 请求详情内容url 请求评论url
        url: {
          type: Object,
          default: {
            contentUrl: '/api/Article/info.html'
          }
        },
        data: {
          type: Object,
          default: {
            contentParams: {// 文章内容 请求参数
              article_id: 0
            },
            commentParams: { // 评论内容 请求参数
              article_id: 0,
              data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
            },
            submitCommentParams: { // 提交评论 请求参数 只需第一个
              article_id: 0,
              data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
            }
          }
        }
      }
    },
    comment: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      commentsReplyInputShow: true,
      isCollect: true,
      isAdd: true,
      editComment: ''
    }
  },
  methods: {
    submitForm() {
      let newComment;
      const { editComment } = this;
      const { commentStatus, id } = this.comment;
      const { submitCommentParams } = this.config.data;
      let params = Object.assign(submitCommentParams, { // 提交评论 请求参数
        id: id,
        m_id: this.userInfo.id,
        content: editComment,
      },);
      this.$axios.post('/api/comment/common', params).then(res => {
        if (commentStatus === 0) {
          const { id, article_id, nickname, head_img, m_id, time, content, fabulous } = res.data.data;
          newComment = {
            id: id,
            article_id: article_id,
            nickname: nickname,
            head_img: head_img,
            m_id: m_id,
            time: time,
            content: content,
            fabulous: fabulous || 0, // 点赞数量
            isclickthumb: false
          };
        } else if (commentStatus === 1) {
          const { id, article_id, nickname_reply, head_img, m_id, time, content, fabulous } = res.data.data;
          newComment = {
            id: id,
            article_id: article_id,
            nickname_reply: nickname_reply,
            head_img: head_img,
            m_id: m_id,
            time: time,
            content: content,
            fabulous: fabulous || 0,
            isclickthumb: false
          };
        }

        this.comment.list = this.comment.list ? this.comment.list : [];
        if (commentStatus === 1) {
          let targetIndex = this.comment.list.findIndex((item) => {
            return this.id === item.id;
          });
          // 回复他人评论  如果是自己（弹出删除 取消）
          this.comment.list[targetIndex].reply.unshift(newComment);
        } else if (commentStatus === 0) {
          // 默认回复文章
          this.comment.list.unshift(newComment);
        }
        // 恢复默认评论文章状态
        this.comment.commentStatus = 0;
        // 清空输入框
        this.editComment = '';
        // count ++
        this.comment.count++;

      }).catch(error => {
        console.log(error);
      });
    },
    toCollect(isCollect) {
      const { commentParams } = this.config.data;
      // 点赞
      if (isCollect) {
        this.comment.article_collection = true;
        this.isCollect = false;
        let params = Object.assign({ article_collection: true }, commentParams);
        this.$axios.get('/api/article/collection', {
          params: params
        }).then(res => {
          const {code} = res.data;
          if (code === 200) {
            this.$toast({
              message: '收藏成功！'
            })
          }
        })
      } else {
        // 取消点赞
        this.comment.article_collection = false;
        this.isCollect = true;
        let params = Object.assign({ article_collection: false }, commentParams);
        this.$axios.get('/api/article/collection', {
          params: params
        }).then(res => {
          const {code} = res.data;
          if (code === 200) {
            this.$toast({
              message: '取消收藏！'
            })
          }
        })
      }
    },
    clickThumb(add, comment) {
      const { commentParams } = this.config.data;
      // 由没点赞->点赞
      if (add) {
        this.isAdd = false;
        this.$axios.get('/api/article/fabulous', {
          params: commentParams
        }).then(res => {
          const { fabulous_num } = res.data.data;
          this.$set(comment, 'article_fabulous', true); // fabulous = false
          this.$set(comment, 'fabulous_num', fabulous_num);
          this.$toast({
	          message: '点赞成功!'
          })
        })
      } else {
        // 由点赞->没点赞
        this.isAdd = true;
        this.$axios.get('/api/article/fabulous', {
          params: commentParams
        }).then(res => {
          const { fabulous_num } = res.data.data;
          this.$set(comment, 'article_fabulous', false); // fabulous = false
          this.$set(comment, 'fabulous_num', fabulous_num);
          this.$toast({
            message: '取消点赞!'
          })
        })
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
}
</script>

<style scoped lang="scss">
	.comments-reply-input {
		left: 0;
		bottom: 0;
		z-index: 200;
		max-width: rem(450);

		.comment-reply-input-img {
			width: rem(15);
			height: rem(15);
		}

		.info-num {
			position: absolute;
			left: rem(25);
			top: rem(-8);
			background: #F76872;
			color: white;
			border-radius: rem(5);
		}
	}
</style>
