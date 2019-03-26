<template>
	<bv-home-view class='wap' :router-level='2'>
		
		<w-home-header :title='"详情"' ></w-home-header>
		
		
		<div v-for="i in 300">
			内容内容
		</div>
		
		
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>

	export default {
		name: "article-detail",
		data() {
			return {
			

			}
		},
		methods: {

		},
		mounted() {
		
		}
	}
</script>