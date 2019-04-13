<template>
	<div>
		<w-article-body :title="'生态圈详情'" :config="config"></w-article-body>
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
						contentUrl: '/api/Article/info.html',
						commentUrl: '/api/Comment/index.html',
						submitCommentUrl: '/api/comment/common'
					},
					data: {
						contentParams: {// 文章内容 请求参数

						},
						commentParams: { // 评论内容 请求参数

						},
						submitCommentParams: { // 提交评论 请求参数

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
