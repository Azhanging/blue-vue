<template>
	<bv-home-view class='wap' :router-level='2'>
		
		<w-home-header :title="'生命导航'" :type="1"></w-home-header>
		
		
		<w-home-nav  :active-index='4' ></w-home-nav>
		
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>

	export default {
		name: "zhuanqu",
		data() {
			return {
			
			}
		},
	
		methods:{
		
		},
		mounted() {
		
		}
	}
</script>

<style lang='scss' scoped>
	.wap{
	
	}
	
	.pc{
	
	}

</style>