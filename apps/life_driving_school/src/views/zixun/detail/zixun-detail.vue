<template>
	<bv-home-view class='wap' :router-level='2'>

		<w-article-detail :info="detail.info" :header="{
			title:{
				value: '资讯详情'
			}
			}"></w-article-detail>

		<w-comment :comment="detail.comment" @release="releaseComment" @deleteComment="deleteComment"></w-comment>
		<button @click.stop="submitForm" style="position:fixed;z-index:200000;top:0">点击发布</button>

		<template slot="other">
			<!-- 绑定手机号 -->
			<bv-bind-phone :show-bind-phone-status="showBindPhoneStatus" @close-bind-phone="closeBindPhone"/>
		</template>

		<!--回复模块-->
		<template slot="footer">
			<!--<form action="" method="" @submit.prevent="submitForm">-->
			<!--</form>-->
			<w-comment-reply :comment="detail.comment" @bindPhone="bindPhone"></w-comment-reply>
			<div class="reply bc-ps-f bc-w-100 bc-t-c " style="left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.2);z-index:20000;" v-if="whetherDeleteMask" @click="cancelWhetherDeleteMask">
				<div class="bc-ps-a bc-bg-white bc-w-100" style="left:0;bottom:0;">
					<div class="bc-bd-b-e5e bc-pd-tb-10rp" @click.stop="confirmDelete">删除</div>
					<div class="bc-pd-tb-10rp" @click.stop="cancelDelete">取消</div>
				</div>
			</div>
		</template>

	</bv-home-view>

	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>
		import WArticleDetail from '@components/wap/article/w-article-detail';
    import WComment from '@components/wap/article/w-comment';
    import WCommentReply from '@components/wap/article/w-comment-reply';
    import router from '@router';

    export default {
      name: "zixun-detail",
      data() {
        return {
          detail: {
            info: {
              name: '我是标题',
              create_time: '',
              click_num: 2000,
              fabulous_num: 1111
            },
            comment: {
              count: 3330, // 评论条数
              fabulous_num: 0,
              list: []
            },
          },
          commentStatus: 0,  //  0为评论文章  1为评论别人 2为自己
          id: 0,
	        sonid: 0,
          whetherDeleteMask: false,
	        timer: 0,
          //绑定手机的状态
          showBindPhoneStatus: (() => {
            return router.currentRoute.fullPath === '/';
          })()
        }
      },
	    computed:{
        userInfo(){
          return this.$store.state.userInfo;
        }
	    },
      mounted() {
        // 内容
        this.$axios.get(`/api/Article/info.html`, {
          params: {
            article_id: this.$route.params.id
          }
        }).then(res => {
          const {data} = res.data;
	        this.detail.info = data;
	        this.detail.info.content = JSON.parse(data.content);
	        }).catch(error => {
	          console.log(error);
        });

        // 评论
        this.$axios.get(`/api/Comment/index.html`, {
          params: {
            article_id: this.$route.params.id
          }
        }).then(res => {
          const {data} = res.data;
          this.detail.comment = data;
          console.log('评论',data)
        }).catch(error => {
          console.log(error);
        });

        // 浏览量 10分钟一次
        this.timer = setInterval(()=>{
          this.$axios.get(` /api/article/click_num.html`, {
            params: {
              article_id: this.$route.params.id
            }
          }).then(res => {

          }).catch(err => {
            console.log(err);
          })
        }, 600000);

      },
      methods: {
        releaseComment(opts) {
          this.commentStatus = opts.commentStatus;
          this.id = opts.id;
        },
        submitForm() {
          // if (!this.showBindPhoneStatus) {
          //   // 绑定手机 再进行登录判断
          //   if ($config.session.storage){}
          //   this.showBindPhoneStatus = true;
          // } else {
          // }

          let newComment;
          // 发送请求
          this.$axios.post('/api/comment/common', {
              article_id: this.$route.params.id,
	            id: this.id,
	            content: this.detail.comment.editComment,
              m_id: this.userInfo.id
          }).then(res => {
            const { data } = res.data;
            if (this.commentStatus === 0) {
	            newComment = {
		            id: data.id ,
		            article_id: data.article_id,
		            nickname: data.nickname ,
	              head_img: data.head_img,
		            m_id: data.m_id,
	              time: data.time,
	              content: data.content ,
	              fabulous: data.fabulous || 0 , // 点赞数量
	              reply: []
	            };
            } else if (this.commentStatus === 1) {
              newComment = {
                id: data.id ,
                nickname_reply: data.nickname_reply,
                head_img: data.head_img,
                m_id: data.m_id,
                time: data.time,
                content: data.content ,
                fabulous: data.fabulous || 0 , // 点赞数量
              };
            }

            this.detail.comment.list = this.detail.comment.list ? this.detail.comment.list : [];
            if (this.commentStatus === 1 ) {
              let targetIndex = this.detail.comment.list.findIndex((item, index) => {
                return this.id === item.id;
              });
              // 回复他人评论  如果是自己（弹出删除 取消）
              this.detail.comment.list[targetIndex].reply.unshift(newComment);
            } else if(this.commentStatus === 0) {
              // 默认回复文章
              this.detail.comment.list.unshift(newComment);
            }
            // 恢复默认评论文章状态
            this.commentStatus = 0;

          }).catch(error => {
            console.log(error);
          });


        },
        deleteComment(opts) {
          const {commentStatus, id, sonid} = opts;
          this.commentStatus = commentStatus;// 如果是自己就是0
          this.id = id;
          this.sonid = sonid;
          if (commentStatus === 2) {
            this.whetherDeleteMask = true;
          }
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
               targetOneIndex = this.detail.comment.list.findIndex((item) => {
                return this.id === item.id;
              });
               console.log("targetOneIndex", targetOneIndex)
							// 第二层
							if (this.sonid && this.sonid !== 0 ) {
	               targetTwoIndex = this.detail.comment.list[targetOneIndex].reply.findIndex((item)=>{
									return this.sonid === item.m_id;
	              });
                console.log("targetTwoIndex", targetTwoIndex)
                this.detail.comment.list[targetOneIndex].reply.splice(targetTwoIndex, 1);
							} else {
                this.detail.comment.list.splice(targetOneIndex, 1);
              }

            }
          }).catch(err => {
            if (err === 'cancel') {     //取消的回调
              console.log(2);
            }
          });
        },
        cancelDelete() {
          this.whetherDeleteMask = false;
        },
        bindPhone() {
          // if (!this.showBindPhoneStatus) {
          //   // 绑定手机 再进行登录判断
          //   if ($config.session.storage){}
          //   this.showBindPhoneStatus = true;
          // } else {
          // }
        }
      },
	    destroyed() {
        clearInterval(this.timer);
	    },
      components: {
        'w-article-detail': WArticleDetail,
        'w-comment': WComment,
        'w-comment-reply': WCommentReply
      }
    }
</script>