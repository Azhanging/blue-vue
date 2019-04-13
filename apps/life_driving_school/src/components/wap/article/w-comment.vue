<template>
	<div class="comment" v-if="comment">

		<!--阅读量-->
		<div class="bc-pd-16rp bc-t-999" style="background:rgba(244,244,244,1);" v-if="comment.click_num && comment.click_num>0">
			<i class='iconfont iconeye- bc-f-15rp '></i> {{comment.click_num}}
			<i class='iconfont iconzan bc-f-20rp' v-if="!isClickThumb" @click.stop="clickArticleThumb(isArticleAdd, comment)" ></i>
			<i class='iconfont iconzan1 bc-t-base bc-f-20rp' v-else @click.stop="clickArticleThumb(isArticleAdd, comment)"></i>
			{{comment.fabulous_num}}
		</div>

		<ul class="bc-reset-ul" v-if="comment.list && comment.list.length>0">
			<li v-for="(item, index) in comment.list" :key="index">
				<div class="bc-flex bc-flex-jc-s bc-flex-ai-s bc-t-c bc-pd-tb-15rp" v-if="item">
					<div class="bc-flex-2">
						<img class="avatar" :src="item.head_img" alt="头像">
					</div>
					<div class="bc-flex-7 bc-f-14rp bc-t-l">
						<div>{{item.nickname}}</div>
						<div class="bc-t-999 bc-f-12rp bc-mg-t-6rp">{{item.time}}</div>
						<div class="bc-f-14rp bc-mg-t-6rp">
							{{item.content}}
						</div>
					</div>
					<div class="bc-flex-3 bc-flex">
						<div class="bc-flex-1 bc-flex">
							<div class="bc-flex-1 bc-t-c" v-if="!item.isclickthumb" @click.stop="clickThumb(isAdd, item)">
								<i class='iconfont iconzan bc-f-20rp' ></i>
							</div>
							<div class="bc-flex-1 bc-t-c" v-else>
								<i class='iconfont iconzan1 bc-t-base bc-f-20rp' @click.stop="clickThumb(isAdd, item)"></i>
							</div>
						</div>
						<div class="bc-flex-1 bc-pd-t-7rp" >
							<span v-if="item.fabulous >0">
								{{item.fabulous}}
							</span>
						</div>
						<div class="bc-flex-2 bc-f-b bc-f-20rp bc-t-l" @click.stop="reply(isReply, 1, item)">...</div>
					</div>
				</div>
				<div class="bc-flex">
					<div class="bc-flex-2"></div>
					<div class="bc-flex-9">
						<ul class="bc-reset-ul" v-if="item && item.reply && item.reply.length>0">
							<li class="bc-flex" v-for="(res, index) in item.reply" :key="index">
								<div class="bc-flex-7 bc-pd-t-5rp">
									<span class="bc-f-b " style="color:#607E9F">@{{res.nickname_reply}}</span>
									<span> {{res.content}} </span>
								</div>
								<div class="bc-flex-3  bc-flex" @click.stop="reply(isReply, 1, item, res)">
									<div class="bc-flex-1 bc-t-c" v-if="!res.isclickthumb" @click.stop="clickThumb(isAdd, res)">
										<i class='iconfont iconzan bc-f-20rp' ></i>
									</div>
									<div class="bc-flex-1 bc-t-c" v-else>
										<i class='iconfont iconzan1 bc-t-base bc-f-20rp' @click.stop="clickThumb(isAdd, res)"></i>
									</div>
									<div class="bc-flex-1 bc-pd-t-7rp" >
										<span v-if="res.fabulous >0">
												{{res.fabulous}}
										</span>
									</div>
									<span class="bc-flex-2 bc-f-20rp bc-f-b bc-t-l">...</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
		<div class="reply bc-ps-f bc-w-100 bc-t-c " style="left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.2);z-index:20000;" v-if="whetherReplyMask" @click="cancelWhetherRepayMask">
			<div class="bc-ps-a bc-bg-white bc-w-100" style="left:0;bottom:0;">
				<div class="bc-bd-b-e5e bc-pd-tb-10rp" @click.stop="confirmReply">回复</div>
				<div class="bc-pd-tb-10rp" @click.stop="cancelReply">取消</div>
			</div>
		</div>

		<div class="reply bc-ps-f bc-w-100 bc-t-c " style="left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.2);z-index:20000;" v-if="whetherDeleteMask" @click="cancelWhetherDeleteMask">
			<div class="bc-ps-a bc-bg-white bc-w-100" style="left:0;bottom:0;">
				<div class="bc-bd-b-e5e bc-pd-tb-10rp" @click.stop="confirmDelete">删除</div>
				<div class="bc-pd-tb-10rp" @click.stop="cancelDelete">取消</div>
			</div>
		</div>

		<div style="height:7rem"></div>

	</div>
