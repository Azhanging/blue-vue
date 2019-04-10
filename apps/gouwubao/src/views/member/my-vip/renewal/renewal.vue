<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'支付'}}"></bv-header>
		<div class="renewal-top">
			<div class="renewal-top-item">
				<div class="renewal-top-item-l">
					尊享VIP
				</div>
				<div class="renewal-top-item-r">¥193.00</div>
			</div>
			<div class="renewal-top-item">
				<div class="renewal-top-item-l">
					购买年限
				</div>
				<div class="renewal-top-item-r">1年</div>
			</div>
			<div class="renewal-top-item">
				<div class="renewal-top-item-l">
					账户通宝余额
				</div>
				<div class="renewal-top-item-r">￥20000.00</div>
			</div>
		</div>

		<div class="renewal-interests">
			<div class="interests-title">成为创客享专属权益</div>
			<div class="interests-box">
				<div class="interests-item" v-for="item in interestsItem">
					<i class="iconfont"></i>
					<div>{{ item.name }}</div>
					<div class="interests-item-kthl">{{ item.kthl }}</div>
				</div>
			</div>
		</div>

		<div class="renewal-fixed">
			<div class="renewal-fixed-top">
				<label>
					<input type="checkbox">
				</label>
				我同意《点通宝代理智能合约》
			</div>
			<div class="renewal-fixed-btn">
				<button>确认付款</button>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "renewal",
		data() {
			return {
				interestsItem: [
					{name:'积分好礼',kthl:'开通即享积分好礼'},
					{name:'服务支持',kthl:'尊享多种服务支持'},
					{name:'VIP特供产品',kthl:'享VIP专区产品'},
				]
			}
		}
	}
</script>

<style scoped lang="scss">
@import "@css/member.scss";
</style>
