<template>
	<bv-home-view v-if='$config.device.isWap' class='wap' :router-level='3'>
		
		<w-home-header :title='"详情"' ></w-home-header>
		
		
		<div>
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

<style lang='scss' scoped>
	@import '@css/index.scss';

	
</style>