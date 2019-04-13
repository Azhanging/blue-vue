<!--  购买vip -->
<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'支付'}}"/>
		<div class="renewal-top">
			<div class="renewal-top-item">
				<div class="renewal-top-item-l">
					尊享创客
				</div>
				<div class="renewal-top-item-r">¥{{price}}</div>
			</div>
			<div class="renewal-top-item">
				<div class="renewal-top-item-l">
					账户通宝余额
				</div>
				<div class="renewal-top-item-r">¥{{money}}</div>
			</div>
		</div>

		<div class="renewal-interests">
			<div class="interests-title">成为创客享专属权益</div>
			<div class="interests-box">
				<div class="interests-item">
					<img :src="`${staticPath}/icon-1.png`" alt="" style="width:2.5rem;">
					<div>8大权益</div>
					<div class="interests-item-kthl">开通即享8大权益</div>
				</div>
				<div class="interests-item">
					<img :src="`${staticPath}/icon-2.png`" alt="" style="width:2.5rem;">
					<div>服务支持</div>
					<div class="interests-item-kthl">尊享多种服务支持</div>
				</div>
				<div class="interests-item">
					<img :src="`${staticPath}/icon-3.png`" alt="" style="width:2.5rem;">
					<div>辅导收益</div>
					<div class="interests-item-kthl">享更多收益</div>
				</div>
			</div>
		</div>

		<template slot="other">
			<div class="bc-row bc-pd-lr-20rp bc-pd-b-15rp bc-ps-f bc-bg-white" style="bottom:0;left:0;" v-show="$store.state.view.pageFixed">
				<div class="bc-row  bc-pd-tb-11rp bc-v-m">
					<label class="bc-v-m">
						<input type="checkbox" v-model="protocol">
						我同意
					</label>
					<a href="" class="bc-t-info">《点通宝代理智能合约》</a>
				</div>
				<div class="bc-row">
					<button
						class="bc-btn bc-bd-radius-5 bc-w-100 join-btn"
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
    name: "join-vip",
    data() {
      return {
        protocol: true,
        price: '',
        money: ''
      }
    },
    computed: {
      staticPath() {
        return `${this.$config.path.static}/img/home/join/creator-buy`;
      }
    },
    methods: {
      getData() {
        this.$axios.get('/home/creator/order').then((res) => {
          const { data } = res.data;
          const { price, money } = data;
          this.price = price;
          this.money = money;
        });
      },
      submit() {
        this.protocol && (location.href = `${this.$config.path.base}/home/creator/pay?redirect_url=${encodeURIComponent(`/#/member/creator`)}`);
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped lang="scss">
	@import "@css/member.scss";

	//加入按钮
	.join-btn {
		padding-top: rem(5) !important;
		padding-bottom: rem(5) !important;
		font-size: rem(16);
	}

</style>
