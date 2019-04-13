<template>
	<div>
		<w-article-body :title="'阅读详情'" :config="config"></w-article-body>
	</div>
</template>

<script>
	import WArticleBody from '@components/wap/article/w-article-body/w-article-body';
	export default {
		name: "detail",
		data() {
			return {
				config: {
					url: {
						contentUrl: '/api/book/info'
					},
					data: {
						contentParams: {// 文章内容 请求参数
							id: this.$route.params.yuedu_id
						},
						commentParams: { // 评论内容 请求参数
							article_id: this.$route.params.yuedu_id,
							data_id: 2 // data_id带类型1文章,2书籍3,问答专区评论
						},
						submitCommentParams: { // 提交评论 请求参数 只需第一个
							article_id: this.$route.params.yuedu_id,
							data_id: 2 // data_id带类型1文章,2书籍3,问答专区评论
						}
					}
				}
			}
		},
		components: {
			'w-article-body': WArticleBody
		}
	}
</script>
