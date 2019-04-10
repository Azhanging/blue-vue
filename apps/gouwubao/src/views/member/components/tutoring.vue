<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'辅导收益'}}"></bv-header>

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
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">600.00</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">7天新增</div>
							<div class="stat-item-center-r-block-amount">10.00</div>
						</div>
					</div>
				</div>

			</div>

			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						辅导VIP收益
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						200.00
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">600.00</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">7天新增</div>
							<div class="stat-item-center-r-block-amount">10.00</div>
						</div>
					</div>
				</div>

			</div>
			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						辅导创客收益
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						100000.00
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
				<div class="details-title-l">辅导收益明细</div>
				<div class="details-title-r">
					<router-link to="/">查看更多 &gt;</router-link>
				</div>
			</div>

			<div class="details-box" v-for="i in 3">
				<div class="details-box-order">
					<div class="details-box-order-l">
						流水号：FX1465456454
					</div>
					<div class="details-box-order-r">购买创客</div>
				</div>
				<div class="details-box-type">
					<div class="details-box-type-l">来源：1546545646</div>
					<div class="details-box-type-r">+5.00</div>
				</div>
				<div class="details-box-time">日期：2019-08-22</div>
			</div>

		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "tutoring"
	}
</script>

<style scoped lang="scss">
	.wap{
		background: #f4f4f4;
	}
	@import "@css/member.scss";
</style>
