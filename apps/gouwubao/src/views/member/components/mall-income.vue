<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'商城收益'}}"></bv-header>

		<div class="stat">
			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						累计收益（通宝）
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						8000.00
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日变化</div>
							<div class="stat-item-center-r-block-amount">600.00</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">7天新增</div>
							<div class="stat-item-center-r-block-amount">10.00</div>
						</div>
					</div>
				</div>

				<div class="stat-item-ForThe">
					<div class="stat-item-ForThe-l">可提现总额：<strong>800.00</strong></div>
					<div class="stat-item-ForThe-r"><router-link to="/">去提现 &gt;</router-link></div>
				</div>

			</div>

			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						累计订单量
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						8000.00
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">600</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">7天新增</div>
							<div class="stat-item-center-r-block-amount">10</div>
						</div>
					</div>
				</div>

			</div>
			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						累计销售额
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						8000.00
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">600.00</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">7天新增</div>
							<div class="stat-item-center-r-block-amount">10</div>
						</div>
					</div>
				</div>

			</div>

		</div>

		<div class="Income-details">
			<div class="details-title">
				<div class="details-title-l">商城收入明细</div>
				<div class="details-title-r">
					<router-link to="/">查看更多 &gt;</router-link>
				</div>
			</div>

			<div class="details-box" v-for="i in 3">
				<div class="details-box-order">订单号：TB15464644544674</div>
				<div class="details-box-time">时间：2019-03-30 15:37:47</div>
				<div class="details-box-type">
					<div class="details-box-type-l">类型：商城收益</div>
					<div class="details-box-type-r">+5.00</div>
				</div>
			</div>

		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "mall-income"
	}
</script>

<style scoped lang="scss">
	.wap{
		background: #f4f4f4;
	}
	@import "@css/member.scss";
</style>
