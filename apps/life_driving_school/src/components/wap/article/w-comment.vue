<template>
	<div class="comment">
		<ul class="bc-reset-ul">
			<li v-for="(item, index) in comment.discussants" :key="index">
				<div class="bc-flex bc-flex-jc-s bc-flex-ai-s bc-t-c bc-pd-tb-15rp">
					<div class="bc-flex-2">
						<img class="avatar" :src="item.avatar_src" alt="头像">
					</div>
					<div class="bc-flex-6 bc-f-14rp bc-t-l">
						<div>{{item.name}}</div>
						<div class="bc-t-999 bc-f-12rp bc-mg-t-6rp">{{item.time}}</div>
						<div class="bc-f-14rp bc-mg-t-6rp">
							{{item.content}}
						</div>
					</div>
					<div class="bc-flex-2 bc-flex">
						<div class="bc-flex-1 bc-t-l" v-if="!isClickThumb" @click.stop="clickThumb(isAdd)">
							<i class='iconfont iconzan bc-f-20rp' ></i>
						</div>
						<div class="bc-flex-1 bc-t-l" v-else>
							<i class='iconfont iconzan1 bc-f-base bc-f-20rp' @click.stop="clickThumb(isAdd)"></i>
						</div>
						<div class="bc-flex-1 bc-pd-t-7rp">
							{{item.support}}
						</div>
						<div class="bc-flex-1 bc-f-b bc-f-16rp" @click.stop="reply(isReply)">...</div>
					</div>
				</div>
				<div class="bc-flex">
					<div class="bc-flex-2"></div>
					<div class="bc-flex-9">
						<ul class="bc-reset-ul">
							<li class="bc-flex" v-for="(responser, index) in item.reply" :key="index">
								<div class="bc-flex-8">
									<span class="bc-f-b" style="color:#607E9F">@{{item.name}}</span>
									<span> {{item.content}} </span>
								</div>
								<div class="bc-flex-2 bc-f-b bc-f-16rp bc-pd-b-20rp" @click.stop="reply(isReply)">
									...
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

		<div style="height:7rem"></div>

	</div>
</template>

<script>
export default {
  name: "comment",
	props: {
		comment: {
      articleId: {
        type: Number,
	      default: 100
      },
      commentNum: {
        type: Number,
	      default: 3330
      }, // 评论条数
			status: {
        type: Number,
				default: 0 //  0为评论作者 1为评论别人的评论 2为评论别人的别人
			},
      discussants : [
          {
            id: 1,
            name: "聪明的一休",
            avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
            time: '3小时前',
            content: "很好，内容很适合我！",
            support: 100, // 点赞数量
            reply: [
              {
                id: 2,
                name: "Winter",
                avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
                responder: "聪明的一休",
                reviewers: "又学到了一招又学到了一招又学到了一招",
                time: "4小时前",
                content: "通道中人",
                support: 100, // 点赞数量
                reply: {
                  id: 2,
                  name: "CiCi",
                  avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
                  responder: "Winter",
                  reviewers: "又学到了一招又学到了一招又学到了一招",
                  time: "5小时前",
                  content: "你学到了哪一招？",
                  support: 100, // 点赞数量
                }
              },
            ]
          },
          {
            id: 5,
            name: "Steven",
            avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
            time: "4小时前",
            content: "好,讲得非常好，good, very good!",
            support: 100, // 点赞数量
            reply: []
          }
        ]
		}
	},
	data() {
    return {
      support: 100,
      isAdd: true,
      isClickThumb: false,
	    isReply: true,  // 是否回复
      whetherReplyMask: false // 回复 or 取消 弹窗
    }
	},
	methods: {
    clickThumb(add) {
      // 由没点赞->点赞
      if (add) {
        this.support ++ ;
        this.isClickThumb = true;
        this.isAdd = false
      } else {
        // 由点赞->没点赞
        this.support --;
        this.isClickThumb = false;
        this.isAdd = true;
      }
    },
    reply(isReply) {
      if (isReply) {
				this.whetherReplyMask = true;
	      this.isReply = false;
      } else {
        this.whetherReplyMask = false;
        this.isReply = true;
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
		.comments-reply-input {
			max-width: rem(450);
			.comment-reply-input-img {
				width: rem(15);
				height: rem(15);
			}
		}
	}
</style>