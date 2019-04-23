<template>
	<bv-home-view class='wap' :router-level='3'>
		<bv-header :header="{title:{value:'交易记录'}}"></bv-header>

		<div class="trading-box">
			<div class="trading-item" v-for="item in pageData.list">
				<div class="trading-top">
					<div class="trading-top-l bc-flex bc-flex-ai-c">
						<img :src="`${staticPath}/vip-icon.png`" style="width:1rem;"/>
						<span class="bc-inline-block bc-pd-l-4rp">至尊VIP会员一年</span>
					</div>
					<div class="trading-top-r" v-if="item.pay_type == 0">免费赠送</div>
					<div class="trading-top-r" v-else-if="item.pay_type == 1">￥{{item.price}}</div>
				</div>
				<div class="bc-flex bc-flex-ai-c bc-pd-tb-10rp bc-t-666">
					<div class="bc-flex-3">
						<div class="bc-pd-tb-5rp">会员生效时间: {{item.start_time}}</div>
						<div class="bc-pd-tb-5rp">会员到期时间: {{item.end_time}}</div>
						<div class="bc-pd-tb-5rp">购买时间: {{item.create_time}}</div>
						<div class="bc-pd-tb-5rp">订单编号: {{item.out_trade_no}}</div>
					</div>
					<div class="bc-flex-1" v-if="item.pay_type == 0">
						<img :src="`${staticPath}/free-icon.png`" class="bc-w-100"/>
					</div>
				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
    name: "trading",
    created() {
      this.getData();
    },
    data() {
      return {
        pageData: {
          list: []
        }
      };
    },
		computed:{
      staticPath(){
        return `${this.config.path.static}/img/member/vip/trading`
      }
		},
    methods: {
      getData() {
        this.$axios.get('/member/vip/trading_record').then((res) => {
          const { data } = res.data;
					this.pageData.list = data;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
	.trading-box {
		.trading-item {
			padding: 0 rem(15);
			border-bottom: rem(5) solid #eee;
			.trading-top {
				padding: rem(15) 0;
				border-bottom: 1px solid #eee;
				display: flex;
				.trading-top-l {
					flex: 1;
					color: #333;
				}
				.trading-top-r {
					color: #666;
					font-size: rem(14);
					span {
						color: #BB8F41;
					}
				}
			}
			.trading-desc {
				padding: rem(10) 0;
				position: relative;
				div {
					line-height: rem(25);
					font-size: rem(14);
					color: #666;
				}
				.trading-desc-seal {
					position: absolute;
					right: rem(15);
					top: rem(20);
				}
			}
		}
	}
</style>
