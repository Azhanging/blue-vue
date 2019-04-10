<template>
	<bv-home-view class='wap' :router-level='2'>

		<div class="vip-top">
			<div class="vip-header">
				<div class="vip-header-l" @click='$router.back()'>
					<i class="iconfont ">1</i>
				</div>
				<div class="vip-header-c">我的VIP会员</div>
				<div class="vip-header-r">
					<router-link to="/member/my-vip/trading">
						<i class="iconfont ">2</i>
					</router-link>
				</div>
			</div>

			<div class="vip-card">
				<div class="vip-card-top">
					<div class="vip-card-top-l">
						<img src="https://image.dtb315.com/76343.jpg">
					</div>
					<div class="vip-card-top-r">
						<div class="vip-card-top-r-name">聪明的一休</div>
						<div class="vip-card-top-r-time">2090-5-20到期 </div>
					</div>
				</div>

				<div class="vip-card-renewal">
					<div class="vip-card-renewal-NO">NO.1654164646441535565</div>
					<div class="vip-card-renewal-btn">
						<router-link to="/member/my-vip/renewal">
							立即续费
						</router-link>
					</div>
				</div>
			</div>
		</div>

		<!--vip专属权益-->
		<div class="interests">
			<div class="interests-title">VIP专属权益</div>
			<div class="interests-box">
				<div class="interests-item" v-for="item in interestsItem">
					<i class="iconfont">3</i>
					<div>{{ item.name }}</div>
					<div class="interests-item-jf">{{ item.jf }}</div>
				</div>
			</div>
		</div>

		<!--vip专属产品-->
		<div class="interests">
			<div class="interests-title">VIP专属产品</div>
			<div class="interests-product">
				<router-link to="/">
					<img src="http://image.dtb315.com/5217013.jpg"/>
				</router-link>
			</div>
		</div>
		<!--vip专属服务-->
		<div class="interests">
			<div class="interests-title">VIP专属服务</div>
			<div class="interests-service">
				<div class="interests-service-item">
					<div class="interests-service-item-t">
						区域代理专属服务：
					</div>
					<div class="interests-service-item-p">这里是区域代理提供的专属服务内容</div>
				</div>

				<div class="interests-service-item">
					<div class="interests-service-item-t">
						创客上级专属服务：
					</div>
					<div class="interests-service-item-p">这里是创客上级提供的专属服务内容</div>
				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "my-vip",
		data() {
			return {
				interestsItem: [
					{name:'注册有礼',jf:'1000积分'},
					{name:'消费有礼',jf:'赠送等额积分'},
					{name:'商城特别抽奖',jf:'购物有机会参与'},
				]
			}
		}
	}
</script>

<style scoped lang="scss">
@import "@css/member.scss";
</style>
