<template>
	<bv-home-view v-if='$config.device.isWap' class='wap'>
		
		<bv-home-header :title="'生命导航'" :type="1"></bv-home-header>
		
		
		<bv-home-nav  :active-class-name="'bc-t-danger'"></bv-home-nav>
		
		
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
			return {}
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