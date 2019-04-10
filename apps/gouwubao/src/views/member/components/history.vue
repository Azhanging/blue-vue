<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'历史'}}"></bv-header>

		<div class="history-box">
			<div class="history-box-item">
				<div class="history-box-item-title">区域会员(位)</div>
				<div class="history-box-item-num">100</div>
			</div>
			<div class="history-box-item">
				<div class="history-box-item-title">累计收益(通宝)</div>
				<div class="history-box-item-num">100</div>
			</div>
		</div>

		<div class="Income-details">
			<div class="details-title">
				<div class="details-title-l">收入明细</div>
			</div>

			<div class="details-box" v-for="i in 3">
				<div class="details-box-order">订单号：TB15464644544674</div>
				<div class="details-box-time">时间：2019-03-30 15:37:47</div>
				<div class="details-box-type">
					<div class="details-box-type-l">类别：分享收益</div>
					<div class="details-box-type-r">+5.00</div>
				</div>
			</div>

		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "history"
	}
</script>

<style scoped lang="scss">
	.wap{
		background: #f4f4f4;
	}
	@import "@css/member.scss";
</style>