</template>

<script>
export default {
  name: "comment",
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
	    default: {
	      count: 0,
		    list: []
	    }
    }
	},
	data() {
    return {
      isAdd: true,
	    isArticleAdd: true,
      isClickThumb: false,
	    isReply: true,  // 是否回复
      whetherReplyMask: false, // 回复 or 取消 弹窗
      whetherDeleteMask: false,// 删除
	    id: 0,
	    sonid: 0,
      timer: 0 // 浏览量
    }
	},
	mounted() {
    const { commentParams } = this.config.data;
    // 浏览量 10分钟一次
    this.timer = setInterval(()=>{
      this.$axios.get(` /api/article/click_num.html`, {
        params: commentParams
      }).then(res => {

      }).catch(err => {
        console.log(err);
      })
    }, 600000);

	},
	methods: {
    clickArticleThumb(articleAdd, comment) {
      // 由没点赞->点赞
      if (articleAdd) {
        comment.fabulous_num++;
        this.isClickThumb = true;
        this.isArticleAdd = false
      } else {
        // 由点赞->没点赞
        comment.fabulous_num--;
        this.isClickThumb = false;
        this.isArticleAdd = true;
      }
    },
    clickThumb(add, item) {
      // 由没点赞->点赞
      if (add) {
        item.fabulous ++;
        item.isclickthumb = true;
        this.isAdd = false
      } else {
        // 由点赞->没点赞
        item.fabulous --;
        item.isclickthumb = false;
        this.isAdd = true;
      }
    },
    reply(isReply, commentStatus, item, res) {
      const {id, m_id} = item;
      this.id = id;
      let sonid;
      if (res) {
	       sonid = res.m_id;
	       this.sonid = res.m_id;
      }
      let isMine = (m_id === this.userInfo.id || sonid === this.userInfo.id);
      if (isMine && sonid) {
        // 自己在第二层
        commentStatus = 2;
        this.whetherDeleteMask = true;
        this.$emit('deleteComment', {commentStatus, id, sonid});
      } else if(isMine && !sonid) {
        // 自己在第一层
        commentStatus = 2;
        this.whetherDeleteMask = true;
        this.$emit('deleteComment', {commentStatus, id});
      } else {
        if (isReply) {
          this.whetherReplyMask = true;
          this.isReply = false;
          this.$emit('releaseComment', {commentStatus, id});
        } else {
          this.whetherReplyMask = false;
          this.isReply = true;
        }
      }
    },
    confirmReply() {
      this.whetherReplyMask = false;
      this.isReply = true;
      // this.comment.status = 1;
    },
    cancelReply() {
      this.whetherReplyMask = false;
      this.isReply = true;
    },
    cancelWhetherRepayMask() {
      this.whetherReplyMask = false;
      this.isReply = true;
    },
    cancelWhetherDeleteMask() {
      this.whetherDeleteMask = false;
    },
    confirmDelete() {
      this.whetherDeleteMask = false;
      this.$messageBox({
        message: '是否删除该评论？',
        title: '提示',
        confirmButtonText: '是',
        cancelButtonText: '否',
        showCancelButton: true,
      }).then(action => {
        if (action === 'confirm') {     //确认的回调
          let targetOneIndex;
          let targetTwoIndex;
          // 第一层
          targetOneIndex = this.comment.list.findIndex((item) => {
            return this.id === item.id;
          });
          // 第二层
          if (this.sonid && this.sonid !== 0 ) {
            targetTwoIndex = this.comment.list[targetOneIndex].reply.findIndex((item)=>{
              return this.sonid === item.m_id;
            });
            this.comment.list[targetOneIndex].reply.splice(targetTwoIndex, 1);
          } else {
            this.comment.list.splice(targetOneIndex, 1);
          }
          // count减一
	        this.comment.count -- ;
        }
      }).catch(err => {
        if (err === 'cancel') {     //取消的回调
          console.log('cancel');
        }
      });
    },
    cancelDelete() {
      this.whetherDeleteMask = false;
    }
	},
  computed:{
    userInfo(){
      return this.$store.state.userInfo;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped lang="scss">
	.comment {
		.avatar {
			width: rem(38);
			height: rem(38);
			border-radius: 50%;
		}
		.reply {
			max-width: rem(450);
		}
	}
</style>