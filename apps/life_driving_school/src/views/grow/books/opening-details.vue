<template>
	<bv-home-view class='wap' :router-level='2'>
		<w-article-detail :header="{
				title:{
					value: '开篇语'
				}
			}" :config="config"
		></w-article-detail>

	</bv-home-view>
</template>

<script>
	import WArticleDetail from '@components/wap/article/w-article-detail';
	export default {
		name: "opening-details",
		props: {
		},
		data() {
			return {
				config: {
					url: {
						contentUrl: '/api/book/festival'
					},
					data: {
						contentParams: {// 文章内容 请求参数
							id: this.$route.params.opening
						},
					}
				}
			}
		},
		components: {
			'w-article-detail': WArticleDetail,
		}
	}
</script>

<style scoped>

</style>
