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

		<!--VIP专属权益-->
		<div class="bc-row bc-bd-t-e5e" >
			<div class="bc-row bc-f-b bc-f-16rp bc-pd-15rp" style="color:#635F58;">
				VIP专属权益
			</div>
			<div class="bc-flex bc-t-c bc-f-12rp">
				<div class="bc-flex-1"  v-for="(item,index) in interestsItem">
					<img :src="`${staticPath}/icon-${index+1}.png`" alt="" style="width:2.6rem;">
					<div class="bc-pd-t-4rp" style="color: #BB8F41;">{{ item.name }}</div>
					<div class="bc-pd-b-16rp">{{ item.jf }}</div>
				</div>
			</div>
		</div>

		<!--VIP专属权益-->
		<div class="bc-row bc-bd-t-e5e" >
			<div class="bc-row bc-f-b bc-f-16rp bc-pd-15rp" style="color:#635F58;">
				VIP专属产品
			</div>
			<div class="bc-flex bc-t-c bc-f-12rp bc-pd-lr-15rp bc-pd-b-15rp">
				<a @click="$router.routerBack(`${$config.path.base}/home/vipmember/index`)">
					<img :src="`${staticPath}/vip-shop.png`" class="bc-w-100"/>
				</a>
			</div>
		</div>

		<!--vip专属服务-->
		<div class="bc-row" >
			<div class="bc-row bc-f-b bc-f-16rp bc-pd-lr-15rp bc-pd-b-15rp" style="color:#635F58;">
				VIP专属服务
			</div>
			<div class="bc-row bc-pd-lr-15rp bc-pd-b-15rp">
				<div class="bc-row bc-pd-10rp" style="background-color: #f5f5f5;">
					<div class="bc-pd-tb-4rp">
						1.开通成功立享限量专属好礼，即送1000积分。
					</div>
					<div class="bc-pd-tb-4rp">
						2.VIP会员在商城消费最高可享等额积分（积分均可用于积分商城抵扣现金使用）。
					</div>
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

	.vip-top {
		background: #47443E;
		height: rem(180);
		position: relative;
		margin-bottom: rem(60);
		.vip-header {
			display: flex;
			align-items: center;
			color: #fff;
			padding: 0 rem(15);
			.vip-header-l {
			}
			.vip-header-c {
				flex: 1;
				padding: rem(15);
				text-align: center;
				font-size: rem(18);
			}
			.vip-header-r {
			}
		}
		.vip-card {
			background: rgb(252, 235, 179);
			height: rem(166);
			position: absolute;
			left: rem(15);
			right: rem(15);
			top: rem(60);
			border-radius: rem(5);
			.vip-card-top {
				display: flex;
				padding: rem(15);
				background: url(#{$base-static-path + '/img/member/vip/my-vip-bg.png' }) no-repeat;
				background-position: center right;
				background-size: 40%;
				border-bottom: 1px solid #D8C07F;
				.vip-card-top-l {
					width: rem(45);
					height: rem(45);
					overflow: hidden;
					border-radius: 100%;
					margin-right: rem(10);
					img {
						width: 100%;
						height: 100%;
					}
				}
				.vip-card-top-r {
					flex: 1;
					.vip-card-top-r-name {
						color: #635F58;
						font-size: rem(16);
						margin-top: rem(5);
					}
					.vip-card-top-r-time {
						color: #8B7D5C;
						font-size: rem(12);
					}
				}
			}
			.vip-card-renewal {
				display: flex;
				padding: 0 rem(15);
				padding-top: rem(45);
				padding-bottom: rem(15);
				align-items: center;
				background: url(#{$base-static-path + '/img/member/vip/vip-bg.png' }) no-repeat;
				background-position: bottom left;
				background-size: 30%;
				.vip-card-renewal-NO {
					flex: 1;
					font-size: rem(12);
					color: #635F58;
				}
				.vip-card-renewal-btn {
					a {
						display: block;
						height: rem(30);
						line-height: rem(30);
						padding: 0 rem(10);
						background: #D6B66C;
						font-size: rem(16);
						color: #fff;
						border-radius: rem(15);
					}
				}
			}
		}

	}
</style>
