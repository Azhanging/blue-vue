<template>
	<bv-home-view class='wap' :router-level='2'>
		<div class="vip-top">
			<div class="vip-header">
				<div class="vip-header-l" @click='$router.back()'>
					<i class="icon icon-left bc-f-18rp"></i>
				</div>
				<div class="vip-header-c">我的VIP会员</div>
				<div class="vip-header-r">
					<router-link to="/member/vip/trading" class="bc-t-white">
						<i class="icon icon-money bc-f-20rp"></i>
					</router-link>
				</div>
			</div>

			<div class="vip-card">
				<div class="vip-card-top">
					<div class="vip-card-top-l">
						<img :src="pageData.head_img">
					</div>
					<div class="vip-card-top-r">
						<div class="vip-card-top-r-name">{{pageData.nickname}}</div>
						<div class="vip-card-top-r-time">{{pageData.vip_end_time}}到期</div>
					</div>
				</div>

				<div class="vip-card-renewal">
					<div class="vip-card-renewal-NO">NO.{{pageData.vip_no}}</div>
					<div class="vip-card-renewal-btn">
						<router-link to="/join/vip-buy">
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
				<div class="interests-item" v-for="(item,index) in interestsItem">
					<img :src="`${staticPath}/icon-${index+1}.png`" alt="" style="width:2.6rem;">
					<div class="bc-pd-t-4rp">{{ item.name }}</div>
					<div class="interests-item-jf">{{ item.jf }}</div>
				</div>
			</div>
		</div>

		<!--vip专属产品-->
		<div class="interests">
			<div class="interests-title">VIP专属产品</div>
			<div class="interests-product">
				<router-link to="/">
					<img :src="`${staticPath}/vip-shop.png`" class="bc-w-100"/>
				</router-link>
			</div>
		</div>
		<!--vip专属服务-->
		<div class="interests">
			<div class="interests-title">VIP专属服务</div>
			<div class="interests-service">
				<div class="interests-service-item">
					1.开通成功立享限量专属好礼，即送1000积分。
					2.VIP会员在商城消费最高可享等额积分（积分均可用于积分商城抵扣现金使用）。
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
        interestsItem: [{
          name: '注册有礼',
          jf: '1000积分'
        }, {
          name: '消费有礼',
          jf: '赠送等额积分'
        }, {
          name: '商城特别抽奖',
          jf: '购物有机会参与'
        }],
        pageData: {}
      }
    },
    created() {
      this.getData();
    },
    computed: {
      staticPath() {
        return `${this.$config.path.static}/img/member/vip`
      }
    },
    methods: {
      getData() {
        this.$axios.get('/member/vip/index').then((res) => {
          const { data } = res.data;
          this.pageData = data;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
	@import "@css/member.scss";
</style>
