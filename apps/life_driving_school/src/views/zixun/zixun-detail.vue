<template>
	<bv-home-view class='wap' :router-level='2'>

		<w-article-detail :detail="detail" :header="{
			title:{
				value: '资讯详情'
			}
			}"></w-article-detail>

		<w-comment></w-comment>

	</bv-home-view>

	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>
	import WArticleDetail from '@components/wap/article/w-article-detail';
	import WComment from '@components/wap/article/w-comment';

	export default {
		name: "zixun-detail",
		data() {
			return {
			  detail: {
				  title: '我是标题我是标题我是标题我是标题我是标题',
				  time: 0 || (new Date()).getTime(),
					content: '我是详情内容，我是详情内容，我是详情内容，我是详情内容！',
					readers: 2000,
					support: 1000
			  }
			}
		},
		methods: {

		},
		mounted() {
		
		},
		components: {
		  'w-article-detail': WArticleDetail,
			'w-comment': WComment
		}
	}
</script>