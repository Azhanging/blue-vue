<!--  购买vip -->
<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'支付'}}"/>

		<!-- 购买 -->
		<div class="bc-row bc-f-16rp" >
			<div class="bc-row bc-pd-lr-15rp ">
				<div class="bc-flex bc-flex-jc-sb bc-pd-tb-21rp bc-bd-b-e5e">
					<div class="bc-flex-1">
						尊享VIP
					</div>
					<div class="bc-flex-1 bc-t-base bc-t-r" style="color:#bb8f41;">
						¥{{price}}
					</div>
				</div>
			</div>
			<div class="bc-row bc-pd-lr-15rp">
				<div class="bc-flex bc-flex-jc-sb bc-pd-tb-21rp bc-bd-b-e5e">
					<div class="bc-flex-1">
						购买年限
					</div>
					<div class="bc-flex-1 bc-t-base bc-t-r" style="color:#bb8f41;">
						1年
					</div>
				</div>
			</div>
			<div class="bc-row bc-pd-lr-15rp">
				<div class="bc-flex bc-flex-jc-sb bc-pd-tb-21rp bc-bd-b-e5e">
					<div class="bc-flex-1">
						账户通宝余额
					</div>
					<div class="bc-flex-1 bc-t-base bc-t-r" style="color:#bb8f41;">
						¥{{money}}
					</div>
				</div>
			</div>
		</div>

		<!-- 权益 -->
		<div class="bc-row bc-t-c">
			<div class="bc-row bc-f-b bc-f-18rp bc-pd-tb-20rp">
				成为VIP享专属权益
			</div>
			<div class="bc-flex">
				<div class="bc-flex-1">
					<img :src="`${staticPath}/icon-1.png`" alt="" style="width:2.5rem;">
					<div class="bc-pd-tb-2rp" style="color:#BB8F41;">积分好礼</div>
					<div class="bc-f-12rp">开通即享积分好礼</div>
				</div>
				<div class="bc-flex-1">
					<img :src="`${staticPath}/icon-2.png`" alt="" style="width:2.5rem;">
					<div class="bc-pd-tb-2rp" style="color:#BB8F41;">服务支持</div>
					<div class="bc-f-12rp">尊享多种服务支持</div>
				</div>
				<div class="bc-flex-1">
					<img :src="`${staticPath}/icon-3.png`" alt="" style="width:2.5rem;">
					<div class="bc-pd-tb-2rp" style="color:#BB8F41;">VIP特供产品</div>
					<div class="bc-f-12rp">享VIP专区产品</div>
				</div>
			</div>

		</div>


		<template slot="other">
			<div class="bc-row bc-pd-lr-20rp bc-pd-tb-15rp bc-ps-f bc-bg-white" style="bottom:0;left:0;">
				<div class="bc-flex bc-flex-ai-c bc-pd-tb-11rp bc-v-m">
					<input type="checkbox" v-model="protocol" class="bc-inline-block bc-mg-r-5rp">我同意
					<router-link to="/member/contract/consumer" class="bc-t-info">
						《点通宝代理智能合约》
					</router-link>
				</div>
				<div class="bc-row">
					<button
						class="bc-btn bc-bd-radius-4 bc-w-100 join-btn bc-f-18rp"
						:class="[ protocol && 'bc-btn-base', !protocol && 'bc-btn-grey']"
						@click="submit"
					>
						确认付款
					</button>
				</div>
			</div>
		</template>

	</bv-home-view>
</template>

<script>
	export default {
    name: "vip-buy",
    data() {
      return {
        protocol: true,
        price: '',
        money: ''
      }
    },
    computed: {
      staticPath() {
        return `${this.config.path.static}/img/home/join/vip-buy`;
      }
    },
    methods: {
      getData() {
        this.$axios.get('/home/vip/order').then((res) => {
          const { data } = res.data;
          const { price, money } = data;
          this.price = price;
          this.money = money;
        });
      },
      submit() {
        this.protocol && (location.href = `${this.config.path.base}/home/vip/pay`);
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped lang="scss">
	//加入按钮
	.join-btn {
		padding-top: rem(10) !important;
		padding-bottom: rem(10) !important;
		font-size: rem(16);
	}

</style>
