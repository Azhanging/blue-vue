<template>
	<bv-home-view class='wap' :router-level='2'>

		<detail-content :detail="detail"></detail-content>

		<!--回复模块-->
		<template slot="footer">
			<w-comment-reply :comment="detail.comment"></w-comment-reply>
		</template>

	</bv-home-view>

	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>
	import DetailContent from '@views/zixun/detail/detail-content/detail-content';
	import WCommentReply from '@components/wap/article/w-comment-reply';

	export default {
		name: "zixun-detail",
		data() {
			return {
			  detail: {
			    info: {
					  title: '我是标题',
					  time: 0 || (new Date()).getTime(),
						readers: 2000,
            support: 1111
			    },
					comment: {
	          articleId: 100,
					  commentNum: 3330, // 评论条数
	          discussants : [
	            {
	              commenter: "winter",   // 评论人
		            support: 100, // 点赞数量
	              type: 0,                // 0为评论作者 1为评论别人的评论 2为评论别人的别人
	              comments: [
	                {
	                  id: 1,
	                  name: "聪明的一休",
	                  avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
	                  time: '3小时前',
	                  content: "很好，内容很适合我！",
	                  reply: [
	                    {
	                      id: 2,
	                      name: "Winter",
	                      avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
	                      responder: "聪明的一休",
	                      reviewers: "又学到了一招又学到了一招又学到了一招",
	                      time: "4小时前",
	                      content: "通道中人",
	                      reply: {
	                        id: 2,
	                        name: "CiCi",
	                        avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
	                        responder: "Winter",
	                        reviewers: "又学到了一招又学到了一招又学到了一招",
	                        time: "5小时前",
	                        content: "你学到了哪一招？"
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
	                  reply: []
	                }
	              ]
	            },
	            {
	              commenter: "winter",   // 评论人
		            support: 100, // 点赞数量
	              type: 0,                // 0为评论作者 1为评论别人的评论 2为评论别人的别人
	              comments: [
	                {
	                  id: 1,
	                  name: "聪明的一休",
	                  avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
	                  time: '3小时前',
	                  content: "很好，内容很适合我！",
	                  reply: [
	                    {
	                      id: 2,
	                      name: "Winter",
	                      avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
	                      responder: "聪明的一休",
	                      reviewers: "又学到了一招又学到了一招又学到了一招",
	                      time: "4小时前",
	                      content: "通道中人",
	                      reply: {
	                        id: 2,
	                        name: "CiCi",
	                        avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
	                        responder: "Winter",
	                        reviewers: "又学到了一招又学到了一招又学到了一招",
	                        time: "5小时前",
	                        content: "你学到了哪一招？"
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
	                  reply: []
	                }
	              ]
	            }
	          ]
					},
			  }
			}
		},
		components: {
			'detail-content': DetailContent,
			'w-comment-reply': WCommentReply
		}
	}
</script>