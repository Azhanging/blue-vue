<template>
	<div>
		<!--测试按钮-->
		<!--<button @click.stop="submitForm" style="background:white;position:fixed;left:0;z-index:20000000!important;bottom:50px;">点击发布</button>-->
		<form action="" @submit.prevent="submitForm">
		<div class="comments-reply-input bc-ps-f bc-w-100 bc-v-m" style="" v-if="commentsReplyInputShow">
			<div class="bc-flex bc-pd-7rp bc-bg-white">
				<label class="bc-flex-2 bc-bg-e5e bc-pd-lr-15rp">
					<i class='iconfont icondianping bc-f-20rp '></i>
					<input class="bc-input bc-bd-none bc-bg-e5e bc-w-80" type="text" placeholder="写评论..." v-model="editComment" ref="replyInput">
				</label>
				<div class="bc-flex-2 bc-flex bc-flex-ai-c bc-flex-jc-c">
					<span class="bc-flex-1 bc-ps-r" @click="custormAnchor" v-if="false">
						<i class='iconfont iconpinglun bc-f-16rp bc-mg-lr-10rp'></i>
						<span class="info-num bc-f-10rp bc-pd-lr-3rp" v-if="comment.count>0">{{comment.count}}</span>
					</span>
					<span class="bc-flex-1" v-if="btn_contribute">
						<i class='iconfont iconxingxing bc-f-16rp bc-mg-lr-10rp' v-if="!comment.article_collection" @click="toCollect(isCollect)"></i>
						<i class='iconfont iconiconfontxingxing bc-f-16rp bc-mg-lr-10rp bc-t-base' v-else @click="toCollect(false)"></i>
					</span>
					<span class="bc-flex-1" v-if="btn_gLink">
						<i class='iconfont iconzan1 bc-f-15rp bc-mg-lr-10rp bc-t-base' v-if="comment.article_fabulous" @click="clickThumb(comment)"></i>
						<i class='iconfont iconzan bc-f-15rp bc-mg-lr-10rp' v-else @click="clickThumb(comment)"></i>
					</span>
					<span class="bc-flex-1" v-if="!config.device.isApp">
						<i class='iconfont icon- bc-f-15rp bc-mg-lr-10rp' @click="$share(comment.shareInfo)" ></i>
					</span>
				</div>
			</div>
		</div>
		</form>

		<template>
			<!-- 绑定手机号 -->
			<bv-bind-phone :show-bind-phone-status="showBindPhoneStatus" @close-bind-phone="closeBindPhone"/>
		</template>

	</div>

</template>

