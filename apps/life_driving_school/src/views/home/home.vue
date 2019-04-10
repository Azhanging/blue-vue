<template>
	<bv-home-view style="background:#F4F4F4;">
		<w-home-header :header="{
      title:{
        value:'生命导航',
        style:`font-weight: bold !important;font-size:1.33333rem;`
      },
      style:`background: rgba(255,246,238,1);border-bottom:none !important;`
		}" :type="2">
		</w-home-header>

		<div class="bc-g-bg-e5e">
			<!--tab 首页 资讯 产业研究-->
			<div class="bc-flex bc-flex-jc-c bc-t-c home-nav bc-pd-lr-12rp">
				<div class='bc-flex-1 bc-pd-tb-5rp' v-for="(item, index) in nav" :key="index">
					<a @click="routerTo(item)"
					   :class="[0 !== index ? '' : 'active']"
					   v-if="item.nav_name"
					>
						{{item.nav_name}}
					</a>
				</div>
			</div>

			<div class="bc-row bc-bg-e5e bc-ps-r huilianwang">
				<a class="bc-block" href="javascript:;">
					<img class="bc-w-100" :src="`${$config.path.static}/img/home/zhihuiwang.png`" alt="慧联网">
				</a>
				<a href="javascript:;" @click.stop="sign">
					<img class="qiandao bc-ps-a" :src="`${$config.path.static}/img/home/qiandao.png`" alt="签到">
				</a>

			</div>

			<!--三大系统-->
			<div class="three-system">
				<div class="bc-v-m bc-pd-lr-10rp ">
					<div class="bc-pd-tb-10rp" style="border-bottom:1px solid #F9F3EC">
						<img class="bc-mg-r-3rp xiaochangshi" :src="`${$config.path.static}/img/home/jiankangchangshi.png`" alt="健康常识">
						<span class="bc-f-12rp" v-html="">健康小常识之宜早卧早起,保证一定的睡眠时间。</span>
					</div>
				</div>
				<div class="bc-t-c bc-mg-t-20rp">
					<img class="bc-inline-block three-system-title" :src="`${$config.path.static}/img/home/three_system.png`">
				</div>
				<div class="bc-t-c bc-mg-t-13rp">
					<router-link to="/grow">
						<img class="bc-inline-block chengzhang-system" :src="`${$config.path.static}/img/home/chengzhang_system.png`">
					</router-link>
				</div>
				<div class=" bc-t-c bc-mg-t-3rp">
					<img class="bc-inline-block bozhong-system" :src="`${$config.path.static}/img/home/bozhong_system.png`">
					<img class="bc-inline-block shouhuo-system" :src="`${$config.path.static}/img/home/shouhuo_system.png`">
				</div>
			</div>

			<!--生命导航-->
			<div class="shengmingdaohang bc-t-c bc-mg-t-10rp bc-c-f">
				<div class="bc-mg-t-20rp">
					<a href="javascript:;">
						<img class="inline-block shengmingdaohang-title" :src="`${$config.path.static}/img/home/shengmingdaohang.png`">
					</a>
				</div>
				<div class="bc-mg-t-17">
					<a href="javascript:;">
						<img class="inline-block shengmingdaohang-item" :src="`${$config.path.static}/img/home/shengmingdaohang_01.png`" alt="">
					</a>
					<a href="javascript:;">
						<img class="inline-block shengmingdaohang-item" :src="`${$config.path.static}/img/home/shengmingdaohang_02.png`" alt="">
					</a>
					<a href="javascript:;">
						<img class="inline-block shengmingdaohang-item" :src="`${$config.path.static}/img/home/shengmingdaohang_03.png`" alt="">
					</a>
				</div>
				<div>
					<a href="javascript:;">
						<img class="inline-block shengmingdaohang-item" :src="`${$config.path.static}/img/home/shengmingdaohang_04.png`" alt="">
					</a>
					<a href="javascript:;">
						<img class="inline-block shengmingdaohang-item" :src="`${$config.path.static}/img/home/shengmingdaohang_05.png`" alt="">
					</a>
				</div>
			</div>

			<!--生态圈-->
			<div class="shengtaiquan bc-mg-t-10rp bc-c-f">
				<div class="bc-mg-t-20rp bc-t-c">
					<a href="javascript:;">
						<img class="inline-block shengtaiquan-title" :src="`${$config.path.static}/img/home/shengtaiquan.png`">
					</a>
				</div>

					<div class='scroll-x bc-pd-15rp bc-bg-white bc-t-c'>
						<bv-swiper-scroll :active-class-name="'scroll_active'">
							<template slot="scroll-items">
								<div  class=" bc-mg-r-5rp bc-inline-block bc-t-666">
									<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
										<div class='scroll_img bc-ps-r bc-t-c'>
											<img class="inline-block shengtaiquan-item" :src="`${$config.path.static}/img/home/shengtaiquan_xiaofei.png`">
										</div>
									</div>
								</div>
								<div  class=" bc-mg-r-5rp bc-inline-block bc-t-666">
									<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
										<div class='scroll_img bc-ps-r bc-t-c'>
											<img class="inline-block shengtaiquan-item" :src="`${$config.path.static}/img/home/shengtaiquan_touzi.png`">
										</div>
									</div>
								</div>
								<div  class=" bc-mg-r-5rp bc-inline-block bc-t-666">
									<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
										<div class='scroll_img bc-ps-r bc-t-c'>
											<img class="inline-block shengtaiquan-item" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`">
										</div>
									</div>
								</div>
								<div  class=" bc-mg-r-5rp bc-inline-block bc-t-666">
									<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
										<div class='scroll_img bc-ps-r bc-t-c'>
											<img class="inline-block shengtaiquan-item" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`">
										</div>
									</div>
								</div>
								<div  class=" bc-mg-r-5rp bc-inline-block bc-t-666">
									<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
										<div class='scroll_img bc-ps-r bc-t-c'>
											<img class="inline-block shengtaiquan-item" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`">
										</div>
									</div>
								</div>
							</template>
						</bv-swiper-scroll>
					</div>



			</div>

			<!--推荐-->
			<div class="bc-mg-t-10rp tuijian bc-bg-white bc-c-f">
				<div class="bc-mg-t-17rp bc-t-c">
					<a href="javascript:;">
						<img class="inline-block tuijian-title" :src="`${$config.path.static}/img/home/tuijian.png`">
					</a>
				</div>

				<ul class="bc-reset-ul  bc-media">
					<li class="bc-mg-t-20rp">
						<a class="t-333" href="">
							<div class="bc-media pd-t-15 bc-row bc-c-f">
								<div class="bc-media-left">
									<img class="tuijian-article-img" :src="`${$config.path.static}/img/home/shengmingdaohang_01.png`" v-if="">
								</div>
								<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
									<div class=" bc-f-16rp bc-t-333 bc-f-b">仅仅一年，他完成了100万资本的原始积累</div>
									<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
										文章内容前面部分文章内容前面部分文章内容前面部分文章内容前面部分文文章内容前面部分文章内容前面部分文章内容前面部分文章内容前面部分文
									</div>
								</div>
							</div>
						</a>
					</li>
					<li class="bc-mg-t-20rp">
						<a class="t-333" href="">
							<div class="bc-media pd-t-15 bc-row bc-c-f">
								<div class="bc-media-left">
									<img class="tuijian-article-img" :src="`${$config.path.static}/img/home/shengmingdaohang_01.png`" v-if="">
								</div>
								<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
									<div class=" bc-f-16rp bc-t-333 bc-f-b">仅仅一年，他完成了100万资本的原始积累</div>
									<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
										文章内容前面部分文章内容前面部分文章内容前面部分文章内容前面部分文文章内容前面部分文章内容前面部分文章内容前面部分文章内容前面部分文
									</div>
								</div>
							</div>
						</a>
					</li>
					<li class="bc-mg-t-20rp">
						<a class="t-333" href="">
							<div class="bc-media pd-t-15 bc-row bc-c-f">
								<div class="bc-media-left">
									<img class="tuijian-article-img" :src="`${$config.path.static}/img/home/shengmingdaohang_01.png`" v-if="">
								</div>
								<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
									<div class=" bc-f-16rp bc-t-333 bc-f-b">仅仅一年，他完成了100万资本的原始积累</div>
									<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
										文章内容前面部分文章内容前面部分文章内容前面部分文章内容前面部分文文章内容前面部分文章内容前面部分文章内容前面部分文章内容前面部分文
									</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<template slot="other">
			<!-- 绑定手机号 -->
			<bv-bind-phone :show-bind-phone-status="showBindPhoneStatus" @close-bind-phone="closeBindPhone"/>
		</template>

	</bv-home-view>
</template>

<script>
	import router from '@router';

  export default {
    name: "home",
    data() {
      return {
        nav: [{
          nav_name: '首页',
          path: '/'
        }, {
          nav_name: '资讯',
          path: '/zixun'
        }, {
          nav_name: '产业研究',
          path: '/industry'
        }],
        //绑定手机的状态
        showBindPhoneStatus: (() => {
          return router.currentRoute.fullPath === '/';
        })()
      }
    },
    methods: {
      routerTo(item) {
        const path = item.path;
        this.$router.push(path);
      },
      closeBindPhone() {
        this.showBindPhoneStatus = false;
      },
      sign() {
        // if (!this.showBindPhoneStatus) {
        //   // 绑定手机 再进行登录判断
	      //   if ($config.session.storage){}
	      //   this.showBindPhoneStatus = true;
        // } else {
        // }
          this.$router.push('/sign');
      }
    },
  }
</script>

<style scoped lang="scss">

	.huilianwang {
		.qiandao {
				left: rem(5);
				bottom: rem(5);
				width: rem(69);
				height: rem(39);
		}
	}

	.home-nav {
		background: rgba(255, 246, 238, 1);
		a {
			color: #CA9F75;
			font-size: rem(16);
			font-weight: bold;
			color: rgba(202, 159, 117, 1);
			padding: 6px 15px;
			display: inline-block;
			width: 70%;
		}

		.active {
			color: #fff;
			background: url($base-url + '/img/home/shouye_bg.png') no-repeat;
			background-position: center;
			background-size: 100% 100%;

		}
	}

	.three-system {
		min-height: rem(300);
		background: url($base-url + '/img/home/three_system_bg.png') no-repeat;
		background-position: center;
		background-size: 100% 100%;
		.xiaochangshi {
			width: rem(69);
			height: rem(22);
		}
		.three-system-title {
			width: rem(120);
			height: rem(30);
		}
		.chengzhang-system {
			width: rem(196);
			height: rem(88);
		}
		.bozhong-system {
			width: rem(170);
			height: rem(77);
		}
		.shouhuo-system {
			width: rem(170);
			height: rem(77);
		}
	}

	.shengmingdaohang {
		min-height: rem(230);
		background: url($base-url + '/img/home/shengmingdaohang_bg.png') no-repeat;
		background-position: center;
		background-size: 100% 100%;
		.shengmingdaohang-title {
			width: rem(120);
			height: rem(30);
		}
		.shengmingdaohang-item {
			width: rem(118);
			height: rem(78);
		}
	}

	.shengtaiquan {
		min-height: 185px;
		background: url($base-url + '/img/home/shengtaiquan_bg.png') no-repeat;
		background-position: center;
		background-size: 100% 100%;
		.shengtaiquan-title {
			width: rem(120);
			height: rem(30);
		}
		.scroll-x {
			border-bottom: 1px #eee solid;
			.scroll_img{
				width: rem(108);
				height: rem(108);
			}
		}

			.shengtaiquan-item {
				width: rem(108);
				height: rem(108);
			}

	}

	.tuijian {
		.tuijian-title {
			width: rem(155);
			height: rem(51);
		}
		.tuijian-article-img {
			width: rem(120);
			height: rem(80);
		}
	}

</style>