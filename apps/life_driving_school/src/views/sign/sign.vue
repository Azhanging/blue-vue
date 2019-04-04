<template>
	<bv-home-view class='wap' :router-level='2' style="background:rgba(244,244,244,1);">

		<w-home-header :header="{
			title:{
				value:'已签到'
			}
		}">
			<div slot="right-control"></div>
		</w-home-header>

		<div class="bc-pd-15rp sign-in">
			<div class="sign-label ">
				<div class="sign-label-content bc-bg-white bc-c-f bc-t-c bc-bd-radius-10" >
					<div class="bc-mg-t-30rp bc-f-14rp">
						<span class="bc-t-999">已坚持</span>
						<span class="sign-label-content-day-wrap bc-inline-block">
							<span class="sign-label-content-day bc-t-red bc-inline-block bc-t-white ">
								27
							</span>
						</span>
						<span class="bc-t-999">天签到</span>
					</div>
					<div class="bc-mg-t-18rp bc-f-16rp" style="color:#CA9F75;">
						2019\1\19 星期六
					</div>
					<div class="bc-mg-t-15rp">
						<img class="head-portrait" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="">
						<img class="head-portrait" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="">
						<img class="head-portrait" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="">
						<img class="head-portrait" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="">
						<img class="head-portrait" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="">
						<img class="head-portrait" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="">
					</div>
					<div class="bc-mg-t-10rp bc-f-12rp bc-t-999" style="">
						600位用户今日已签到
					</div>
					<div class="bc-mg-t-20rp bc-pd-lr-29rp">
						<div  style="border:1px dashed #e5e5e5;"></div>
					</div>

					<div class="sign-in-progress bc-mg-t-20rp bc-pd-lr-29rp progress bc-flex">
						<div class="bc-flex-1">
							<span></span>
							<div class="bc-mg-t-8rp bc-f-12rp">1天</div>
						</div>
						<div class="bc-flex-1">
							<span></span>
							<div class="bc-mg-t-8rp bc-f-12rp">2天</div>
						</div>
						<div class="bc-flex-1">
							<span></span>
							<div class="bc-mg-t-8rp bc-f-12rp">3天</div>
						</div>
						<div class="bc-flex-1">
							<span></span>
							<div class="bc-mg-t-8rp bc-f-12rp">4天</div>
						</div>
						<div class="bc-flex-1">
							<span></span>
							<div class="bc-mg-t-8rp bc-f-12rp">5天</div>
						</div>
					</div>

					<div class="produce-label bc-t-white bc-t-c bc-pd-tb-12rp">
						生成日签
					</div>

				</div>
			</div>
			<div class="bc-mg-t-16rp bc-bg-white bc-bd-radius-10 bc-pd-lr-16rp">
				<div class="bc-pd-tb-20rp bc-f-b bc-bd-b-e5e bc-f-16rp">积分任务</div>
				<div class="bc-flex bc-flex-jc-c bc-flex-ai-c bc-bd-b-e5e">
					<div class="bc-flex-3">
						<div class="bc-pd-t-14rp bc-f-16rp" style="font-weight:500">完成任务名称</div>
						<div class="bc-t-999 bc-pd-tb-9rp bc-f-11rp">每天完成10个任务可得100积分</div>
					</div>
					<div class="bc-flex-1 bc-t-c">
						<div class="to-complete" style="">
							去完成
						</div>
					</div>
				</div>

				<div class="bc-flex bc-flex-jc-c bc-flex-ai-c  bc-bd-b-e5e">
					<div class="bc-flex-3">
						<div class="bc-pd-t-14rp bc-f-16rp" style="font-weight:500">完成任务名称</div>
						<div class="bc-t-999 bc-pd-tb-9rp bc-f-11rp">每天完成10个任务可得100积分</div>
					</div>
					<div class="bc-flex-1 bc-t-c">
						<div class="to-complete" style="">
							去完成
						</div>
					</div>
				</div>

				<div class="bc-flex bc-flex-jc-c bc-flex-ai-c">
					<div class="bc-flex-3">
						<div class="bc-pd-t-14rp bc-f-16rp" style="font-weight:500">完成任务名称</div>
						<div class="bc-t-999 bc-pd-tb-9rp bc-f-11rp">每天完成10个任务可得100积分</div>
					</div>
					<div class="bc-flex-1 bc-t-c">
						<div class="to-complete" style="">
							去完成
						</div>
					</div>
				</div>

			</div>

		</div>

	</bv-home-view>

</template>

<script>

  export default {
    name: "sign",
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {
			this.$axios.get('/api/Sign/index.html')
				.then((res) => {

				})
    },
    components: {

    }
  }
</script>

<style scoped lang="scss">
	.sign-in {
		position: relative;
		.sign-label {
			height: 430px;
			box-sizing: border-box;
			background: url($base-url + '/img/home/sign_in_bg.png') no-repeat;
			background-position: center;
			background-size: 100% 100%;
			padding: rem(63) rem(33) rem(37) rem(33);
			.sign-label-content {
				height: rem(330);
				.sign-label-content-day-wrap {
					width: rem(80);
					.sign-label-content-day {
						position: absolute;
						box-sizing: border-box;
						left: rem(145);
						top: rem(47);
						width: rem(85);
						height: rem(90);
						background: url($base-url + '/img/home/sign_in_day_bg.png') no-repeat;
						background-position: center;
						background-size: 100% 100%;
						font-size: rem(40);
						padding-top: rem(12);
					}
				}

				.head-portrait {
					width: rem(30);
					height: rem(30);
					-webkit-border-radius: 50%;
					border-radius: 50%;
					overflow: hidden;
					border: 2px solid white;
					&:nth-child(2) {
						transform: translateX(rem(-10))!important;
						-webkit-transform: translateX(rem(-10))!important;
					}
					&:nth-child(3) {
						transform: translateX(rem(-20))!important;
						-webkit-transform: translateX(rem(-20))!important;
					}
					&:nth-child(4) {
						transform: translateX(rem(-30))!important;
						-webkit-transform: translateX(rem(-30))!important;
					}
					&:nth-child(5) {
						transform: translateX(rem(-40))!important;
						-webkit-transform: translateX(rem(-40))!important;
					}
					&:nth-child(6) {
						transform: translateX(rem(-50))!important;
						-webkit-transform: translateX(rem(-50))!important;
					}
				}
				.sign-in-progress {
					span {
						display: inline-block;
						width: rem(15);
						height: rem(15);
						background: url($base-url + '/img/home/sign_in_progress_yes.png') no-repeat;
						background-position: center;
						background-size: 100% 100%;
					}
				}
				.produce-label {
					width: rem(125);
					margin: rem(14) auto 0 auto;
					background:rgba(202,159,117,1);
					box-shadow:0px 4px 10px 0px rgba(202,159,117,0.5);
					border-radius: rem(20);
				}
			}

		}

		.to-complete {
			padding: rem(9) rem(12);
			font-size: rem(14);
			border: 1px solid rgba(202,159,117,1);
			border-radius: rem(25);
			color: rgba(202,159,117,1);
		}
	}
</style>