<script>
export default {
  name: "w-comment-reply",
  props: {
    opts: {
      type: Object,
      default: {// 请求详情内容url 请求评论url
        url: {
          type: Object,
          default: {
            contentUrl: '/api/Article/info'
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
    },
	  btn_contribute:{
		  type: Boolean,
		  default:true
	  },
	  btn_gLink:{
		  type: Boolean,
		  default:true
	  }
  },
  data() {
    return {
      commentsReplyInputShow: true,
      isCollect: true,
      editComment: '', // 评论内容
      showBindPhoneStatus: false,
	    submit_timer:null,
    }
  },
  methods: {
    custormAnchor() {
      // 找到锚点
      let viewElms = document.querySelectorAll('.bv-view-scroll');
      const currentViewElm = viewElms[viewElms.length - 1];
      currentViewElm.scrollTop = currentViewElm.querySelectorAll('.comment')[0].offsetTop;
    },
	  submitForm(){
		  
    	  clearTimeout(this.submit_timer)
        var timer = this.submit_timer = setTimeout(function () {
	        (function (timer) {
		        this.formSend(timer)
	        }).call(this,timer)
        }.bind(this),500)
	  },
    formSend(timer) {
      let newComment;
      let name_url = this.$route.path;// 带路径

      const { editComment } = this;
      const { commentStatus, id } = this.comment; //commentStatus id 父级id  初始化值都为 0
      const { submitCommentParams } = this.opts.data;
      const m_id = this.userInfo.id; // 自己的id

      if (!editComment) {
        this.$toast({
          message: '评论不能为空!',
          iconClass: 'iconfont iconchenggong bc-t-success'
        });
        return false;
      }

      let params = Object.assign(submitCommentParams, { // 提交评论 请求参数
        id: id || 0,
        m_id: m_id,
        content: editComment,
	      name_url: name_url
      },);
      
      
      if(this.submit_timer != timer) return;
      
      
      
      this.$axios.post('/api/comment/common', params).then(res => {
       // this.comment.list = this.comment.list ? this.comment.list : [];
        // if (this.comment.list && this.comment.list.length === 0) {
        //   this.comment.list = []; // 初始化
        // }
        if (!commentStatus) {// 默认对文章进行回复 默认状态为0
          const { id, article_id, nickname, head_img, m_id, time, content, fabulous } = res;
          newComment = {
            id: id,
            article_id: article_id,
            nickname: nickname,
	          nickname_reply: '',
            head_img: head_img,
            m_id: m_id,
            time: time,
            content: content,
            fabulous: fabulous || 0, // 点赞数量
            isclickthumb: false, // 点赞状态
            member_id: this.userInfo.id,
	          reply: []
          };
          // 默认回复文章
          this.comment.list.unshift(newComment);
        } else if (commentStatus === 1) { // 对评论人进行回复
          const { id, article_id, nickname_reply, head_img, m_id, time, content, fabulous } = res;
          newComment = {
            id: id,
            article_id: article_id,
            nickname_reply: nickname_reply,
            head_img: head_img,
            m_id: m_id,
            time: time,
            content: content,
            fabulous: fabulous || 0,
            isclickthumb: false,
            member_id: this.userInfo.id
          };
          let targetIndex = this.comment.list.findIndex((item) => {
            return this.comment.id === item.id;
          });
          // 回复他人评论  如果是自己（弹出删除 取消）
          this.comment.list[targetIndex].reply.unshift(newComment);
        }

        // 恢复默认评论文章状态
        this.comment.commentStatus = 0;
        // 恢复外层id
	      this.comment.id = 0;
        // 清空输入框
        this.editComment = '';
        // count ++
        this.comment.count++;

        this.$toast({
          message: '评论成功!',
          iconClass: 'iconfont iconchenggong bc-t-success'
        });

      }).catch(error => {
        console.log(error);
      });
    },
    toCollect(isCollect) {
      const { commentParams } = this.opts.data;
      // 收藏
      if (isCollect) {
        this.comment.article_collection = true;
        this.isCollect = false;
        let params = Object.assign({ article_collection: true }, commentParams);
        this.$axios.get('/api/article/collection', {
          params
        }).then(res => {
          const { code } = res;
          if (code == 10002) {
            // 去绑定手机号
            this.showBindPhoneStatus = true;
          } else if (code == 200) {
            this.$toast({
              message: '收藏成功!',
              iconClass: 'iconfont iconchenggong bc-t-success'
            });
          }
        })
      } else {
        // 取消收藏
        this.comment.article_collection = false;
        this.isCollect = true;
        let params = Object.assign({ article_collection: false }, commentParams);
        this.$axios.get('/api/article/collection', {
          params
        }).then(res => {
          const { code } = res;
          if (code === 200) {
            this.$toast({
              message: '取消收藏!',
              iconClass: 'iconfont iconchenggong bc-t-success'
            });
          }
        })
      }
    },
    clickThumb(comment) {
      const { commentParams } = this.opts.data;
      let add = !comment.article_fabulous;
      // 由没点赞->点赞
      if (add) {
        this.$axios.get('/api/article/fabulous', {
          params: commentParams
        }).then(res => {
          const { code } = res;
          if (code == 10002) {
            // 去绑定手机号
            this.showBindPhoneStatus = true;
          } else if (code == 200) {
            this.comment.article_fabulous = true;
            this.comment.fabulous_num ++;
            this.$toast({
              message: '点赞成功!',
              iconClass: 'iconfont iconchenggong bc-t-success'
            });
          }

        })
      } else {
        // 由点赞->没点赞
        this.$axios.get('/api/article/fabulous', {
          params: commentParams
        }).then(res => {
          this.comment.article_fabulous = false;
          this.comment.fabulous_num --;
          this.$toast({
            message: '取消点赞!',
            iconClass: 'iconfont iconchenggong bc-t-success'
          });
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
		/*max-width: rem(450);*/
		.comment-reply-input-img {
			width: rem(15);
			height: rem(15);
		}
		.info-num {
			position: absolute;
			left: rem(19);
			top: rem(-6);
			background: #F76872;
			color: white;
			border-radius: rem(5);
		}
	}
</style>
