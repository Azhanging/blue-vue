<template>
	<div class="comment" v-if="comment">
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
							<div class="bc-flex-1 bc-t-c" v-if="item.isclickthumb">
								<i class='iconfont iconzan1 bc-t-base bc-f-20rp' @click.stop="clickThumb(item)"></i>
							</div>
							<div class="bc-flex-1 bc-t-c" v-else @click.stop="clickThumb(item)">
								<i class='iconfont iconzan bc-f-20rp'></i>
							</div>
						</div>
						<div class="bc-flex-1 bc-pd-t-7rp bc-t-c">
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
									<span class="bc-f-b " style="color:#607E9F">{{res.nickname_reply}}</span>
									<span>
										{{res.content}}
									</span>
								</div>
								<div class="bc-flex-3  bc-flex" >
									<div class="bc-flex-1 bc-t-c" v-if="res.isclickthumb">
										<i class='iconfont iconzan1 bc-t-base bc-f-20rp' @click.stop="clickThumb(res)"></i>
									</div>
									<div class="bc-flex-1 bc-t-c" v-else @click.stop="clickThumb(res)">
										<i class='iconfont iconzan bc-f-20rp'></i>
									</div>
									<div class="bc-flex-1 bc-pd-t-7rp bc-t-c">
										<span v-if="res.fabulous >0">
												{{res.fabulous}}
										</span>
									</div>
									<span class="bc-flex-2 bc-f-20rp bc-f-b bc-t-l" @click.stop="reply(isReply, 1, item, res)">...</span>
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

		<template >
			<!-- 绑定手机号 -->
			<bv-bind-phone :show-bind-phone-status="showBindPhoneStatus" @close-bind-phone="closeBindPhone"/>
		</template>
	</div>
</template>

<script>
		export default {
      name: "comment",
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
          default: {
            count: 0,
            list: []
          }
        }
      },
      data() {
        return {
          isReply: true,  // 是否回复
          whetherReplyMask: false, // 回复 or 取消 弹窗
          whetherDeleteMask: false,// 删除
          id: 0, // 自己这一层所在id
          member_id: 0, // 是自己
          layer: 1,
          parent_id: 0, // 父级id
          showBindPhoneStatus: false
        }
      },
      methods: {
				// 点赞
        clickThumb(item) {
          const { commentParams } = this.opts.data;
          let params = Object.assign(
            commentParams, {
              id: item.id,
              name_url: this.$route.path
            });
          let add = !item.isclickthumb;
          // 由没点赞->点赞
          if (add) {
            this.$axios.get('/api/Comment/comment_article', {
              params
            }).then(res => {

              const { code } = res.data;
              if (code == 10002) {
                // 去绑定手机号
                this.showBindPhoneStatus = true;
              } else if (code == 200) {
                item.fabulous++;
                item.isclickthumb = true;
                this.$toast({
                  message: '点赞成功!',
                  iconClass: 'iconfont iconchenggong bc-t-success'
                });
              }



            })
          } else {
            // 由点赞->没点赞
            this.$axios.get('/api/Comment/comment_article', {
              params
            }).then(res => {
              item.fabulous--;
              item.isclickthumb = false;
              this.$toast({
                message: '取消点赞!',
                iconClass: 'iconfont iconchenggong bc-t-success'
              });
            })
          }
        },
				// 回复 或 删除
        reply(isReply, commentStatus, item, res) {
          let isMine = item.member_id == this.userInfo.id || (res && res.member_id == this.userInfo.id);
          if (isMine && res) { // 自己在第二层
            this.comment.id = res.id;
            this.comment.commentStatus = 2;
            this.member_id = res.member_id;
            this.parent_id = item.id;
            this.layer = 2;
            this.whetherDeleteMask = true;
          } else if (isMine) { // 自己在第一层
            this.comment.id = item.id;
            this.comment.commentStatus = 2;
            this.member_id = item.member_id;
            this.layer = 1;
            this.whetherDeleteMask = true;
          } else {
            if (isReply) {
              this.whetherReplyMask = true;
              this.isReply = false;
              // 如果回复的人在第一,二层
              this.comment.id = item.id;
              this.comment.commentStatus = commentStatus;
            } else {
              this.whetherReplyMask = false;
              this.isReply = true;
            }
          }
        },
        confirmReply() {
          this.whetherReplyMask = false;
          this.isReply = true;
	        this.comment.commentStatus = 1;
	        this.$emit('replyFocus')
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
          const { commentParams } = this.opts.data;
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
              if (this.layer === 1) {
                targetOneIndex = this.comment.list.findIndex((item) => {
                  return this.comment.id === item.id;
                });
                this.comment.list.splice(targetOneIndex, 1);
              } else if (this.layer === 2) { // 第二层
                targetOneIndex = this.comment.list.findIndex((item) => {
                  return this.parent_id === item.id;
                });
                targetTwoIndex = this.comment.list[targetOneIndex].reply.findIndex((item) => {
                  return this.member_id === item.member_id;
                });
                this.comment.list[targetOneIndex].reply.splice(targetTwoIndex, 1);
              }

              // 恢复状态
              this.comment.commentStatus = 0;

              // 删除
              let params = Object.assign(commentParams, { id: this.comment.id } );
              this.$axios.get('/api/comment/comment_delete', {
                params
              }).then(res => {
                const { code } = res.data;
                if (code === 200) {
                  this.comment.count--;
                  this.$toast({
                    message: '删除成功!',
                    iconClass: 'iconfont iconchenggong bc-t-success'
                  });
                } else if (code === 1010) {
                  this.$toast({
                    message: '删除失败!',
                    iconClass: 'iconfont iconfail bc-t-warning'
                  });
                }
              }).catch(err => {
                console.log(err);
              });
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
      computed: {
        userInfo() {
          return this.$store.state.userInfo;
        }
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
