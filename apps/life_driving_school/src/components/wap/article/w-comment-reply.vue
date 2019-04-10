<template>
	<div class="comments-reply-input bc-ps-f bc-w-100 bc-v-m" style="" v-if="commentsReplyInputShow">
			<div class="bc-flex bc-pd-7rp bc-bg-white">
				<label class="bc-flex-2 bc-bg-e5e bc-pd-lr-15rp">
					<i class='iconfont icondianping bc-f-20rp ' ></i>
					<input class="bc-input bc-bd-none bc-bg-e5e bc-w-80" type="text" placeholder="写评论..." v-model="editComment">
				</label>
				<div class="bc-flex-2 ">
					<span class="bc-inline-block bc-ps-r">
						<i class='iconfont iconpinglun bc-f-20rp bc-mg-lr-10rp' ></i>
						<span class="info-num bc-f-10rp bc-pd-lr-3rp" v-if="comment.count>0">{{comment.count}}</span>
					</span>
					<i class='iconfont iconxingxing bc-f-20rp bc-mg-lr-10rp' v-if="!comment.article_collection" @click="toCollect(isCollect)"></i>
					<i class='iconfont iconiconfontxingxing bc-f-20rp bc-mg-lr-10rp bc-t-base' v-else @click="toCollect(false)"></i>
					<i class='iconfont iconzan1 bc-f-20rp bc-mg-lr-10rp bc-t-base' v-if="comment.article_fabulous"  @click="clickThumb(isAdd, comment)"></i>
					<i class='iconfont iconzan bc-f-20rp bc-mg-lr-10rp' v-else @click="clickThumb(isAdd, comment)"></i>
					<i class='iconfont icon- bc-f-20rp bc-mg-lr-10rp' @click="$share"></i>
				</div>
			</div>
	</div>
</template>

<script>
export default {
  name: "w-comment-reply",
	props: {
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
	mounted() {

	},
	methods: {
    toCollect(isCollect) {
			this.$emit('bindPhone');
      // 点赞
			if (isCollect) {
			  this.comment.article_collection = true;
				this.isCollect = false;
				this.$axios.get('/api/article/collection', {
				  params: {
						article_id: this.$route.params.id,
            article_collection: true
				  }
				}).then(res => {
					if (res.code) {
					  this.$toast({
						  message: '收藏成功！'
					  })
					}
				})
			} else {
			  // 取消点赞
        this.comment.article_collection = false;
        this.isCollect = true;
        this.$axios.get('/api/article/collection', {
          params: {
            article_id: this.$route.params.id,
            article_collection: false
          }
        }).then(res => {
          if (res.code) {
            this.$toast({
              message: '取消收藏！'
            })
          }
        })
			}
    },
    clickThumb(add, comment) {
      this.$emit('bindPhone');
      // 由没点赞->点赞
      if (add) {
        this.isAdd = false;
        this.$axios.get('/api/article/fabulous', {
          params: {
            article_id: this.$route.params.id
          }
        }).then(res => {
          const {fabulous_num} = res.data.data;
          this.$set(comment,'article_fabulous', true); // fabulous = false
          this.$set(comment,'fabulous_num', fabulous_num);
        })
      } else {
        // 由点赞->没点赞
        this.isAdd = true;
        this.$axios.get('/api/article/fabulous', {
          params: {
            article_id: this.$route.params.id
          }
        }).then(res => {
          const {fabulous_num} = res.data.data;
          this.$set(comment,'article_fabulous', false); // fabulous = false
          this.$set(comment,'fabulous_num', fabulous_num);
        })

      }
    }
	},
	watch: {
    editComment: {
      deep: true,
	    handler() {
        this.$set(this.comment, 'editComment', this.editComment);
	    }
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