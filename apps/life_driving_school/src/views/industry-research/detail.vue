<template>
	<bv-home-view class='wap' :router-level='2'>

		<w-home-header :header="{
			title:{
				value: '产业研究'
			}
		}" >
			<div slot="right-control">
				<div class="bc-t-r">
					<i class='iconfont icon- bc-f-20rp bc-mg-r-10rp' @click='$share'></i>
				</div>
			</div>
		</w-home-header>

		<w-article-detail :content="content"></w-article-detail>


	</bv-home-view>

	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>
	import WArticleDetail from '@components/wap/article/w-article-detail';
  export default {
    name: "industry-detail",
    data() {
      return {
        content: '我是详情内容，我是详情内容，我是详情内容，我是详情内容！'
      }
    },
    methods: {

    },
    mounted() {

    },
    components: {
      'w-article-detail': WArticleDetail
    }
  }
</script>