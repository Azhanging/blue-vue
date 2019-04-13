<template>
	<div>
		<w-comment
			:config="config"
			:comment="comment"
			@releaseComment="releaseComment"
			@deleteComment="deleteComment"
		></w-comment>


		<!--回复模块-->
		<w-comment-reply :config="config" :comment="comment" ></w-comment-reply>
	</div>
</template>

<script>
	import WComment from '@components/wap/article/w-comment';//评论列表
	import WCommentReply from '@components/wap/article/w-comment-reply';//评论回复框
	import {commentMixin} from '@components/wap/article/w-article-body/article';

	export default {
		name: "w-recommend-review",
		mixins: [commentMixin()],
		props: {
			title: {
				type: String,
				default: '详情'
			},
			config: {
				type: Object,
				default: {// 请求详情内容url 请求评论url
					data: {
						type: Object,
						default: {
							contentParams: {// 文章内容 请求参数
								article_id: 0
							},
							commentParams: { // 评论内容 请求参数
								article_id: 0,
								data_id: 3 // data_id带类型1文章,2书籍3,问答专区评论
							},
							submitCommentParams: { // 提交评论 请求参数 只需第一个
								article_id: 0,
								data_id: 3 // data_id带类型1文章,2书籍3,问答专区评论
							}
						}
					}
				}
			}
		},
		data() {
			return {
				comment: {}
				// commentStatus: 0,  //  0为评论文章 1为评论别人(回复) 2为自己(是自己就是删除)
				// id: 0,
			}
		},
		mounted(){
		},
		components:{
			WComment,
			WCommentReply
		}
	}
</script>

<style scoped>

</style>
