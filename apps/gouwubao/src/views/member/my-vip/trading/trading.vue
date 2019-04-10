<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'交易记录'}}"></bv-header>

		<div class="trading-box">
			<div class="trading-item">
				<div class="trading-top">
					<div class="trading-top-l"><i class="iconfont"></i> 至尊VIP会员一年</div>
					<div class="trading-top-r">免费赠送</div>
				</div>
				<div class="trading-desc">
					<div>会员生效时间: 2019-04-08 18:18</div>
					<div>会员到期时间: 2010-04-08 18:18</div>
					<div>购买时间: 2010-04-08 18:18</div>
					<div>订单编号: 1312555846464</div>
					<div class="trading-desc-seal">免费赠送</div>
				</div>
			</div>

			<div class="trading-item">
				<div class="trading-top">
					<div class="trading-top-l"><i class="iconfont"></i> 至尊VIP会员一年</div>
					<div class="trading-top-r"><span>¥193</span></div>
				</div>
				<div class="trading-desc">
					<div>会员生效时间: 2019-04-08 18:18</div>
					<div>会员到期时间: 2010-04-08 18:18</div>
					<div>购买时间: 2010-04-08 18:18</div>
					<div>订单编号: 1312555846464</div>
					<div class="trading-desc-seal">免费赠送</div>
				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "trading"
	}
</script>

<style scoped lang="scss">
	@import "@css/member.scss";
</style>
