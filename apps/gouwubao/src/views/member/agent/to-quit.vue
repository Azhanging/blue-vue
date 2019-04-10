<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'申请退出'}}"></bv-header>

		<div class="quit-top">
			<div class="quit-top-l">
				<img src="https://image.dtb315.com/76343.jpg">
			</div>
			<div class="quit-top-r">
				<div class="quit-top-r-account">点通宝账号：1345661665156</div>
				<div class="quit-top-r-level">代理级别：省代</div>
				<div class="quit-top-r-area">代理区域：广东省</div>
			</div>
		</div>

		<div class="quit-why">
			<div class="quit-why-title">解绑缘由</div>
			<div class="quit-why-tet">
				<textarea placeholder="请输入您解绑的原因"></textarea>
			</div>
			<div class="quit-why-but">
				<button>申请退出</button>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "to-quit"
	}
</script>

<style scoped lang="scss">
	.wap{
		background: #f4f4f4;
	}
	@import "@css/member.scss";
</style>
